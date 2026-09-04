// ═══════════════════════════════════════════════════════════════════════
// API Normativa — BOP (fuente única de los textos normativos)
// ─────────────────────────────────────────────────────────────────────────
// GET /api/normativa                   → listado de documentos (CNI + docs legales)
// GET /api/normativa?codigo=CNI-I      → un documento completo (contenido_md)
// GET /api/normativa?codigo=PJ-TYC-001 → términos y condiciones de Placeta Junior
//
// Se sirve desde la misma migración que alimenta la web
// (public/js/datos-migrados.js), de modo que webs y apps consumen los textos
// normativos desde BOP sin duplicarlos.
// ═══════════════════════════════════════════════════════════════════════

const { BOP_MIGRADOS } = require('../public/js/datos-migrados.js');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function docs() {
  return [
    ...(Array.isArray(BOP_MIGRADOS && BOP_MIGRADOS.cni) ? BOP_MIGRADOS.cni : []),
    ...(Array.isArray(BOP_MIGRADOS && BOP_MIGRADOS.junior) ? BOP_MIGRADOS.junior : []),
    ...(Array.isArray(BOP_MIGRADOS && BOP_MIGRADOS.placetaid) ? BOP_MIGRADOS.placetaid : []),
  ];
}

async function cargarDocumentos() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('bop_documentos').select('*').eq('estado', 'vigente').order('codigo');
    if (error || !Array.isArray(data) || data.length === 0) return null;
    return data.map((d) => ({
      ...d,
      contenido_md: d.contenido_md || '',
      fecha_aplicacion: d.fecha_aplicacion || '',
      fecha_aprobacion_junta: d.fecha_aprobacion_junta || '',
      autor_dip: d.autor_dip || '',
      cnic_refs: Array.isArray(d.cnic_refs) ? d.cnic_refs : [],
    }));
  } catch { return null; }
}

function resumen(d) {
  return {
    codigo: d.codigo,
    titulo: d.titulo,
    tipo: d.tipo || 'cni',
    categoria: d.categoria || '',
    estado: d.estado || 'vigente',
    version: d.version || 1,
    fecha_aplicacion: d.fecha_aplicacion || '',
    fecha_publicacion: d.fecha_publicacion || '',
    fecha_entrada_vigor: d.fecha_entrada_vigor || '',
    fecha_aprobacion_junta: d.fecha_aprobacion_junta || '',
    fecha_propuesta: d.fecha_propuesta || '',
    aprobada_en_junta: !!d.aprobada_en_junta,
    autor_dip: d.autor_dip || '',
    autor_nombre: d.autor_nombre || '',
    // Taxonomía BOLP (secciones I–VI). Puede venir de la BD o rellenarse
    // en el cliente a partir del código/tipo del documento.
    seccion: d.seccion || '',
    familia: d.familia || '',
    departamento: d.departamento || '',
    organo_responsable: d.organo_responsable || '',
    aprobacion_referencia: d.aprobacion_referencia || '',
    documento_anterior: d.documento_anterior || '',
    documento_posterior: d.documento_posterior || '',
    created_at: d.created_at || d.createdAt || '',
    updated_at: d.updated_at || d.updatedAt || d.fecha_aprobacion_junta || d.fecha_aplicacion || '',
    // La portada necesita una previsualización y documento.html necesita
    // poder pintar el contenido sin una segunda llamada incompatible.
    contenido_md: d.contenido_md || '',
    cnic_refs: Array.isArray(d.cnic_refs) ? d.cnic_refs : [],
    historial_versiones: Array.isArray(d.historial_versiones) ? d.historial_versiones : [],
    referencia_bop: `https://bop.laplaceta.org/documento?codigo=${encodeURIComponent(d.codigo)}`,
  };
}

/* Añade el historial completo de versiones (bop_versiones) a un documento. */
async function conHistorial(d) {
  const out = resumen(d);
  if (!supabase || !d || !d.id) return out;
  try {
    const { data, error } = await supabase
      .from('bop_versiones')
      .select('version, estado, contenido_md, autor_dip, autor_nombre, notas_cambio, fecha_propuesta, fecha_aprobacion_junta, aprobada_en_junta, creado_en')
      .eq('documento_id', d.id)
      .order('version', { ascending: true })
      .limit(200);
    if (!error && Array.isArray(data)) {
      out.historial_versiones = data.map((v) => ({ ...v, fecha_aplicacion: v.fecha_aprobacion_junta || v.fecha_propuesta || v.creado_en }));
    }
  } catch { /* sin historial */ }
  return out;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'method_not_allowed' }));
    return;
  }

  try {
    const url = new URL(req.url, 'https://bop.laplaceta.org');
    const codigo = (url.searchParams.get('codigo') || '').trim().toUpperCase();
    // La tabla compartida es la publicación hecha desde RSP. El fichero
    // migrado solo se usa como respaldo inicial si aún no hay datos.
    const todas = (await cargarDocumentos()) || docs();

    if (codigo) {
      const found = todas.find((d) => String(d.codigo || '').toUpperCase() === codigo);
      if (!found) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'norma_no_encontrada', codigo }));
        return;
      }
      const detalle = await conHistorial(found);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ...detalle, contenido_md: found.contenido_md || '' }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      total: todas.length,
      actualizado: '2026-08-10',
      documentos: todas.map(resumen),
    }));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'internal_error', detail: e.message }));
  }
};
