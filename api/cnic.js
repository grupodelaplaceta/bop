// ═══════════════════════════════════════════════════════════════════════
// API CNIC — BOP (fuente de verdad normativa)
// ─────────────────────────────────────────────────────────────────────────
// GET /api/cnic                  → listado completo de CNIC vigentes
// GET /api/cnic?codigo=CNIC-IVA  → un CNIC concreto
// GET /api/cnic?codigo=CNIC-4.4  → alias histórico (resuelve a CNIC-IVA)
//
// Los valores se sirven desde Supabase (bop_cnic) y, si no hay credenciales,
// desde el espejo canónico local (public/js/cnic-datos.js, 68 valores). Ya
// NO se sirven los códigos agregados antiguos del CNI-PDF como si fueran
// valores: esos códigos se resuelven como alias hacia los canónicos.
// CORS restringido a laplaceta.org y subdominios (ver api/_cors.js).
// ═══════════════════════════════════════════════════════════════════════

const { aplicarCors, deny } = require('./_cors.js');
const { BOP_CNIC_ALIAS } = require('../public/js/cnic-alias.js');
const { BOP_CNIC_DATOS } = require('../public/js/cnic-datos.js');

// Supabase opcional: el espejo canónico garantiza disponibilidad sin claves.
let supabase = null;
try {
  const { createClient } = require('@supabase/supabase-js');
  const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '';
  if (SUPABASE_KEY) supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (e) { supabase = null; }

const ESPEJO = Object.keys(BOP_CNIC_DATOS)
  .map((k) => ({ ...BOP_CNIC_DATOS[k], codigo: k, valor: String(BOP_CNIC_DATOS[k].valor ?? '') }))
  .sort((a, b) => a.codigo.localeCompare(b.codigo));

async function cargarCnic() {
  if (!supabase) return ESPEJO;
  try {
    const { data, error } = await supabase.from('bop_cnic').select('*').eq('vigente', true).order('codigo');
    if (!error && Array.isArray(data) && data.length) return data;
  } catch (e) { /* usa el espejo */ }
  return ESPEJO;
}

function revisionDe(lista) {
  let m = '';
  (lista || []).forEach((c) => {
    ['desde', 'updated_at', 'fecha_aprobacion_junta'].forEach((k) => {
      const d = c && c[k];
      if (d && String(d) > m) m = String(d);
    });
  });
  return (m || '2026-07-03').slice(0, 10);
}

function normalizar(c) {
  const codigo = c.codigo || c.cnic;
  return {
    cnic: codigo,
    // Campos de compatibilidad con el cliente BOP y consumidores antiguos.
    codigo,
    canonico: codigo,
    etiqueta: c.etiqueta,
    descripcion: c.descripcion,
    tipo: c.tipo_valor,
    tipo_valor: c.tipo_valor,
    valor_vigente: c.valor,
    valor: c.valor,
    numero: (() => {
      if ((c.tipo_valor || '') === 'texto') return null;
      const n = Number(String(c.valor ?? '').replace(',', '.').replace(/[^\d.\-]/g, ''));
      return Number.isFinite(n) ? n : null;
    })(),
    unidad: c.unidad,
    resumen: c.resumen || null,
    norma: c.articulo,
    articulo: c.articulo,
    vigente: Boolean(c.vigente),
    desde: c.desde || null,
    estado: c.vigente ? 'vigente' : 'derogado',
    referencia_bop: `https://bop.laplaceta.org/cnic?codigo=${encodeURIComponent(codigo)}`,
    historial: (c.historial || []).map((h) => ({
      valor: h.valor,
      desde: h.desde,
      notas: h.notas || null
    }))
  };
}

function resolverAlias(codigo, catalogo) {
  const byCode = (code) => catalogo.find((x) => (x.codigo || x.cnic) === code) || null;
  const directo = byCode(codigo);
  if (directo) return { tipo: 'unico', etiqueta: directo.etiqueta, canonico: codigo, c: directo };
  const alias = BOP_CNIC_ALIAS[codigo];
  if (!alias) return null;
  if (alias.tipo === 'unico') {
    const c = byCode(alias.canonico);
    return c ? { tipo: 'unico', etiqueta: alias.etiqueta, canonico: alias.canonico, c, aliasDe: codigo } : null;
  }
  if (alias.tipo === 'grupo') {
    return {
      tipo: 'grupo', etiqueta: alias.etiqueta, grupo: alias.grupo,
      sustitutos: alias.grupo.map(byCode).filter(Boolean).map(normalizar)
    };
  }
  return { tipo: 'pendiente', etiqueta: alias.etiqueta, aviso: alias.aviso || null };
}

module.exports = async (req, res) => {
  const permitido = aplicarCors(req, res);

  if (req.method === 'OPTIONS') {
    res.statusCode = permitido ? 204 : 403;
    res.end();
    return;
  }
  if (!permitido) { deny(res); return; }
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'method_not_allowed' }));
    return;
  }

  const send = (code, obj) => {
    res.statusCode = code;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    res.end(JSON.stringify(obj));
  };

  try {
    const url = new URL(req.url, 'https://bop.laplaceta.org');
    const codigo = (url.searchParams.get('codigo') || '').toUpperCase().trim();

    const catalogo = await cargarCnic();

    if (codigo) {
      const resuelto = resolverAlias(codigo, catalogo);
      if (!resuelto) return send(404, { error: 'cnic_no_encontrado', cnic: codigo });
      if (resuelto.tipo === 'unico') {
        const payload = normalizar(resuelto.c);
        if (resuelto.aliasDe) payload.alias_de = resuelto.aliasDe;
        return send(200, payload);
      }
      if (resuelto.tipo === 'grupo') {
        return send(200, {
          cnic: codigo, tipo: 'grupo', etiqueta: resuelto.etiqueta,
          detalle: 'Este código antiguo agrupa varios valores; usa los canónicos.',
          sustitutos: resuelto.sustitutos
        });
      }
      return send(200, {
        cnic: codigo, tipo: 'pendiente', etiqueta: resuelto.etiqueta,
        aviso: resuelto.aviso || 'Sin equivalente atómico publicado todavía.'
      });
    }

    send(200, {
      total: catalogo.length,
      revision: revisionDe(catalogo),
      actualizado: revisionDe(catalogo),
      origen: supabase ? 'supabase' : 'espejo',
      cnic: catalogo.map(normalizar)
    });
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'internal_error', detail: e.message }));
  }
};
