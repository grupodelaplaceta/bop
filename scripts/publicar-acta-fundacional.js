#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Publicar Acta Fundacional (ACTA-FUND-001) + responsable Estatutos
   Inserta/actualiza en bop_documentos:
     · ACTA-FUND-001 · Acta Fundacional (Sección IV · actas)
       Órgano responsable: Junta del Grupo de La Placeta.
     · EST-001 · fija organo_responsable = Junta del Grupo de La Placeta.
   PROTECCIÓN DE DATOS: el texto NO incluye NIF/NI de nadie ni domicilios;
   las personas fundadoras aparecen censuradas (nombre + iniciales).
   Uso: node scripts/publicar-acta-fundacional.js
   ═══════════════════════════════════════════════════════════════════════ */
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';
const KEY = process.env.SUPABASE_SERVICE_KEY || FALLBACK_KEY;

const ORGANO = 'Junta del Grupo de La Placeta';

const ACTA_MD = `# Acta Fundacional

**Grupo de La Placeta · Tarragona, 23 de diciembre de 2025**

Reunidas en Tarragona el día 23 de diciembre de 2025, a las 13:00 horas, las personas fundadoras que se detallan a continuación *(datos personales censurados conforme a la política de protección de datos del Boletín; no constan NIF ni domicilios)*:

| Persona fundadora | Nacionalidad |
|---|---|
| Mikel A. M. | Española |
| Salma E. H. | Española |
| Unai G. A. | Española |

Acuerdan:

1. **Constitución.** Constituir una asociación al amparo de la Ley Orgánica 1/2002, de 22 de marzo, reguladora del Derecho de Asociación, que se denominará **GRUPO DE LA PLACETA**.
2. **Estatutos.** Aprobar los Estatutos que se incorporan a esta Acta Fundacional como anexo, por los que se va a regir la entidad; fueron leídos en este mismo acto y aprobados por unanimidad de las personas reunidas.
3. **Junta Directiva.** Designar la Junta Directiva de la entidad, cuya composición de cargos es la siguiente:
   - Presidencia: Mikel A. M.
   - Secretaría: Unai G. A.
   - Vocalía de Comunicación: Salma E. H.
4. **Verificación de identidad.** Consentir a la Administración encargada de la inscripción registral para que sean comprobados los datos de identidad de las personas firmantes (RD 522/2006, de 28 de abril).

Sin más asuntos que tratar, se levanta la sesión siendo las 15:00 horas del día de la fecha.

---

*Firman esta acta las personas fundadoras de la Asociación Grupo de La Placeta (firmas censuradas). Documento publicado por la Junta del Grupo de La Placeta.*
`;

function requestJson(method, seg, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(SUPABASE_URL + seg);
    const data = body ? JSON.stringify(body) : null;
    const req = https.request(u, {
      method,
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
    }, (res) => {
      let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => {
        let j = null;
        try { j = d ? JSON.parse(d) : null; } catch { /* no json */ }
        resolve({ status: res.statusCode, json: j, body: d });
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function upsert(codigo, fila) {
  const existente = await requestJson('GET', `/rest/v1/bop_documentos?select=id&codigo=eq.${codigo}&limit=1`);
  const yaExiste = existente.status === 200 && existente.json && existente.json.length;
  const r = yaExiste
    ? await requestJson('PATCH', `/rest/v1/bop_documentos?codigo=eq.${codigo}`, fila)
    : await requestJson('POST', '/rest/v1/bop_documentos', [fila]);
  if (![200, 201, 204].includes(r.status)) throw new Error(`${codigo}: ${r.status} ${r.body.slice(0, 300)}`);
  return yaExiste ? 'actualizado' : 'publicado';
}

async function main() {
  const fechas = { fecha_publicacion: '2025-12-23', fecha_entrada_vigor: '2025-12-23', fecha_aprobacion_junta: '2025-12-23' };
  const acta = {
    codigo: 'ACTA-FUND-001',
    titulo: 'Acta Fundacional — Grupo de La Placeta',
    tipo: 'acta', categoria: 'actas',
    seccion: 'funcionamiento', familia: 'actas',
    organo_responsable: ORGANO,
    estado: 'vigente', version: 1, aprobada_en_junta: true,
    ...fechas, contenido_md: ACTA_MD,
  };
  const rActa = await upsert('ACTA-FUND-001', acta);
  console.log(`✅ ACTA-FUND-001 ${rActa} (sección IV · actas · ${ORGANO}).`);

  const rEst = await upsert('EST-001', { organo_responsable: ORGANO, aprobada_en_junta: true });
  console.log(`✅ EST-001 ${rEst} (órgano responsable → ${ORGANO}).`);
}

if (require.main === module) {
  main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });
}
module.exports = { ACTA_MD, ORGANO };
