/* ═══════════════════════════════════════════════════════════════════════
   BOP — Lógica principal del cliente
   Lee los documentos desde Supabase (RSP) si está disponible; si no, usa
   los datos migrados del CNI antiguo (datos-migrados.js).
   ═══════════════════════════════════════════════════════════════════════ */

// Configuración Supabase (RSP). En producción usar las variables de entorno
// inyectadas en el build; el anon key permite solo lectura pública.
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

const BOP = {
  // Cache en memoria
  _docs: null,
  _cnic: null,
  _usandoSupabase: false,

  /** Estado de la BD: true si lee de Supabase, false si usa datos migrados. */
  async init() {
    if (BOP_SUPABASE) {
      try {
        const { data, error } = await BOP_SUPABASE.from('bop_documentos').select('*').limit(500);
        if (!error && data && data.length > 0) {
          this._docs = data;
          const { data: cnicData, error: cnicErr } = await BOP_SUPABASE.from('bop_cnic').select('*').limit(500);
          this._cnic = (!cnicErr && cnicData) ? cnicData : [];
          this._usandoSupabase = true;
          return;
        }
      } catch (e) { /* fallback a migrados */ }
    }
    // Fallback: datos migrados del CNI antiguo
    const m = window.BOP_MIGRADOS || { estatutos: [], cni: [], cnic: [] };
    // Normalizar tipo: los documentos de cada lista se etiquetan con su tipo
    // (por si los datos migrados no lo incluyen explícitamente).
    this._docs = [
      ...(m.estatutos || []).map(d => ({ ...d, tipo: d.tipo || 'estatuto' })),
      ...(m.cni || []).map(d => ({ ...d, tipo: d.tipo || 'cni' }))
    ];
    this._cnic = m.cnic || [];
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
    return (this._cnic || []).find(c => c.codigo === String(codigo).toUpperCase()) || null;
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

async function renderInicio() {
  await BOP.init();
  const est = BOP.getEstatutos();
  const cni = BOP.getCni();
  const cnic = BOP.getCnic();

  document.getElementById('chip-estatutos').textContent = est.length;
  document.getElementById('chip-cni').textContent = cni.length;
  document.getElementById('chip-cnic').textContent = cnic.length;

  document.getElementById('lista-estatutos').innerHTML =
    est.length ? est.map(cardDocumento).join('') : '<div class="aviso aviso-info">No hay estatutos publicados.</div>';
  document.getElementById('lista-cni').innerHTML =
    cni.length ? cni.map(cardDocumento).join('') : '<div class="aviso aviso-info">No hay capítulos del CNI publicados.</div>';
  document.getElementById('lista-cnic').innerHTML =
    cnic.length ? cnic.map(cardCnic).join('') : '<div class="aviso aviso-info">No hay CNIC publicados.</div>';
}

// Cargar al iniciar (solo si es la página de inicio con los elementos)
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('chip-estatutos')) renderInicio();
});
