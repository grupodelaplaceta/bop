/* ═══════════════════════════════════════════════════════════════════════
   BOP — Lógica principal del cliente
   Lee los documentos desde Supabase (RSP) si está disponible; si no, usa
   los datos migrados del CNI antiguo (datos-migrados.js).
   ═══════════════════════════════════════════════════════════════════════ */

// Configuración Supabase (RSP). En producción usar las variables de entorno
// inyectadas en el build; el anon key permite solo lectura pública.
// La API canónica vive en BOP. BOP_API_URL se conserva para instalaciones
// que todavía usan un gateway durante la migración.
const BOP_API = (window.BOP_API_URL || '').replace(/\/+$/, '');
const BOP_CONFIG = {
  supabaseUrl: window.BOP_SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co',
  supabaseKey: window.BOP_SUPABASE_KEY || ''
};

let BOP_SUPABASE = null;
if (BOP_CONFIG.supabaseKey && window.supabase) {
  try {
    BOP_SUPABASE = window.supabase.createClient(BOP_CONFIG.supabaseUrl, BOP_CONFIG.supabaseKey);
  } catch (e) { BOP_SUPABASE = null; }
}

/* Fusiona los CNIC con su ficha corregida/estructurada (cnic-datos.js). */
function bopCnicFinal(base) {
  const datos = (typeof window !== 'undefined' && window.BOP_CNIC_DATOS) || {};
  return (base || []).map((c) => {
    const fix = datos[c.codigo] || datos[c.cnic] || null;
    return fix ? Object.assign({}, c, fix) : c;
  });
}

/* Registro completo para modo offline: solo el espejo canónico (68), con los
   metadatos de los datos migrados si coinciden (evita duplicar códigos). */
function bopCnicObtener(base) {
  const datos = (typeof window !== 'undefined' && window.BOP_CNIC_DATOS) || {};
  const claves = Object.keys(datos);
  if (!claves.length) return base || [];
  const lista = (base || []);
  const mapa = {};
  claves.forEach((k) => {
    const b = lista.find((c) => (c.codigo || c.cnic) === k) || {};
    mapa[k] = Object.assign({}, b, datos[k]);
  });
  return Object.values(mapa);
}

const BOP = {
  // Cache en memoria
  _docs: null,
  _cnic: null,
  _usandoSupabase: false,

  normalizarDocumento(d) {
    return {
      ...d,
      contenido_md: d.contenido_md ?? d.contenidoMd ?? '',
      cnic_refs: d.cnic_refs ?? d.cnicRefs ?? [],
      fecha_aplicacion: d.fecha_aplicacion ?? d.fechaAplicacion ?? '',
      fecha_propuesta: d.fecha_propuesta ?? d.fechaPropuesta ?? '',
      fecha_aprobacion_junta: d.fecha_aprobacion_junta ?? d.fechaAprobacionJunta ?? '',
      aprobada_en_junta: d.aprobada_en_junta ?? d.aprobadaEnJunta ?? false,
    };
  },

  /**
   * Carga los datos SIEMPRE en vivo desde la API del RSP (lectura pública),
   * para que los documentos y CNIC creados/editados aparezcan de inmediato.
   * Si la API no responde, cae a Supabase directo (si hay clave) y por último
   * a los datos migrados estáticos.
   */
  async init() {
    // 1) Fuente principal: API del RSP (siempre actualizada)
    try {
      const [rDocs, rCnic] = await Promise.all([
        fetch(BOP_API + '/api/normativa'),
        fetch(BOP_API + '/api/cnic')
      ]);
      if (rDocs.ok && rCnic.ok) {
        const docsPayload = await rDocs.json();
        const cnicPayload = await rCnic.json();
        const docs = Array.isArray(docsPayload) ? docsPayload : docsPayload.documentos;
        const cnic = Array.isArray(cnicPayload) ? cnicPayload : cnicPayload.cnic;
        if (Array.isArray(docs) && Array.isArray(cnic)) {
          this._docs = docs.map(d => this.normalizarDocumento(d));
          this._cnic = bopCnicFinal(cnic.map(c => ({ ...c, codigo: c.codigo || c.cnic, valor: c.valor ?? c.valor_vigente })));
          this._usandoSupabase = true;
          return;
        }
      }
    } catch (e) { /* continua a las alternativas */ }

    // 2) Supabase directo (si hay clave anónima inyectada)
    if (BOP_SUPABASE) {
      try {
        const { data, error } = await BOP_SUPABASE.from('bop_documentos').select('*').limit(500);
        if (!error && data && data.length > 0) {
          this._docs = data.map(d => this.normalizarDocumento(d));
          const { data: cnicData, error: cnicErr } = await BOP_SUPABASE.from('bop_cnic').select('*').limit(500);
          this._cnic = bopCnicFinal((!cnicErr && cnicData) ? cnicData : []);
          this._usandoSupabase = true;
          return;
        }
      } catch (e) { /* fallback a migrados */ }
    }
    // 3) Fallback: datos migrados del CNI antiguo
    const m = window.BOP_MIGRADOS || { estatutos: [], cni: [], cnic: [] };
    // Normalizar tipo: los documentos de cada lista se etiquetan con su tipo
    // (por si los datos migrados no lo incluyen explícitamente).
    this._docs = [
      ...(m.estatutos || []).map(d => this.normalizarDocumento({ ...d, tipo: d.tipo || 'estatuto' })),
      ...(m.cni || []).map(d => this.normalizarDocumento({ ...d, tipo: d.tipo || 'cni' })),
      ...(m.junior || []).map(d => this.normalizarDocumento({ ...d, tipo: d.tipo || 'cni' })),
      ...(m.placetaid || []).map(d => this.normalizarDocumento({ ...d, tipo: d.tipo || 'cni' }))
    ];
    this._cnic = bopCnicObtener(m.cnic || []);
    this._usandoSupabase = false;
  },

  usandoSupabase() { return this._usandoSupabase; },

  getEstatutos() { return (this._docs || []).filter(d => d.tipo === 'estatuto'); },
  getCni() { return (this._docs || []).filter(d => d.tipo === 'cni'); },
  getCnic() { return this._cnic || []; },

  getDocumento(codigo) {
    return (this._docs || []).find(d => d.codigo === String(codigo).toUpperCase()) || null;
  },

  getCnicPorCodigo(codigo) {
    const q = String(codigo || '').toUpperCase();
    const directo = (this._cnic || []).find(c => c.codigo === q) || null;
    if (directo) return directo;
    // Alias histórico de un solo valor (p. ej. {{CNIC-4.4}} → CNIC-IVA).
    const res = (typeof window !== 'undefined' && window.bopCnicAliasResolver) ? window.bopCnicAliasResolver(q) : null;
    if (res && res.tipo === 'unico') {
      return (this._cnic || []).find(c => c.codigo === res.canonico) || null;
    }
    return null;
  },

  buscar(termino) {
    const q = String(termino || '').toLowerCase().trim();
    if (!q) return { docs: this._docs || [], cnic: this._cnic || [] };
    const docs = (this._docs || []).filter(d =>
      (d.titulo || '').toLowerCase().includes(q) ||
      (d.codigo || '').toLowerCase().includes(q) ||
      (d.contenido_md || '').toLowerCase().includes(q)
    );
    const cnic = (this._cnic || []).filter(c =>
      (c.etiqueta || '').toLowerCase().includes(q) ||
      (c.codigo || '').toLowerCase().includes(q) ||
      (c.descripcion || '').toLowerCase().includes(q)
    );
    return { docs, cnic };
  }
};

// Resolver para etiquetas inline {{CNIC-XXXX}} (lo usa bopRenderMarkdown)
window.BOP_RESOLVER_CNIC = (codigo) => {
  const c = BOP.getCnicPorCodigo(codigo);
  if (!c) return null;
  if (c.resumen) return { valor: c.resumen, unidad: '', etiqueta: c.etiqueta };
  return { valor: c.valor, unidad: c.unidad, etiqueta: c.etiqueta };
};

// ── Renderizado ─────────────────────────────────────────────────────────

function escapar(html) {
  return String(html == null ? '' : html)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function badgeEstado(estado) {
  const map = {
    vigente: 'badge-vigente', derogado: 'badge-derogado',
    proyecto: 'badge-proyecto', enmienda: 'badge-enmienda'
  };
  return `<span class="badge ${map[estado] || 'badge-proyecto'}">${escapar(estado || 'proyecto')}</span>`;
}

function badgeTipo(tipo) {
  const map = { estatuto: 'badge-estatuto', cni: 'badge-cni', cnic: 'badge-cnic' };
  return `<span class="badge ${map[tipo] || 'badge-cni'}">${escapar((tipo || 'cni').toUpperCase())}</span>`;
}

function fechaLegible(fecha) {
  if (!fecha) return '—';
  try { return new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return fecha; }
}

function cardDocumento(d) {
  // Preview: texto plano (sin símbolos markdown) o HTML renderizado para tablas
  const preview = bopPlano(d.contenido_md, 200);
  return `
    <div class="card">
      <a href="documento.html?codigo=${encodeURIComponent(d.codigo)}" style="text-decoration:none;color:inherit;display:block">
        <span class="codigo">${escapar(d.codigo)}</span> ${badgeTipo(d.tipo)} ${badgeEstado(d.estado)}
        <h3 style="margin-top:4px">${escapar(d.titulo)}</h3>
        <div class="meta">
          ${d.fecha_aprobacion_junta ? 'Aprobada en Junta: ' + fechaLegible(d.fecha_aprobacion_junta) : 'Aplicación: ' + fechaLegible(d.fecha_aplicacion)}
          ${d.version ? ' · v' + d.version : ''}
        </div>
        <div class="desc">${escapar(preview)}</div>
      </a>
    </div>`;
}

function cardCnic(c) {
  return `
    <div class="card">
      <a href="cnic.html?codigo=${encodeURIComponent(c.codigo)}" style="text-decoration:none;color:inherit;display:block">
        <span class="codigo">${escapar(c.codigo)}</span> ${badgeEstado(c.vigente === false ? 'derogado' : 'vigente')}
        <h3 style="margin-top:4px">${escapar(c.etiqueta)}</h3>
        <div class="meta">${escapar(c.articulo || '')} · ${escapar(c.tipo_valor || 'texto')}</div>
        <div class="desc"><strong>${escapar(c.valor)}</strong> ${escapar(c.unidad || '')}</div>
      </a>
    </div>`;
}

/** Renderiza los CNIC como TABLA de datos (código, etiqueta, valor, unidad, artículo, estado). */
function tablaCnicHtml(lista) {
  if (!lista || !lista.length) return '<div class="aviso aviso-info">No hay CNIC.</div>';
  return `<div style="overflow-x:auto"><table class="tabla">
    <thead><tr><th>Código</th><th>Etiqueta</th><th>Valor</th><th>Unidad</th><th>Artículo (CNI)</th><th>Estado</th></tr></thead>
    <tbody>${lista.map(c => `
      <tr>
        <td><a href="cnic.html?codigo=${encodeURIComponent(c.codigo)}"><b>${escapar(c.codigo)}</b></a></td>
        <td>${escapar(c.etiqueta)}</td>
        <td class="cnic-valor"><strong>${escapar(c.valor)}</strong></td>
        <td>${escapar(c.unidad || '')}</td>
        <td>${escapar(c.articulo || '—')}</td>
        <td><span class="estado-texto">${c.vigente === false ? 'Derogado' : 'Vigente'}</span></td>
      </tr>`).join('')}</tbody></table></div>`;
}

async function renderInicio() {
  await BOP.init();
  const est = BOP.getEstatutos();
  const cni = BOP.getCni();
  const cnic = BOP.getCnic();
  const docs = [...est, ...cni];

  document.getElementById('chip-estatutos').textContent = est.length;
  document.getElementById('chip-cni').textContent = cni.length;
  document.getElementById('chip-cnic').textContent = cnic.length;

  // ── NOVEDADES: recién actualizado + nuevos datos ────────────────────
  const fech = (x) => x.updated_at || x.created_at || '';
  const recientes = docs.slice().sort((a, b) => String(fech(b)).localeCompare(String(fech(a)))).slice(0, 6);
  const cnicNuevos = cnic.slice().sort((a, b) => String(fech(b)).localeCompare(String(fech(a)))).slice(0, 6);
  const elNovedades = document.getElementById('lista-novedades');
  if (elNovedades) {
    const recientesHtml = recientes.map(d => `
      <div class="card novedad-card">
        <a href="documento.html?codigo=${encodeURIComponent(d.codigo)}" style="text-decoration:none;color:inherit;display:block">
          <span class="codigo">${escapar(d.codigo)}</span> ${badgeTipo(d.tipo)} ${badgeEstado(d.estado)}
          <span class="badge badge-nuevo">Recién actualizado · v${d.version || 1}</span>
          <h3 style="margin-top:4px">${escapar(d.titulo)}</h3>
          <div class="meta">${fechaLegible(fech(d))}</div>
        </a>
      </div>`).join('') || '<div class="aviso aviso-info">Sin novedades.</div>';
    const nuevosHtml = cnicNuevos.map(c => `
      <div class="card novedad-card">
        <a href="cnic.html?codigo=${encodeURIComponent(c.codigo)}" style="text-decoration:none;color:inherit;display:block">
          <span class="codigo">${escapar(c.codigo)}</span> <span class="badge badge-nuevo">Nuevo dato</span>
          <h3 style="margin-top:4px">${escapar(c.etiqueta)}</h3>
          <div class="meta"><strong>${escapar(c.valor)} ${escapar(c.unidad || '')}</strong> · ${escapar(c.articulo || '—')}</div>
        </a>
      </div>`).join('') || '<div class="aviso aviso-info">Sin nuevos datos.</div>';
    elNovedades.className = '';
    elNovedades.innerHTML = `
      <div class="grid-novedades">
        <div>
          <div class="seccion-titulo">🆕 Recién actualizado</div>
          <div class="grid-3">${recientesHtml}</div>
        </div>
        <div>
          <div class="seccion-titulo">🧩 Nuevos datos (CNIC)</div>
          <div class="grid-3">${nuevosHtml}</div>
        </div>
      </div>`;
  }

  document.getElementById('lista-estatutos').innerHTML =
    est.length ? est.map(cardDocumento).join('') : '<div class="aviso aviso-info">No hay estatutos publicados.</div>';
  document.getElementById('lista-cni').innerHTML =
    cni.length ? cni.map(cardDocumento).join('') : '<div class="aviso aviso-info">No hay capítulos del CNI publicados.</div>';
  document.getElementById('lista-cnic').innerHTML =
    cnic.length ? tablaCnicHtml(cnic) : '<div class="aviso aviso-info">No hay CNIC publicados.</div>';
}

// Cargar al iniciar (solo si es la página de inicio con los elementos)
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('chip-estatutos')) renderInicio();
});
