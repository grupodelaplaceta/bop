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
 * Devuelve una array mixta: objetos {html:...} para tablas y strings para
 * las líneas que no son tabla (para que el bucle principal las procese).
 */
function bopParseTablas(lineas) {
  const resultado = [];
  let i = 0;
  while (i < lineas.length) {
    const l = lineas[i];
    const esFila = bopEsFilaTabla(l);
    if (esFila) {
      // Reunir filas consecutivas (cabecera + separador + cuerpo)
      const filas = [];
      let j = i;
      while (j < lineas.length && bopEsFilaTabla(lineas[j])) {
        const fila = lineas[j].trim().replace(/^\|/, '').replace(/\|$/, '').split('|');
        filas.push(fila.map(c => c.trim()));
        j++;
      }
      // Validar: al menos cabecera + separador
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
    }
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
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { bopRenderMarkdown, bopPlano, bopInline, bopEscapeHtml };
}
