#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOP — Genera BOP_MIGRADOS.banco en public/js/datos-migrados.js
   Lee documentos/banco-*.md (fuente canónica) y los expone como fallback
   estático en la web (sin depender de Supabase). Idempotente.

   Ejecutar:  node scripts/sync-banco-datos-migrados.js
   ═══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const docsDir = path.join(root, 'documentos');
const target = path.join(root, 'public', 'js', 'datos-migrados.js');

const FECHA = '2026-09-14';
const AUTOR = { dip: '23749931M', nombre: 'Mikel Alegre Marcos' };

const DOCS = [
  { codigo: 'BCO-PRV-001', titulo: 'Política de Privacidad — Banco de La Placeta', archivo: 'banco-politica-de-privacidad.md', notas: 'Publicación inicial de la Política de Privacidad de Banco de La Placeta.' },
  { codigo: 'BCO-TYC-001', titulo: 'Términos y Condiciones — Banco de La Placeta', archivo: 'banco-terminos-y-condiciones.md', notas: 'Publicación inicial de los Términos y Condiciones de Banco de La Placeta.' },
  { codigo: 'BCO-PZM-001', titulo: 'Términos de Uso — PlaceZUM', archivo: 'banco-placezum-terminos-de-uso.md', notas: 'Publicación inicial de los Términos de Uso de PlaceZUM (envío de Placetas en un zum).' },
];

const banco = DOCS.map((d) => ({
  codigo: d.codigo,
  titulo: d.titulo,
  tipo: 'cni',
  categoria: 'sistema',
  estado: 'vigente',
  version: 1,
  fecha_aplicacion: FECHA,
  fecha_aprobacion_junta: FECHA,
  aprobada_en_junta: true,
  autor_dip: AUTOR.dip,
  autor_nombre: AUTOR.nombre,
  notas_cambio: d.notas,
  contenido_md: fs.readFileSync(path.join(docsDir, d.archivo), 'utf8'),
}));

let src = fs.readFileSync(target, 'utf8');

// Idempotencia: elimina un bloque banco previo si existiera.
src = src.replace(/\n\/\/ ── BANCO DE LA PLACETA[\s\S]*?BOP_MIGRADOS\.banco\s*=\s*\[[\s\S]*?\];\s*(?=\n\/\/ Si estamos)/, '\n');

const block = `\n// ── BANCO DE LA PLACETA — Documentos legales (web banco.laplaceta.org) ──\nBOP_MIGRADOS.banco = ${JSON.stringify(banco, null, 2)};\n`;

// Inserta antes del bloque de exportación (window/module.exports).
const anchor = '// Si estamos en navegador';
const idx = src.indexOf(anchor);
if (idx === -1) {
  console.error('✗ No se encontró el ancla de exportación en datos-migrados.js');
  process.exit(1);
}
src = src.slice(0, idx) + block + src.slice(idx);

fs.writeFileSync(target, src);
console.log(`✅ BOP_MIGRADOS.banco generado (${banco.length} documentos) en public/js/datos-migrados.js`);
