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

// Referencias a valores CNIC que los capítulos citan (códigos canónicos;
// el visor las enlaza a la ficha del valor en cnic.html).
const ref = (codigo, etiqueta) => ({ codigo, etiqueta });
const CNIC_REFS = {
  'CNI-III': [
    ref('CNIC-CUENTA-JUNIOR-BASICA-SALDO', 'Saldo máximo Junior básica'),
    ref('CNIC-CUENTA-JUNIOR-BASICA-TRANSFERENCIA', 'Transferencia diaria Junior básica'),
    ref('CNIC-BONO-BIENVENIDA-JUNIOR-BASICA', 'Bono bienvenida menor de 16 años'),
    ref('CNIC-CUENTA-JUNIOR-SENIOR-SALDO', 'Saldo máximo Junior senior'),
    ref('CNIC-CUENTA-JUNIOR-SENIOR-TRANSFERENCIA', 'Transferencia diaria Junior senior'),
    ref('CNIC-BONO-BIENVENIDA-JUNIOR-SENIOR', 'Bono bienvenida Junior senior'),
    ref('CNIC-CUENTA-CIUDADANA-SALDO', 'Saldo máximo cuenta ciudadana'),
    ref('CNIC-BONO-BIENVENIDA-CIUDADANA', 'Bono de bienvenida alta plena'),
    ref('CNIC-CUENTA-INSTITUCIONAL-SALDO', 'Saldo máximo cuenta institucional'),
    ref('CNIC-EMISION-ORDINARIA-MAXIMA', 'Límite ordinario de emisión por usuario'),
    ref('CNIC-EMISION-EXCEPCIONAL-TESORO', 'Distribución al Tesoro'),
    ref('CNIC-EMISION-EXCEPCIONAL-ADMINISTRACION', 'Distribución a Administración'),
    ref('CNIC-EMISION-EXCEPCIONAL-BANCO', 'Distribución al Banco de La Placeta'),
  ],
  'CNI-IV': [
    ref('CNIC-LIMITE-CAPITAL-PERSONAL', 'Límite de capital cuenta personal'),
    ref('CNIC-LIMITE-CAPITAL-INSTITUCIONAL', 'Límite de capital cuenta institucional'),
    ref('CNIC-SANCION-SALDO-EXCESO-PERSONAL', 'Sanción por exceso de capital personal'),
    ref('CNIC-SANCION-SALDO-NEGATIVO-DIA-6', 'Sanción por saldo negativo desde el día 6'),
    ref('CNIC-SANCION-SALDO-NEGATIVO-DIA-30', 'Sanción adicional desde el día 30'),
    ref('CNIC-TASA-TRANSFERENCIA-MAXIMA', 'Tasa máxima de transferencia'),
    ref('CNIC-IVA', 'IVA'),
    ref('CNIC-COTIZACION-TRAMO-1', 'Límite superior tramo salarial 1'),
    ref('CNIC-COTIZACION-TRAMO-2', 'Límite superior tramo salarial 2'),
    ref('CNIC-COTIZACION-EMPRESA-TRAMO-1', 'Cotización empresa tramo 1'),
    ref('CNIC-COTIZACION-TRABAJADOR-TRAMO-1', 'Cotización trabajador tramo 1'),
    ref('CNIC-RBU-SEMANAL', 'RBU semanal'),
    ref('CNIC-SMI-MENSUAL', 'SMI mensual'),
    ref('CNIC-SALARIO-MAXIMO-MENSUAL', 'Salario máximo mensual'),
    ref('CNIC-IRM-PARTICULAR-0', 'IRM particular (tramos)'),
    ref('CNIC-IGF-PF-TRAMO-1', 'IGF personas físicas (tramos)'),
    ref('CNIC-IGF-EMPRESA-TRAMO-1', 'IGF empresas (tramos)'),
    ref('CNIC-IGF-EMPRESA-REDUCIDA-UMBRAL', 'Umbral de reducción IGF empresas pequeñas'),
  ],
  'CNI-VII': [
    ref('CNIC-SUELDO-PRESIDENCIA', 'Sueldo base — Presidencia'),
    ref('CNIC-SUELDO-VICEPRESIDENCIA', 'Sueldo base — Vicepresidencia'),
    ref('CNIC-SUELDO-DIRECTOR-DEPARTAMENTO', 'Sueldo base — Dirección de Departamento'),
    ref('CNIC-SUELDO-TECNICO-DEPARTAMENTO', 'Sueldo base — Técnico/a de Departamento'),
    ref('CNIC-SUELDO-COLABORADOR-ASESOR', 'Sueldo base — Colaborador/a o Asesor/a'),
    ref('CNIC-SUELDO-ESTUDIANTE', 'Sueldo base — Estudiante en programa especial'),
    ref('CNIC-COMPLEMENTO-PRESIDENCIA', 'Complemento de Actividad — Presidencia'),
    ref('CNIC-COMPLEMENTO-VICEPRESIDENCIA', 'Complemento de Actividad — Vicepresidencia'),
    ref('CNIC-COMPLEMENTO-DIRECTOR-DEPARTAMENTO', 'Complemento de Actividad — Dirección'),
    ref('CNIC-COMPLEMENTO-TECNICO-DEPARTAMENTO', 'Complemento de Actividad — Técnico/a'),
    ref('CNIC-COMPLEMENTO-COLABORADOR-ASESOR', 'Complemento de Actividad — Colaborador/a'),
    ref('CNIC-COMPLEMENTO-ESTUDIANTE', 'Complemento de Actividad — Estudiante'),
  ],
  'CNI-X': [
    ref('CNIC-SANCION-DISCIPLINARIA-LEVE', 'Multa por infracción leve'),
    ref('CNIC-SANCION-DISCIPLINARIA-GRAVE-MIN', 'Multa mínima por infracción grave'),
    ref('CNIC-SANCION-DISCIPLINARIA-GRAVE-MAX', 'Multa máxima por infracción grave'),
  ],
  'CNI-XV': [
    ref('CNIC-SANCION-PD-PERSONA-LEVE-MIN', 'Sanción PD leve mínima — persona'),
    ref('CNIC-SANCION-PD-PERSONA-LEVE-MAX', 'Sanción PD leve máxima — persona'),
    ref('CNIC-SANCION-PD-PERSONA-GRAVE-MIN', 'Sanción PD grave mínima — persona'),
    ref('CNIC-SANCION-PD-PERSONA-GRAVE-MAX', 'Sanción PD grave máxima — persona'),
    ref('CNIC-SANCION-PD-PERSONA-MUYGRAVE-MIN', 'Sanción PD muy grave mínima — persona'),
    ref('CNIC-SANCION-PD-PERSONA-MUYGRAVE-MAX', 'Sanción PD muy grave máxima — persona'),
    ref('CNIC-SANCION-PD-ORG-LEVE-MIN', 'Sanción PD leve mínima — organización'),
    ref('CNIC-SANCION-PD-ORG-LEVE-MAX', 'Sanción PD leve máxima — organización'),
    ref('CNIC-SANCION-PD-ORG-GRAVE-MIN', 'Sanción PD grave mínima — organización'),
    ref('CNIC-SANCION-PD-ORG-GRAVE-MAX', 'Sanción PD grave máxima — organización'),
    ref('CNIC-SANCION-PD-ORG-MUYGRAVE-MIN', 'Sanción PD muy grave mínima — organización'),
    ref('CNIC-SANCION-PD-ORG-MUYGRAVE-MAX', 'Sanción PD muy grave máxima — organización'),
    ref('CNIC-SANCION-PD-ORG-MUYGRAVE-PCT', 'Techo porcentual sanción PD muy grave'),
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
