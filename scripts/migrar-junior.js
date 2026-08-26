#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOP — Publicación de los documentos legales de Placeta Junior
   PJ-TYC-001 · PJ-PRV-001 · PJ-CON-001  (los que firma el tutor en el alta)

   Lee el contenido desde bop/documentos/*.md (fuente canónica) y hace
   upsert en la tabla bop_documentos + bop_versiones de Supabase.

   Ejecutar:  node scripts/migrar-junior.js
   ═══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';
const KEY = process.env.SUPABASE_SERVICE_KEY || FALLBACK_KEY;

const AUTOR = { dip: '23749931M', nombre: 'Mikel Alegre Marcos' };
const FECHA = '2026-08-10';
const DOCS_DIR = path.join(__dirname, '..', 'documentos');

const DOCUMENTOS = [
  {
    codigo: 'PJ-TYC-001',
    titulo: 'Términos y Condiciones — Placeta Junior',
    tipo: 'cni',
    categoria: 'sistema',
    estado: 'vigente',
    version: 1,
    fecha_aplicacion: FECHA,
    fecha_aprobacion_junta: FECHA,
    aprobada_en_junta: true,
    notas_cambio: 'Publicación inicial de los Términos y Condiciones de Placeta Junior. Documento que el tutor legal debe leer y firmar en el alta de un menor.',
    archivo: 'placeta-junior-terminos-y-condiciones.md'
  },
  {
    codigo: 'PJ-PRV-001',
    titulo: 'Política de Privacidad — Placeta Junior',
    tipo: 'cni',
    categoria: 'sistema',
    estado: 'vigente',
    version: 1,
    fecha_aplicacion: FECHA,
    fecha_aprobacion_junta: FECHA,
    aprobada_en_junta: true,
    notas_cambio: 'Publicación inicial de la Política de Privacidad de Placeta Junior. Documento que el tutor legal debe leer y firmar en el alta de un menor.',
    archivo: 'placeta-junior-politica-de-privacidad.md'
  },
  {
    codigo: 'PJ-CON-001',
    titulo: 'Consentimiento de Tratamiento de Datos del Menor — Placeta Junior',
    tipo: 'cni',
    categoria: 'sistema',
    estado: 'vigente',
    version: 1,
    fecha_aplicacion: FECHA,
    fecha_aprobacion_junta: FECHA,
    aprobada_en_junta: true,
    notas_cambio: 'Publicación inicial del Consentimiento del tutor legal para el tratamiento de datos del menor en Placeta Junior. Documento que el tutor debe firmar en el alta.',
    archivo: 'placeta-junior-consentimiento.md'
  }
];

function rest(path, opts = {}) {
  return new Promise((resolve, reject) => {
    const body = opts.body ? JSON.stringify(opts.body) : null;
    const u = new URL(SUPABASE_URL + path);
    const req = https.request(u, {
      method: opts.method || 'GET',
      headers: {
        'apikey': KEY,
        'Authorization': `Bearer ${KEY}`,
        'Content-Type': 'application/json',
        ...(opts.headers || {}),
        ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {})
      }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
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
  let ok = 0, errs = 0;

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

    // ¿Existe el documento? (update/insert manual, sin depender de constraints)
    const { data: existente } = await rest(`/rest/v1/bop_documentos?codigo=eq.${encodeURIComponent(doc.codigo)}&select=id`);
    let docId = existente?.[0]?.id || null;

    let r;
    if (docId) {
      r = await rest(`/rest/v1/bop_documentos?id=eq.${docId}`, {
        method: 'PATCH',
        headers: { 'Prefer': 'return=representation' },
        body: row
      });
    } else {
      r = await rest('/rest/v1/bop_documentos', {
        method: 'POST',
        headers: { 'Prefer': 'return=representation' },
        body: row
      });
    }
    if (r.status >= 400) { console.error('✗ doc', doc.codigo, r.status, JSON.stringify(r.data)); errs++; continue; }
    // El id definitivo sale de la respuesta de Supabase
    docId = (Array.isArray(r.data) ? r.data[0] : r.data)?.id || docId;

    // Versión 1 en historial (update/insert manual)
    const { data: verExist } = await rest(`/rest/v1/bop_versiones?documento_id=eq.${docId}&version=eq.1&select=id`);
    const verId = verExist?.[0]?.id || null;
    const verBody = {
      documento_id: docId,
      version: 1,
      estado: doc.estado,
      contenido_md,
      autor_dip: AUTOR.dip,
      autor_nombre: AUTOR.nombre,
      notas_cambio: 'Migración inicial de los documentos legales de Placeta Junior.',
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

  console.log(`Migración Placeta Junior completada: ${ok} publicados, ${errs} errores.`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
