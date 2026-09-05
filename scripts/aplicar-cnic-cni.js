#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Aplicar a bop_cnic los valores del CNI que faltaban en el catálogo
   (para que rsp y demás sistemas los usen vía /api/valores).
   - Capítulo VII (Art. 15): sueldos base y Complemento de Actividad.
   - Capítulo X (Art. 20): multas del régimen disciplinario general.
   - Capítulo XV (Art. 15.2.3): sanciones económicas en PD (personas y org).
   Idempotente (upsert por codigo). Uso: node scripts/aplicar-cnic-cni.js
   Tras aplicarlo, regenerar el espejo: node scripts/exportar-cnic-canonicos.js
   ═══════════════════════════════════════════════════════════════════════ */
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';
const KEY = process.env.SUPABASE_SERVICE_KEY || FALLBACK_KEY;

// [codigo, etiqueta, descripcion, tipo_valor, valor, unidad, articulo]
const R = [
  // ── Capítulo VII · Sueldos públicos (Art. 15) ──
  ['CNIC-SUELDO-PRESIDENCIA', 'Sueldo base — Presidencia', 'Sueldo base mensual del cargo público de Presidencia (Capítulo VII, Art. 15).', 'placeta', '267', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-SUELDO-VICEPRESIDENCIA', 'Sueldo base — Vicepresidencia', 'Sueldo base mensual del cargo público de Vicepresidencia (Capítulo VII, Art. 15).', 'placeta', '217', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-SUELDO-DIRECTOR-DEPARTAMENTO', 'Sueldo base — Dirección de Departamento', 'Sueldo base mensual del cargo público de Director/a de Departamento (Capítulo VII, Art. 15).', 'placeta', '167', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-SUELDO-TECNICO-DEPARTAMENTO', 'Sueldo base — Técnico/a de Departamento', 'Sueldo base mensual del cargo público de Técnico/a de Departamento (Capítulo VII, Art. 15).', 'placeta', '100', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-SUELDO-COLABORADOR-ASESOR', 'Sueldo base — Colaborador/a o Asesor/a', 'Sueldo base mensual del cargo público de Colaborador/a o Asesor/a (Capítulo VII, Art. 15).', 'placeta', '50', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-SUELDO-ESTUDIANTE', 'Sueldo base — Estudiante en programa especial', 'Sueldo base mensual del cargo de Estudiante en programa especial (Capítulo VII, Art. 15).', 'placeta', '17', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-COMPLEMENTO-PRESIDENCIA', 'Complemento de Actividad — Presidencia', 'Complemento de Actividad mensual del cargo público de Presidencia (Capítulo VII, Art. 15).', 'placeta', '67', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-COMPLEMENTO-VICEPRESIDENCIA', 'Complemento de Actividad — Vicepresidencia', 'Complemento de Actividad mensual del cargo público de Vicepresidencia (Capítulo VII, Art. 15).', 'placeta', '50', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-COMPLEMENTO-DIRECTOR-DEPARTAMENTO', 'Complemento de Actividad — Dirección de Departamento', 'Complemento de Actividad mensual del cargo público de Director/a de Departamento (Capítulo VII, Art. 15).', 'placeta', '33', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-COMPLEMENTO-TECNICO-DEPARTAMENTO', 'Complemento de Actividad — Técnico/a de Departamento', 'Complemento de Actividad mensual del cargo público de Técnico/a de Departamento (Capítulo VII, Art. 15).', 'placeta', '25', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-COMPLEMENTO-COLABORADOR-ASESOR', 'Complemento de Actividad — Colaborador/a o Asesor/a', 'Complemento de Actividad mensual del cargo público de Colaborador/a o Asesor/a (Capítulo VII, Art. 15).', 'placeta', '17', 'Pz', 'CNI-VII (Art. 15)'],
  ['CNIC-COMPLEMENTO-ESTUDIANTE', 'Complemento de Actividad — Estudiante en programa especial', 'Complemento de Actividad mensual del cargo de Estudiante en programa especial (Capítulo VII, Art. 15).', 'placeta', '8', 'Pz', 'CNI-VII (Art. 15)'],
  // ── Capítulo X · Régimen sancionador general (Art. 20) ──
  ['CNIC-SANCION-DISCIPLINARIA-LEVE', 'Multa por infracción leve', 'Multa por infracción disciplinaria leve del régimen sancionador general (Capítulo X, Art. 20).', 'placeta', '50', 'Pz', 'CNI-X (Art. 20)'],
  ['CNIC-SANCION-DISCIPLINARIA-GRAVE-MIN', 'Multa mínima por infracción grave', 'Límite inferior de la multa por infracción disciplinaria grave (Capítulo X, Art. 20).', 'placeta', '100', 'Pz', 'CNI-X (Art. 20)'],
  ['CNIC-SANCION-DISCIPLINARIA-GRAVE-MAX', 'Multa máxima por infracción grave', 'Límite superior de la multa por infracción disciplinaria grave (Capítulo X, Art. 20).', 'placeta', '500', 'Pz', 'CNI-X (Art. 20)'],
  // ── Capítulo XV · Sanciones económicas en PD — personas (Art. 15.2.3) ──
  ['CNIC-SANCION-PD-PERSONA-LEVE-MIN', 'Sanción PD leve mínima — persona', 'Límite inferior de la sanción económica por infracción leve en protección de datos para un integrante o cargo (Capítulo XV, Art. 15.2.3).', 'placeta', '50', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-PERSONA-LEVE-MAX', 'Sanción PD leve máxima — persona', 'Límite superior de la sanción económica por infracción leve en protección de datos para un integrante o cargo (Capítulo XV, Art. 15.2.3).', 'placeta', '300', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-PERSONA-GRAVE-MIN', 'Sanción PD grave mínima — persona', 'Límite inferior de la sanción económica por infracción grave en protección de datos para un integrante o cargo (Capítulo XV, Art. 15.2.3).', 'placeta', '300', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-PERSONA-GRAVE-MAX', 'Sanción PD grave máxima — persona', 'Límite superior de la sanción económica por infracción grave en protección de datos para un integrante o cargo (Capítulo XV, Art. 15.2.3).', 'placeta', '1500', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-PERSONA-MUYGRAVE-MIN', 'Sanción PD muy grave mínima — persona', 'Límite inferior de la sanción económica por infracción muy grave en protección de datos para un integrante o cargo (Capítulo XV, Art. 15.2.3).', 'placeta', '1500', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-PERSONA-MUYGRAVE-MAX', 'Sanción PD muy grave máxima — persona', 'Límite superior de la sanción económica por infracción muy grave en protección de datos para un integrante o cargo (Capítulo XV, Art. 15.2.3).', 'placeta', '7500', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  // ── Capítulo XV · Sanciones económicas en PD — organizaciones (Art. 15.2.3) ──
  ['CNIC-SANCION-PD-ORG-LEVE-MIN', 'Sanción PD leve mínima — organización', 'Límite inferior de la sanción económica por infracción leve en protección de datos para una organización dependiente (Capítulo XV, Art. 15.2.3).', 'placeta', '100', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-ORG-LEVE-MAX', 'Sanción PD leve máxima — organización', 'Límite superior de la sanción económica por infracción leve en protección de datos para una organización dependiente (Capítulo XV, Art. 15.2.3).', 'placeta', '750', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-ORG-GRAVE-MIN', 'Sanción PD grave mínima — organización', 'Límite inferior de la sanción económica por infracción grave en protección de datos para una organización dependiente (Capítulo XV, Art. 15.2.3).', 'placeta', '750', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-ORG-GRAVE-MAX', 'Sanción PD grave máxima — organización', 'Límite superior de la sanción económica por infracción grave en protección de datos para una organización dependiente (Capítulo XV, Art. 15.2.3).', 'placeta', '3000', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-ORG-MUYGRAVE-MIN', 'Sanción PD muy grave mínima — organización', 'Límite inferior de la sanción económica por infracción muy grave en protección de datos para una organización dependiente (Capítulo XV, Art. 15.2.3).', 'placeta', '3000', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-ORG-MUYGRAVE-MAX', 'Sanción PD muy grave máxima — organización', 'Límite superior de la sanción económica por infracción muy grave en protección de datos para una organización dependiente (Capítulo XV, Art. 15.2.3).', 'placeta', '15000', 'Pz', 'CNI-XV (Art. 15.2.3)'],
  ['CNIC-SANCION-PD-ORG-MUYGRAVE-PCT', 'Techo porcentual sanción PD muy grave — organización', 'Techo de la sanción muy grave en protección de datos para organizaciones: hasta el 4 % del volumen anual de operaciones en Pz si resulta mayor que la escala fija (Capítulo XV, Art. 15.2.3).', 'porcentaje', '4', '%', 'CNI-XV (Art. 15.2.3)'],
];

function numLegible(n) {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 3 }).format(n);
}
function resumenDe(t, v, u) {
  if (t === 'porcentaje') return String(v).replace('.', ',') + ' %';
  return numLegible(Number(v)) + ' ' + u;
}
const FILAS = R.map(([codigo, etiqueta, descripcion, tipo_valor, valor, unidad, articulo]) => ({
  codigo, etiqueta, descripcion, tipo_valor, valor, unidad, articulo,
  vigente: true, es_baremo: false, resumen: resumenDe(tipo_valor, valor, unidad),
}));

function postJson(urlStr, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const data = JSON.stringify(body);
    const req = https.request(u, {
      method: 'POST',
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
    }, (res) => {
      let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  const url = `${SUPABASE_URL}/rest/v1/bop_cnic?on_conflict=codigo`;
  const { status, body } = await postJson(url, FILAS);
  if (status !== 201 && status !== 200) { console.error('No se pudo aplicar', status, body.slice(0, 400)); process.exit(1); }
  console.log(`✅ bop_cnic: ${FILAS.length} valores CNI aplicados (status ${status}).`);
})();
