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

/* Valores curados de Placeta Junior que el CNI-BANCO no recoge todavía.
   Si ya existen en bop_cnic (con su articulo oficial), manda la base; estos
   son el respaldo para que el espejo y el modo offline los tengan SIEMPRE.
   Se insertan en bop_cnic mediante scripts/insertar-cnic-junior.js. */
const JUNIOR_EXTRAS = [
  {
    codigo: 'CNIC-JUNIOR-RBU-DIARIA',
    etiqueta: 'RBU diaria Placeta Junior',
    descripcion: 'Cantidad diaria de Renta Básica Universal que Placeta Junior abona a cada menor desde la cuenta de la Fundación.',
    tipo_valor: 'placeta', valor: '5', unidad: 'Pz/día', articulo: 'Placeta Junior · Academia', vigente: true,
  },
  {
    codigo: 'CNIC-JUNIOR-GASTO-DIARIO',
    etiqueta: 'Límite de gasto diario Placeta Junior',
    descripcion: 'Límite diario de gasto de la cuenta infantil por defecto (el tutor puede ajustarlo en el control parental).',
    tipo_valor: 'placeta', valor: '10', unidad: 'Pz/día', articulo: 'Placeta Junior · Control parental', vigente: true,
  },
  {
    codigo: 'CNIC-JUNIOR-GASTO-SEMANAL',
    etiqueta: 'Límite de gasto semanal Placeta Junior',
    descripcion: 'Límite semanal de gasto de la cuenta infantil por defecto (el tutor puede ajustarlo en el control parental).',
    tipo_valor: 'placeta', valor: '50', unidad: 'Pz/semana', articulo: 'Placeta Junior · Control parental', vigente: true,
  },
  {
    codigo: 'CNIC-JUNIOR-APROBACION-TUTOR',
    etiqueta: 'Umbral de aprobación del tutor',
    descripcion: 'A partir de este importe, las operaciones de Placeta Junior requieren la aprobación del tutor.',
    tipo_valor: 'placeta', valor: '1000', unidad: 'Pz', articulo: 'Placeta Junior · Control parental', vigente: true,
  },
];

async function main() {
  const { status, data } = await rest('/rest/v1/bop_cnic?select=codigo,etiqueta,descripcion,tipo_valor,valor,unidad,articulo,vigente&order=codigo&limit=1000');
  if (status !== 200 || !Array.isArray(data)) { console.error('No se pudo leer bop_cnic', status); process.exit(1); }

  // La base manda; los curados solo completan lo que aún no está en bop_cnic.
  const porCodigo = new Map(data.map((x) => [String(x.codigo), x]));
  const extras = JUNIOR_EXTRAS
    .filter((e) => !porCodigo.has(e.codigo))
    .map((e) => ({ ...e, descripcion: e.descripcion, etiqueta: e.etiqueta }));
  const mezcla = [...data, ...extras].sort((a, b) => String(a.codigo).localeCompare(String(b.codigo)));

  const entradas = mezcla
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
