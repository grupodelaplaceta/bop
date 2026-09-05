#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Extraer capítulos CNI del espejo offline a public/docs/cni/*.md
   -----------------------------------------------------------------------
   Lee el array `cni` de public/js/datos-migrados.js (fuente actual,
   edición 3-jul-2026) y materializa cada capítulo en un .md bajo
   public/docs/cni/. Es una PASADA INICIAL para poblar la carpeta de
   fuentes; no toca Supabase. Usa la VM de Node para evaluar el archivo
   del navegador (expone BOP_MIGRADOS).
   ═══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const origen = path.join(__dirname, '..', 'public', 'js', 'datos-migrados.js');
const destino = path.join(__dirname, '..', 'public', 'docs', 'cni');

// Evaluar el fichero del navegador: define window.BOP_MIGRADOS / BOP_MIGRADOS global
const codigo = fs.readFileSync(origen, 'utf8');
const sandbox = { window: {} };
sandbox.window.BOP_MIGRADOS = undefined;
sandbox.BOP_MIGRADOS = undefined;
vm.createContext(sandbox);
try { vm.runInContext(codigo, sandbox, { filename: 'datos-migrados.js' }); } catch (e) { console.error('VM error:', e.message); process.exit(1); }
const BOP = sandbox.BOP_MIGRADOS || sandbox.window.BOP_MIGRADOS;
if (!BOP || !Array.isArray(BOP.cni)) { console.error('No se pudo leer BOP_MIGRADOS.cni'); process.exit(1); }

function slug(codigo) {
  // El preámbulo canónico (con capa de «modificación de 4 de julio») vive en
  // cni-preamble.md; no se sobrescribe desde el espejo offline (edición 3-jul).
  if (codigo === 'CNI-PREAMBULO') return 'cni-preamble.md';
  return 'cni-' + codigo.replace('CNI-', '').toLowerCase() + '.md';
}

const manifest = [];
for (const cap of BOP.cni) {
  const archivo = slug(cap.codigo);
  const ruta = path.join(destino, archivo);
  if (cap.codigo === 'CNI-PREAMBULO' && fs.existsSync(ruta)) { manifest.push({ codigo: cap.codigo, archivo, titulo: cap.titulo, reescrito: false }); continue; }
  const md = (cap.contenido_md || '').trim() + '\n';
  fs.writeFileSync(ruta, md, 'utf8');
  manifest.push({ codigo: cap.codigo, archivo, titulo: cap.titulo, reescrito: true });
  console.log(`✍️  ${cap.codigo} -> ${archivo} (${md.length} chars)`);
}

// Imprimir el manifiesto listo para sincronizar-cni.js
console.log('\n// ── Manifiesto CNI_DOCS (pegar en scripts/sincronizar-cni.js) ──');
for (const m of manifest) {
  console.log(`  { codigo: '${m.codigo}', archivo: '${m.archivo}', titulo: ${JSON.stringify(m.titulo)} },`);
}
console.log(`\nTotal: ${manifest.length} capítulos (preamble ${manifest.find((m) => m.codigo === 'CNI-PREAMBULO').reescrito ? 'reescrito' : 'conservado'}).`);
