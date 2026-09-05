#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Exportar CNIC canónicos de Supabase → public/js/cnic-datos.js
   Genera el espejo local del registro canónico (68 valores atómicos) para
   que el modo offline/estático muestre exactamente lo mismo que producción.
   Ejecutar:  node scripts/exportar-cnic-canonicos.js
   ═══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';
const KEY = process.env.SUPABASE_SERVICE_KEY || FALLBACK_KEY;

function numLegible(v) {
  const n = Number(String(v).replace(',', '.'));
  if (isNaN(n)) return v;
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 3 }).format(n);
}
function resumenDe(x) {
  const v = String(x.valor || '').trim();
  const u = String(x.unidad || '').trim();
  if (x.tipo_valor === 'porcentaje') {
    const n = parseFloat(v.replace(',', '.'));
    if (!isNaN(n)) return String(n).replace('.', ',') + ' %';
    return (v + ' ' + u).trim();
  }
  const n = Number(v.replace(',', '.'));
  return isNaN(n) ? [v, u].filter(Boolean).join(' ') : (numLegible(v) + (u ? ' ' + u : ''));
}

function rest(seg) {
  return new Promise((resolve, reject) => {
    const u = new URL(SUPABASE_URL + seg);
    https.get(u, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } }, (res) => {
      let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(d) }); }
        catch { resolve({ status: res.statusCode, data: null }); }
      });
    }).on('error', reject);
  });
}

async function main() {
  const { status, data } = await rest('/rest/v1/bop_cnic?select=codigo,etiqueta,descripcion,tipo_valor,valor,unidad,articulo,vigente&order=codigo&limit=1000');
  if (status !== 200 || !Array.isArray(data)) { console.error('No se pudo leer bop_cnic', status); process.exit(1); }

  const entradas = data
    .sort((a, b) => String(a.codigo).localeCompare(String(b.codigo)))
    .map((x) => {
      const resumen = resumenDe(x);
      return `  '${x.codigo}': { codigo: '${x.codigo}', etiqueta: ${JSON.stringify(x.etiqueta || '')}, descripcion: ${JSON.stringify(x.descripcion || '')}, tipo_valor: '${x.tipo_valor || 'texto'}', valor: '${String(x.valor == null ? '' : x.valor).replace(/'/g, "\\'")}', unidad: ${JSON.stringify(x.unidad || '')}, articulo: ${JSON.stringify(x.articulo || '')}, vigente: ${x.vigente !== false}, es_baremo: false, resumen: ${JSON.stringify(resumen)} }`;
    });

  const contenido = `/* ═══════════════════════════════════════════════════════════════════════
   CNIC — Registro canónico (espejo de Supabase · bop_cnic)
   Valores atómicos utilizables en código ({{CNIC-XXXX}}, APIs, apps).
   GENERADO por scripts/exportar-cnic-canonicos.js — no editar a mano.
   ═══════════════════════════════════════════════════════════════════════ */

const BOP_CNIC_DATOS = {
${entradas.join(',\n')}
};

if (typeof window !== 'undefined') {
  window.BOP_CNIC_DATOS = BOP_CNIC_DATOS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BOP_CNIC_DATOS };
}
`;
  const out = path.join(__dirname, '..', 'public', 'js', 'cnic-datos.js');
  fs.writeFileSync(out, contenido, 'utf8');
  console.log(`✅ ${out} generado con ${entradas.length} CNIC canónicos.`);
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
