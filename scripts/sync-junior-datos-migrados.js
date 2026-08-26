#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOP — Sincroniza los documentos legales de Placeta Junior
   en public/js/datos-migrados.js (fallback offline + fuente canónica local).

   Lee el contenido desde bop/documentos/*.md y añade la sección BOP_MIGRADOS.junior.
   Idempotente: si la sección ya existe, la sustituye.

   Ejecutar:  node scripts/sync-junior-datos-migrados.js
   ═══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const TARGET = path.join(__dirname, '..', 'public', 'js', 'datos-migrados.js');
const DOCS_DIR = path.join(__dirname, '..', 'documentos');
const FECHA = '2026-08-10';
const AUTOR_DIP = '23749931M';
const AUTOR_NOMBRE = 'Mikel Alegre Marcos';

const DOCUMENTOS = [
  {
    codigo: 'PJ-TYC-001',
    titulo: 'Términos y Condiciones — Placeta Junior',
    tipo: 'cni', categoria: 'sistema', estado: 'vigente', version: 1,
    fecha_aplicacion: FECHA, fecha_aprobacion_junta: FECHA, aprobada_en_junta: true,
    notas_cambio: 'Publicación inicial de los Términos y Condiciones de Placeta Junior. Documento que el tutor legal debe leer y firmar en el alta de un menor.',
    archivo: 'placeta-junior-terminos-y-condiciones.md'
  },
  {
    codigo: 'PJ-PRV-001',
    titulo: 'Política de Privacidad — Placeta Junior',
    tipo: 'cni', categoria: 'sistema', estado: 'vigente', version: 1,
    fecha_aplicacion: FECHA, fecha_aprobacion_junta: FECHA, aprobada_en_junta: true,
    notas_cambio: 'Publicación inicial de la Política de Privacidad de Placeta Junior. Documento que el tutor legal debe leer y firmar en el alta de un menor.',
    archivo: 'placeta-junior-politica-de-privacidad.md'
  },
  {
    codigo: 'PJ-CON-001',
    titulo: 'Consentimiento de Tratamiento de Datos del Menor — Placeta Junior',
    tipo: 'cni', categoria: 'sistema', estado: 'vigente', version: 1,
    fecha_aplicacion: FECHA, fecha_aprobacion_junta: FECHA, aprobada_en_junta: true,
    notas_cambio: 'Publicación inicial del Consentimiento del tutor legal para el tratamiento de datos del menor en Placeta Junior. Documento que el tutor debe firmar en el alta.',
    archivo: 'placeta-junior-consentimiento.md'
  }
];

function buildJuniorSection() {
  const objs = DOCUMENTOS.map(doc => {
    const fp = path.join(DOCS_DIR, doc.archivo);
    const contenido = fs.readFileSync(fp, 'utf8');
    return '    {\n' +
      "      codigo: '" + doc.codigo + "',\n" +
      "      titulo: '" + doc.titulo + "',\n" +
      "      tipo: '" + doc.tipo + "',\n" +
      "      categoria: '" + doc.categoria + "',\n" +
      "      estado: '" + doc.estado + "',\n" +
      '      version: ' + doc.version + ',\n' +
      "      fecha_aplicacion: '" + doc.fecha_aplicacion + "',\n" +
      "      fecha_aprobacion_junta: '" + doc.fecha_aprobacion_junta + "',\n" +
      '      aprobada_en_junta: ' + doc.aprobada_en_junta + ',\n' +
      "      autor_dip: '" + AUTOR_DIP + "',\n" +
      "      autor_nombre: '" + AUTOR_NOMBRE + "',\n" +
      "      notas_cambio: '" + doc.notas_cambio + "',\n" +
      '      contenido_md: ' + JSON.stringify(contenido) + '\n' +
      '    }';
  });
  return '  // ── PLACETA JUNIOR — Documentos legales que firma el tutor en el alta ──\n' +
    '  junior: [\n' + objs.join(',\n') + '\n  ]';
}

let src = fs.readFileSync(TARGET, 'utf8');
const juniorSection = buildJuniorSection();

// Si ya existe la sección "junior:", sustituir su contenido
const reJunior = /  \/\/ ── PLACETA JUNIOR[\s\S]*?\n  \],\n/;
if (reJunior.test(src)) {
  src = src.replace(reJunior, juniorSection + ',\n');
} else {
  // Insertar antes del cierre del objeto BOP_MIGRADOS: buscar "  ]\n};" o con CRLF
  const cierreCRLF = '  ]\r\n};';
  const cierreLF = '  ]\n};';
  const idx = src.lastIndexOf(cierreCRLF) >= 0 ? src.lastIndexOf(cierreCRLF) : src.lastIndexOf(cierreLF);
  if (idx < 0) { console.error('No se encontró el cierre de BOP_MIGRADOS'); process.exit(1); }
  const eol = src.slice(idx, idx + 5).includes('\r') ? '\r\n' : '\n';
  const insert = '  ],' + eol + eol + juniorSection + eol;
  src = src.slice(0, idx) + insert + src.slice(idx + '  ]'.length);
}

fs.writeFileSync(TARGET, src, 'utf8');
console.log('✅ datos-migrados.js actualizado con la sección junior (3 documentos de Placeta Junior).');
