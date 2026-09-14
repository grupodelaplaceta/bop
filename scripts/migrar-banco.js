#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOP — Publicación de los documentos legales de Banco de La Placeta
   BCO-PRV-001 · BCO-TYC-001 · BCO-PZM-001

   Lee el contenido desde bop/documentos/*.md (fuente canónica) y hace
   upsert en la tabla bop_documentos + bop_versiones de Supabase.

   Ejecutar:  SUPABASE_SERVICE_KEY=... node scripts/migrar-banco.js
   ═══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
// Sin clave NO se publica (fail-closed): la clave de servicio nunca debe
// estar embebida en el repositorio.
const KEY = process.env.SUPABASE_SERVICE_KEY || '';
if (!KEY) {
  console.error('✗ Falta SUPABASE_SERVICE_KEY en el entorno. Publicación cancelada.');
  process.exit(1);
}

const AUTOR = { dip: '23749931M', nombre: 'Mikel Alegre Marcos' };
const FECHA = '2026-09-14';
const DOCS_DIR = path.join(__dirname, '..', 'documentos');

const DOCUMENTOS = [
  {
    codigo: 'BCO-PRV-001',
    titulo: 'Política de Privacidad — Banco de La Placeta',
    tipo: 'cni',
    categoria: 'sistema',
    estado: 'vigente',
    version: 1,
    fecha_aplicacion: FECHA,
    fecha_aprobacion_junta: FECHA,
    aprobada_en_junta: true,
    notas_cambio: 'Publicación inicial de la Política de Privacidad de Banco de La Placeta.',
    archivo: 'banco-politica-de-privacidad.md'
  },
  {
    codigo: 'BCO-TYC-001',
    titulo: 'Términos y Condiciones — Banco de La Placeta',
    tipo: 'cni',
    categoria: 'sistema',
    estado: 'vigente',
    version: 1,
    fecha_aplicacion: FECHA,
    fecha_aprobacion_junta: FECHA,
    aprobada_en_junta: true,
    notas_cambio: 'Publicación inicial de los Términos y Condiciones de Banco de La Placeta.',
    archivo: 'banco-terminos-y-condiciones.md'
  },
  {
    codigo: 'BCO-PZM-001',
    titulo: 'Términos de Uso — PlaceZUM',
    tipo: 'cni',
    categoria: 'sistema',
    estado: 'vigente',
    version: 1,
    fecha_aplicacion: FECHA,
    fecha_aprobacion_junta: FECHA,
    aprobada_en_junta: true,
    notas_cambio: 'Publicación inicial de los Términos de Uso de PlaceZUM (servicio de envío de Placetas en un zum).',
    archivo: 'banco-placezum-terminos-de-uso.md'
  }
];

function rest(pathname, opts = {}) {
  return new Promise((resolve, reject) => {
    const body = opts.body ? JSON.stringify(opts.body) : null;
    const u = new URL(SUPABASE_URL + pathname);
    const req = https.request(u, {
      method: opts.method || 'GET',
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
        ...(opts.headers || {}),
        ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {})
      }
    }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        let json = null;
        try { json = d ? JSON.parse(d) : null; } catch { json = d; }
        resolve({ status: res.statusCode, data: json });
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function main() {
  let ok = 0;
  let errs = 0;

  for (const doc of DOCUMENTOS) {
    const fp = path.join(DOCS_DIR, doc.archivo);
    if (!fs.existsSync(fp)) { console.error('✗ falta archivo', doc.archivo); errs++; continue; }
    const contenido_md = fs.readFileSync(fp, 'utf8');

    const row = {
      codigo: doc.codigo,
      titulo: doc.titulo,
      tipo: doc.tipo,
      categoria: doc.categoria,
      estado: doc.estado,
      contenido_md,
      version: doc.version,
      fecha_aplicacion: doc.fecha_aplicacion,
      fecha_propuesta: doc.fecha_aplicacion,
      fecha_aprobacion_junta: doc.fecha_aprobacion_junta,
      aprobada_en_junta: doc.aprobada_en_junta,
      cnic_refs: [],
      autor_dip: AUTOR.dip,
      autor_nombre: AUTOR.nombre,
      notas_cambio: doc.notas_cambio
    };

    const { data: existente } = await rest(`/rest/v1/bop_documentos?codigo=eq.${encodeURIComponent(doc.codigo)}&select=id`);
    let docId = existente?.[0]?.id || null;

    let r;
    if (docId) {
      r = await rest(`/rest/v1/bop_documentos?id=eq.${docId}`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: row });
    } else {
      r = await rest('/rest/v1/bop_documentos', { method: 'POST', headers: { Prefer: 'return=representation' }, body: row });
    }
    if (r.status >= 400) { console.error('✗ doc', doc.codigo, r.status, JSON.stringify(r.data)); errs++; continue; }
    docId = (Array.isArray(r.data) ? r.data[0] : r.data)?.id || docId;

    const { data: verExist } = await rest(`/rest/v1/bop_versiones?documento_id=eq.${docId}&version=eq.1&select=id`);
    const verId = verExist?.[0]?.id || null;
    const verBody = {
      documento_id: docId,
      version: 1,
      estado: doc.estado,
      contenido_md,
      autor_dip: AUTOR.dip,
      autor_nombre: AUTOR.nombre,
      notas_cambio: 'Publicación inicial de los documentos legales de Banco de La Placeta.',
      fecha_propuesta: doc.fecha_aplicacion,
      fecha_aprobacion_junta: doc.fecha_aprobacion_junta,
      aprobada_en_junta: doc.aprobada_en_junta
    };
    const v = verId
      ? await rest(`/rest/v1/bop_versiones?id=eq.${verId}`, { method: 'PATCH', body: verBody })
      : await rest('/rest/v1/bop_versiones', { method: 'POST', body: verBody });
    if (v.status >= 400) { console.error('✗ versión', doc.codigo, v.status, JSON.stringify(v.data)); errs++; continue; }

    console.log(`✅ ${doc.codigo} — ${doc.titulo} (${contenido_md.length} chars)`);
    ok++;
  }

  console.log(`Migración Banco completada: ${ok} publicados, ${errs} errores.`);
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
