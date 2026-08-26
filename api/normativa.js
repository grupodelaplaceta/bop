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

function docs() {
  return [
    ...(Array.isArray(BOP_MIGRADOS && BOP_MIGRADOS.cni) ? BOP_MIGRADOS.cni : []),
    ...(Array.isArray(BOP_MIGRADOS && BOP_MIGRADOS.junior) ? BOP_MIGRADOS.junior : []),
  ];
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
    fecha_aprobacion_junta: d.fecha_aprobacion_junta || '',
    autor_dip: d.autor_dip || '',
    autor_nombre: d.autor_nombre || '',
    referencia_bop: `https://bop.laplaceta.org/documento?codigo=${encodeURIComponent(d.codigo)}`,
  };
}

module.exports = (req, res) => {
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
    const todas = docs();

    if (codigo) {
      const found = todas.find((d) => String(d.codigo || '').toUpperCase() === codigo);
      if (!found) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'norma_no_encontrada', codigo }));
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ...resumen(found), contenido_md: found.contenido_md || '' }));
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
