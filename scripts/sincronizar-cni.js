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

   NOTA: publica la edición coherente de 3 de julio de 2026 (aprobada por la
   Junta). La capa de «modificación de 4 de julio» está pendiente de completar
   (cni-preamble-4jul-pendiente.md) y no se publica. No toca los documentos de
   dominio (Banco, Junior, RSP, PlacetaID…), que se gestionan aparte.
   ═══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';
const KEY = process.env.SUPABASE_SERVICE_KEY || FALLBACK_KEY;
const APLICAR = process.argv.includes('--apply');

// Manifiesto: cada capítulo = archivo .md en public/docs/cni/
// (codigo -> { titulo, archivo }).
// Regenerar los .md desde el espejo offline: node scripts/extraer-cni-docs.js
const CNI_DOCS = [
  { codigo: 'CNI-PREAMBULO', archivo: 'cni-preamble.md', titulo: 'Preámbulo — Fundamento y derogación de versiones anteriores' },
  { codigo: 'CNI-I', archivo: 'cni-i.md', titulo: 'Capítulo I: Altas al Sistema' },
  { codigo: 'CNI-II', archivo: 'cni-ii.md', titulo: 'Capítulo II: PlacetaID y Documento de Identidad (DIP)' },
  { codigo: 'CNI-III', archivo: 'cni-iii.md', titulo: 'Capítulo III: Banco de La Placeta' },
  { codigo: 'CNI-IV', archivo: 'cni-iv.md', titulo: 'Capítulo IV: Banca, Capital e Impuestos' },
  { codigo: 'CNI-V', archivo: 'cni-v.md', titulo: 'Capítulo V: Recursos Digitales' },
  { codigo: 'CNI-VI', archivo: 'cni-vi.md', titulo: 'Capítulo VI: Loterías, Juegos e Inversiones' },
  { codigo: 'CNI-VII', archivo: 'cni-vii.md', titulo: 'Capítulo VII: Sueldos Públicos' },
  { codigo: 'CNI-VIII', archivo: 'cni-viii.md', titulo: 'Capítulo VIII: Convivencia y Respeto' },
  { codigo: 'CNI-IX', archivo: 'cni-ix.md', titulo: 'Capítulo IX: Difamación e Injurias' },
  { codigo: 'CNI-X', archivo: 'cni-x.md', titulo: 'Capítulo X: Régimen Sancionador General' },
  { codigo: 'CNI-XI', archivo: 'cni-xi.md', titulo: 'Capítulo XI: Marco de Cumplimiento Real — Protección de Datos del GDLP' },
  { codigo: 'CNI-XII', archivo: 'cni-xii.md', titulo: 'Capítulo XII: Protección de Datos — Organizaciones Privadas' },
  { codigo: 'CNI-XIII', archivo: 'cni-xiii.md', titulo: 'Capítulo XIII: Protección de Datos — Organizaciones Públicas' },
  { codigo: 'CNI-XIV', archivo: 'cni-xiv.md', titulo: 'Capítulo XIV: Protección de Datos — Asociaciones' },
  { codigo: 'CNI-XV', archivo: 'cni-xv.md', titulo: 'Capítulo XV: Evaluación de Impacto y Régimen Sancionador en Protección de Datos' },
  { codigo: 'CNI-XVI', archivo: 'cni-xvi.md', titulo: 'Capítulo XVI: Disposiciones Finales' },
];

// Referencias a valores CNIC que algunos capítulos citan (códigos del espejo offline;
// el visor las resuelve a su código canónico vía cnic-alias.js).
const CNIC_REFS = {
  'CNI-III': [
    { codigo: 'CNIC-7-1', etiqueta: 'Cuentas y límites por franja de edad' },
    { codigo: 'CNIC-9-1', etiqueta: 'Límite de emisión por usuario' },
  ],
  'CNI-IV': [
    { codigo: 'CNIC-4.1', etiqueta: 'Límites de capital' },
    { codigo: 'CNIC-4.3', etiqueta: 'Tasa de transferencia' },
    { codigo: 'CNIC-4.4', etiqueta: 'IVA' },
    { codigo: 'CNIC-4.5', etiqueta: 'Cotizaciones laborales' },
    { codigo: 'CNIC-4.6', etiqueta: 'RBU' },
    { codigo: 'CNIC-4.7', etiqueta: 'SMI y salario máximo' },
    { codigo: 'CNIC-4.10', etiqueta: 'Escala IRM' },
    { codigo: 'CNIC-4.13', etiqueta: 'Escala IGF personal' },
    { codigo: 'CNIC-4.14', etiqueta: 'Escala IGF empresa' },
    { codigo: 'CNIC-4.15', etiqueta: 'Exención empresa pequeña' },
  ],
  'CNI-VII': [
    { codigo: 'CNIC-15-1', etiqueta: 'Tabla de sueldos públicos' },
  ],
};

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
      estado: 'vigente', version: 1, aprobada_en_junta: true,
      fecha_publicacion: '2026-09-05',
      fecha_aplicacion: '2026-07-03',
      fecha_entrada_vigor: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      notas_cambio: 'Publicación en el BOLP del CNI consolidado (edición aprobada por la Junta el 3 de julio de 2026).',
      contenido_md: leido.md,
      cnic_refs: CNIC_REFS[codigo] || [],
      etiquetas: ['cni', 'normativa'],
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
