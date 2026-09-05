// ═══════════════════════════════════════════════════════════════════════
// CORS del servicio API del BOP
// -----------------------------------------------------------------------
// El consumo desde navegador queda limitado a laplaceta.org y sus
// subdominios (la web de BOP y las webs de las organizaciones del Grupo).
// Las peticiones sin origen (curl, servidores) no se bloquean.
// Para ampliar dominios autorizados en el futuro, tocar PERMITIDOS o usar
// la variable de entorno BOP_CORS_EXTRA (regex separadas por comas).
// ═══════════════════════════════════════════════════════════════════════

const PERMITIDOS = /(^|\.)laplaceta\.org$/i;

function origenPermitido(origin) {
  if (!origin) return true; // sin navegador (curl, server-to-server)
  try {
    const host = new URL(origin).hostname;
    if (PERMITIDOS.test(host)) return true;
    const extra = process.env.BOP_CORS_EXTRA || '';
    return extra.split(',').map((s) => s.trim()).filter(Boolean)
      .some((rx) => { try { return new RegExp(rx, 'i').test(host); } catch (e) { return false; } });
  } catch (e) { return false; }
}

function aplicarCors(req, res) {
  const origin = req.headers.origin;
  if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return true;
  }
  if (origenPermitido(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
    return true;
  }
  return false;
}

function deny(res) {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    error: 'origen_no_permitido',
    detalle: 'Acceso restringido a laplaceta.org y sus subdominios.'
  }));
}

module.exports = { origenPermitido, aplicarCors, deny };
