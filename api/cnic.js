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

const CNIC = Array.isArray(BOP_MIGRADOS && BOP_MIGRADOS.cnic) ? BOP_MIGRADOS.cnic : [];

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
}

function normalizar(c) {
  return {
    cnic: c.codigo,
    etiqueta: c.etiqueta,
    descripcion: c.descripcion,
    tipo: c.tipo_valor,
    valor_vigente: c.valor,
    unidad: c.unidad,
    norma: c.articulo,
    estado: c.vigente ? 'vigente' : 'derogado',
    referencia_bop: `https://bop.laplaceta.org/cnic?codigo=${encodeURIComponent(c.codigo)}`,
    historial: (c.historial || []).map((h) => ({
      valor: h.valor,
      desde: h.desde,
      notas: h.notas || null
    }))
  };
}

module.exports = (req, res) => {
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

    if (codigo) {
      const found = CNIC.find((c) => String(c.codigo || '').toUpperCase() === codigo);
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
      total: CNIC.length,
      actualizado: '2026-07-03',
      cnic: CNIC.map(normalizar)
    }));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'internal_error', detail: e.message }));
  }
};
