/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Renderizador Markdown (GFM mejorado)
   Soporta: encabezados, negritas/cursivas/tachado, enlaces, imágenes,
   código inline, bloques de código ```, listas ordenadas y anidadas,
   tablas GFM con alineación, blockquotes agrupados, líneas, referencias
   {{CNIC-XXXX}} y GRÁFICAS  (bloque ```chart  con JSON → SVG).
   ═══════════════════════════════════════════════════════════════════════ */

function bopEscapeHtml(html) {
  return String(html == null ? '' : html)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* Detecta si una línea puede ser fila de tabla GFM. */
function bopEsFilaTabla(l) {
  const t = String(l).trim();
  return /^\s*\|.*\|\s*$/.test(t) || t.split('|').filter(x => x.trim() !== '').length >= 2;
}

/* ── Conversión inline ────────────────────────────────────────────────── */
function bopInline(md) {
  if (md == null) return '';
  let s = bopEscapeHtml(md);
  // Enlaces e imágenes [texto](url) / ![alt](url)
  s = s.replace(/!\[([^\]]*)\]\((https?:[^)\s]+)\)/g, (m, alt, url) =>
    `<img src="${url}" alt="${bopEscapeHtml(alt)}" loading="lazy">`);
  s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, (m, texto, url) =>
    `<a href="${url}" target="_blank" rel="noopener noreferrer">${texto}</a>`);
  // Código inline
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Tachado ~~texto~~
  s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  // Negritas **texto**
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Cursivas *texto*
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  // Referencias inline a CNIC: {{CNIC-CODIGO}} → valor actual
  s = s.replace(/\{\{([A-Za-z0-9._-]+)\}\}/g, (m, codigo) => {
    const res = (typeof window !== 'undefined' && window.BOP_RESOLVER_CNIC) ? window.BOP_RESOLVER_CNIC(codigo) : null;
    if (res) {
      const href = `cnic.html?codigo=${encodeURIComponent(codigo)}`;
      return `<a class="cnic-inline" href="${href}" data-codigo="${bopEscapeHtml(codigo)}" title="Ver ${bopEscapeHtml(res.etiqueta || codigo)}">${bopEscapeHtml(res.valor)}${res.unidad ? '&nbsp;' + bopEscapeHtml(res.unidad) : ''}</a>`;
    }
    return `<span class="cnic-inline cnic-inline-falta" title="CNIC no encontrado">${bopEscapeHtml(codigo)}</span>`;
  });
  return s;
}

/* ── Tablas GFM con alineación ────────────────────────────────────────── */
function bopTablaHtml(lineas) {
  const filas = lineas
    .map(l => String(l).trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim()));
  if (filas.length < 2) return '';
  const [head, sep, ...cuerpo] = filas;
  if (!sep.every(c => /^:?-{2,}:?$/.test(c))) return '';
  const alinear = (c) => /^:.*:$/.test(c) ? ' class="center"' : (/^:/.test(c) ? ' class="left"' : (/:$/.test(c) ? ' class="right"' : ''));
  let html = `<div class="tabla-wrap"><table>`;
  html += `<thead><tr>${head.map((h, i) => `<th scope="col"${alinear(sep[i])}>${bopInline(h)}</th>`).join('')}</tr></thead>`;
  html += `<tbody>${cuerpo.map(f => `<tr>${f.map((c, i) => `<td${alinear(sep[i])}>${bopInline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  return html;
}

/* ── Gráficas: bloque ```chart  (JSON) → SVG ──────────────────────────── */
function bopChartHtml(jsontxt) {
  try {
    const spec = JSON.parse(jsontxt);
    const datos = Array.isArray(spec.datos) ? spec.datos : [];
    if (!datos.length) return '';
    const titulo = spec.titulo || '';
    const unidad = spec.unidad || '';
    const tipo = String(spec.tipo || 'barras').toLowerCase();
    const paleta = ['#2a1668', '#4b2e93', '#7a5cd6', '#b39df2', '#d4a017', '#1c7a47', '#a13636', '#3a81a8'];
    const num = (v) => Number(v) || 0;
    const fmt = (v) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(num(v));
    const colores = datos.map((d, i) => d.color || paleta[i % paleta.length]);
    let svg = '';
    if (tipo === 'dona' || tipo === 'donut') {
      const total = datos.reduce((a, d) => a + num(d.valor), 0);
      const W = 320, H = 220, cx = 110, cy = 110, r = 78;
      let acc = 0;
      const segs = datos.map((d, i) => {
        const frac = total ? num(d.valor) / total : 0;
        const a0 = acc * 2 * Math.PI - Math.PI / 2;
        const a1 = (acc + frac) * 2 * Math.PI - Math.PI / 2;
        acc += frac;
        const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
        const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
        const grande = frac > 0.5 ? 1 : 0;
        return `<path d="M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${grande} 1 ${x1} ${y1} Z" fill="${colores[i]}"><title>${bopEscapeHtml(d.etiqueta)}: ${fmt(d.valor)}${unidad ? ' ' + bopEscapeHtml(unidad) : ''}</title></path>`;
      }).join('');
      const leyenda = datos.map((d, i) =>
        `<span class="graf-ley"><i style="background:${colores[i]}"></i>${bopEscapeHtml(d.etiqueta)} <b>${fmt(d.valor)}${unidad ? ' ' + bopEscapeHtml(unidad) : ''}</b></span>`).join('');
      svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${bopEscapeHtml(titulo)}"><g>${segs}</g><text x="${cx}" y="${cy + 5}" text-anchor="middle" class="graf-total">${fmt(total)}</text></svg><div class="graf-leyendas">${leyenda}</div>`;
    } else if (tipo === 'linea' || tipo === 'line') {
      const W = 640, H = 300, pad = 38;
      const max = Math.max(...datos.map(d => num(d.valor))) * 1.1 || 1;
      const n = datos.length;
      const pts = datos.map((d, i) => {
        const x = pad + (W - pad * 2) * (n === 1 ? 0.5 : i / (n - 1));
        const y = H - pad - (num(d.valor) / max) * (H - pad * 2);
        return [x, y];
      });
      const linea = pts.map((p, i) => `${i ? 'L' : 'M'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
      const area = `${linea} L ${pts[pts.length - 1][0].toFixed(1)} ${H - pad} L ${pts[0][0].toFixed(1)} ${H - pad} Z`;
      const etiquetas = datos.map((d, i) =>
        `<g><circle cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" r="4" fill="#2a1668"><title>${bopEscapeHtml(d.etiqueta)}: ${fmt(d.valor)}</title></circle><text x="${pts[i][0].toFixed(1)}" y="${H - pad + 20}" text-anchor="middle" class="graf-eje">${bopEscapeHtml(d.etiqueta)}</text></g>`).join('');
      svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${bopEscapeHtml(titulo)}"><path d="${area}" fill="#efebf8"/><path d="${linea}" fill="none" stroke="#2a1668" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${etiquetas}</svg>`;
    } else { // barras
      const W = 640, H = 300, pad = 40;
      const max = Math.max(...datos.map(d => num(d.valor))) * 1.12 || 1;
      const bw = (W - pad * 2) / Math.max(datos.length, 1) * 0.62;
      const barras = datos.map((d, i) => {
        const h = (num(d.valor) / max) * (H - pad * 2);
        const x = pad + (W - pad * 2) * (i + 0.5) / datos.length - bw / 2;
        const y = H - pad - h;
        return `<g><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(h, 1).toFixed(1)}" fill="${colores[i]}"><title>${bopEscapeHtml(d.etiqueta)}: ${fmt(d.valor)}</title></rect><text x="${(x + bw / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" class="graf-val">${fmt(d.valor)}</text><text x="${(x + bw / 2).toFixed(1)}" y="${H - pad + 18}" text-anchor="middle" class="graf-eje">${bopEscapeHtml(d.etiqueta)}</text></g>`;
      }).join('');
      svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${bopEscapeHtml(titulo)}">${barras}</svg>`;
    }
    return `<figure class="grafica"><figcaption>${bopEscapeHtml(titulo)}${unidad ? ' <span class="graf-unidad">(' + bopEscapeHtml(unidad) + ')</span>' : ''}</figcaption>${svg}</figure>`;
  } catch { return ''; }
}

/* ── Render del cuerpo (bloques) ──────────────────────────────────────── */
function bopRenderLista(items) {
  let out = '';
  const pila = [];
  for (const it of items) {
    while (pila.length && it.nivel < pila[pila.length - 1].nivel) out += `</li></${pila.pop().tipo}>`;
    if (!pila.length) {
      out += `<${it.tipo}><li>${it.html}`;
      pila.push({ tipo: it.tipo, nivel: it.nivel });
      continue;
    }
    const top = pila[pila.length - 1];
    if (it.nivel === top.nivel) {
      if (top.tipo !== it.tipo) {
        out += `</li></${top.tipo}><${it.tipo}><li>${it.html}`;
        pila[pila.length - 1] = { tipo: it.tipo, nivel: it.nivel };
      } else {
        out += `</li><li>${it.html}`;
      }
    } else {
      out += `<${it.tipo}><li>${it.html}`;
      pila.push({ tipo: it.tipo, nivel: it.nivel });
    }
  }
  while (pila.length) out += `</li></${pila.pop().tipo}>`;
  return out;
}

function bopRenderBloques(md) {
  const lineas = String(md).split('\n');
  let html = '';
  let i = 0;

  while (i < lineas.length) {
    const l = lineas[i];
    if (l.trim() === '') { i++; continue; }

    // Listas (viñetas y numeradas, con anidado por sangría)
    if (/^\s*([-*+]|\d+[.)])\s+/.test(l)) {
      const items = [];
      while (i < lineas.length && /^\s*([-*+]|\d+[.)])\s+/.test(lineas[i])) {
        const ll = lineas[i];
        const indent = ll.match(/^(\s*)/)[1].length;
        const nivel = Math.floor(indent / 2);
        const tipo = /^\s*\d+[.)]\s+/.test(ll) ? 'ol' : 'ul';
        const cont = ll.replace(/^\s*([-*+]|\d+[.)])\s+/, '');
        items.push({ nivel, tipo, html: bopInline(cont) });
        i++;
      }
      html += bopRenderLista(items);
      continue;
    }

    // Tablas GFM
    if (bopEsFilaTabla(l)) {
      const filas = [];
      while (i < lineas.length && bopEsFilaTabla(lineas[i])) { filas.push(lineas[i]); i++; }
      html += bopTablaHtml(filas) || `<p>${bopInline(filas.join(' '))}</p>`;
      continue;
    }

    // Encabezados
    const h = l.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const n = h[1].length;
      html += `<h${Math.min(n + 1, 6)}>${bopInline(h[2])}</h${Math.min(n + 1, 6)}>`;
      i++; continue;
    }

    // Línea separadora
    if (/^\s*([-*_])\s*([-*_])\s*([-*_])(\s*[-*_])*\s*$/.test(l)) {
      html += '<hr>'; i++; continue;
    }

    // Blockquote (agrupa líneas consecutivas, permite listas internas)
    if (/^>\s?/.test(l)) {
      const cita = [];
      while (i < lineas.length && /^>\s?/.test(lineas[i])) { cita.push(lineas[i].replace(/^>\s?/, '')); i++; }
      html += `<blockquote>${bopRenderBloques(cita.join('\n'))}</blockquote>`;
      continue;
    }

    // Párrafo
    html += `<p>${bopInline(l)}</p>`;
    i++;
  }
  return html;
}

/* ── Render completo ──────────────────────────────────────────────────── */
function bopRenderMarkdown(md) {
  if (!md) return '<p>Sin contenido.</p>';
  md = String(md).replace(/\r\n?/g, '\n');
  // 1) Extraer bloques de código / gráficas (```)
  const bloques = [];
  const re = /```([^\n`]*)\n([\s\S]*?)```/g;
  let idx = 0, m;
  while ((m = re.exec(md))) {
    if (m.index > idx) bloques.push({ t: 'md', txt: md.slice(idx, m.index) });
    const lang = (m[1] || '').trim().toLowerCase();
    const cuerpo = (m[2] || '').replace(/\n$/, '');
    if (lang === 'chart' || lang === 'grafica' || lang === 'graf') bloques.push({ t: 'chart', txt: cuerpo });
    else bloques.push({ t: 'code', lang, txt: cuerpo });
    idx = m.index + m[0].length;
  }
  if (idx < md.length) bloques.push({ t: 'md', txt: md.slice(idx) });

  let html = '';
  for (const b of bloques) {
    if (b.t === 'code') {
      html += `<div class="codigo-bloque"><pre><code>${bopEscapeHtml(b.txt)}</code></pre>${b.lang ? `<div class="codigo-lang">${bopEscapeHtml(b.lang)}</div>` : ''}</div>`;
    } else if (b.t === 'chart') {
      const c = bopChartHtml(b.txt);
      html += c || `<div class="codigo-bloque"><pre><code>${bopEscapeHtml(b.txt)}</code></pre></div>`;
    } else {
      html += bopRenderBloques(b.txt);
    }
  }
  return html;
}

/* ── Texto plano para previsualizaciones ──────────────────────────────── */
function bopPlano(md, max) {
  if (!md) return '';
  let txt = String(md)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\r\n?/g, '\n')
    .replace(/\{\{[^}]*\}\}/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1$2')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*([-*+]|\d+[.)])\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^\s*\|/gm, '')
    .replace(/\|\s*$/gm, '')
    .replace(/\s*\|+\s*/g, ' · ')
    .replace(/\s+/g, ' ')
    .trim();
  if (max && txt.length > max) txt = txt.slice(0, max).trimEnd() + '…';
  return txt;
}

/* ── HTML → Markdown (round-trip básico, para utilidades) ─────────────── */
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
      case 'strong': case 'b': return `**${hijos}**`;
      case 'em': case 'i': return `*${hijos}*`;
      case 'del': return `~~${hijos}~~`;
      case 'code': return `\`${hijos}\``;
      case 'a': return `[${hijos}](${nodo.getAttribute('href') || ''})`;
      case 'img': return `![${nodo.getAttribute('alt') || ''}](${nodo.getAttribute('src') || ''})`;
      case 'br': return '\n';
      case 'hr': return `\n\n---\n`;
      case 'ul': return `\n${Array.from(nodo.children).map(li => `- ${recorrer(li).trim()}`).join('\n')}\n`;
      case 'ol': return `\n${Array.from(nodo.children).map((li, k) => `${k + 1}. ${recorrer(li).trim()}`).join('\n')}\n`;
      case 'li': return hijos;
      case 'blockquote': return `\n\n> ${hijos.trim().split('\n').join('\n> ')}\n`;
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
      case 'span': {
        const dataCodigo = nodo.getAttribute('data-codigo');
        if (dataCodigo) return `{{${dataCodigo}}}`;
        return hijos;
      }
      case 'div': return `\n${hijos}\n`;
      default: return hijos;
    }
  }
  return recorrer(cuerpo).replace(/\n{3,}/g, '\n\n').trim();
}

// Exponer en window para uso global
if (typeof window !== 'undefined') {
  window.bopRenderMarkdown = bopRenderMarkdown;
  window.bopPlano = bopPlano;
  window.bopInline = bopInline;
  window.bopEscapeHtml = bopEscapeHtml;
  window.bopHtmlAMarkdown = bopHtmlAMarkdown;
  window.bopChartHtml = bopChartHtml;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { bopRenderMarkdown, bopPlano, bopInline, bopEscapeHtml, bopHtmlAMarkdown, bopChartHtml };
}
