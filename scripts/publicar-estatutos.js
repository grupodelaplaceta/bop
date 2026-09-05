#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Publicar Estatutos de la Asociación (Sección I · Asociativo)
   Inserta/actualiza el documento EST-001 en bop_documentos (idempotente por
   codigo). PROTECCIÓN DE DATOS: el texto publicado NO incluye DNI/NIF de
   nadie y los nombres de las personas fundadoras aparecen censurados
   (nombre + iniciales), según la política del boletín.
   Uso: node scripts/publicar-estatutos.js
   ═══════════════════════════════════════════════════════════════════════ */
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';
const KEY = process.env.SUPABASE_SERVICE_KEY || FALLBACK_KEY;

const ESTATUTOS_MD = `# Estatutos de la Asociación Grupo de La Placeta

**CAPÍTULO I — DISPOSICIONES GENERALES**

**Artículo 1. Denominación.**
Con la denominación GRUPO DE LA PLACETA se constituye una asociación al amparo de la Ley Orgánica 1/2002, de 22 de marzo, reguladora del Derecho de Asociación, y normas complementarias, con personalidad jurídica y plena capacidad de obrar, careciendo de ánimo de lucro.
En todo cuanto no esté previsto en los presentes Estatutos se aplicará la citada Ley Orgánica 1/2002 y las disposiciones complementarias que la desarrollen.

**Artículo 2. Duración.**
La Asociación se constituye por tiempo indefinido.

**Artículo 3. Fines.**
La Asociación tiene como fines:
1. Crear, desarrollar y mantener un ecosistema virtual basado en un juego de rol de carácter virtual, accesible a sus miembros.
2. Fomentar la participación, la creatividad, la cooperación y la toma de decisiones colectivas dentro de dicho entorno virtual.
3. Simular estructuras organizativas, administrativas y normativas internas como parte del desarrollo del juego de rol.
4. Garantizar que todas las actividades del ecosistema se desarrollen sin ánimo de lucro y sin circulación de dinero real.
5. Promover un entorno seguro, inclusivo y respetuoso para todas las personas participantes.

**Artículo 4. Actividades.**
Para el cumplimiento de estos fines se realizarán, entre otras, las siguientes actividades:
1. Gestión y desarrollo de plataformas digitales y entornos virtuales del juego de rol.
2. Creación y aplicación de normas internas ficticias propias del ecosistema del juego.
3. Organización de actividades virtuales, eventos, simulaciones y dinámicas de rol.
4. Designación de cargos internos no oficiales dentro del marco del juego y de la organización asociativa.
5. Elaboración de documentación interna, registros virtuales y materiales informativos.

**Artículo 5. Domicilio social.**
La Asociación establece su domicilio social en Avinguda Pallaresos, número 10, portal 133, 43130, Tarragona, municipio de Tarragona, provincia de Tarragona.
El ámbito territorial en el que va a realizar principalmente sus actividades es todo el territorio del Estado español, desarrollándose dichas actividades principalmente por medios telemáticos.

**CAPÍTULO II — ASAMBLEA GENERAL**

**Artículo 6. Naturaleza y composición.**
La Asamblea General es el órgano supremo de gobierno de la Asociación y estará integrada por todos los socios y socias.

**Artículo 7. Reuniones.**
Las reuniones de la Asamblea General serán ordinarias y extraordinarias.
La Asamblea General ordinaria se celebrará una vez al año dentro de los cuatro meses siguientes al cierre del ejercicio.
Las Asambleas Generales extraordinarias se celebrarán cuando lo estime conveniente la Presidencia, lo acuerde la Junta Directiva o lo solicite por escrito al menos una décima parte de las personas asociadas.
Las reuniones podrán celebrarse de forma presencial, telemática o mixta.

**Artículo 8. Convocatorias.**
Las convocatorias se realizarán por escrito, con indicación del lugar, fecha, hora y orden del día, con una antelación mínima de quince días naturales.

**Artículo 9. Adopción de acuerdos.**
La Asamblea General quedará válidamente constituida en primera convocatoria cuando concurra un tercio de las personas asociadas con derecho a voto y en segunda convocatoria cualquiera que sea el número de asistentes.
Los acuerdos se adoptarán por mayoría simple, salvo los supuestos que requieran mayoría cualificada conforme a la legislación vigente.

**Artículo 10. Facultades.**
Son facultades de la Asamblea General:
1. Aprobar la gestión de la Junta Directiva.
2. Examinar y aprobar las cuentas anuales.
3. Elegir y cesar a los miembros de la Junta Directiva.
4. Modificar los Estatutos.
5. Acordar la disolución de la Asociación.
6. Cualesquiera otras que no estén atribuidas a otro órgano.

**CAPÍTULO III — JUNTA DIRECTIVA**

**Artículo 11. Composición.**
La Asociación será gestionada y representada por una Junta Directiva compuesta, al menos, por una Presidencia y una Secretaría, pudiendo existir Vicepresidencia, Tesorería y Vocalías.
Todos los cargos serán gratuitos y deberán recaer en personas asociadas mayores de edad. Los cargos de la Junta Directiva tendrán una duración de dos años, pudiendo ser reelegidos por períodos de igual duración mediante acuerdo de la Asamblea General. Anualmente podrán incorporarse nuevos cargos mediante acuerdo de la Asamblea General. El cese anticipado, la dimisión o cualquier otra causa de vacante se cubrirá provisionalmente por la Junta Directiva hasta su ratificación en la siguiente Asamblea General.

**Artículo 12. Reuniones.**
La Junta Directiva se reunirá cuando lo convoque la Presidencia o lo solicite al menos un tercio de sus miembros, pudiendo celebrarse las reuniones de forma presencial o telemática.

**Artículo 13. Facultades.**
Corresponde a la Junta Directiva la gestión ordinaria de la Asociación y, en especial:
1. Ejecutar los acuerdos de la Asamblea General.
2. Dirigir las actividades asociativas.
3. Admitir nuevas personas asociadas.
4. Nombrar cargos internos no oficiales de apoyo y colaboración.

**Artículo 14. Presidencia.**
La Presidencia ostenta la representación legal de la Asociación y dirige su funcionamiento.

**Artículo 15. Vicepresidencia.**
La Vicepresidencia sustituirá a la Presidencia en caso de ausencia. Ayudará al presidente en propuestas o decisiones.

**Artículo 16. Secretaría.**
La Secretaría se encargará de la documentación, actas y registros de la Asociación.

**Artículo 16 bis. Certificación de acuerdos.**
La facultad de certificar los acuerdos sociales adoptados tanto por la Asamblea General como por la Junta Directiva corresponde a la persona que ocupe la Secretaría de la Asociación.
Las certificaciones se expedirán con la firma de la Secretaría y el visto bueno de la Presidencia. En caso de ausencia, imposibilidad o vacante de la Secretaría, esta facultad recaerá en la persona que ocupe la Vicepresidencia o, en su defecto, en quien designe la Junta Directiva a tal efecto.

**Artículo 17. Vocales especializados.**
Los vocales especializados tendrán cargos señalados dependiendo su especialización.

**Artículo 18. Vocalías.**
Las Vocalías colaborarán en las tareas que les sean encomendadas.

**Artículo 19. Bajas y suplencias.**
Las vacantes se cubrirán provisionalmente hasta su ratificación por la Asamblea General.

**CAPÍTULO IV — PERSONAS ASOCIADAS**

**Artículo 20. Requisitos.**
Podrá asociarse cualquier persona con capacidad de obrar interesada en los fines de la Asociación.

**Artículo 21. Clases.**
Existirán socios/as fundadores, de número y de honor.

**Artículo 22. Baja.**
La baja podrá producirse por renuncia voluntaria o por incumplimiento grave de los Estatutos.

**Artículo 23. Derechos.**
Las personas asociadas tendrán derecho a participar y votar en las Asambleas Generales.

**Artículo 24. Deberes.**
Las personas asociadas deberán cumplir los Estatutos y los acuerdos válidos de los órganos sociales, incluyendo el código normativo si participan en el entorno simulado de rol.

**Artículo 25. Socios/as de honor.**
Los socios/as de honor podrán asistir a las Asambleas con voz pero sin voto.

**CAPÍTULO V — RÉGIMEN ECONÓMICO**

**Artículo 26. Recursos económicos.**
Los recursos económicos de la Asociación podrán proceder de subvenciones, donaciones lícitas y otros recursos permitidos legalmente.
No se establecen cuotas obligatorias. La cuota ordinaria es de 0 €.

**Artículo 27. Patrimonio.**
La Asociación carece de patrimonio inicial en el momento de su constitución.

**Artículo 28. Ejercicio económico.**
El ejercicio económico será anual y se cerrará el 31 de diciembre.

**CAPÍTULO VI — DISOLUCIÓN**

**Artículo 29. Disolución.**
La Asociación se disolverá por acuerdo de la Asamblea General Extraordinaria.

**Artículo 30. Liquidación.**
En caso de disolución, el patrimonio resultante se destinará a fines no lucrativos acordes con la naturaleza de la Asociación.

---

*Documento fundacional suscrito en Tarragona el 24 de diciembre de 2025 por las personas fundadoras de la Asociación Grupo de La Placeta.*

| Cargo | Persona |
|---|---|
| Presidente | Mikel A. M. |
| Secretario | Unai G. A. |
| Vocal de Comunicación | Salma E. H. |
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
  const fila = {
    codigo: 'EST-001',
    titulo: 'Estatutos de la Asociación Grupo de La Placeta',
    tipo: 'estatuto',
    categoria: 'estatutos',
    seccion: 'asociativo',
    familia: 'estatutos',
    estado: 'vigente',
    version: 1,
    aprobada_en_junta: true,
    fecha_publicacion: '2025-12-24',
    contenido_md: ESTATUTOS_MD,
  };
  const existente = await requestJson('GET', '/rest/v1/bop_documentos?select=id&codigo=eq.EST-001&limit=1');
  const yaExiste = existente.status === 200 && existente.json && existente.json.length;
  const urlBase = '/rest/v1/bop_documentos';
  const r = yaExiste
    ? await requestJson('PATCH', `${urlBase}?codigo=eq.EST-001`, fila)
    : await requestJson('POST', urlBase, [fila]);
  if (r.status !== 200 && r.status !== 201 && r.status !== 204) {
    console.error('No se pudo publicar EST-001', r.status, r.body.slice(0, 400));
    process.exit(1);
  }
  console.log(`✅ EST-001 ${yaExiste ? 'actualizado' : 'publicado'} en bop_documentos (sección asociativo · familia estatutos).`);
}

if (require.main === module) {
  main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });
}
module.exports = { ESTATUTOS_MD };
