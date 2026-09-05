#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Aplicar valores curados de Placeta Junior a bop_cnic (Supabase)
   Equivale a ejecutar sql/bolp_cnic_junior.sql pero vía REST. Idempotente
   (upsert por codigo). Uso:  node scripts/aplicar-cnic-junior.js
   ═══════════════════════════════════════════════════════════════════════ */
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';
const KEY = process.env.SUPABASE_SERVICE_KEY || FALLBACK_KEY;

const FILAS = [
  { codigo: 'CNIC-JUNIOR-RBU-DIARIA', etiqueta: 'RBU diaria Placeta Junior', descripcion: 'Cantidad diaria de Renta Básica Universal que Placeta Junior abona a cada menor desde la cuenta de la Fundación.', tipo_valor: 'placeta', valor: '5', unidad: 'Pz/día', articulo: 'Placeta Junior · Academia', vigente: true, es_baremo: false, resumen: '5 Pz/día' },
  { codigo: 'CNIC-JUNIOR-GASTO-DIARIO', etiqueta: 'Límite de gasto diario Placeta Junior', descripcion: 'Límite diario de gasto de la cuenta infantil por defecto (el tutor puede ajustarlo en el control parental).', tipo_valor: 'placeta', valor: '10', unidad: 'Pz/día', articulo: 'Placeta Junior · Control parental', vigente: true, es_baremo: false, resumen: '10 Pz/día' },
  { codigo: 'CNIC-JUNIOR-GASTO-SEMANAL', etiqueta: 'Límite de gasto semanal Placeta Junior', descripcion: 'Límite semanal de gasto de la cuenta infantil por defecto (el tutor puede ajustarlo en el control parental).', tipo_valor: 'placeta', valor: '50', unidad: 'Pz/semana', articulo: 'Placeta Junior · Control parental', vigente: true, es_baremo: false, resumen: '50 Pz/semana' },
  { codigo: 'CNIC-JUNIOR-APROBACION-TUTOR', etiqueta: 'Umbral de aprobación del tutor', descripcion: 'A partir de este importe, las operaciones de Placeta Junior requieren la aprobación del tutor.', tipo_valor: 'placeta', valor: '1000', unidad: 'Pz', articulo: 'Placeta Junior · Control parental', vigente: true, es_baremo: false, resumen: '1000 Pz' },
];

function postJson(urlStr, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const data = JSON.stringify(body);
    const req = https.request(u, {
      method: 'POST',
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
    }, (res) => {
      let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const url = `${SUPABASE_URL}/rest/v1/bop_cnic?on_conflict=codigo`;
  const { status, body } = await postJson(url, FILAS);
  if (status !== 201 && status !== 200) {
    console.error('No se pudo aplicar la migración', status, body.slice(0, 400));
    process.exit(1);
  }
  console.log(`✅ bop_cnic: ${FILAS.length} valores Junior aplicados (status ${status}).`);
}

main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });
