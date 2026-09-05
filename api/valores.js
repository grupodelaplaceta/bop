// ═══════════════════════════════════════════════════════════════════════
// API «Valores oficiales» — para webs de organizaciones de La Placeta
// -----------------------------------------------------------------------
//   GET /api/valores?refs=CNIC-IVA,CNIC-SMI-MENSUAL
//       → devuelve SOLO los valores pedidos, en formato fácil de consumir
//         (valor tipado + número + resumen legible + referencia).
//   GET /api/valores?grupo=CNIC-4.5          → expande un agregado antiguo.
//   GET /api/valores?refs=…&revision=AAAA-MM-DD
//       → si la revisión pedida ya no es la vigente, responde 409 para que
//         la web externa no use valores obsoletos.
//
//   Acepta códigos canónicos y alias históricos de un solo valor
//   (CNIC-4.4 → CNIC-IVA). Los códigos que no se puedan resolver aparecen
//   en «no_encontrados» con su motivo. CORS restringido a laplaceta.org.
// ═══════════════════════════════════════════════════════════════════════

const { aplicarCors, deny } = require('./_cors.js');
const { BOP_CNIC_ALIAS } = require('../public/js/cnic-alias.js');
const { BOP_CNIC_DATOS } = require('../public/js/cnic-datos.js');

// Supabase se usa si hay credenciales; si no (o si falla), el espejo
// canónico local (68 valores) garantiza que el servicio nunca quede vacío.
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

async function cargarCanonicos() {
  if (!supabase) return ESPEJO;
  try {
    const { data, error } = await supabase.from('bop_cnic').select('*').eq('vigente', true).order('codigo');
    if (!error && Array.isArray(data) && data.length) return data;
  } catch (e) { /* usa el espejo */ }
  return ESPEJO;
}

function numeroDe(c) {
  const tipo = c.tipo_valor || 'texto';
  if (tipo === 'texto') return null;
  const v = String(c.valor ?? '').trim();
  if (!v) return null;
  const n = Number(v.replace(',', '.').replace(/[^\d.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function formatoResumen(c) {
  const tipo = c.tipo_valor || 'texto';
  const u = String(c.unidad || '').trim();
  const v = String(c.valor ?? '').trim();
  if (!v) return '—';
  if (tipo === 'porcentaje') {
    const n = Number(v);
    return (Number.isFinite(n) ? n.toLocaleString('es-ES') : v) + ' %';
  }
  if (tipo === 'placeta' || tipo === 'entero') {
    const n = Number(v);
    const base = Number.isFinite(n) ? n.toLocaleString('es-ES') : v;
    return u && u !== 'Pz' ? base + ' ' + u : (u ? base + ' ' + u : base);
  }
  return u ? v + ' ' + u : v;
}

function serializar(c, solicitado) {
  const codigo = c.codigo || c.cnic;
  return {
    codigo,
    canonico: codigo,
    solicitado: solicitado || null,
    etiqueta: c.etiqueta,
    descripcion: c.descripcion || '',
    tipo: c.tipo_valor || 'texto',
    valor: String(c.valor ?? ''),
    numero: numeroDe(c),
    unidad: c.unidad || '',
    resumen: c.resumen || formatoResumen(c),
    articulo: c.articulo || '',
    vigente: c.vigente !== false,
    referencia: 'https://bop.laplaceta.org/cnic?codigo=' + encodeURIComponent(codigo)
  };
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

function resolverRef(ref, catalogo) {
  const byCode = (code) => catalogo.find((x) => (x.codigo || x.cnic) === code) || null;
  const directo = byCode(ref);
  if (directo) return { ok: true, canonico: ref, c: directo, alias: null };
  const alias = BOP_CNIC_ALIAS[ref];
  if (alias) {
    if (alias.tipo === 'unico') {
      const c = byCode(alias.canonico);
      if (c) return { ok: true, canonico: alias.canonico, c, alias: ref };
      return { ok: false, motivo: 'canonico_faltante', sustitutos: [alias.canonico] };
    }
    if (alias.tipo === 'grupo') return { ok: false, motivo: 'legacy_agrupado', sustitutos: alias.grupo };
    if (alias.tipo === 'pendiente') return { ok: false, motivo: 'pendiente', sustitutos: [] };
  }
  return { ok: false, motivo: 'no_existe', sustitutos: [] };
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
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
    res.end(JSON.stringify(obj));
  };

  try {
    const url = new URL(req.url, 'https://bop.laplaceta.org');
    const pedidoRevision = (url.searchParams.get('revision') || '').trim();
    const todo = url.searchParams.get('todo') === '1';
    const grupo = (url.searchParams.get('grupo') || '').trim().toUpperCase();
    let refs = (url.searchParams.get('refs') || '')
      .split(',').map((s) => s.trim().toUpperCase()).filter(Boolean);

    // Un «grupo» expande su agregado en sus códigos canónicos.
    if (grupo) {
      const alias = BOP_CNIC_ALIAS[grupo];
      if (!alias) return send(400, { error: 'grupo_no_existe', grupo });
      if (alias.tipo === 'unico') refs.push(alias.canonico);
      else if (alias.tipo === 'grupo') refs = refs.concat(alias.grupo);
      else return send(200, {
        servicio: 'bop.valores', grupo, revision: null, total: 0, encontrados: 0,
        no_encontrados: [{ solicitud: grupo, motivo: 'pendiente', sustitutos: [] }],
        valores: {}, aviso: alias.aviso || alias.etiqueta
      });
    }

    const refsUnicos = Array.from(new Set(refs));
    if (!todo && !refsUnicos.length) return send(400, {
      error: 'refs_requeridas',
      ejemplo: '/api/valores?refs=CNIC-IVA,CNIC-SMI-MENSUAL  ·  /api/valores?todo=1'
    });

    const catalogo = await cargarCanonicos();
    const revision = revisionDe(catalogo);
    if (pedidoRevision && pedidoRevision !== revision) {
      return send(409, {
        error: 'revision_desactualizada',
        solicitada: pedidoRevision,
        actual: revision,
        detalle: 'Los valores han cambiado. Recarga la versión oficial antes de seguir usando esta página.'
      });
    }

    // todo=1 → todo el catálogo canónico vigente, en el mismo formato tipado
    // (lo usa el BFF del RSP como fuente única de valores para cálculos).
    if (todo) {
      const valores = {};
      catalogo.forEach((c) => { valores[c.codigo || c.cnic] = serializar(c, null); });
      return send(200, {
        servicio: 'bop.valores',
        organizacion: 'La Placeta',
        revision,
        docs: 'https://bop.laplaceta.org/cnic',
        total: catalogo.length,
        encontrados: catalogo.length,
        no_encontrados: [],
        valores
      });
    }

    const valores = {};
    const noEncontrados = [];
    const encontradas = new Set();

    refsUnicos.forEach((ref) => {
      const r = resolverRef(ref, catalogo);
      if (r.ok) {
        encontradas.add(r.canonico);
        valores[r.canonico] = serializar(r.c, r.alias || null);
        // El alias histórico también queda accesible por su código antiguo.
        if (r.alias) valores[r.alias] = { ...valores[r.canonico], solicitado: r.alias, alias_de: r.canonico };
      } else {
        noEncontrados.push({ solicitud: ref, motivo: r.motivo, sustitutos: r.sustitutos });
      }
    });

    send(200, {
      servicio: 'bop.valores',
      organizacion: 'La Placeta',
      revision,
      docs: 'https://bop.laplaceta.org/cnic',
      total: refsUnicos.length,
      encontrados: encontradas.size,
      no_encontrados: noEncontrados,
      valores
    });
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'internal_error', detail: e.message }));
  }
};
