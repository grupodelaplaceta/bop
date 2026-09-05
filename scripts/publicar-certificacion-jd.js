#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Publicar Certificación del Acuerdo Bancario de la Junta Directiva
   Documento CERT-JD-001 (Sección IV · Documentación de funcionamiento ·
   familia actas). Órgano responsable: Junta del Grupo de La Placeta.
   El documento enlaza al PDF firmado alojado en public/archivos/.
   Uso: node scripts/publicar-certificacion-jd.js
   ═══════════════════════════════════════════════════════════════════════ */
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';
const KEY = process.env.SUPABASE_SERVICE_KEY || FALLBACK_KEY;

const CERT_MD = `# Certificación del Acuerdo Bancario de la Junta Directiva

**Asociación Grupo de La Placeta**

Quien suscribe, en calidad de Secretario de la Junta Directiva de la Asociación Grupo de La Placeta (domicilio social en Tarragona), **certifica**:

Que en la reunión extraordinaria de la Junta Directiva, válidamente convocada y celebrada por medios telemáticos el **11 de junio de 2026**, con la asistencia de los miembros exigidos por los Estatutos vigentes, se adoptó por unanimidad el siguiente acuerdo relativo a la agilización de la gestión bancaria y de tesorería de la entidad:

**Primero. Concesión de facultades bancarias y apoderamiento.**
Ante la ausencia de facultades bancarias expresas en el texto estatutario vigente, y con el fin de dotar a la Asociación de la agilidad necesaria para su funcionamiento diario, se aprueba la creación de un registro de apoderamiento y disposición de cuentas de la entidad ante las instituciones bancarias pertinentes.

**Segundo. Designación de personas autorizadas.**
Se acuerda delegar de forma expresa la facultad de disposición, gestión y administración de las cuentas corrientes, libretas de ahorro y cualquier otro producto financiero formalizado a nombre de la Asociación en las siguientes personas miembros de la Junta Directiva *(datos personales censurados: no constan NIF)*:

1. Presidente — Mikel A. M.
2. Secretario — Unai G. A.
3. Vocal de Comunicación — Salma E. H.

**Tercero. Régimen de actuación indistinta (solidaria).**
Para evitar trabas administrativas y asegurar la máxima eficiencia operativa, las facultades delegadas se ejercerán bajo el régimen de actuación solidaria o indistinta: bastará la firma de una cualquiera de las personas autorizadas enumeradas para obligar a la Asociación y realizar válidamente cualquier operación bancaria, sin necesidad de concurrencia de otras firmas.

**Cuarto. Alcance de las facultades delegadas.**
La persona autorizada podrá realizar, con su única firma, en el marco operativo y legal de la entidad:

- Abrir, seguir operando, mantener y cancelar cuentas corrientes o productos financieros a nombre de la Asociación.
- Disponer de los fondos constituidos en dichas cuentas mediante transferencias, cheques, reintegros u órdenes de pago.
- Solicitar y gestionar las credenciales de banca digital, extractos bancarios y herramientas de control contable.

Y para que así conste y surta los efectos oportunos ante las entidades financieras correspondientes, se expide la presente certificación en Tarragona, a 11 de junio de 2026.

---

*Firman la Presidencia y la Secretaría de la Junta Directiva del Grupo de La Placeta (firmas censuradas). Documento publicado por la Junta del Grupo de La Placeta.*
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

async function main() {
  const codigo = 'CERT-JD-001';
  const fila = {
    codigo,
    titulo: 'Certificación del Acuerdo Bancario de la Junta Directiva',
    tipo: 'cni', categoria: 'organizacion',
    seccion: 'asociativo', familia: 'organizacion',
    organo_responsable: 'Junta del Grupo de La Placeta',
    estado: 'vigente', version: 1, aprobada_en_junta: true,
    fecha_publicacion: '2026-06-11',
    fecha_entrada_vigor: '2026-06-11',
    contenido_md: CERT_MD,
  };
  const existente = await requestJson('GET', `/rest/v1/bop_documentos?select=id&codigo=eq.${codigo}&limit=1`);
  const yaExiste = existente.status === 200 && existente.json && existente.json.length;
  const r = yaExiste
    ? await requestJson('PATCH', `/rest/v1/bop_documentos?codigo=eq.${codigo}`, fila)
    : await requestJson('POST', '/rest/v1/bop_documentos', [fila]);
  if (![200, 201, 204].includes(r.status)) throw new Error(`${codigo}: ${r.status} ${r.body.slice(0, 300)}`);
  console.log(`✅ ${codigo} ${yaExiste ? 'actualizado' : 'publicado'} (Sección IV · actas · Junta del Grupo de La Placeta).`);
}

if (require.main === module) {
  main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });
}
module.exports = { CERT_MD };
