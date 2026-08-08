/* ═══════════════════════════════════════════════════════════════════════
   BOP — Renderizador Markdown (GFM básico)
   Soporta: encabezados, negritas, cursivas, listas, tablas, blockquotes,
   código inline, enlaces, hr. Usado en preview y vistas de detalle.
   ═══════════════════════════════════════════════════════════════════════ */

function bopEscapeHtml(html) {
  return String(html == null ? '' : html)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Convierte inline markdown (**negrita**, *cursiva*, `code`) a HTML. */
function bopInline(md) {
  if (!md) return '';
  let s = bopEscapeHtml(md);
  // Código inline
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Negritas **texto**
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Cursivas *texto*
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return s;
}

/** Detecta si una línea puede ser fila de tabla GFM. */
function bopEsFilaTabla(l) {
  const t = l.trim();
  return /^\s*\|.*\|\s*$/.test(t) || t.split('|').filter(x => x.trim() !== '').length >= 2;
}

/**
 * Renderiza tablas GFM (| a | b | / |---|---| / | 1 | 2 |).
 * Tolerante a líneas EN BLANCO entre filas (formato habitual al editar).
 * Devuelve una array mixta: objetos {html:...} para tablas y strings para
 * las líneas que no son tabla (para que el bucle principal las procese).
 */
function bopParseTablas(lineas) {
  const resultado = [];
  let i = 0;
  while (i < lineas.length) {
    const l = lineas[i];
    const esFila = bopEsFilaTabla(l);
    if (!esFila) {
      resultado.push(l);
      i++;
      continue;
    }
    // Posible tabla: reunir filas permitiendo líneas en blanco entre ellas
    const filas = [];
    let j = i;
    while (j < lineas.length) {
      const t = lineas[j].trim();
      if (t === '') { j++; continue; }                    // saltar vacíos dentro de la tabla
      if (bopEsFilaTabla(lineas[j])) {
        const fila = t.replace(/^\|/, '').replace(/\|$/, '').split('|');
        filas.push(fila.map(c => c.trim()));
        j++;
      } else {
        break;                                            // fin de la tabla
      }
    }
    // Validar: al menos cabecera + separador (2ª fila toda de guiones)
    if (filas.length >= 2 && filas[1].every(c => /^:?-{2,}:?$/.test(c.trim()))) {
      const [head, ...resto] = filas;
      const cuerpo = resto.slice(1);
      let html = '<table><thead><tr>';
      head.forEach(h => { html += `<th>${bopInline(h)}</th>`; });
      html += '</tr></thead><tbody>';
      cuerpo.forEach(f => {
        html += '<tr>';
        f.forEach(c => { html += `<td>${bopInline(c)}</td>`; });
        html += '</tr>';
      });
      html += '</tbody></table>';
      resultado.push({ html });
      i = j;
      continue;
    }
    // No era tabla: devolver solo esta línea (el resto se procesa después)
    resultado.push(l);
    i++;
  }
  return resultado;
}

/** Renderiza un documento markdown completo a HTML. */
function bopRenderMarkdown(md) {
  if (!md) return '<p>Sin contenido.</p>';
  const lineas = String(md).split('\n');
  const procesadas = bopParseTablas(lineas);
  let html = '';
  let enLista = false;

  for (const raw of procesadas) {
    // Bloques HTML pre-renderizados (tablas) se insertan tal cual
    if (raw && typeof raw === 'object' && raw.html) {
      if (enLista) { html += '</ul>'; enLista = false; }
      html += raw.html;
      continue;
    }
    const l = raw;
    const enc = l.match(/^(#{1,6})\s+(.*)$/);
    if (enc) {
      if (enLista) { html += '</ul>'; enLista = false; }
      const n = enc[1].length;
      html += `<h${Math.min(n + 1, 6)}>${bopInline(enc[2])}</h${Math.min(n + 1, 6)}>`;
      continue;
    }
    if (/^\s*[-*+]\s+/.test(l)) {
      if (!enLista) { html += '<ul>'; enLista = true; }
      html += `<li>${bopInline(l.replace(/^\s*[-*+]\s+/, ''))}</li>`;
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(l)) {
      if (!enLista) { html += '<ul>'; enLista = true; }
      html += `<li>${bopInline(l.replace(/^\s*\d+[.)]\s+/, ''))}</li>`;
      continue;
    }
    if (enLista) { html += '</ul>'; enLista = false; }
    if (l.trim() === '') continue;
    if (/^>\s?/.test(l)) {
      html += `<blockquote>${bopInline(l.replace(/^>\s?/, ''))}</blockquote>`;
      continue;
    }
    if (/^\s*---+\s*$/.test(l)) { html += '<hr>'; continue; }
    html += `<p>${bopInline(l)}</p>`;
  }
  if (enLista) html += '</ul>';
  return html;
}

/** Convierte HTML (producido por bopRenderMarkdown o el editor visual) a markdown. */
function bopHtmlAMarkdown(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(String(html), 'text/html');
  const cuerpo = doc.body;

  function recorrer(nodo) {
    if (nodo.nodeType === Node.TEXT_NODE) return nodo.textContent;
    if (nodo.nodeType !== Node.ELEMENT_NODE) return '';
    const nom = nodo.nodeName.toLowerCase();
    const hijos = Array.from(nodo.childNodes).map(recorrer).join('');
    switch (nom) {
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
        return `\n\n${'#'.repeat(Number(nom[1]))} ${hijos.trim()}\n`;
      case 'p': return `\n\n${hijos.trim()}\n`;
      case 'div': return `\n${hijos}\n`;
      case 'strong': case 'b': return `**${hijos}**`;
      case 'em': case 'i': return `*${hijos}*`;
      case 'code': {
        const txt = `\`${hijos}\``;
        return txt;
      }
      case 'a': {
        const href = nodo.getAttribute('href') || '';
        return href ? `[${hijos}](${href})` : hijos;
      }
      case 'br': return '\n';
      case 'hr': return `\n\n---\n`;
      case 'ul':
        return `\n${Array.from(nodo.children).map(li => `- ${recorrer(li).trim()}`).join('\n')}\n`;
      case 'ol':
        return `\n${Array.from(nodo.children).map((li, i) => `${i + 1}. ${recorrer(li).trim()}`).join('\n')}\n`;
      case 'li': return hijos;
      case 'blockquote':
        return `\n\n> ${hijos.trim().split('\n').join('\n> ')}\n`;
      case 'table': {
        const trs = Array.from(nodo.querySelectorAll('tr'));
        if (!trs.length) return '';
        const filas = trs.map(tr => {
          const celdas = Array.from(tr.children).map(c => recorrer(c).trim().replace(/\s*\n\s*/g, ' '));
          return `| ${celdas.join(' | ')} |`;
        });
        const numCols = trs[0] ? trs[0].children.length : 2;
        filas.splice(1, 0, `| ${Array(Math.max(numCols, 1)).fill('---').join(' | ')} |`);
        return `\n\n${filas.join('\n')}\n`;
      }
      case 'th': case 'td': return hijos;
      default: return hijos;
    }
  }

  return recorrer(cuerpo).replace(/\n{3,}/g, '\n\n').trim();
}

/** Devuelve un texto plano legible (sin símbolos markdown) para previews. */
function bopPlano(md, max) {
  if (!md) return '';
  let txt = String(md)
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1$2')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/^\s*\|/gm, '')
    .replace(/\|\s*$/gm, '')
    .replace(/\s*\|+\s*/g, ' · ')
    .replace(/^>\s?/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (max && txt.length > max) txt = txt.slice(0, max).trimEnd() + '…';
  return txt;
}

// Exponer en window para uso global
if (typeof window !== 'undefined') {
  window.bopRenderMarkdown = bopRenderMarkdown;
  window.bopPlano = bopPlano;
  window.bopInline = bopInline;
  window.bopEscapeHtml = bopEscapeHtml;
  window.bopHtmlAMarkdown = bopHtmlAMarkdown;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { bopRenderMarkdown, bopPlano, bopInline, bopEscapeHtml, bopHtmlAMarkdown };
}
