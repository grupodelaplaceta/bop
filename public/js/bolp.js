/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Capa de presentación (tarjetas, fichas, historial, comparador…).
   Requiere, en este orden: datos-migrados.js · markdown.js · bop.js ·
   bolp-clasificacion.js (taxonomía pura).
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Badges ──────────────────────────────────────────────────────────── */
function bolpEstadoBadge(d) {
  const e = bolpEstado(d);
  return `<span class="badge badge-estado ${e.clase}">${bopEscapeHtml(e.etiqueta)}</span>`;
}

function bolpSeccionBadge(d) {
  const c = bolpClasificar(d);
  if (!c.seccion) return '';
  const s = bolpSeccionPorId(c.seccion);
  if (!s) return '';
  return `<span class="badge badge-sec" title="Sección ${s.numero} · ${bopEscapeHtml(s.titulo)}">Sección ${s.numero} · ${bopEscapeHtml(s.titulo)}</span>`;
}

function bolpFamiliaBadge(d) {
  const c = bolpClasificar(d);
  if (!c.seccion || !c.familia) return '';
  return `<span class="badge badge-familia">${bopEscapeHtml(bolpNombreFamilia(d))}</span>`;
}

function bolpDepartamentoBadge(d) {
  const c = bolpClasificar(d);
  if (!c.departamento) return '';
  const dep = bolpDepartamentoPorId(c.departamento);
  if (!dep) return '';
  return `<span class="badge badge-dep" title="Órgano responsable">${bopEscapeHtml(dep.nombre)}</span>`;
}

/* ── Ficha de documento ──────────────────────────────────────────────── */
function bolpFichaMetadatos(d) {
  const c = bolpClasificar(d);
  const dep = c.departamento ? bolpDepartamentoPorId(c.departamento) : null;
  const filas = [];

  filas.push(['Sección', c.seccion ? (() => { const s = bolpSeccionPorId(c.seccion); return `${s.numero}. ${s.titulo}`; })() : '—']);
  if (c.seccion && c.familia) filas.push(['Familia', bolpNombreFamilia(d)]);
  filas.push(['Órgano responsable', dep ? dep.nombre : (d.organo_responsable || '—')]);
  filas.push(['Versión', d.version ? 'v' + d.version : '—']);
  filas.push(['Estado', bolpEstado(d).etiqueta]);
  filas.push(['Publicado', fechaLegible(bolpFechaPublicacion(d))]);
  filas.push(['Entrada en vigor', fechaLegible(bolpFechaVigor(d))]);
  if (d.fecha_aprobacion_junta) filas.push(['Aprobado en Junta', fechaLegible(d.fecha_aprobacion_junta)]);
  if (d.aprobacion_referencia) filas.push(['Aprobación', d.aprobacion_referencia]);
  if (d.autor_nombre || d.autor_dip) filas.push(['Autor', bopEscapeHtml(bolpAutorLegible(d.autor_nombre, d.autor_dip))]);
  if (d.fecha_propuesta) filas.push(['Fecha de propuesta', fechaLegible(d.fecha_propuesta)]);

  return filas.map(([k, v]) => `
    <div class="ficha-celda"><div class="ficha-k">${bopEscapeHtml(k)}</div><div class="ficha-v">${v}</div></div>`).join('');
}

/* Navegación documento anterior / posterior dentro de su serie. */
function bolpNavVersion(d, docs) {
  if (!Array.isArray(docs) || !docs.length || !d.codigo) return '';
  const raiz = String(d.codigo).replace(/-?\d+.*$/, '').toUpperCase();
  const hermanos = docs
    .filter((x) => x.codigo !== d.codigo && String(x.codigo || '').replace(/-?\d+.*$/, '').toUpperCase() === raiz)
    .sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), 'es', { numeric: true }));
  if (!hermanos.length) return '';
  const prev = hermanos.filter((x) => String(x.codigo).localeCompare(String(d.codigo), 'es', { numeric: true }) < 0).pop();
  const next = hermanos.filter((x) => String(x.codigo).localeCompare(String(d.codigo), 'es', { numeric: true }) > 0)[0];
  const enlace = (x, dir) => `<a class="btn btn-mini btn-outline" href="documento.html?codigo=${encodeURIComponent(x.codigo)}">${dir === 'prev' ? '←' : ''} ${bopEscapeHtml(x.codigo)}${x.version ? ' (v' + x.version + ')' : ''} ${dir === 'next' ? '→' : ''}</a>`;
  let html = '<div class="flex flex-wrap" style="margin-bottom:14px">';
  if (prev) html += enlace(prev, 'prev');
  if (next) html += enlace(next, 'next');
  return html + '</div>';
}

/* ── Historial de versiones ──────────────────────────────────────────── */
function bolpHistorialHtml(d) {
  const vers = Array.isArray(d.historial_versiones) && d.historial_versiones.length
    ? d.historial_versiones.slice().sort((a, b) => (b.version || 0) - (a.version || 0))
    : [];

  if (!vers.length) {
    return `<div class="version-item"><span class="num">v${d.version || 1}</span><div class="detalle">${bopEscapeHtml(d.notas_cambio || 'Versión actual en vigor.')}<div class="meta">${d.autor_nombre || d.autor_dip ? bopEscapeHtml(bolpAutorLegible(d.autor_nombre, d.autor_dip)) : '—'} · ${fechaLegible(d.fecha_aprobacion_junta || d.fecha_aplicacion)}</div></div></div>`;
  }
  return vers.map((v) => `
    <div class="version-item">
      <span class="num">v${v.version}</span>
      <div class="detalle">
        <span class="version-estado">${bolpEstadoBadge({ estado: v.estado })}</span>
        ${bopEscapeHtml(v.notas_cambio || 'Actualización de la normativa.')}
        <div class="meta">${v.autor_nombre || v.autor_dip ? bopEscapeHtml(bolpAutorLegible(v.autor_nombre, v.autor_dip)) : '—'} · ${fechaLegible(v.fecha_aprobacion_junta || v.fecha_aplicacion || v.creado_en)}</div>
        ${v.contenido_md ? `<button type="button" class="btn btn-mini btn-enlace" onclick="bolpVerVersion('${bopEscapeHtml(String(d.codigo).replace(/'/g, "\\'"))}', ${v.version})">👁 Ver esta versión</button>` : ''}
      </div>
    </div>`).join('');
}

/* Abre un modal con el contenido de una versión concreta. */
function bolpVerVersion(codigo, version) {
  const d = BOP.getDocumento(codigo);
  if (!d) return;
  const vers = (d.historial_versiones || []).filter((v) => v.version === version)[0];
  const contenido = vers && vers.contenido_md ? vers.contenido_md : d.contenido_md;
  const esActual = (d.version || 1) === version;
  bolpModal(
    `Versión v${version} · ${d.codigo}`,
    (esActual ? '' : `<div class="aviso aviso-aviso">Esta versión no es la vigente (actual: v${d.version}).</div>`) +
    `<div class="documento">${bopRenderMarkdown(contenido)}</div>` +
    (vers && !esActual ? `<div style="margin-top:14px" class="flex"><button type="button" class="btn btn-secundario" onclick="bolpCompararConVigente('${bopEscapeHtml(String(codigo).replace(/'/g, "\\'"))}', ${version})">🔄 Comparar con la vigente</button></div>` : '')
  );
}

function bolpCompararConVigente(codigo, version) {
  const d = BOP.getDocumento(codigo);
  if (!d) return;
  const vers = (d.historial_versiones || []).filter((v) => v.version === version)[0];
  const contenido = vers && vers.contenido_md ? vers.contenido_md : '';
  bolpModal(
    `Comparación · ${d.codigo}`,
    `<div class="leyenda-diff"><span><i class="swatch-add"></i> Añadido (v${version} → v${d.version})</span><span><i class="swatch-del"></i> Eliminado</span></div>` +
    bolpRenderDiff(contenido, d.contenido_md, false)
  );
}

/* Modal genérico. */
function bolpModal(titulo, html) {
  let overlay = document.getElementById('bolpOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'bolpOverlay';
    overlay.className = 'bolp-overlay oculto';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div class="bolp-modal" role="dialog" aria-modal="true" aria-label="${bopEscapeHtml(titulo)}">
      <div class="bolp-modal-cab">
        <div class="seccion-titulo" style="margin:0">${bopEscapeHtml(titulo)}</div>
        <button type="button" class="bolp-modal-cerrar" onclick="bolpCerrarModal()" aria-label="Cerrar">✕</button>
      </div>
      <div class="bolp-modal-cuerpo">${html}</div>
    </div>`;
  overlay.classList.remove('oculto');
  overlay.addEventListener('click', (e) => { if (e.target === overlay) bolpCerrarModal(); });
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { bolpCerrarModal(); document.removeEventListener('keydown', esc); } });
}
function bolpCerrarModal() {
  const o = document.getElementById('bolpOverlay');
  if (o) o.classList.add('oculto');
}

/* ── Comparador de versiones (diff por líneas LCS) ───────────────────── */
function bolpDiffLineas(antes, despues) {
  const a = String(antes || '').split('\n').map((l) => l.trimEnd());
  const b = String(despues || '').split('\n').map((l) => l.trimEnd());
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = (a[i] === b[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);

  const out = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { out.push({ tipo: 'igual', texto: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ tipo: 'del', texto: a[i] }); i++; }
    else { out.push({ tipo: 'add', texto: b[j] }); j++; }
  }
  while (i < n) { out.push({ tipo: 'del', texto: a[i] }); i++; }
  while (j < m) { out.push({ tipo: 'add', texto: b[j] }); j++; }
  return out;
}

function bolpRenderDiff(antes, despues, soloCambios) {
  const lineas = bolpDiffLineas(antes, despues);
  const filas = lineas
    .filter((l) => !soloCambios || l.tipo !== 'igual')
    .map((l) => {
      if (l.tipo === 'igual') return `<div class="diff-fila diff-igual"><span class="diff-marca">&nbsp;</span><span class="diff-txt">${bopEscapeHtml(l.texto) || '&nbsp;'}</span></div>`;
      const cls = l.tipo === 'add' ? 'diff-add' : 'diff-del';
      const marca = l.tipo === 'add' ? '+' : '−';
      const rotulo = l.tipo === 'add' ? 'AÑADIDO' : 'ELIMINADO';
      return `<div class="diff-fila ${cls}"><span class="diff-marca">${marca}</span><span class="diff-txt"><span class="diff-rotulo">${rotulo}</span>${bopEscapeHtml(l.texto) || '&nbsp;'}</span></div>`;
    })
    .join('');
  return `<div class="diff">${filas || '<div class="aviso aviso-info">Sin diferencias entre ambas versiones.</div>'}</div>`;
}

/* Sección «Cambios de esta versión» comparando con la versión anterior. */
function bolpCambiosVersionHtml(d) {
  const vers = Array.isArray(d.historial_versiones) ? d.historial_versiones : [];
  const anteriores = vers
    .filter((v) => (v.version || 0) < (d.version || 1) && v.contenido_md)
    .sort((x, y) => (y.version || 0) - (x.version || 0));
  const prev = anteriores[0];

  if (d.notas_cambio) {
    const notas = `<div class="aviso aviso-info"><strong>Motivo de esta versión:</strong> ${bopEscapeHtml(d.notas_cambio)}</div>`;
    if (!prev) return notas;
    const codigoJson = bopEscapeHtml(String(d.codigo || '').replace(/'/g, "\\'"));
    return notas + `
      <div class="comparador">
        <div class="comparador-cab">
          <span><strong>v${prev.version}</strong> (anterior)</span>
          <span class="flecha">→</span>
          <span><strong>v${d.version}</strong> (esta versión)</span>
          <label class="solo-cambios"><input type="checkbox" onchange="this.parentElement.parentElement.querySelector('.comparador-diff').innerHTML = bolpSoloCambios(this.checked, '${codigoJson}')"> Mostrar únicamente cambios</label>
        </div>
        <div class="comparador-diff">${bolpRenderDiff(prev.contenido_md, d.contenido_md, false)}</div>
      </div>`;
  }
  if (prev) {
    return `<div class="comparador">
      <div class="comparador-cab">
        <span><strong>v${prev.version}</strong> (anterior)</span><span class="flecha">→</span>
        <span><strong>v${d.version}</strong> (esta versión)</span>
      </div>
      <div class="comparador-diff">${bolpRenderDiff(prev.contenido_md, d.contenido_md, false)}</div>
    </div>`;
  }
  return '<div class="aviso aviso-info">No hay versiones anteriores con contenido para comparar. Esta es la primera versión publicada.</div>';
}

function bolpSoloCambios(solo, codigo) {
  const d = BOP.getDocumento(codigo);
  if (!d) return '';
  const vers = (d.historial_versiones || []).filter((v) => (v.version || 0) < (d.version || 1) && v.contenido_md).sort((x, y) => (y.version || 0) - (x.version || 0));
  const prev = vers[0];
  if (!prev) return '<div class="aviso aviso-info">Sin versiones anteriores.</div>';
  return bolpRenderDiff(prev.contenido_md, d.contenido_md, solo);
}

/* ── Tarjetas ────────────────────────────────────────────────────────── */
function bolpCardDocumento(d) {
  const preview = bopPlano(d.contenido_md, 180);
  return `
    <div class="card bop-card">
      <a href="documento.html?codigo=${encodeURIComponent(d.codigo)}" style="text-decoration:none;color:inherit;display:block">
        <div class="bop-card-cab">
          <span class="codigo">${bopEscapeHtml(d.codigo)}</span>
          <span class="bop-card-badges">${bolpSeccionBadge(d)} ${bolpEstadoBadge(d)}</span>
        </div>
        <h3>${bopEscapeHtml(d.titulo)}</h3>
        <div class="meta">${bolpDepartamentoBadge(d)} ${bolpFamiliaBadge(d)} ${d.version ? '· v' + d.version : ''} · ${fechaLegible(bolpFechaPublicacion(d))}</div>
        <div class="desc">${bopEscapeHtml(preview)}</div>
      </a>
    </div>`;
}

function bolpCardNovedad(d) {
  return `
    <div class="card novedad-card">
      <a href="documento.html?codigo=${encodeURIComponent(d.codigo)}" style="text-decoration:none;color:inherit;display:block">
        <div class="bop-card-cab">
          <span class="codigo">${bopEscapeHtml(d.codigo)}</span>
          <span class="bop-card-badges">${bolpSeccionBadge(d)} ${bolpEstadoBadge(d)}</span>
        </div>
        <h3>${bopEscapeHtml(d.titulo)}</h3>
        <div class="meta">${fechaLegible(d.updated_at || d.created_at || bolpFechaPublicacion(d))} · v${d.version || 1}</div>
      </a>
    </div>`;
}

/* ── Bloque de sección para la portada ───────────────────────────────── */
function bolpBloqueSeccion(s, docsEnSeccion) {
  const kpis = [];
  s.familias.forEach((f) => {
    const n = docsEnSeccion.filter((x) => bolpClasificar(x).familia === f.id).length;
    kpis.push(`<span class="bloque-familia">${bopEscapeHtml(f.nombre)} <b>${n}</b></span>`);
  });
  return `
    <div class="bloque-seccion">
      <div class="bloque-cab">
        <div class="bloque-marca">SECCIÓN ${s.numero}</div>
        <div class="bloque-titulo">${bopEscapeHtml(s.titulo)}</div>
        <div class="bloque-lema">${bopEscapeHtml(s.lema)}</div>
      </div>
      <div class="bloque-kpis">${kpis.join('') || '<span class="bloque-familia">Sin publicaciones todavía</span>'}</div>
      <div class="bloque-acciones"><a class="btn btn-mini btn-outline" href="normativa.html?seccion=${s.id}">Consultar la sección →</a></div>
    </div>`;
}

/* Selects auxiliares */
function bolpSeccionOptionsHtml(conTodo) {
  const opts = BOLP_SECCIONES.map((s) => `<option value="${s.id}">${s.numero}. ${bopEscapeHtml(s.titulo)}</option>`).join('');
  return (conTodo ? '<option value="">Todas las secciones</option>' : '') + opts;
}

function bolpFamiliaOptionsHtml(seccionId) {
  const s = bolpSeccionPorId(seccionId);
  if (!s) return '<option value="">Todas las familias</option>';
  return '<option value="">Todas las familias</option>' + s.familias.map((f) => `<option value="${f.id}">${bopEscapeHtml(f.nombre)}</option>`).join('');
}

/* Referencia de autoría para el pie de documento (censurada). */
function bolpFirmaDocumento(d) {
  const a = d.autor_nombre || d.autor_dip ? bolpAutorLegible(d.autor_nombre, d.autor_dip) : '';
  return a;
}

window.bolpFirmaDocumento = bolpFirmaDocumento;

/* Namespace de utilidades para páginas inline. */
window.BOLP = {
  secciones: BOLP_SECCIONES,
  departamentos: BOLP_DEPARTAMENTOS,
  seccion: bolpSeccionPorId,
  departamento: bolpDepartamentoPorId,
  clasificar: bolpClasificar,
  nombreFamilia: bolpNombreFamilia,
  estado: bolpEstado,
  fechaPublicacion: bolpFechaPublicacion,
  fechaVigor: bolpFechaVigor,
  cifras: bolpCifras,
  diffsolo: bolpSoloCambios,
  verVersion: bolpVerVersion
};
