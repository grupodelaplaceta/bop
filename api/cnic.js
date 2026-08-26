// ═══════════════════════════════════════════════════════════════════════
// API CNIC — BOP (fuente de verdad normativa)
// ─────────────────────────────────────────────────────────────────────────
// GET /api/cnic                  → listado completo de CNIC vigentes
// GET /api/cnic?codigo=CNIC-4.4  → un CNIC concreto (valor vigente, norma…)
//
// Los valores se sirven desde la misma migración del CNI que alimenta la web
// (public/js/datos-migrados.js). Así no se duplica la fuente normativa.
// ═══════════════════════════════════════════════════════════════════════

const { BOP_MIGRADOS } = require('../public/js/datos-migrados.js');
const { createClient } = require('@supabase/supabase-js');

const CNIC = Array.isArray(BOP_MIGRADOS && BOP_MIGRADOS.cnic) ? BOP_MIGRADOS.cnic : [];
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

async function cargarCnic() {
  if (!supabase) return CNIC;
  try {
    const { data, error } = await supabase.from('bop_cnic').select('*').eq('vigente', true).order('codigo');
    return !error && Array.isArray(data) && data.length ? data : CNIC;
  } catch { return CNIC; }
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
}

function normalizar(c) {
  return {
    cnic: c.codigo,
    // Campos de compatibilidad con el cliente BOP y consumidores antiguos.
    codigo: c.codigo,
    etiqueta: c.etiqueta,
    descripcion: c.descripcion,
    tipo: c.tipo_valor,
    tipo_valor: c.tipo_valor,
    valor_vigente: c.valor,
    valor: c.valor,
    unidad: c.unidad,
    norma: c.articulo,
    articulo: c.articulo,
    vigente: Boolean(c.vigente),
    desde: c.desde || null,
    estado: c.vigente ? 'vigente' : 'derogado',
    referencia_bop: `https://bop.laplaceta.org/cnic?codigo=${encodeURIComponent(c.codigo)}`,
    historial: (c.historial || []).map((h) => ({
      valor: h.valor,
      desde: h.desde,
      notas: h.notas || null
    }))
  };
}

module.exports = async (req, res) => {
  cors(res);
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
    const codigo = (url.searchParams.get('codigo') || '').toUpperCase().trim();

    const catalogo = await cargarCnic();
    if (codigo) {
      const found = catalogo.find((c) => String(c.codigo || '').toUpperCase() === codigo);
      if (!found) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'cnic_no_encontrado', cnic: codigo }));
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(normalizar(found)));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      total: catalogo.length,
      actualizado: '2026-07-03',
      cnic: catalogo.map(normalizar)
    }));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'internal_error', detail: e.message }));
  }
};
