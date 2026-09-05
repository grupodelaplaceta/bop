#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOLP v2 — Migración de taxonomía por REST (sin @supabase/supabase-js)
   Equivale a scripts/migrar-bolp.js pero usa https plano (como el resto de
   scripts de bop). Clasifica los documentos de bop_documentos con la MISMA
   lógica de la web (public/js/bolp-clasificacion.js) y rellena en Supabase:
     seccion · familia · departamento · organo_responsable
     fecha_publicacion · fecha_entrada_vigor
   Idempotente: no sobrescribe valores ya establecidos manualmente (incluye
   los documentos publicados desde RSP que ya traen su clasificación).
   Uso: node scripts/migrar-bolp-rest.js
   ═══════════════════════════════════════════════════════════════════════ */
const path = require('path');
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';
const KEY = process.env.SUPABASE_SERVICE_KEY || FALLBACK_KEY;

const {
  bolpClasificar, bolpDepartamentoPorId, bolpFechaPublicacion, bolpFechaVigor
} = require(path.join(__dirname, '..', 'public', 'js', 'bolp-clasificacion.js'));

function requestJson(method, seg, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(SUPABASE_URL + seg);
    const data = body ? JSON.stringify(body) : null;
    const req = https.request(u, {
      method,
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
    }, (res) => {
      let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => {
        let j = null;
        try { j = d ? JSON.parse(d) : null; } catch { /* no json */ }
        resolve({ status: res.statusCode, json: j, body: d });
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function migrar() {
  const cols = 'id,codigo,titulo,tipo,categoria,estado,departamento,organo_responsable,fecha_aplicacion,fecha_aprobacion_junta,fecha_publicacion,fecha_entrada_vigor';
  const { status, json } = await requestJson('GET', `/rest/v1/bop_documentos?select=${encodeURIComponent(cols)}&limit=1000`);
  if (status !== 200 || !Array.isArray(json)) { console.error('✗ No se pudieron leer los documentos', status, JSON.stringify(json)); process.exit(1); }
  if (!json.length) { console.log('No hay documentos en bop_documentos.'); return; }

  let ok = 0, saltados = 0, errs = 0;
  for (const d of json) {
    const cl = bolpClasificar(d);
    const dep = cl.departamento ? bolpDepartamentoPorId(cl.departamento) : null;
    const patch = {};
    if (cl.seccion && !d.seccion) patch.seccion = cl.seccion;
    if (cl.familia && !d.familia) patch.familia = cl.familia;
    if (cl.departamento && !d.departamento) patch.departamento = cl.departamento;
    if (!d.organo_responsable) patch.organo_responsable = (dep && dep.nombre) || '';
    if (!d.fecha_publicacion) { const f = bolpFechaPublicacion(d); if (f) patch.fecha_publicacion = String(f).slice(0, 10); }
    if (!d.fecha_entrada_vigor) { const f = bolpFechaVigor(d); if (f) patch.fecha_entrada_vigor = String(f).slice(0, 10); }

    const campos = Object.keys(patch);
    if (!campos.length) { saltados++; continue; }
    const up = await requestJson('PATCH', `/rest/v1/bop_documentos?id=eq.${encodeURIComponent(d.id)}`, patch);
    if (up.status !== 204 && up.status !== 200) { console.error('✗', d.codigo, up.status, up.body.slice(0, 200)); errs++; }
    else { console.log(`✅ ${d.codigo} → seccion=${patch.seccion || d.seccion || '—'} familia=${patch.familia || d.familia || '—'} dep=${patch.departamento || d.departamento || '—'} (${campos.join(', ')})`); ok++; }
  }
  console.log(`\nMigración BOLP v2 completada: ${ok} actualizados, ${saltados} ya clasificados, ${errs} errores.`);
}

migrar().catch((e) => { console.error('Fatal:', e); process.exit(1); });
