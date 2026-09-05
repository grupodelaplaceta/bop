#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Sincronizar el Código Normativo Interno (CNI) por capítulos
   -----------------------------------------------------------------------
   Lee los capítulos desde public/docs/cni/*.md (una única fuente, en
   Markdown) y los inserta/actualiza en bop_documentos (Supabase) como
   documentos CNI (Sección II · Código Normativo · familia cni).

   Uso:
     node scripts/sincronizar-cni.js            → ensayo (no escribe)
     node scripts/sincronizar-cni.js --apply    → aplica (upsert por codigo)

   NOTA: no toca los documentos de dominio (Banco, Junior, RSP, PlacetaID…),
   que se gestionan aparte. Tras aplicar, el modo offline debe reflejar los
   mismos textos (se alimenta de estos mismos .md en una futura pasada).
   ═══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';
const KEY = process.env.SUPABASE_SERVICE_KEY || FALLBACK_KEY;
const APLICAR = process.argv.includes('--apply');

// Manifiesto: cada capítulo = archivo .md en public/docs/cni/
// (codigo -> { titulo, archivo }). Se rellena progresivamente.
const CNI_DOCS = [
  { codigo: 'CNI-PREAMBULO', archivo: 'cni-preamble.md', titulo: 'Preámbulo — Fundamento y derogación de versiones anteriores' },
  // Capítulos I–XVI se incorporan por lotes en public/docs/cni/
];

function leerMd(codigo) {
  const doc = CNI_DOCS.find((d) => d.codigo === codigo);
  if (!doc) return null;
  const ruta = path.join(__dirname, '..', 'public', 'docs', 'cni', doc.archivo);
  if (!fs.existsSync(ruta)) return null;
  return { doc, md: fs.readFileSync(ruta, 'utf8').trim() };
}

function requestJson(method, seg, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(SUPABASE_URL + seg);
    const data = body ? JSON.stringify(body) : null;
    const req = https.request(u, {
      method,
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    }, (res) => {
      let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => {
        let j = null; try { j = d ? JSON.parse(d) : null; } catch { /* no json */ }
        resolve({ status: res.statusCode, json: j, body: d });
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  let aplicados = 0;
  for (const { codigo } of CNI_DOCS) {
    const leido = leerMd(codigo);
    if (!leido) { console.log(`· ${codigo}: sin archivo .md todavía (pendiente).`); continue; }
    const fila = {
      codigo,
      titulo: leido.doc.titulo,
      tipo: 'cni', categoria: 'cni',
      seccion: 'codigo-normativo', familia: 'cni',
      organo_responsable: 'Junta del Grupo de La Placeta',
      estado: 'vigente', version: 2, aprobada_en_junta: true,
      fecha_publicacion: '2026-07-04',
      fecha_entrada_vigor: '2026-07-04',
      fecha_aprobacion_junta: '2026-07-03',
      notasCambio: 'Edición actualizada (modificación de 4 de julio de 2026).',
      contenido_md: leido.md,
    };
    if (!APLICAR) { console.log(`· [ensayo] ${codigo}: ${leido.md.length} caracteres listos para publicar.`); continue; }
    const existente = await requestJson('GET', `/rest/v1/bop_documentos?select=id&codigo=eq.${codigo}&limit=1`);
    const ya = existente.status === 200 && existente.json && existente.json.length;
    const r = ya
      ? await requestJson('PATCH', `/rest/v1/bop_documentos?codigo=eq.${codigo}`, fila)
      : await requestJson('POST', '/rest/v1/bop_documentos', [fila]);
    if (![200, 201, 204].includes(r.status)) throw new Error(`${codigo}: ${r.status} ${r.body.slice(0, 200)}`);
    console.log(`✅ ${codigo} ${ya ? 'actualizado' : 'publicado'} (${leido.md.length} caracteres).`);
    aplicados++;
  }
  console.log(APLICAR ? `\nSincronización aplicada: ${aplicados} documento(s).` : `\nEnsayo completado (usa --apply para publicar).`);
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
