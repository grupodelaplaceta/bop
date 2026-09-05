/* ═══════════════════════════════════════════════════════════════════════
   BOP — Migración del Código Normativo Interno (CNI)
   Fuente: CODIGO_NORMATIVO_INTERNO.pdf (edición unificada, aprobada por la
   Junta Directiva el 3 de julio de 2026). Se migra TODO el contenido.
   Estatutos: VACÍOS por ahora (no estaban en el PDF).
   Estructura BOP: Estatutos / CNI (capítulos, sistemas, programas) / CNIC.
   ═══════════════════════════════════════════════════════════════════════ */

const BOP_MIGRADOS = {
  // ── ESTATUTOS (VACÍOS por ahora: no estaban en el PDF del CNI) ─────────
  estatutos: [
    {
      codigo: 'EST-001',
      titulo: 'Estatutos de la Asociación Grupo de La Placeta',
      organo_responsable: 'Junta del Grupo de La Placeta',
      categoria: 'estatutos',
      estado: 'vigente',
      fecha_publicacion: '2025-12-24',
      fecha_aprobacion_junta: '2025-12-24',
      aprobada_en_junta: true,
      contenido_md: "# Estatutos de la Asociación Grupo de La Placeta\n\n**CAPÍTULO I — DISPOSICIONES GENERALES**\n\n**Artículo 1. Denominación.**\nCon la denominación GRUPO DE LA PLACETA se constituye una asociación al amparo de la Ley Orgánica 1/2002, de 22 de marzo, reguladora del Derecho de Asociación, y normas complementarias, con personalidad jurídica y plena capacidad de obrar, careciendo de ánimo de lucro.\nEn todo cuanto no esté previsto en los presentes Estatutos se aplicará la citada Ley Orgánica 1/2002 y las disposiciones complementarias que la desarrollen.\n\n**Artículo 2. Duración.**\nLa Asociación se constituye por tiempo indefinido.\n\n**Artículo 3. Fines.**\nLa Asociación tiene como fines:\n1. Crear, desarrollar y mantener un ecosistema virtual basado en un juego de rol de carácter virtual, accesible a sus miembros.\n2. Fomentar la participación, la creatividad, la cooperación y la toma de decisiones colectivas dentro de dicho entorno virtual.\n3. Simular estructuras organizativas, administrativas y normativas internas como parte del desarrollo del juego de rol.\n4. Garantizar que todas las actividades del ecosistema se desarrollen sin ánimo de lucro y sin circulación de dinero real.\n5. Promover un entorno seguro, inclusivo y respetuoso para todas las personas participantes.\n\n**Artículo 4. Actividades.**\nPara el cumplimiento de estos fines se realizarán, entre otras, las siguientes actividades:\n1. Gestión y desarrollo de plataformas digitales y entornos virtuales del juego de rol.\n2. Creación y aplicación de normas internas ficticias propias del ecosistema del juego.\n3. Organización de actividades virtuales, eventos, simulaciones y dinámicas de rol.\n4. Designación de cargos internos no oficiales dentro del marco del juego y de la organización asociativa.\n5. Elaboración de documentación interna, registros virtuales y materiales informativos.\n\n**Artículo 5. Domicilio social.**\nLa Asociación establece su domicilio social en Avinguda Pallaresos, número 10, portal 133, 43130, Tarragona, municipio de Tarragona, provincia de Tarragona.\nEl ámbito territorial en el que va a realizar principalmente sus actividades es todo el territorio del Estado español, desarrollándose dichas actividades principalmente por medios telemáticos.\n\n**CAPÍTULO II — ASAMBLEA GENERAL**\n\n**Artículo 6. Naturaleza y composición.**\nLa Asamblea General es el órgano supremo de gobierno de la Asociación y estará integrada por todos los socios y socias.\n\n**Artículo 7. Reuniones.**\nLas reuniones de la Asamblea General serán ordinarias y extraordinarias.\nLa Asamblea General ordinaria se celebrará una vez al año dentro de los cuatro meses siguientes al cierre del ejercicio.\nLas Asambleas Generales extraordinarias se celebrarán cuando lo estime conveniente la Presidencia, lo acuerde la Junta Directiva o lo solicite por escrito al menos una décima parte de las personas asociadas.\nLas reuniones podrán celebrarse de forma presencial, telemática o mixta.\n\n**Artículo 8. Convocatorias.**\nLas convocatorias se realizarán por escrito, con indicación del lugar, fecha, hora y orden del día, con una antelación mínima de quince días naturales.\n\n**Artículo 9. Adopción de acuerdos.**\nLa Asamblea General quedará válidamente constituida en primera convocatoria cuando concurra un tercio de las personas asociadas con derecho a voto y en segunda convocatoria cualquiera que sea el número de asistentes.\nLos acuerdos se adoptarán por mayoría simple, salvo los supuestos que requieran mayoría cualificada conforme a la legislación vigente.\n\n**Artículo 10. Facultades.**\nSon facultades de la Asamblea General:\n1. Aprobar la gestión de la Junta Directiva.\n2. Examinar y aprobar las cuentas anuales.\n3. Elegir y cesar a los miembros de la Junta Directiva.\n4. Modificar los Estatutos.\n5. Acordar la disolución de la Asociación.\n6. Cualesquiera otras que no estén atribuidas a otro órgano.\n\n**CAPÍTULO III — JUNTA DIRECTIVA**\n\n**Artículo 11. Composición.**\nLa Asociación será gestionada y representada por una Junta Directiva compuesta, al menos, por una Presidencia y una Secretaría, pudiendo existir Vicepresidencia, Tesorería y Vocalías.\nTodos los cargos serán gratuitos y deberán recaer en personas asociadas mayores de edad. Los cargos de la Junta Directiva tendrán una duración de dos años, pudiendo ser reelegidos por períodos de igual duración mediante acuerdo de la Asamblea General. Anualmente podrán incorporarse nuevos cargos mediante acuerdo de la Asamblea General. El cese anticipado, la dimisión o cualquier otra causa de vacante se cubrirá provisionalmente por la Junta Directiva hasta su ratificación en la siguiente Asamblea General.\n\n**Artículo 12. Reuniones.**\nLa Junta Directiva se reunirá cuando lo convoque la Presidencia o lo solicite al menos un tercio de sus miembros, pudiendo celebrarse las reuniones de forma presencial o telemática.\n\n**Artículo 13. Facultades.**\nCorresponde a la Junta Directiva la gestión ordinaria de la Asociación y, en especial:\n1. Ejecutar los acuerdos de la Asamblea General.\n2. Dirigir las actividades asociativas.\n3. Admitir nuevas personas asociadas.\n4. Nombrar cargos internos no oficiales de apoyo y colaboración.\n\n**Artículo 14. Presidencia.**\nLa Presidencia ostenta la representación legal de la Asociación y dirige su funcionamiento.\n\n**Artículo 15. Vicepresidencia.**\nLa Vicepresidencia sustituirá a la Presidencia en caso de ausencia. Ayudará al presidente en propuestas o decisiones.\n\n**Artículo 16. Secretaría.**\nLa Secretaría se encargará de la documentación, actas y registros de la Asociación.\n\n**Artículo 16 bis. Certificación de acuerdos.**\nLa facultad de certificar los acuerdos sociales adoptados tanto por la Asamblea General como por la Junta Directiva corresponde a la persona que ocupe la Secretaría de la Asociación.\nLas certificaciones se expedirán con la firma de la Secretaría y el visto bueno de la Presidencia. En caso de ausencia, imposibilidad o vacante de la Secretaría, esta facultad recaerá en la persona que ocupe la Vicepresidencia o, en su defecto, en quien designe la Junta Directiva a tal efecto.\n\n**Artículo 17. Vocales especializados.**\nLos vocales especializados tendrán cargos señalados dependiendo su especialización.\n\n**Artículo 18. Vocalías.**\nLas Vocalías colaborarán en las tareas que les sean encomendadas.\n\n**Artículo 19. Bajas y suplencias.**\nLas vacantes se cubrirán provisionalmente hasta su ratificación por la Asamblea General.\n\n**CAPÍTULO IV — PERSONAS ASOCIADAS**\n\n**Artículo 20. Requisitos.**\nPodrá asociarse cualquier persona con capacidad de obrar interesada en los fines de la Asociación.\n\n**Artículo 21. Clases.**\nExistirán socios/as fundadores, de número y de honor.\n\n**Artículo 22. Baja.**\nLa baja podrá producirse por renuncia voluntaria o por incumplimiento grave de los Estatutos.\n\n**Artículo 23. Derechos.**\nLas personas asociadas tendrán derecho a participar y votar en las Asambleas Generales.\n\n**Artículo 24. Deberes.**\nLas personas asociadas deberán cumplir los Estatutos y los acuerdos válidos de los órganos sociales, incluyendo el código normativo si participan en el entorno simulado de rol.\n\n**Artículo 25. Socios/as de honor.**\nLos socios/as de honor podrán asistir a las Asambleas con voz pero sin voto.\n\n**CAPÍTULO V — RÉGIMEN ECONÓMICO**\n\n**Artículo 26. Recursos económicos.**\nLos recursos económicos de la Asociación podrán proceder de subvenciones, donaciones lícitas y otros recursos permitidos legalmente.\nNo se establecen cuotas obligatorias. La cuota ordinaria es de 0 €.\n\n**Artículo 27. Patrimonio.**\nLa Asociación carece de patrimonio inicial en el momento de su constitución.\n\n**Artículo 28. Ejercicio económico.**\nEl ejercicio económico será anual y se cerrará el 31 de diciembre.\n\n**CAPÍTULO VI — DISOLUCIÓN**\n\n**Artículo 29. Disolución.**\nLa Asociación se disolverá por acuerdo de la Asamblea General Extraordinaria.\n\n**Artículo 30. Liquidación.**\nEn caso de disolución, el patrimonio resultante se destinará a fines no lucrativos acordes con la naturaleza de la Asociación.\n\n---\n\n*Documento fundacional suscrito en Tarragona el 24 de diciembre de 2025 por las personas fundadoras de la Asociación Grupo de La Placeta.*\n\n| Cargo | Persona |\n|---|---|\n| Presidente | Mikel A. M. |\n| Secretario | Unai G. A. |\n| Vocal de Comunicación | Salma E. H. |\n"
    },
    {
      codigo: 'ACTA-FUND-001',
      titulo: 'Acta Fundacional — Grupo de La Placeta',
      tipo: 'acta',
      categoria: 'organizacion',
      seccion: 'asociativo',
      familia: 'organizacion',
      organo_responsable: 'Junta del Grupo de La Placeta',
      estado: 'vigente',
      fecha_publicacion: '2025-12-23',
      fecha_entrada_vigor: '2025-12-23',
      fecha_aprobacion_junta: '2025-12-23',
      aprobada_en_junta: true,
      contenido_md: `# Acta Fundacional

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

*Firman esta acta las personas fundadoras de la Asociación Grupo de La Placeta (firmas censuradas). Documento publicado por la Junta del Grupo de La Placeta.*`
    },
    {
      codigo: 'CERT-JD-001',
      titulo: 'Certificación del Acuerdo Bancario de la Junta Directiva',
      tipo: 'cni',
      categoria: 'organizacion',
      seccion: 'asociativo',
      familia: 'organizacion',
      organo_responsable: 'Junta del Grupo de La Placeta',
      estado: 'vigente',
      fecha_publicacion: '2026-06-11',
      fecha_entrada_vigor: '2026-06-11',
      aprobada_en_junta: true,
      contenido_md: `# Certificación del Acuerdo Bancario de la Junta Directiva

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

*Firman la Presidencia y la Secretaría de la Junta Directiva del Grupo de La Placeta (firmas censuradas). Documento publicado por la Junta del Grupo de La Placeta.*`
    }
  ],

  // ── CNI — Capítulos completos migrados del PDF ────────────────────────
  cni: [
    {
      codigo: 'CNI-PREAMBULO',
      titulo: 'Preámbulo — Fundamento y derogación de versiones anteriores',
      categoria: 'general',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# Preámbulo

El presente Código Normativo Interno regula de forma integral el funcionamiento del Grupo de La Placeta (GDLP). Sustituye y deroga íntegramente la Normativa Institucional Unificada v5.0 y todas las versiones que ésta a su vez derogaba (v4.0, v3.0, v2.1, v2.0, la Normativa de Protección de Datos para Organizaciones Dependientes v1.0 y el Reglamento Normativo Institucional v1.0). Toda referencia a cualquiera de las versiones anteriores debe entenderse hecha a este documento.

Esta edición, aprobada por la Junta Directiva el **3 de julio de 2026**, incorpora las siguientes novedades respecto de la versión anterior:

- Diferenciación del bono de bienvenida para menores de 16 años y régimen transitorio de regularización de altas anteriores (Cap. III).
- Actualización del sistema PlacetaID a su versión 5, con la incorporación de la aplicación «PlacetaID Móvil» y su marco normativo de protección de datos (Cap. II).
- Reordenación del Salario Mínimo Interprofesional a base mensual y creación de un Salario Máximo Interprofesional (Cap. IV).
- Creación del Impuesto de Grandes Fortunas (IGF) y nueva periodicidad mensual de liquidación del Impuesto de Regulación Monetaria (IRM) (Cap. IV).
- Actualización de la tabla de Sueldos Públicos (Cap. VII).
- Habilitación del uso de agentes de Inteligencia Artificial en la gestión de determinados departamentos (Cap. V).
- Incorporación de un régimen específico de conservación de datos vinculados a expulsiones definitivas (Cap. XI).

Las disposiciones de protección de datos son de cumplimiento obligatorio con independencia del carácter lúdico o ficticio de las actividades internas del Grupo, por cuanto el tratamiento de datos personales reales de los integrantes está sujeto en todo caso al RGPD (UE) 2016/679 y a la LOPDGDD 3/2018. En caso de contradicción entre normas de este mismo documento, prevalece el texto que ofrezca mayor protección a los derechos de los integrantes.`
    },
    {
      codigo: 'CNI-I',
      titulo: 'Capítulo I: Altas al Sistema',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO I — ALTAS AL SISTEMA

## § 1. Principio general de acceso

### Art. 1 — Acceso universal con autorización

El acceso al Grupo de La Placeta está abierto a cualquier persona, con independencia de su edad, siempre que se cumplan los requisitos de este Capítulo. La minoría de edad queda suplida mediante la autorización expresa de un integrante mayor de edad activo, que asume responsabilidad subsidiaria sobre la conducta del tutelado.

### Art. 2 — Tabla de modalidades de alta

| Edad | Modalidad | Acceso | Requisito |
|---|---|---|---|
| Cualquier edad (menor) | Alta tutelada | Acceso completo con restricciones de franja | Autorización expresa de un mayor de edad activo |
| Menos de 16 años | Tutelada básica | Básica + banco Junior básica (500 Pz / 50 Pz día) | Autorización mayor + supervisión mensual Administración |
| 16 a 17 años | Tutelada senior | Plena sin cargos directivos + banco Junior senior (1.000 Pz / 100 Pz día) | Autorización mayor + notificación a Administración |
| 18 años o más | Alta plena | Acceso total, cargos, banco pleno, PlacetaID completo | Aprobación formal de la Junta + aceptación del Reglamento |

### Art. 3 — Alta plena: 18 años o más

El alta plena otorga acceso total: todos los espacios, cualquier cargo, cuenta ciudadana plena y PlacetaID completo. El procedimiento requiere presentación de solicitud ante la Administración, traslado a la Junta en 3 días hábiles, resolución de la Junta en 7 días hábiles, y aceptación formal del Reglamento y esta Normativa antes del acceso.

La Junta puede denegar el alta sin motivación pública. La denegación no impide nueva solicitud transcurridos 30 días.

### Art. 4 — Falsificación en el proceso de alta y baja

La falsificación de la edad o la suplantación de un tutor interno constituye infracción muy grave con expulsión inmediata definitiva. La baja voluntaria conlleva el cierre de la cuenta bancaria, devolución del saldo disponible y revocación del PlacetaID y el DIP.`
    },
    {
      codigo: 'CNI-II',
      titulo: 'Capítulo II: PlacetaID y Documento de Identidad (DIP)',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO II — PLACETAID Y DOCUMENTO DE IDENTIDAD (DIP)

### Art. 5 — Naturaleza del PlacetaID

El PlacetaID es la pasarela de identificación oficial del GDLP. Autentica a cada integrante de forma inequívoca y acredita su edad verificada. Es obligatorio para acceder a servicios restringidos por edad: loterías, inversiones con azar y servicios bancarios avanzados.

### Art. 6 — El Documento de Identidad de la Placeta (DIP)

El DIP es el certificado oficial expedido por la Junta que acredita la condición de integrante. Contiene: alias oficial, número de DIP único, franja de edad verificada, modalidad de alta, fecha de expedición y código QR vinculado al PlacetaID. Tanto el PlacetaID como el DIP son emitidos y gestionados directamente por la Junta.

La falsificación del PlacetaID o del DIP, así como el uso de identificadores de terceros, constituye infracción muy grave con expulsión definitiva.

## § 1 bis. Actualización a PlacetaID v5 — Aplicación «PlacetaID Móvil» (NUEVO)

### Art. 6.1 — Naturaleza de la actualización

Se aprueba la actualización del sistema PlacetaID a su versión 5, que incorpora una aplicación oficial para Android denominada PlacetaID Móvil. La aplicación permite almacenar uno o varios PlacetaID en un mismo dispositivo y autorizar solicitudes de autenticación mediante un único gesto, reforzado con verificación biométrica del propio dispositivo.

### Art. 6.2 — Doble vía de acceso en id.laplaceta.org

El portal id.laplaceta.org ofrecerá en sus pantallas de inicio de sesión dos vías de acceso equivalentes, cada una identificada mediante icono y descripción propios: (a) Acceso vía 2FA, mediante código de un solo uso; y (b) Acceso vía PlacetaID Móvil, mediante autorización desde la aplicación. Ambas vías tendrán la misma validez a efectos de autenticación.

### Art. 6.3 — Procedimiento de autorización mediante la aplicación

Al seleccionar la vía PlacetaID Móvil, el portal generará una solicitud identificada con un código alfanumérico único (por ejemplo, «6GH2») y mostrará un botón de redirección hacia la aplicación. Dentro de la aplicación, el integrante visualizará las solicitudes pendientes asociadas a cada PlacetaID almacenado, incluyendo la plataforma o servicio del que procede la solicitud, y podrá autorizarla o denegarla mediante verificación biométrica. Resuelta la solicitud, id.laplaceta.org redirigirá automáticamente al integrante en función del resultado.

### Art. 6.4 — Estado y trazabilidad de los PlacetaID vinculados

La aplicación mostrará, para cada PlacetaID almacenado, su estado vigente (activo, inactivo o bloqueado por la Administración) y un historial de eventos de acceso asociado a dicho PlacetaID.

### Art. 6.5 — Exclusividad dispositivo-identidad

Un mismo dispositivo no podrá vincularse a un PlacetaID cuando dicho PlacetaID ya se encuentre vinculado a otro dispositivo distinto. En todo caso, y con independencia del estado de vinculación de la aplicación, el integrante podrá continuar autenticándose mediante el método 2FA tradicional, que permanece disponible sin restricción.

### Art. 6.6 — Identidad visual de la aplicación

La aplicación PlacetaID Móvil seguirá la estética institucional del sistema PlacetaID, incorporando el tono **#1C005F** como color principal de la interfaz, aplicado igualmente a la pantalla de bienvenida (splash) y al logotipo de la aplicación.

## § 2 bis. Protección de datos de PlacetaID Móvil (NUEVO)

Los siguientes artículos incorporan al presente Código, en formato normativo, el régimen de protección de datos aplicable a la aplicación PlacetaID Móvil, cuyo responsable del tratamiento es el Grupo de La Placeta.

### Art. 6.7 — Datos tratados

La aplicación tratará exclusivamente: (a) datos de identificación del PlacetaID almacenado —número de DIP, nombre y apellidos, rol y estado—, con fines de visualización en la propia interfaz; y (b) datos técnicos del dispositivo estrictamente necesarios para su funcionamiento —token de mensajería push, identificador único de dispositivo y nombre del dispositivo—. La aplicación no recabará datos de uso, analítica ni telemetría, ni los cederá a terceros con fines ajenos a la autenticación.

### Art. 6.8 — Datos biométricos

La verificación biométrica se realizará exclusivamente a través del sistema operativo del dispositivo, dentro de su entorno seguro. La aplicación no almacena ni transmite al servidor dato biométrico alguno; únicamente recibe la confirmación del resultado de la verificación (correcta o fallida).

### Art. 6.9 — Medidas de seguridad técnica

Los datos locales de la aplicación se almacenarán cifrados mediante un algoritmo de cifrado fuerte, con la clave protegida por el almacén seguro del sistema operativo, y con las copias de seguridad automáticas del contenedor de la aplicación desactivadas. Las comunicaciones con el servidor se realizarán exclusivamente mediante conexión cifrada. Las solicitudes de autenticación caducarán automáticamente a los cinco minutos de su generación.

### Art. 6.10 — Encargados y terceros: mensajería push

Para el envío de notificaciones push, la aplicación compartirá con el proveedor de mensajería únicamente el token del dispositivo, dato estrictamente necesario para la entrega de dichas notificaciones. Fuera de este supuesto, la aplicación no comunica ni cede datos personales a terceros, ni emplea servicios de publicidad, analítica o redes sociales.

### Art. 6.11 — Derechos del integrante en relación con PlacetaID Móvil

Desde la propia aplicación, el integrante podrá: acceder a los PlacetaID vinculados, eliminar la totalidad de sus datos locales, exportar la información disponible y desvincular el dispositivo sin que ello implique el borrado de los datos locales. El ejercicio de los restantes derechos reconocidos en el Art. 8.4 se canalizará conforme al procedimiento general de este Código.

### Art. 6.12 — Conservación de datos de PlacetaID Móvil

Los datos de vinculación dispositivo-DIP se conservarán mientras el dispositivo permanezca vinculado. Las solicitudes de autenticación se eliminan automáticamente transcurridos cinco minutos desde su generación. El historial de accesos se conservará conforme a la política interna de auditoría y seguridad del GDLP y a los plazos generales establecidos en el Capítulo XII.`
    },
    {
      codigo: 'CNI-III',
      titulo: 'Capítulo III: Banco de La Placeta',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      cnic_refs: [
        { codigo: 'CNIC-7-1', etiqueta: 'Cuentas y límites por franja de edad' },
        { codigo: 'CNIC-9-1', etiqueta: 'Límite de emisión por usuario' }
      ],
      contenido_md: `# CAPÍTULO III — BANCO DE LA PLACETA

## § 2. Cuentas y límites por franja de edad

### Art. 7 — Tipos de cuenta y restricciones (ACTUALIZADO)

| Franja | Tipo cuenta | Saldo máx. | Transfer. diaria | Bono bienvenida |
|---|---|---|---|---|
| Menos de 16 años | Junior básica | 500 Pz | 50 Pz / día | 750 Pz |
| 16 a 17 años | Junior senior | 1.000 Pz | 100 Pz / día | 500 Pz |
| 18+ años (alta plena) | Ciudadana plena | 500.000 Pz | Sin límite | 500 Pz |
| Empresarial / Estatal | Institucional | 10.000.000 Pz | Según presupuesto | — |

### Art. 8 — Bono de bienvenida (ACTUALIZADO)

Todo integrante que cause alta recibirá un bono de bienvenida acreditado en su cuenta al abrirse, conforme a la cuantía establecida en el Art. 7 según su franja de edad: **750 Pz** para los integrantes menores de 16 años (alta tutelada básica), y **500 Pz** para el resto de modalidades de alta. Lo abona el Banco de La Placeta; si no puede hacerlo por falta de liquidez o incidencia técnica, lo asume subsidiariamente la Administración. El bono es intransferible los primeros 30 días y no puede reclamarse un segundo bono bajo ninguna circunstancia.

**Régimen transitorio de regularización.** Los integrantes cuya alta se hubiera producido con anterioridad al 1 de julio de 2026, y que a la fecha de dicha alta tuvieran menos de 16 años, habiendo percibido entonces el bono de bienvenida de 500 Pz vigente en ese momento, podrán solicitar a la Administración el abono de la diferencia (250 Pz) hasta completar los 750 Pz que corresponden a su franja de edad conforme a esta actualización. La solicitud deberá presentarse en el plazo de **60 días naturales** desde la entrada en vigor del presente Código y se resolverá conforme al procedimiento ordinario de la Administración.

## § 3. Emisión y quema del Placeta (Pz)

### Art. 9 — Competencia de emisión

La emisión de Placetas es competencia de la Junta, con permiso previo del Departamento Económico. El límite general es de **7.500 Pz por usuario**. La emisión excepcional (> 7.500 Pz) requiere autorización de la Junta con informe favorable del Departamento Económico, y el exceso se distribuye:

| Concepto | Emisión normal | Emisión excepcional | Destino excepcional |
|---|---|---|---|
| Límite por usuario | 7.500 Pz máximo | Más de 7.500 Pz (requiere Junta + Dpto. Económico) | Ver distribución abajo |
| Tesoro | — | 60 % del exceso sobre 7.500 Pz | Inusable — Reserva del sistema |
| Administración | — | 20 % del exceso sobre 7.500 Pz | Gastos operativos |
| Banco de La Placeta | — | 20 % del exceso sobre 7.500 Pz | Reserva bancaria y liquidez |

### Art. 10 — Quema de moneda

La quema de Placetas (destrucción definitiva de unidades para reducir la masa monetaria) es competencia exclusiva de la Junta con permiso del Departamento Económico. Procede en: confiscación por expulsión definitiva, política monetaria de retirada y cancelación de emisiones no distribuidas. Toda quema se registra en el informe financiero periódico.`
    },
    {
      codigo: 'CNI-IV',
      titulo: 'Capítulo IV: Banca, Capital e Impuestos',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      cnic_refs: [
        { codigo: 'CNIC-4.1', etiqueta: 'Límites de capital' },
        { codigo: 'CNIC-4.3', etiqueta: 'Tasa de transferencia' },
        { codigo: 'CNIC-4.4', etiqueta: 'IVA' },
        { codigo: 'CNIC-4.5', etiqueta: 'Cotizaciones laborales' },
        { codigo: 'CNIC-4.6', etiqueta: 'RBU' },
        { codigo: 'CNIC-4.7', etiqueta: 'SMI y salario máximo' },
        { codigo: 'CNIC-4.10', etiqueta: 'Escala IRM' },
        { codigo: 'CNIC-4.13', etiqueta: 'Escala IGF personal' },
        { codigo: 'CNIC-4.14', etiqueta: 'Escala IGF empresa' },
        { codigo: 'CNIC-4.15', etiqueta: 'Exención empresa pequeña' }
      ],
      contenido_md: `# CAPÍTULO IV — BANCA, CAPITAL E IMPUESTOS

## § 4. Límites de capital y saldos negativos

### Art. 4.1 — Límites de Capital

| Tipo de cuenta | Límite de capital | Sanción por exceso | Sanción aplicable |
|---|---|---|---|
| Cuenta personal / particular | 500.000 Pz | Saldo injustificado > 500.000 Pz | Multa de 225.000 Pz |
| Cuenta empresarial / estatal | 10.000.000 Pz | Saldo injustificado > 10 M Pz | A determinar por la Junta |

El Departamento Económico verificará mensualmente los saldos de todas las cuentas. Cuando se detecte un saldo superior al límite sin justificación documentada y aprobada por la Junta, se aplicará automáticamente la multa correspondiente y se notificará al titular.

Se entiende por **saldo justificado** aquel que responde a un proyecto, contrato o actividad institucional aprobada por la Junta o el Departamento Económico, con documentación acreditativa.

### Art. 4.2 — Saldos Negativos (Descubiertos)

| Período en negativo | Sanción | Condición de aplicación | Acumulable |
|---|---|---|---|
| Días 1-5 | Sin sanción | Período de gracia | — |
| Día 6 en adelante | 25.000 Pz | Saldo negativo al cierre del día 6 | Sí |
| Día 30 en adelante | 125.000 Pz adicionales | Saldo negativo sin regularizar el día 30 | Sí (acumula a sanción día 6) |

Un saldo negativo que persista más de **60 días** sin regularizar podrá dar lugar a la apertura de un procedimiento disciplinario ante el Departamento de Justicia, con posibilidad de suspensión de la cuenta.

## § 5. Tasas, IVA e impuestos sobre la renta

### Art. 4.3 — Tasas de Transferencia

Las tasas aplicadas a las transferencias internas del Banco de La Placeta no superarán en ningún caso el **12 %** del importe de la operación. El Departamento Económico fijará la tasa vigente en cada período y la publicará en el informe periódico de situación financiera. El impago de impuestos o tasas transcurrida una semana desde su notificación generará un incremento automático de la deuda calculado por segundo de retraso conforme al tipo de interés de demora aprobado por el Departamento Económico.

El impago reiterado o la evasión deliberada de tasas e impuestos se considerará infracción muy grave.

### Art. 4.4 — Impuesto del Valor Añadido (IVA)

Todo producto o servicio ofrecido o comercializado dentro del sistema del GDLP estará sujeto a un **IVA del 12 %**, aplicado sobre el precio base de la operación y desglosado de forma visible en toda transacción comercial interna. La recaudación del IVA será gestionada por el Departamento Económico e ingresada en la Cuenta de Reserva del Grupo.

### Art. 4.5 — Cotizaciones laborales

| Tramo sueldo bruto (mensual) | Cotiz. empresa | Cotiz. trabajador | Total retención |
|---|---|---|---|
| Hasta 1.700 Pz | 7,5 % | 7,5 % | 15 % |
| 1.701 – 3.000 Pz | 10,5 % | 10,5 % | 21 % |
| 3.001 Pz o más | 17,5 % | 17,5 % | 35 % |

Ambas partes de la cotización se ingresan en la Cuenta de Reserva del Grupo, destinándose a financiar la RBU y otros fondos sociales del sistema.

## § 6. Renta Básica Universal y Salario Mínimo y Máximo (ACTUALIZADO)

### Art. 4.6 — Renta Básica Universal (RBU)

El Banco de La Placeta emitirá semanalmente un bono de **RBU de 5 Pz** por usuario activo en el sistema.

- La RBU es universal: la perciben todos los integrantes activos con cuenta en el Banco de La Placeta, con independencia de su cargo, actividad o saldo.
- Quedan excluidos del cómputo de la RBU los integrantes menores de edad con controles parentales activos (alta tutelada básica).
- La RBU no se abona automáticamente: el propio usuario deberá reclamar su bono semanalmente de forma manual. El bono no reclamado en el período correspondiente caduca y no se acumula.
- La RBU no es transferible ni puede ser objeto de embargo o retención por deudas con el Grupo.

### Art. 4.7 — Salario Mínimo Interprofesional (SMI) (ACTUALIZADO)

**4.7.1 Definición.** Se establece el SMI como la cuantía retributiva mínima que percibirá el trabajador por la jornada legal de trabajo. Ningún contrato laboral podrá ser validado por el Banco de La Placeta si la remuneración bruta es inferior a la cuantía establecida.

**4.7.2 Cuantía.** Se fija el SMI en **150 Placetas mensuales** para contratos de jornada completa.

**4.7.3 Revisión.** El Departamento Económico revisará semestralmente la cuantía del SMI en función de la inflación interna y la masa monetaria total, con el fin de preservar el poder adquisitivo de los integrantes trabajadores.

### Art. 4.7 bis — Salario Máximo Interprofesional (NUEVO)

Se establece un Salario Máximo Interprofesional de **1.750 Placetas mensuales** por contrato de jornada completa. Ningún contrato laboral, incluidos los cargos públicos regulados en el Capítulo VII, podrá ser validado por el Banco de La Placeta si la remuneración bruta mensual pactada supera dicha cuantía. Quedan excluidas de este límite las gratificaciones extraordinarias de carácter excepcional aprobadas por la Junta conforme al Art. 16, por no tener naturaleza salarial ordinaria.

## § 7. Patrimonio medio e Impuesto de Regulación Monetaria

### Art. 4.8 — Cálculo del Patrimonio Medio

El patrimonio medio se calcula como la suma de los saldos registrados al cierre de cada día del mes, dividida entre el número de días del mes. Este valor constituye la base imponible del IRM.

> Patrimonio medio = Σ(saldos diarios del mes) / número de días del mes

### Art. 4.9 — Índice de Acumulación (IA)

> IA = (Media de ingresos – Media de pagos) / Patrimonio medio

Interpretación: IA ≈ 0 = equilibrio; IA > 0 = acumulación neta; IA < 0 = consumo neto.

### Art. 4.10 — Impuesto de Regulación Monetaria (IRM)

| Índice de Acumulación (IA) | Cuenta Particular | Cuenta Compartida | Cuenta Empresa |
|---|---|---|---|
| IA ≤ 0 (consumo neto / equilibrio) | 0 % | 0 % | 0 % |
| 0 < IA ≤ 0,05 | 0,5 % | 0,75 % | 1 % |
| 0,05 < IA ≤ 0,15 | 1,5 % | 2 % | 3 % |
| 0,15 < IA ≤ 0,30 | 3 % | 4 % | 6 % |
| IA > 0,30 | 5 % | 6 % | 9 % |

### Art. 4.11 — Principios de aplicación del IRM

- El impuesto solo grava la acumulación: gastar o reinvertir los Placetas reduce o elimina el IRM aplicable, incentivando la circulación de la moneda.
- No existen sanciones ni multas adicionales asociadas al IRM: el sistema es automático, predecible y transparente.
- La recaudación del IRM contribuye a la estabilidad económica del sistema, evitando la inflación por acumulación excesiva de Placetas en pocas cuentas.
- El Departamento Económico publicará mensualmente un resumen de la recaudación por IRM en el informe de situación financiera del Grupo.

### Art. 4.11 bis — Periodicidad y cobro del IRM (NUEVO)

El IRM se liquidará con periodicidad **mensual**, tomando como base el patrimonio medio del mes vencido calculado conforme al Art. 4.8. La cuota resultante se cargará automáticamente en la cuenta del integrante el **día 5 del mes siguiente** al período liquidado. Si dicho día no fuera hábil, el cargo se trasladará al primer día hábil siguiente. El Departamento Económico notificará al integrante el detalle del cálculo con carácter previo al cobro.

## § 7 bis. Impuesto de Grandes Fortunas (IGF) (NUEVO)

### Art. 4.12 — Concepto y hecho imponible

Se crea el Impuesto de Grandes Fortunas (IGF), de carácter mensual, que grava el patrimonio medio (Art. 4.8) de personas físicas, empresas y entidades del sistema GDLP mediante una escala progresiva por tramos. El IGF es compatible y acumulable con el IRM regulado en los artículos anteriores, dado que ambos gravan hechos imponibles distintos: el IRM grava la acumulación neta y el IGF grava el volumen total de patrimonio.

### Art. 4.13 — Escala del IGF para personas físicas

| Tramo de patrimonio medio | Tipo | Observaciones |
|---|---|---|
| Primeros 5.000 Pz | Exento de IGF | Sujeto únicamente al IRM que corresponda. |
| De 5.001 a 20.000 Pz | 10 % de la franja | Tramo máximo de 14.999 Pz de base. |
| De 20.001 a 500.000 Pz | 30 % de la franja | Se suma a la cuota de las franjas anteriores. |

**Aviso importante.** Las franjas del IGF se suman entre sí y son acumulables con el IRM. Ejemplo: un integrante con 27.000 Pz de patrimonio medio abona 3.600 Pz de IGF (1.500 Pz por el tramo de 5.001 a 20.000 Pz, más 2.100 Pz por los 7.000 Pz situados en el tramo de 20.001 a 500.000 Pz), y sus primeros 5.000 Pz permanecen exentos de IGF y sujetos al IRM.

### Art. 4.14 — Escala del IGF para empresas y entidades

| Tramo de patrimonio medio | Tipo | Observaciones |
|---|---|---|
| Primeros 5.000 Pz | Exento de IGF | Sujeto únicamente al IRM que corresponda. |
| De 5.001 a 20.000 Pz | 5 % de la franja | Tramo máximo de 14.999 Pz de base. |
| De 20.001 a 500.000 Pz | 35 % de la franja | Se suma a la cuota de las franjas anteriores. |
| Más de 500.000 Pz | 85 % de la franja | Se suma a la cuota de las franjas anteriores. |

### Art. 4.15 — Reducción para empresas y entidades de reducida dimensión

Las empresas y entidades cuyo patrimonio medio mensual no supere los **20.000 Pz** quedarán exentas del pago del IGF, en atención a que dichas entidades ya tributan el IVA del 12 % (Art. 4.4) sobre su actividad ordinaria, evitando así una doble carga fiscal desproporcionada sobre pequeñas empresas. El Departamento Económico podrá revisar anualmente este umbral.

**Nota de redacción:** el umbral y el mecanismo de esta reducción (exención total por debajo de 20.000 Pz de patrimonio medio) se ha fijado como interpretación razonable de la instrucción recibida («reducimos los impuestos a empresas pequeñas, ya que ya pagan el IVA»), al no haberse especificado un porcentaje concreto. La Junta puede ajustar el umbral o sustituir la exención por una bonificación parcial si lo estima oportuno.

### Art. 4.16 — Compatibilidad y acumulación con el IRM

El IGF y el IRM son impuestos compatibles y se liquidan de forma independiente y acumulativa sobre el mismo patrimonio medio mensual, salvo el tramo exento común de los primeros 5.000 Pz, que en ambos casos queda excluido de la base imponible del IGF y sujeto exclusivamente al IRM. La liquidación y cobro del IGF seguirá la misma periodicidad y fecha de cargo que el IRM, conforme al Art. 4.11 bis.`
    },
    {
      codigo: 'CNI-V',
      titulo: 'Capítulo V: Recursos Digitales',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO V — RECURSOS DIGITALES

### Art. 11 — Ámbito y acceso según perfil

| Perfil | Correo oficial | Suscripciones | Autoriza |
|---|---|---|---|
| Presidencia / Vicepresidencia | Sí — cuenta principal | Acceso total | Alta automática por cargo |
| Director/a de Departamento | Sí — cuenta departamental | Suscripciones del departamento | Administración + Junta |
| Técnico/a con cargo activo | Sí — cuenta técnica | Solo herramientas de trabajo asignadas | Director/a del Dpto. |
| Estudiante en programa especial | Sí — cuenta provisional | Herramientas educativas únicamente | Administración + tutor asignado |

### Art. 12 — Gestión y seguridad de recursos digitales

El Departamento de Innovación gestiona el inventario de suscripciones activas, actualizado mensualmente y disponible para la Junta. Al cesar en un cargo, el integrante debe devolver el control de la cuenta a la Administración en un plazo máximo de **48 horas**. Los titulares están obligados a mantener sus credenciales en confidencialidad y notificar de inmediato cualquier brecha de seguridad.

El incumplimiento del plazo de devolución de credenciales al cesar en el cargo constituye infracción grave. El acceso no autorizado o la cesión de credenciales a terceros es infracción muy grave.

### Art. 12 bis — Uso de Inteligencia Artificial en la gestión departamental (NUEVO)

Se autoriza el uso de agentes de Inteligencia Artificial para el desempeño de funciones dentro de aquellos departamentos, o de aquellas tareas concretas dentro de un departamento, cuyo peso sea minoritario respecto del conjunto de la actividad del área o que, por su naturaleza, no requieran de un perfil humano específico para su ejecución. En tales casos, la supervisión del agente de IA podrá ser ejercida por cualquier miembro de la Junta, sin necesidad de que dicha supervisión recaiga en un cargo humano dedicado en exclusiva a esa función.

El desarrollo, despliegue y mantenimiento de los agentes de Inteligencia Artificial corresponde en exclusiva al Departamento de Innovación, que deberá mantener un inventario actualizado de los agentes activos, sus funciones asignadas y el miembro de la Junta responsable de su supervisión en cada momento, a disposición de la Junta conforme al Art. 12.`
    },
    {
      codigo: 'CNI-VI',
      titulo: 'Capítulo VI: Loterías, Juegos e Inversiones',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO VI — LOTERÍAS, JUEGOS E INVERSIONES

### Art. 13 — Loterías internas — Restricción +12

El Grupo de La Placeta podrá organizar loterías y sorteos internos con Pz como premio, bajo supervisión del Departamento Económico y autorización previa de la Junta. Las loterías internas están permitidas exclusivamente para integrantes **mayores de 12 años**, verificados mediante PlacetaID.

Los menores de 12 años tienen prohibido el acceso a loterías aunque dispongan de alta tutelada. El tutor interno que facilite dicho acceso incurre en infracción grave.

### Art. 14 — Inversiones con componente de azar — Restricción +18

Las inversiones con componente de azar (fondos de riesgo simulados, apuestas sobre eventos internos, mercados de predicción) están permitidas exclusivamente para integrantes con alta plena, **mayores de 18 años**, verificados mediante PlacetaID. Ningún tutor puede autorizar el acceso a estas actividades para un menor. Los productos de inversión sin componente de azar están disponibles para todos los integrantes con cuenta activa, con los límites bancarios de su franja de edad.`
    },
    {
      codigo: 'CNI-VII',
      titulo: 'Capítulo VII: Sueldos Públicos',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      cnic_refs: [
        { codigo: 'CNIC-15-1', etiqueta: 'Tabla de sueldos públicos' }
      ],
      contenido_md: `# CAPÍTULO VII — SUELDOS PÚBLICOS

### Art. 15 — Tabla de sueldos y condiciones (ACTUALIZADO)

| Cargo | Sueldo base/mes | Complemento actividad | Tipo |
|---|---|---|---|
| Presidencia | 267 Pz | 67 Pz | Fijo |
| Vicepresidencia | 217 Pz | 50 Pz | Fijo |
| Director/a de Departamento | 167 Pz | 33 Pz | Fijo |
| Técnico/a de Departamento | 100 Pz | 25 Pz | Variable |
| Colaborador/a o Asesor/a | 50 Pz | 17 Pz | Variable |
| Estudiante en programa especial | 17 Pz | 8 Pz | Variable |

Cuantías resultantes de dividir entre 3 los importes previamente vigentes, redondeadas a la Placeta entera más próxima.

Todo contrato laboral en el sistema, incluidos los cargos públicos, deberá estar validado por el Banco de La Placeta conforme al SMI establecido en el Art. 4.7 y sin superar el Salario Máximo del Art. 4.7 bis. Los sueldos por debajo del SMI no podrán ser validados.

**Nota de cumplimiento.** Con la actualización del SMI a 150 Pz mensuales (Art. 4.7), varios de los importes base de esta tabla —una vez divididos entre 3— quedan por debajo del SMI. La Junta deberá resolver expresamente si dichos cargos se consideran exceptuados del régimen de SMI por tratarse de retribuciones institucionales no laborales, o si procede complementarlos hasta alcanzar el mínimo, antes de validar los contratos correspondientes.

### Art. 16 — Pérdida del derecho y gratificaciones

Un cargo pierde el derecho a retribución mensual por: ausencia injustificada superior a 15 días en el mes, suspensión disciplinaria en curso, o renuncia o cese. La Junta podrá aprobar gratificaciones extraordinarias de carácter excepcional para aportaciones especialmente relevantes.`
    },
    {
      codigo: 'CNI-VIII',
      titulo: 'Capítulo VIII: Convivencia y Respeto',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO VIII — CONVIVENCIA Y RESPETO

### Art. 17 — Código de conducta

Todos los integrantes tienen la obligación de tratarse con respeto y dignidad. Son normas obligatorias: usar lenguaje apropiado, no interrumpir actos oficiales, respetar decisiones de los órganos competentes sin perjuicio del derecho a recurrir, y actuar siempre de buena fe. Queda prohibido cualquier conducta de acoso, intimidación, difamación o injuria, conforme a lo dispuesto en el Capítulo IX.`
    },
    {
      codigo: 'CNI-IX',
      titulo: 'Capítulo IX: Difamación e Injurias',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO IX — DIFAMACIÓN E INJURIAS

### Art. 18 — Difamación e injuria

Se entiende por **difamación** la difusión de afirmaciones falsas con intención de dañar la reputación de un integrante o la institución. Se entiende por **injuria** toda expresión que lesione la dignidad mediante insultos o expresiones vejatorias. El afectado puede presentar denuncia ante el Departamento de Justicia, solicitar medidas cautelares y exigir rectificación pública. El procedimiento se tramita en un máximo de **7 días hábiles**.

### Art. 19 — Excepción de crítica legítima

No constituye difamación la crítica fundada en hechos veraces sobre la actuación pública o institucional de un cargo, siempre que se realice con respeto a la dignidad personal.`
    },
    {
      codigo: 'CNI-X',
      titulo: 'Capítulo X: Régimen Sancionador General',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO X — RÉGIMEN SANCIONADOR GENERAL

### Art. 20 — Tabla general de infracciones y sanciones

| Grado | Conductas típicas | Sanción | Reincidencia |
|---|---|---|---|
| Leve | Lenguaje inapropiado puntual · Interrupción de actos oficiales · Incumplimiento de plazos por descuido | Advertencia formal + 50 Pz | Doble multa |
| Grave | Difamación o injuria · Acoso o intimidación · Saldo negativo sin regularizar (día 6+) · Uso indebido de recursos digitales (sistemático) | Suspensión 7-30 días + 100-500 Pz | Expulsión temporal |
| Muy grave | Suplantación de identidad / PlacetaID falso · Fraude económico o bancario · Evasión fiscal reiterada · Manipulación del sistema de emisión de Pz · Alta fraudulenta | Expulsión definitiva + confiscación saldo | Prohibición permanente |

### Art. 21 — Procedimiento disciplinario

El procedimiento se inicia de oficio o mediante denuncia escrita. El presunto infractor dispone de **5 días hábiles** para presentar alegaciones. El Departamento de Justicia dicta resolución motivada en **10 días hábiles**. El sancionado puede recurrir ante la Junta en **5 días hábiles**; la Junta resuelve en **15 días hábiles** y su decisión agota la vía interna. Las infracciones prescriben: leves a los **15 días**, graves a los **3 meses**, muy graves al **año**.

### Art. 22 — Medidas cautelares

Durante el procedimiento el Departamento de Justicia podrá adoptar: suspensión preventiva del cargo o acceso, congelación de la cuenta bancaria, suspensión temporal del PlacetaID y el DIP, y retirada de contenidos presuntamente infractores. Las medidas cautelares no prejuzgan el resultado y se levantan si el procedimiento concluye sin sanción.`
    },
    {
      codigo: 'CNI-XI',
      titulo: 'Capítulo XI: Marco de Cumplimiento Real — Protección de Datos del GDLP',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO XI — MARCO DE CUMPLIMIENTO REAL — PROTECCIÓN DE DATOS DEL GDLP

## § 8. Marco Legal Obligatorio

### Art. 8.1 — Marco legal aplicable

El GDLP opera como organización sujeta a la normativa vigente en España. Toda organización dependiente debe contar con políticas de protección de datos personales específicas y obligatorias, elaboradas conforme a:

- El Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD), de 27 de abril de 2016.
- La Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
- Cualquier otra normativa de aplicación derivada de la actividad del GDLP como asociación en el territorio español.

El cumplimiento de la normativa real de protección de datos es obligatorio con independencia del carácter lúdico o ficticio de las actividades internas del Grupo.

### Art. 8.2 — Deber de las organizaciones dependientes

- Implementar su propia política de privacidad, conforme a los estándares legales reales vigentes, antes de iniciar cualquier tratamiento de datos personales.
- Designar, cuando sea legalmente exigible, un Delegado de Protección de Datos (DPD) o un responsable de privacidad interno.
- Mantener un registro de actividades de tratamiento actualizado, accesible para la Junta en todo momento.
- Informar a los integrantes, de forma clara y accesible, sobre qué datos personales se recogen, con qué finalidad, durante cuánto tiempo y cuáles son sus derechos.
- Garantizar la seguridad técnica y organizativa de los datos personales tratados, adoptando las medidas apropiadas al riesgo.

## § 9. Intercambio de información y derechos

### Art. 8.3 — Intercambio de información administrativa

Los Departamentos del GDLP podrán transferirse información sensible o de carácter personal únicamente cuando concurran simultáneamente: justificación expresa, documentada y proporcional a la finalidad perseguida; aprobación previa y explícita de la Junta del GDLP; y comunicación al integrante afectado, salvo que exista causa legal que lo justifique.

### Art. 8.4 — Derechos de los integrantes en materia de datos

Todo integrante del GDLP tiene derecho a: acceder a sus datos personales; rectificar los datos inexactos o incompletos; solicitar la supresión de sus datos cuando ya no sean necesarios; oponerse al tratamiento en determinadas circunstancias; solicitar la limitación del tratamiento mientras se resuelve una reclamación; y presentar reclamación ante la Agencia Española de Protección de Datos (AEPD). El ejercicio de estos derechos se canalizará a través de la Administración en el plazo máximo de **30 días** desde la recepción de la solicitud.

### Art. 8.5 — Transferencias internacionales de datos

Cualquier transferencia de datos personales a destinatarios situados fuera del EEE requerirá el cumplimiento de los mecanismos de garantía previstos en el RGPD (decisión de adecuación, cláusulas contractuales tipo u otras garantías adecuadas), previo informe del Departamento de Innovación y aprobación de la Junta.

### Art. 8.6 — Conservación de datos por expulsión definitiva (NUEVO)

Cuando un integrante sea sancionado con expulsión definitiva conforme al Art. 20, el GDLP podrá conservar, más allá de los plazos generales de este Código, los datos estrictamente necesarios para identificarlo —alias oficial, número de DIP, motivo y fecha de la sanción— con la finalidad de impedir altas fraudulentas futuras y proteger la seguridad e integridad del sistema. Esta conservación se ampara en el interés legítimo del GDLP (Art. 6.1.f RGPD) y se sujeta a los siguientes límites:

- **Minimización:** únicamente se conservará el dato mínimo necesario para la finalidad de seguridad indicada; el resto de datos personales del integrante expulsado se suprimirá o anonimizará conforme a los plazos generales del Capítulo XII.
- **Revisión periódica:** la Junta revisará cada **3 años** la necesidad de mantener este listado de seguridad, pudiendo acordar la supresión de registros que hayan dejado de ser necesarios.
- **Información al afectado:** la existencia de esta conservación con fines de seguridad se comunicará al integrante en el momento de la resolución sancionadora, con indicación de su derecho a solicitar información adicional y a reclamar ante la AEPD.`
    },
    {
      codigo: 'CNI-XII',
      titulo: 'Capítulo XII: Protección de Datos — Organizaciones Privadas',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO XII — PROTECCIÓN DE DATOS: ORGANIZACIONES PRIVADAS

Se entiende por «organización privada» dependiente del GDLP toda sociedad, empresa ficticia, entidad comercial o contratista interno que opere dentro del sistema del Grupo de La Placeta persiguiendo fines económicos propios, incluso si están vinculadas o participadas por el Grupo.

## § 12.1. Identificación y responsabilidad del tratamiento

### Art. 12.1.1 — Responsable del tratamiento

Toda organización privada dependiente del GDLP que recoja, almacene, use o transmita datos personales de integrantes deberá identificarse formalmente como responsable del tratamiento ante la Junta. Esta identificación incluirá: denominación oficial y número de registro interno; nombre y datos de contacto del representante legal; descripción de los tratamientos de datos que realiza; y declaración de conformidad con el RGPD y la LOPDGDD firmada por el representante.

### Art. 12.1.2 — Encargados del tratamiento

Cuando una organización privada contrate a terceros para el tratamiento de datos personales, deberá formalizar un contrato de encargo de tratamiento conforme al Art. 28 RGPD con garantías suficientes de seguridad y confidencialidad. Los acuerdos puramente internos al GDLP deberán notificarse a la Junta en el plazo de **15 días** desde su celebración.

## § 12.2. Bases jurídicas y finalidades del tratamiento

| Base jurídica | Supuesto habitual en el GDLP | Requisito adicional |
|---|---|---|
| Consentimiento (Art. 6.1.a) | Comunicaciones comerciales, participación en loterías, PlacetaID para servicios opcionales | Consentimiento explícito, libre y revocable |
| Ejecución de contrato (Art. 6.1.b) | Contratos laborales, prestación de servicios internos, transacciones bancarias en Pz | Existencia de contrato válido suscrito por el interesado |
| Obligación legal (Art. 6.1.c) | Retención de datos fiscales (IVA, IRM, IGF, cotizaciones), auditorías internas exigidas por Junta | Norma GDLP habilitante identificada |
| Interés legítimo (Art. 6.1.f) | Seguridad del sistema bancario, prevención del fraude con Pz, análisis estadístico agregado, listado de seguridad de expulsiones definitivas (Art. 8.6) | Test de ponderación superado y documentado |

Los datos recogidos para una finalidad específica no podrán reutilizarse para finalidades incompatibles sin obtener nueva base jurídica y, en su caso, nuevo consentimiento del interesado.

## § 12.3. Categorías de datos y plazos de conservación (ACTUALIZADO)

| Categoría de dato | Ejemplos en el GDLP | Plazo de conservación |
|---|---|---|
| Identificación | Alias, número de DIP, PlacetaID, franja de edad verificada | Duración del alta + 1 año tras la baja |
| Financieros / bancarios | Saldo en Pz, historial de transacciones, cotizaciones, IRM, IGF | 5 años (obligación fiscal interna) |
| Contractuales / laborales | Contratos de trabajo, nóminas, complementos de actividad | 4 años desde la extinción del contrato |
| Disciplinarios | Expedientes, sanciones, medidas cautelares | 3 años desde la resolución firme |
| Técnicos / digitales | Credenciales de recursos digitales, registros de acceso, vinculación dispositivo-PlacetaID Móvil | 1 año desde el cese en el cargo / desvinculación del dispositivo |
| Seguridad — expulsión definitiva | Alias, número de DIP, motivo y fecha de la sanción de expulsión definitiva | Indefinida (dato mínimo, conforme al Art. 8.6), con revisión trienal por la Junta |
| Categorías especiales (Art. 9 RGPD) | Datos de salud u otros datos sensibles (solo si son estrictamente necesarios) | Mínimo indispensable; supresión inmediata al cesar la necesidad |

Transcurrido el plazo de conservación, los datos deben ser suprimidos o anonimizados de forma irreversible, salvo en el supuesto de conservación por seguridad regulado en el Art. 8.6.

## § 12.4. Derechos de los integrantes

| Derecho | Base legal | Plazo de respuesta | Excepciones |
|---|---|---|---|
| Acceso (Art. 15 RGPD) | Siempre exigible | 1 mes (prorrogable 2) | Ninguna en el GDLP |
| Rectificación (Art. 16 RGPD) | Siempre exigible | 1 mes | Datos contables verificados |
| Supresión (Art. 17 RGPD) | Cuando cesa la finalidad o se revoca consentimiento | 1 mes | Obligaciones legales activas; listado de seguridad del Art. 8.6 |
| Portabilidad (Art. 20 RGPD) | Tratamientos basados en consentimiento o contrato | 1 mes | Solo formatos estructurados |
| Oposición (Art. 21 RGPD) | Tratamientos por interés legítimo | Inmediata (cese provisional) | Motivos legítimos imperiosos |
| Limitación (Art. 18 RGPD) | Durante impugnaciones o reclamaciones | Inmediata (bloqueo) | — |
| No decisión automatizada (Art. 22 RGPD) | Perfilado con efectos significativos | 1 mes | Consentimiento explícito o contrato |

Las solicitudes de derechos se canalizarán a través de la Administración del GDLP conforme al Art. 8.4. Si la solicitud se deniega, la denegación deberá estar motivada y se informará al interesado de su derecho a reclamar ante la AEPD.

## § 12.5. Medidas de seguridad y gestión de brechas

### Art. 12.5.1 — Medidas técnicas y organizativas mínimas

- Cifrado de datos en reposo y en tránsito para información personal de integrantes.
- Control de acceso basado en roles: solo acceden a los datos quienes lo necesiten para su función.
- Registro de actividades de tratamiento actualizado y accesible para la Junta.
- Copias de seguridad periódicas con verificación de integridad.
- Formación básica en protección de datos para todo el personal con acceso a datos personales.
- Revisión anual de las medidas implementadas y actualización en caso de incidentes.

### Art. 12.5.2 — Protocolo de gestión de brechas de seguridad

| Plazo | Acción obligatoria | Destinatario |
|---|---|---|
| Inmediatamente | Notificación interna al DPD y contención del incidente | DPD / Responsable |
| < 24 horas | Notificación a la Junta del GDLP con descripción preliminar de la brecha | Junta del GDLP |
| < 72 horas | Notificación a la AEPD si la brecha supone riesgo para los derechos y libertades | AEPD (si hay riesgo real) |
| Sin demora | Comunicación al interesado si la brecha supone alto riesgo | Integrantes afectados |
| < 15 días | Informe completo del incidente, análisis de causa raíz y medidas correctoras | Junta del GDLP |

## § 12.6. Transferencias internas y DPD de organizaciones privadas

Las transferencias de datos personales entre organizaciones privadas del GDLP, o entre estas y otros departamentos del Grupo, requieren: necesidad y proporcionalidad; justificación documentada aprobada por la Junta; información al afectado salvo excepción motivada; y reciprocidad de garantías por parte de la organización receptora.

Las organizaciones privadas del GDLP designarán un DPD cuando lleven a cabo tratamientos a gran escala de datos personales, traten categorías especiales de datos de forma sistemática, o la Junta lo exija expresamente. En los demás casos, designarán un responsable de privacidad interno con funciones equivalentes al DPD en el ámbito interno del GDLP.`
    },
    {
      codigo: 'CNI-XIII',
      titulo: 'Capítulo XIII: Protección de Datos — Organizaciones Públicas',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO XIII — PROTECCIÓN DE DATOS: ORGANIZACIONES PÚBLICAS

Se entiende por «organización pública» dependiente del GDLP todo departamento, organismo, sociedad pública, banco institucional o entidad con funciones de interés general designada por la Junta. Incluye: el Banco de La Placeta, la Administración, el Departamento Económico, el Departamento de Justicia y el Departamento de Innovación.

## § 13.1. Transparencia reforzada

### Art. 13.1.1 — Publicidad activa de los tratamientos

Las organizaciones públicas del GDLP deberán publicar de forma accesible para todos los integrantes: el listado de tratamientos con descripción de finalidad, categorías de datos, base jurídica y plazos de conservación; la identidad y datos de contacto del DPD obligatorio; los criterios para el intercambio de información entre departamentos; y el resultado resumido de las auditorías internas de protección de datos.

### Art. 13.1.2 — Cláusula informativa obligatoria

Toda comunicación o servicio que implique el tratamiento de datos personales incluirá, en el momento de la recogida, una cláusula informativa conforme al Art. 13 RGPD: identidad del responsable, finalidad, base jurídica, plazos de conservación, derechos del interesado y derecho a reclamar ante la AEPD.

## § 13.2. Bases jurídicas específicas del sector público

| Base jurídica | Supuestos en organismos públicos del GDLP | Condición especial |
|---|---|---|
| Obligación legal (Art. 6.1.c RGPD) | Verificación de edad para PlacetaID, gestión tributaria (IVA, IRM, IGF, cotizaciones), registro de actividades bancarias | La norma GDLP habilitante debe identificarse expresamente |
| Misión de interés público (Art. 6.1.e RGPD) | Administración del Banco de La Placeta, emisión y quema de Pz, gestión de expedientes disciplinarios | La misión debe estar recogida en la Normativa Institucional o en disposición de la Junta |
| Ejecución de contrato (Art. 6.1.b RGPD) | Contratos laborales con cargos públicos, acuerdos de suministro de recursos digitales | El contrato debe ser válido y previo al tratamiento |
| Consentimiento (Art. 6.1.a RGPD) | Suscripciones voluntarias a boletines internos, participación en programas especiales de estudiantes | Libre, específico, informado e inequívoco; revocable en cualquier momento |

Ningún organismo público del GDLP podrá tratar datos personales sin base jurídica identificada y documentada. La mera conveniencia operativa no constituye base jurídica suficiente.

## § 13.3. Registro de actividades de tratamiento (RAT) y auditoría

Todos los organismos públicos del GDLP mantendrán un RAT actualizado conforme al Art. 30 RGPD, que incluirá para cada tratamiento: nombre del tratamiento, responsable y datos del DPD, finalidad, categorías de interesados y de datos, destinatarios, transferencias internacionales (si procede), plazo de conservación, y medidas de seguridad aplicadas. El RAT estará disponible en todo momento para la Junta y para la AEPD en caso de requerimiento.

Cada organismo público realizará una auditoría interna de protección de datos con periodicidad anual, comunicando su resultado a la Junta dentro de los **30 días** siguientes a su finalización.

## § 13.4. Comunicaciones oficiales y datos de cargo

### Art. 13.4.1 — Datos relativos al ejercicio de cargos públicos

Los datos relacionados con el ejercicio de un cargo público en el GDLP (nombre del cargo, alias oficial, actuaciones públicas, resoluciones dictadas, retribuciones percibidas) tienen la consideración de datos de interés público amparados en el Art. 6.1.e RGPD. No se requiere consentimiento del titular para su publicación en el marco de la actividad oficial del Grupo.

### Art. 13.4.2 — Separación datos de cargo / datos personales

Los organismos públicos del GDLP mantendrán separación clara entre los datos vinculados al ejercicio del cargo (naturaleza pública) y los datos personales del integrante como particular (naturaleza privada). Los datos personales privados no podrán utilizarse para finalidades públicas sin base jurídica específica y aprobación de la Junta.

> Ejemplo: El alias oficial y las resoluciones dictadas por el Departamento de Justicia son datos públicos. El saldo bancario en Pz de un integrante es dato privado que no puede difundirse en comunicaciones oficiales.

## § 13.5. DPD obligatorio en organismos públicos

### Art. 13.5.1 — Obligatoriedad, requisitos y comunicación a la Junta

Todos los organismos públicos del GDLP, sin excepción, designarán un DPD de conformidad con el Art. 37.1.a RGPD. Esta obligación se extiende al Banco de La Placeta, la Administración del GDLP y todos los Departamentos. El DPD deberá tener: conocimientos especializados en protección de datos; independencia funcional (no podrá recibir instrucciones sobre el ejercicio de sus funciones ni ser destituido por ello); recursos adecuados para el desempeño de sus funciones; y ausencia de conflicto de intereses con el tratamiento de datos que supervisa.

La designación de cada DPD se comunicará a la Junta en el plazo de **10 días** desde el nombramiento. La Junta mantendrá un registro centralizado de todos los DPD activos en el Grupo.`
    },
    {
      codigo: 'CNI-XIV',
      titulo: 'Capítulo XIV: Protección de Datos — Asociaciones',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO XIV — PROTECCIÓN DE DATOS: ASOCIACIONES

Se entiende por «asociación» dependiente del GDLP toda entidad de carácter voluntario, sin ánimo de lucro en términos del sistema Placeta, constituida por integrantes del Grupo que comparten un fin común lícito. Las asociaciones pueden ser culturales, deportivas, de debate, temáticas o de cualquier otra naturaleza aprobada por la Junta.

## § 14.1. Datos de afiliación y participación asociativa

| Categoría | Datos típicos | Base jurídica | Plazo de conservación |
|---|---|---|---|
| Identificación | Alias oficial, número de DIP, modalidad de alta | Ejecución de relación asociativa (Art. 6.1.b) | Duración de la afiliación + 2 años |
| Cuotas y aportaciones | Historial de cuotas en Pz, donaciones internas | Obligación legal interna (Art. 6.1.c) | 5 años (registros financieros) |
| Participación | Asistencia a reuniones, cargos internos, votos emitidos | Interés legítimo asociativo (Art. 6.1.f) | Duración de la afiliación + 1 año |
| Comunicaciones | Mensajes y comunicados de la asociación recibidos | Consentimiento o interés legítimo (Art. 6.1.a/f) | Hasta revocación del consentimiento o baja |

La pertenencia a determinadas asociaciones puede revelar opiniones políticas, creencias religiosas u otras categorías especiales de datos conforme al Art. 9 RGPD. Las asociaciones de este tipo recabarán consentimiento explícito conforme al Art. 9.2.a RGPD y adoptarán medidas de seguridad reforzadas.

## § 14.2. Comunicaciones a los asociados

### Art. 14.2.1 — Comunicaciones internas

Las asociaciones del GDLP únicamente enviarán comunicaciones a sus asociados activos y para finalidades relacionadas con su actividad. Para el envío de comunicaciones a no asociados o ex-asociados se requerirá consentimiento expreso. Las listas de distribución no podrán cederse ni compartirse con otras organizaciones sin consentimiento de los integrantes incluidos.

### Art. 14.2.2 — Publicación de contenidos con datos personales

Cuando una asociación desee publicar contenidos que incluyan datos personales de sus miembros (fotografías, resultados de votaciones nominales, actas con nombres), deberá contar con consentimiento explícito de los afectados. La publicación de actas puede realizarse con alias oficiales sin necesidad de consentimiento adicional, siempre que no contengan datos personales adicionales.

## § 14.3. Protección de datos de menores en asociaciones

- El consentimiento para el tratamiento de datos de menores de **14 años** requerirá la autorización del tutor interno mayor de edad registrado en el GDLP.
- Entre **14 y 17 años**, el menor podrá prestar consentimiento por sí mismo para tratamientos ordinarios, pero el tutor deberá ser informado.
- Las comunicaciones dirigidas a menores serán en todo caso apropiadas a su edad y no incluirán datos de terceros sin autorización expresa.
- Los datos de menores no se publicarán ni compartirán públicamente en ningún caso sin consentimiento expreso del tutor interno.
- Las asociaciones organizadoras de actividades con restricciones de edad (loterías +12, inversiones +18 conforme al Capítulo VI) verificarán mediante PlacetaID la edad de los participantes antes de cualquier tratamiento de datos relativo a dichas actividades.

## § 14.4. Baja y supresión de datos de ex-asociados

### Art. 14.4.1 — Efectos de la baja en la asociación

- Cesar el envío de comunicaciones en el plazo máximo de **7 días** desde la baja.
- Bloquear el acceso del ex-asociado a los recursos digitales de la asociación de forma inmediata.
- Conservar únicamente los datos necesarios para el cumplimiento de obligaciones legales o la resolución de posibles reclamaciones, durante el plazo que corresponda.
- Suprimir o anonimizar el resto de datos personales del ex-asociado en el plazo máximo de **60 días** desde la baja.

El ex-asociado podrá solicitar expresamente la supresión anticipada de sus datos conforme al Art. 17 RGPD, salvo que la asociación acredite una obligación legal o interés legítimo que justifique su conservación. La solicitud se tramitará conforme al Art. 8.4 en el plazo máximo de 30 días.`
    },
    {
      codigo: 'CNI-XV',
      titulo: 'Capítulo XV: Evaluación de Impacto y Régimen Sancionador en Protección de Datos',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO XV — EVALUACIÓN DE IMPACTO Y RÉGIMEN SANCIONADOR EN PROTECCIÓN DE DATOS

El presente Capítulo regula la gestión de la privacidad y la protección de datos personales en el Grupo de La Placeta (GDLP): los órganos competentes, la evaluación de impacto, las medidas de blindaje legal y el régimen sancionador aplicable, tanto en el plano interno (sanciones en Placetas y medidas disciplinarias propias del sistema) como en el plano legal real (RGPD y LOPDGDD). Todo tratamiento de datos personales reales está sujeto al ordenamiento español con independencia del carácter lúdico o ficticio de las actividades internas del Grupo, y las sanciones internas del GDLP **no sustituyen** las responsabilidades legales que correspondan.

## § 15.1. Evaluación de Impacto relativa a la Protección de Datos (EIPD/DPIA)

### Art. 15.1.1 — Obligatoriedad de la EIPD

Toda organización dependiente del GDLP (privada, pública o asociación) realizará una EIPD/DPIA antes de iniciar tratamientos que puedan suponer un alto riesgo para los derechos y libertades de los integrantes, conforme al Art. 35 RGPD y, en el ámbito español, al Art. 28 LOPDGDD. Se considerarán de alto riesgo, entre otros:

- Tratamientos sistemáticos a gran escala de categorías especiales de datos (Art. 9 RGPD).
- Evaluación sistemática de aspectos personales mediante perfilado automatizado con efectos significativos (ej.: scoring crediticio en Pz).
- Tratamientos que impliquen el uso de nuevas tecnologías con impacto no evaluado previamente, incluidos los agentes de Inteligencia Artificial habilitados conforme al Art. 12 bis.
- Tratamientos de datos de menores de edad a escala o con finalidades sensibles.
- Tratamientos que combinen o comparen conjuntos de datos procedentes de varias organizaciones dependientes.
- Tratamientos a gran escala de datos relativos a la situación económica o patrimonial en Pz de los integrantes.

### Art. 15.1.2 — Contenido mínimo de la EIPD

La EIPD incluirá, como mínimo, el contenido del Art. 35.7 RGPD: descripción sistemática del tratamiento y sus finalidades; evaluación de la necesidad y proporcionalidad; identificación y evaluación de los riesgos para los derechos y libertades de los integrantes; y medidas previstas para afrontar dichos riesgos (garantías, medidas de seguridad y mecanismos que aseguren la protección de los datos personales). Será elaborada con la participación del DPD o responsable de privacidad y aprobada por la Junta antes del inicio del tratamiento.

### Art. 15.1.3 — Procedimiento interno de la EIPD

1. **Solicitud.** El departamento u organización dependiente que prevea un tratamiento de alto riesgo presentará ante la Junta una propuesta de EIPD, con la descripción del tratamiento y sus finalidades.
2. **Informe del DPD.** El DPD o responsable de privacidad emitirá informe preceptivo sobre la necesidad, proporcionalidad y riesgos del tratamiento.
3. **Aprobación.** La Junta aprobará o rechazará la EIPD antes del inicio del tratamiento. Si la Junta la aprueba con condiciones, el tratamiento no podrá iniciarse hasta su cumplimiento.
4. **Registro.** La EIPD aprobada se inscribirá en el registro de actividades de tratamiento (RAT) del GDLP con su fecha, versión y medidas adoptadas, quedando a disposición de la Junta y, cuando proceda, de la AEPD.

### Art. 15.1.4 — Consulta previa a la AEPD

Cuando la EIPD determine que el tratamiento entrañaría un alto riesgo que el GDLP u organización dependiente no puede mitigar con medidas apropiadas, se consultará previamente a la Agencia Española de Protección de Datos (AEPD) conforme al Art. 36 RGPD y al Art. 28 LOPDGDD, antes del inicio del tratamiento. La resolución de la AEPD se documentará y se incorporará al RAT.

### Art. 15.1.5 — Revisión y actualización de la EIPD

La EIPD se revisará y, en su caso, actualizará siempre que cambie el nivel de riesgo del tratamiento: modificación sustancial de la finalidad o de los medios; incorporación de nuevas tecnologías (incluidos agentes de IA conforme al Art. 12 bis); cambio de la escala o de los datos tratados; o transcurso de **2 años** desde la última evaluación, si el tratamiento continúa activo.

## § 15.2. Régimen sancionador específico en protección de datos

### Art. 15.2.1 — Naturaleza del régimen: doble vía

1. **Vía interna del GDLP.** Las infracciones de las normas de protección de datos se sancionan internamente mediante sanciones económicas en Placetas (Pz), suspensiones y demás medidas disciplinarias previstas en este Capítulo. Estas sanciones solo producen efectos dentro del sistema y se imponen por los órganos internos del GDLP conforme a los Arts. 21 y 22 (Capítulo X), con las especialidades de este Capítulo.
2. **Vía legal real.** Las conductas constitutivas de infracción del RGPD (UE) 2016/679 o de la LOPDGDD 3/2018 se rigen por el ordenamiento español y corresponden a la AEPD y a los tribunales (Arts. 83 RGPD y 72 a 74 LOPDGDD). El GDLP no puede imponer sanciones en euros ni eximir de las responsabilidades legales reales: la vía interna es independiente y acumulable a la legal.
3. **Naturaleza del Pz.** El Pz es moneda interna del GDLP sin curso legal ni contrapartida en euros. Para mantener la proporcionalidad con la economía normal de La Placeta, las cuantías de las sanciones económicas internas se expresan en Pz y se referencian al Salario Mínimo Interprofesional interno (SMI = **150 Pz/mes**, Art. 4.7).

### Art. 15.2.2 — Sujetos responsables

- **Responsable del tratamiento:** el GDLP o la organización dependiente que determine los fines y medios del tratamiento. Responde de la conformidad del tratamiento y de las sanciones que correspondan por sus órganos.
- **Encargado del tratamiento:** la entidad que trate datos por cuenta del responsable. Su intervención exigirá el contrato u otro acto jurídico del Art. 28 RGPD; su incumplimiento se sanciona conforme a su grado de responsabilidad, sin perjuicio de la responsabilidad del responsable.
- **Cargo o integrante:** responde disciplinariamente por las acciones u omisiones contrarias a este Código cometidas en el ejercicio de sus funciones o con ocasión del acceso a datos personales.
- **Órganos competentes:** la Administración (ventanilla de ejercicio de derechos), el Departamento de Innovación (medidas técnicas y de seguridad), el DPD o responsable de privacidad (informe preceptivo), el Departamento de Justicia (instrucción) y la Junta (aprobación de la EIPD y resolución de las sanciones muy graves).

### Art. 15.2.3 — Tabla de infracciones y sanciones económicas

| Grado | Conductas típicas | Sanción a integrante o cargo | Sanción a organización dependiente |
|---|---|---|---|
| **Leve** | Omisión de cláusula informativa en comunicación puntual · Retraso inferior a 15 días en la respuesta a una solicitud de derechos · Falta de actualización del RAT sin consecuencias para los integrantes · Acceso accidental y sin uso indebido a datos ajenos | Amonestación por escrito + **50-300 Pz** (hasta 2 SMI) | Requerimiento de subsanación + **100-750 Pz** (hasta 5 SMI) |
| **Grave** | Tratamiento de datos sin base jurídica identificada · Omisión reiterada de información a los interesados · Cesión de datos entre departamentos sin aprobación de la Junta · No notificación de una brecha de seguridad dentro del plazo · Supresión o alteración de registros del RAT | Suspensión de accesos 7-30 días + **300-1.500 Pz** (2-10 SMI) + plan de corrección | **750-3.000 Pz** (5-20 SMI) + plan de corrección + suspensión temporal de los tratamientos afectados |
| **Muy grave** | Tratamiento ilícito de categorías especiales sin base jurídica ni consentimiento · Vulneración de derechos de menores de edad · Transferencia internacional sin garantías · Evasión deliberada del régimen de protección de datos o falsificación de la EIPD o del registro · Reincidencia en infracción grave | Expulsión temporal de 3-12 meses o definitiva (Art. 20, Capítulo X) + **1.500-7.500 Pz** (10-50 SMI) + inhabilitación 1-3 años para cargos con acceso a datos | **3.000-15.000 Pz** (20-100 SMI) o, si resulta mayor, hasta el **4 %** del volumen anual de operaciones en Pz · suspensión o disolución acordada por la Junta |

Cuando la organización dependiente tenga volumen anual de operaciones en Pz, la sanción muy grave podrá calcularse, a elección del órgano sancionador, sobre dicho porcentaje si resultara más disuasorio que la escala fija, en paralelo al criterio del Art. 83 RGPD. En ningún caso la sanción interna podrá dejar sin recursos económicos a un integrante en situación de vulnerabilidad: el órgano sancionador podrá fraccionar el pago o sustituirlo por trabajo de reparación interna cuando concurran circunstancias personales o económicas que lo justifiquen.

### Art. 15.2.4 — Criterios de graduación

Para fijar la cuantía dentro de la escala se valorarán, conforme al Art. 83.2 RGPD: la gravedad y duración de la infracción; el carácter intencional o negligente; las medidas adoptadas para mitigar el daño; el grado de responsabilidad y de cooperación con el órgano instructor y con la AEPD; las infracciones anteriores; la categoría de los datos afectados (protegen especialmente los datos de menores, de salud, de categorías especiales y los datos identificativos reales como el DNI o el NIF); y el número de integrantes afectados. **Agravantes:** la reincidencia, la ocultación, el uso de datos de menores, el aprovechamiento para obtener ventaja económica en Pz y la obstrucción de la instrucción. **Atenuantes:** la comunicación espontánea, la subsanación inmediata, la ausencia de perjuicio efectivo y la colaboración con la AEPD.

### Art. 15.2.5 — Procedimiento sancionador y medidas cautelares

1. **Iniciación.** El procedimiento se inicia de oficio o por denuncia escrita ante el Departamento de Justicia, que actúa como instructor. Cuando la denuncia afecte a una organización dependiente, se dará traslado a su responsable.
2. **Informe del DPD.** Con carácter preceptivo, el DPD o responsable de privacidad informará sobre la tipicidad y la gravedad de los hechos.
3. **Alegaciones.** El presunto infractor dispondrá de **5 días hábiles** para presentar alegaciones y proponer prueba.
4. **Resolución.** El Departamento de Justicia propone la sanción; las sanciones leves y graves las resuelve el Departamento de Justicia y las muy graves la Junta, en un plazo máximo de **15 días hábiles** desde la propuesta.
5. **Recurso.** Contra la resolución cabe recurso ante la Junta en **5 días hábiles**; la Junta resuelve en **15 días hábiles** y su decisión agota la vía interna, sin perjuicio de la reclamación ante la AEPD y de la vía judicial.
6. **Prescripción.** Las infracciones leves prescriben a los **3 meses**, las graves al **año** y las muy graves a los **3 años**. La prescripción interna no afecta a la prescripción legal ante la AEPD.
7. **Medidas cautelares.** Durante la instrucción, el Departamento de Justicia podrá acordar: la suspensión preventiva del tratamiento o del acceso a datos, el bloqueo o la congelación de la cuenta en Pz afectada, la suspensión temporal del PlacetaID y del DIP y la retirada de los datos o contenidos presuntamente infractores. Las medidas cautelares no prejuzgan el resultado y se levantan si el procedimiento concluye sin sanción.

### Art. 15.2.6 — Concurrencia con el régimen general y derivación a la AEPD

Las sanciones de este Capítulo se entienden sin perjuicio del régimen sancionador general del Capítulo X: cuando una misma conducta sea constitutiva a la vez de infracción general y de infracción de protección de datos, se aplicará la sanción más grave o, si fueran de distinta naturaleza, ambas podrán acumularse hasta el límite previsto en la escala correspondiente. La Junta derivará a la AEPD todo incumplimiento que pueda ser constitutivo de infracción real del RGPD o de la LOPDGDD, cooperará con la autoridad en sus investigaciones y ejecutará internamente las medidas que esta acuerde en lo que le corresponda.

### Art. 15.2.7 — Medidas adicionales de blindaje legal

Además de lo anterior, el GDLP y sus organizaciones dependientes adoptarán las siguientes medidas preventivas y de blindaje legal:

- **Contratos con encargados.** Todo encargado del tratamiento firmará el contrato del Art. 28 RGPD, con instrucciones documentadas, confidencialidad y medidas de seguridad, antes de acceder a dato alguno.
- **Protección de los datos identificativos reales.** No se publicarán ni tratarán DNI, NIF, direcciones, teléfonos ni otros datos identificativos reales salvo que sea estrictamente necesario para el cumplimiento de una obligación legal o para el funcionamiento verificado del sistema. Cuando se traten, se cifrarán y su acceso quedará restringido al mínimo imprescindible y quedará registrado. La publicación de actas, certificaciones y documentos se realizará siempre con los nombres censurados y sin datos identificativos reales, conforme a las reglas del BOLP.
- **Verificación de edad.** El acceso a servicios con restricción de edad se verificará mediante PlacetaID, sin tratar más datos de los necesarios.
- **Minimización y plazos.** Los datos personales se limitarán a lo necesario para cada finalidad y se suprimirán o anonimizarán conforme a los plazos del Capítulo XII.
- **Formación.** La Junta promoverá formación periódica en protección de datos para los cargos con acceso a datos personales; la falta de formación no exime de responsabilidad.
- **No autosustitución de la ley.** Ninguna disposición interna podrá interpretarse como renuncia del GDLP o de sus organizaciones dependientes al cumplimiento del RGPD, de la LOPDGDD o de las resoluciones de la AEPD.

## § 15.3. Revisión periódica de la normativa de protección de datos

Los capítulos de protección de datos (XI-XV) serán revisados por la Junta, como mínimo, una vez al año o cuando se produzca: modificación relevante del RGPD o la LOPDGDD; resolución o directriz de la AEPD que afecte a los tratamientos del GDLP; incorporación de nuevas organizaciones dependientes o nuevas categorías de tratamiento; o incidente de seguridad significativo. Toda modificación requerirá aprobación expresa de la Junta y será comunicada a todas las organizaciones dependientes en el plazo máximo de **15 días**, entrando en vigor **30 días** después de la comunicación, salvo urgencia declarada por la Junta.
`
    },
    {
      codigo: 'CNI-XVI',
      titulo: 'Capítulo XVI: Disposiciones Finales',
      categoria: 'capitulo',
      estado: 'vigente',
      fecha_aplicacion: '2026-07-03',
      fecha_aprobacion_junta: '2026-07-03',
      aprobada_en_junta: true,
      contenido_md: `# CAPÍTULO XVI — DISPOSICIONES FINALES

### Art. 23 — Complementariedad y derogación (ACTUALIZADO)

El presente Código Normativo Interno deroga íntegramente: la Normativa Institucional Unificada v5.0; la Normativa Institucional Ampliada v4.0, v3.0, v2.1 y v2.0; la Normativa de Protección de Datos para Organizaciones Dependientes v1.0; y el Reglamento Normativo Institucional v1.0 en todo aquello que contradiga el presente texto. En caso de contradicción entre normas de este mismo documento, prevalece el texto que ofrezca mayor protección a los derechos de los integrantes.

### Art. 24 — Jerarquía normativa

Las disposiciones de protección de datos reales (Capítulos XI a XV) prevalecen sobre cualquier disposición interna del GDLP en caso de conflicto, por cuanto el cumplimiento del ordenamiento jurídico español y europeo es irrenunciable. En el resto de materias, los Capítulos I a X regulan el funcionamiento ordinario del Grupo.

### Art. 25 — Período transitorio

Todas las organizaciones dependientes del GDLP existentes en el momento de la entrada en vigor dispondrán de un plazo de **60 días** para adaptar sus políticas y procedimientos internos a lo establecido en los Capítulos XI a XV. Transcurrido dicho plazo, el incumplimiento se sancionará conforme al Capítulo XV. El mismo plazo de 60 días naturales se aplicará a la solicitud de regularización del bono de bienvenida prevista en el Art. 8.

### Art. 26 — Revisión periódica

La Junta revisará esta Normativa, como mínimo, una vez al año o cuando las circunstancias del Grupo así lo requieran. El Departamento Económico revisará semestralmente el SMI conforme al Art. 4.7.3 y podrá proponer ajustes al Salario Máximo del Art. 4.7 bis. Los capítulos de protección de datos se revisarán conforme al § 15.3.

### Art. 27 — Entrada en vigor

El presente Código Normativo Interno entra en vigor en el momento de su aprobación formal por la Junta Directiva del Grupo de La Placeta, el **3 de julio de 2026**.

> Aprobado por la Junta Directiva del Grupo de La Placeta · Año I de La Placeta · Código Normativo Interno · Conforme al RGPD (UE) 2016/679 y la LOPDGDD 3/2018.`
    }
  ],

  // ── CNIC — Códigos Normativos Internos Complementarios ───────────────
  cnic: [
    { codigo: 'CNIC-7-1', etiqueta: 'Cuentas y límites por franja de edad', descripcion: 'Tabla de cuentas, saldo máximo, transferencia diaria y bono por franja (Art. 7).', tipo_valor: 'texto', valor: 'Junior básica: 500 Pz / 50 día / bono 750 · Junior senior: 1.000 / 100 / 500 · Ciudadana: 500.000 / sin límite / 500 · Institucional: 10.000.000', unidad: 'Pz', articulo: 'Art. 7', vigente: true, historial: [{ valor: 'Junior básica: 500/50/750 · Senior: 1.000/100/500 · Ciudadana: 500.000/—/500 · Institucional: 10.000.000/—/—', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 7).' }] },
    { codigo: 'CNIC-4.1', etiqueta: 'Límites de capital por tipo de cuenta', descripcion: 'Máximo de saldo y sanción por exceso (Art. 4.1).', tipo_valor: 'texto', valor: 'Personal: 500.000 Pz (multa 225.000) · Empresarial/estatal: 10.000.000 Pz (a determinar por Junta)', unidad: 'Pz', articulo: 'Art. 4.1', vigente: true, historial: [{ valor: 'Personal 500.000 (multa 225.000) · Empresarial 10.000.000', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 4.1).' }] },
    { codigo: 'CNIC-4.3', etiqueta: 'Tasa de transferencia (máx 12%)', descripcion: 'Tasa operativa aplicada a transferencias internas (Art. 4.3).', tipo_valor: 'porcentaje', valor: '0.12', unidad: '%', articulo: 'Art. 4.3', vigente: true, historial: [{ valor: '0.12 (12% máximo)', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 4.3).' }] },
    { codigo: 'CNIC-4.4', etiqueta: 'IVA', descripcion: 'Impuesto sobre el Valor Añadido interno (Art. 4.4).', tipo_valor: 'porcentaje', valor: '0.12', unidad: '%', articulo: 'Art. 4.4', vigente: true, historial: [{ valor: '0.12 (12%)', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 4.4).' }] },
    { codigo: 'CNIC-4.5', etiqueta: 'Cotizaciones laborales', descripcion: 'Tramos de retención por salario (Art. 4.5).', tipo_valor: 'texto', valor: '≤1.700 Pz: 7,5%+7,5% (15%) · 1.701-3.000 Pz: 10,5%+10,5% (21%) · ≥3.001 Pz: 17,5%+17,5% (35%)', unidad: '%', articulo: 'Art. 4.5', vigente: true, historial: [{ valor: '≤1.700: 7,5% · 1.701-3.000: 10,5% · ≥3.001: 17,5%', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 4.5).' }] },
    { codigo: 'CNIC-4.6', etiqueta: 'RBU', descripcion: 'Renta Básica Universal semanal (Art. 4.6).', tipo_valor: 'placeta', valor: '5', unidad: 'Pz/semana', articulo: 'Art. 4.6', vigente: true, historial: [{ valor: '5 Pz/semana', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 4.6).' }] },
    { codigo: 'CNIC-4.7', etiqueta: 'SMI y salario máximo', descripcion: 'Salario mínimo y máximo mensual (Art. 4.7 y 4.7 bis).', tipo_valor: 'texto', valor: 'SMI 150 Pz/mes · Salario máximo 1.750 Pz/mes', unidad: 'Pz', articulo: 'Art. 4.7', vigente: true, historial: [{ valor: 'SMI 150 · Máx 1.750', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 4.7 y 4.7 bis).' }] },
    { codigo: 'CNIC-4.10', etiqueta: 'Escala IRM', descripcion: 'Escala progresiva por Índice de Acumulación (Art. 4.10).', tipo_valor: 'texto', valor: 'Particular: 0-0,5-1,5-3-5% · Compartida: 0-0,75-2-4-6% · Empresa: 0-1-3-6-9%', unidad: '%', articulo: 'Art. 4.10', vigente: true, historial: [{ valor: 'Particular 0-0,5-1,5-3-5 · Compartida 0-0,75-2-4-6 · Empresa 0-1-3-6-9', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 4.10).' }] },
    { codigo: 'CNIC-4.13', etiqueta: 'Escala IGF personas físicas', descripcion: 'Escala progresiva del IGF para personas físicas (Art. 4.13).', tipo_valor: 'texto', valor: 'Primeros 5.000 exento · 5.001-20.000: 10% · 20.001-500.000: 30%', unidad: '%', articulo: 'Art. 4.13', vigente: true, historial: [{ valor: 'Exento 5.000 · 10% hasta 20.000 · 30% hasta 500.000', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 4.13).' }] },
    { codigo: 'CNIC-4.14', etiqueta: 'Escala IGF empresas y entidades', descripcion: 'Escala progresiva del IGF para empresas (Art. 4.14).', tipo_valor: 'texto', valor: 'Primeros 5.000 exento · 5.001-20.000: 5% · 20.001-500.000: 35% · >500.000: 85%', unidad: '%', articulo: 'Art. 4.14', vigente: true, historial: [{ valor: 'Exento 5.000 · 5% · 35% · 85%', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 4.14).' }] },
    { codigo: 'CNIC-4.15', etiqueta: 'Exención IGF empresa pequeña', descripcion: 'Umbral para exención de IGF de empresas de reducida dimensión (Art. 4.15).', tipo_valor: 'placeta', valor: '20000', unidad: 'Pz', articulo: 'Art. 4.15', vigente: true, historial: [{ valor: '20000', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 4.15).' }] },
    { codigo: 'CNIC-9-1', etiqueta: 'Límite de emisión por usuario', descripcion: 'Límite general de emisión de Placetas por usuario (Art. 9).', tipo_valor: 'placeta', valor: '7500', unidad: 'Pz', articulo: 'Art. 9', vigente: true, historial: [{ valor: '7500', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 9).' }] },
    { codigo: 'CNIC-15-1', etiqueta: 'Tabla de sueldos públicos', descripcion: 'Sueldos mensuales de cargos del Grupo (Art. 15).', tipo_valor: 'texto', valor: 'Presidencia 267+67=334 · Vicepresidencia 217+50=267 · Director 167+33=200 · Técnico 100+25=125 · Colaborador 50+17=67 · Estudiante 17+8=25', unidad: 'Pz', articulo: 'Art. 15', vigente: true, historial: [{ valor: 'Presidencia 334 · Vice 267 · Director 200 · Técnico 125 · Colaborador 67 · Estudiante 25', desde: '2026-07-03', autor_dip: '23749931M', notas: 'Migrado del PDF del CNI (Art. 15).' }] }
  ],

  // ── PLACETA JUNIOR — Documentos legales que firma el tutor en el alta ──
  junior: [
    {
      codigo: 'PJ-TYC-001',
      titulo: 'Términos y Condiciones — Placeta Junior',
      tipo: 'cni',
      categoria: 'sistema',
      estado: 'vigente',
      version: 1,
      fecha_aplicacion: '2026-08-10',
      fecha_aprobacion_junta: '2026-08-10',
      aprobada_en_junta: true,
      autor_dip: '23749931M',
      autor_nombre: 'Mikel Alegre Marcos',
      notas_cambio: 'Publicación inicial de los Términos y Condiciones de Placeta Junior. Documento que el tutor legal debe leer y firmar en el alta de un menor.',
      contenido_md: "# Términos y Condiciones — Placeta Junior\r\n\r\n**Documento:** PJ-TYC-001\r\n**Aplicación:** Placeta Junior\r\n**Paquete Android:** `org.laplaceta.placetajunior`\r\n**Tipo:** Términos y Condiciones del servicio\r\n**Versión:** 1.0\r\n**Última actualización:** Agosto de 2026\r\n\r\n---\r\n\r\n## 1. Identificación\r\n\r\n**Operador del servicio:** Grupo de La Placeta\r\n**Aplicación:** Placeta Junior\r\n**Contacto:** junta@laplaceta.org\r\n**Sitio web:** [https://junior.laplaceta.org](https://junior.laplaceta.org)\r\n\r\n---\r\n\r\n## 2. Objeto del servicio\r\n\r\nPlaceta Junior es una plataforma educativa de actividades y juegos para **niñas y niños de 6 a 16 años**, integrada en el ecosistema del Grupo de La Placeta. A través de la aplicación, el menor puede realizar actividades (test, sopa de letras, relacionar, ordenar, completar, cálculo mental, mapamundi y bloques de texto), acumular puntos verdes y rojos, gestionar Placetas (moneda interna del programa) y relacionarse con otros menores a través de la lista de amistades.\r\n\r\nEl acceso y uso de la aplicación implican la aceptación de estos Términos y Condiciones, de la Política de Privacidad y del documento de Consentimiento.\r\n\r\n---\r\n\r\n## 3. Edad y autorización del tutor\r\n\r\n- Placeta Junior está dirigida a menores de 6 a 16 años.\r\n- El alta de un menor **solo puede realizarla su tutor o tutora legal** (mayor de edad).\r\n- El tutor deberá leer, aceptar y firmar los documentos legales durante el proceso de registro, confirmando la tutela legal del menor.\r\n- El menor **no puede registrarse ni acceder a funciones sensibles por sí mismo** sin la autorización expresa de su tutor.\r\n- El tutor es responsable de supervisar el uso que el menor hace de la aplicación.\r\n\r\n---\r\n\r\n## 4. Cuenta junior y DIP\r\n\r\n- Cada menor dispone de un **DIP Junior** (Documento de Identidad PlacetaID) que identifica su cuenta dentro del programa.\r\n- La cuenta se vincula al tutor legal en el momento del alta.\r\n- El menor puede iniciar sesión de forma persistente en su dispositivo.\r\n- La suplantación de identidad, el uso de cuentas ajenas o la creación de cuentas sin autorización del tutor constituyen un uso indebido del servicio.\r\n\r\n---\r\n\r\n## 5. Actividades y contenido\r\n\r\n- Las actividades pueden ser públicas (gratuitas), subvencionadas o de pago con Placetas.\r\n- El contenido educativo puede incluir textos, imágenes y pictogramas (en su caso, de ARASAAC, bajo su licencia).\r\n- El progreso, los puntos verdes/rojos y los diplomas obtenidos quedan registrados en la cuenta del menor.\r\n- El contenido descargado para el modo sin conexión permanece en el dispositivo del usuario.\r\n\r\n---\r\n\r\n## 6. Placetas y economía interna\r\n\r\n- Las **Placetas** son la moneda interna del programa y no tienen valor fuera del ecosistema de La Placeta.\r\n- Se obtienen mediante canjes de puntos, la Renta Básica Universal (RBU) diaria del programa y otras recompensas.\r\n- Pueden canjearse por actividades, recompensas y otras prestaciones del programa.\r\n- El saldo de Placetas se gestiona a través de la cuenta del menor bajo supervisión del tutor y de los límites de control parental aplicables.\r\n- Las transferencias de Placetas entre menores se realizan a través del sistema oficial del programa y están sujetas a los límites y autorizaciones establecidos.\r\n\r\n---\r\n\r\n## 7. Amistades\r\n\r\n- El menor puede añadir amigos dentro del programa mediante su DIP o mediante código QR.\r\n- Solo se añaden menores que existen dentro del ecosistema.\r\n- Las comisiones de las transferencias entre amigos las asume el programa (Capitalia), sin coste para el menor.\r\n\r\n---\r\n\r\n## 8. Modo sin conexión\r\n\r\n- La aplicación permite descargar actividades para jugar sin conexión, hasta el límite configurado por el servicio.\r\n- Las actividades de pago no se pueden descargar para su uso sin conexión.\r\n- Los datos descargados permanecen en el dispositivo y no se comparten con terceros.\r\n\r\n---\r\n\r\n## 9. Uso responsable y conducta\r\n\r\nEl usuario (menor, bajo supervisión del tutor) se compromete a:\r\n\r\n- Usar la aplicación de forma lícita, respetuosa y conforme a estos Términos.\r\n- No intentar vulnerar la seguridad del servicio ni acceder a datos ajenos.\r\n- No realizar transferencias, canjes o compras sin la autorización correspondiente.\r\n- Comunicar al tutor cualquier incidencia o uso indebido detectado.\r\n\r\n---\r\n\r\n## 10. Derechos del tutor, suspensión y baja\r\n\r\n- El tutor puede solicitar en cualquier momento la **baja** del menor del programa, lo que implicará la eliminación o anonimización de sus datos conforme a la normativa aplicable.\r\n- El operador puede **suspender** el acceso a la cuenta en caso de uso indebido o incumplimiento de estos Términos, previa comunicación al tutor.\r\n- El tutor puede ejercer los derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad respecto de los datos del menor (ver Política de Privacidad).\r\n\r\n---\r\n\r\n## 11. Limitaciones del servicio\r\n\r\n- El servicio se presta «tal cual», con la diligencia razonable, y puede requerir conexión a internet para determinadas funciones.\r\n- El operador no garantiza la disponibilidad ininterrumpida del servicio.\r\n- El ecosistema de La Placeta tiene un carácter lúdico y educativo; las Placetas y demás elementos del programa carecen de valor económico real fuera de dicho ecosistema.\r\n\r\n---\r\n\r\n## 12. Propiedad intelectual\r\n\r\n- La aplicación, su contenido, la marca Placeta Junior y los elementos del ecosistema son propiedad del Grupo de La Placeta o de sus licenciantes.\r\n- Las actividades creadas por los usuarios del programa (a través del Studio) se publican en el marco del programa con fines educativos.\r\n- Los pictogramas de ARASAAC se utilizan bajo su licencia.\r\n\r\n---\r\n\r\n## 13. Modificaciones\r\n\r\nEl Grupo de La Placeta puede actualizar estos Términos para adaptarlos a novedades legales, técnicas o funcionales. Los cambios relevantes se notificarán a través de la aplicación o de los canales habituales del ecosistema. La versión vigente estará siempre disponible en la aplicación y en el sitio web oficial.\r\n\r\n---\r\n\r\n## 14. Legislación aplicable\r\n\r\nEstos Términos se rigen por la legislación **española** y de la **Unión Europea**, en particular:\r\n\r\n- **Reglamento (UE) 2016/679** (RGPD).\r\n- **Ley Orgánica 3/2018**, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).\r\n- Normativa interna del Grupo de La Placeta (Código Normativo Interno, CNI).\r\n\r\n---\r\n\r\n## 15. Contacto\r\n\r\n**Grupo de La Placeta**\r\n**Correo electrónico:** junta@laplaceta.org\r\n\r\n---\r\n"
    },
    {
      codigo: 'PJ-PRV-001',
      titulo: 'Política de Privacidad — Placeta Junior',
      tipo: 'cni',
      categoria: 'sistema',
      estado: 'vigente',
      version: 1,
      fecha_aplicacion: '2026-08-10',
      fecha_aprobacion_junta: '2026-08-10',
      aprobada_en_junta: true,
      autor_dip: '23749931M',
      autor_nombre: 'Mikel Alegre Marcos',
      notas_cambio: 'Publicación inicial de la Política de Privacidad de Placeta Junior. Documento que el tutor legal debe leer y firmar en el alta de un menor.',
      contenido_md: "# Política de Privacidad — Placeta Junior\r\n\r\n**Documento:** PJ-PRV-001\r\n**Aplicación:** Placeta Junior\r\n**Paquete Android:** `org.laplaceta.placetajunior`\r\n**Tipo:** Política de Privacidad\r\n**Versión:** 3.3.15\r\n**Última actualización:** Agosto de 2026\r\n\r\n---\r\n\r\n## 1. Identificación del responsable\r\n\r\n**Responsable del tratamiento:** Grupo de La Placeta\r\n**Aplicación:** Placeta Junior\r\n**Contacto:** junta@laplaceta.org\r\n**Sitio web:** [https://junior.laplaceta.org](https://junior.laplaceta.org)\r\n\r\n---\r\n\r\n## 2. Ámbito de aplicación y edad\r\n\r\nEsta política regula el tratamiento de los datos personales recabados a través de la aplicación móvil **Placeta Junior** (en adelante, «la aplicación»), una plataforma educativa de actividades y juegos para **niñas y niños de 6 a 16 años** dentro del ecosistema del Grupo de La Placeta.\r\n\r\nEl alta de un menor **solo puede realizarla su tutor o tutora legal**, quien deberá leer, aceptar y firmar los documentos legales (términos y condiciones, política de privacidad y consentimiento de tratamiento de datos del menor) durante el proceso de registro. El uso de la aplicación implica la aceptación de esta política.\r\n\r\n---\r\n\r\n## 3. Datos que tratamos\r\n\r\n### 3.1. Datos del tutor legal (mayor de edad)\r\n\r\n| Dato | Finalidad |\r\n|---|---|\r\n| Nombre y apellidos | Identificar al responsable del menor en el programa. |\r\n| DIP (Documento de Identidad PlacetaID) | Verificar la identidad del tutor y firmar los documentos legales. |\r\n| Relación con el menor | Confirmar la tutela legal. |\r\n\r\n### 3.2. Datos del menor\r\n\r\n| Dato | Finalidad |\r\n|---|---|\r\n| Nombre | Personalizar la interfaz y los diplomas. |\r\n| Edad / fecha de nacimiento | Ajustar la dificultad y la adecuación del contenido. |\r\n| DIP Junior | Identificador único de la cuenta del menor dentro del programa. |\r\n| Progreso y puntos (verdes/rojos) | Registrar el avance en las actividades y generar diplomas. |\r\n| Placetas (moneda interna) | Gestionar la economía interna del programa (canjes, premios y compras de actividades con el saldo del menor). |\r\n| Actividades realizadas | Calcular estadísticas, recompensas y diplomas. |\r\n| Amigos (DIP) | Gestionar la lista de amistades dentro del programa. |\r\n\r\n### 3.3. Datos recabados automáticamente\r\n\r\n| Dato | Finalidad |\r\n|---|---|\r\n| Identificador de sesión | Mantener la sesión iniciada entre usos de la aplicación. |\r\n| Actividades descargadas para sin conexión | Guardar localmente en el dispositivo el contenido (incluidas las portadas) para poder jugar sin conexión. |\r\n| Ajustes de accesibilidad | Guardar las preferencias de MAYÚSCULAS, AUDIO (lectura en voz alta) y lectura. |\r\n\r\nLa aplicación **no** recopila datos de ubicación, contactos, fotos ni micrófono.\r\n\r\n---\r\n\r\n## 4. Finalidades del tratamiento\r\n\r\n1. **Registro y alta del menor**: Crear la cuenta junior y vincularla a su tutor legal.\r\n2. **Juego y aprendizaje**: Ejecutar las actividades educativas (test, sopa de letras, relacionar, ordenar, completar, cálculo mental y bloques de texto).\r\n3. **Seguimiento del progreso**: Registrar puntos verdes/rojos, generar diplomas y mostrar estadísticas.\r\n4. **Economía interna**: Gestionar las Placetas, canjes, recompensas y compras de actividades con el saldo del menor.\r\n5. **Relaciones sociales del programa**: Añadir amigos (solo si existen) dentro del ecosistema.\r\n6. **Accesibilidad**: Lectura en voz alta con el lector del dispositivo y ajustes de visualización.\r\n7. **Juego sin conexión**: Guardar localmente actividades descargadas y sus portadas.\r\n8. **Seguridad y control parental**: Verificar la tutela, impedir el autoadministrado y proteger la cuenta del menor.\r\n\r\n---\r\n\r\n## 5. Base legal del tratamiento\r\n\r\n| Finalidad | Base legal |\r\n|---|---|\r\n| Registro y participación del menor | **Consentimiento del tutor legal** (art. 6.1.a y art. 8 RGPD), prestado al firmar los documentos legales. |\r\n| Prestación del servicio educativo | **Ejecución de un contrato** (art. 6.1.b RGPD). |\r\n| Seguridad y control parental | **Interés legítimo** (art. 6.1.f RGPD). |\r\n| Cumplimiento normativo | **Obligación legal** (art. 6.1.c RGPD) cuando corresponda. |\r\n\r\n---\r\n\r\n## 6. Permisos de la aplicación\r\n\r\nPlaceta Junior solicita únicamente los permisos estrictamente necesarios:\r\n\r\n| Permiso | Finalidad |\r\n|---|---|\r\n| `INTERNET` | Cargar actividades, pictogramas e imágenes desde el servidor. |\r\n| `ACCESS_NETWORK_STATE` | Comprobar la conectividad (por ejemplo, para el modo sin conexión). |\r\n| `CAMERA` | Escanear el código QR de un amigo para añadirlo por su DIP. Es **opcional** y solo se usa cuando el usuario lo solicita. |\r\n\r\nLa aplicación **no** utiliza micrófono: los efectos de sonido se generan internamente en el dispositivo y la lectura en voz alta usa el lector de texto (TTS) del sistema. Los textos leídos **no se envían** a terceros.\r\n\r\n---\r\n\r\n## 7. Almacenamiento local y juego sin conexión\r\n\r\nLa aplicación guarda localmente en el dispositivo:\r\n\r\n- La **sesión** de la cuenta para mantenerla iniciada.\r\n- Las **actividades descargadas** (contenido y portadas) para poder jugar sin conexión, hasta el límite configurado por el servicio.\r\n- Los **ajustes de accesibilidad** (MAYÚSCULAS, AUDIO, lectura).\r\n\r\nEstos datos se almacenan en el almacenamiento interno de la aplicación. Los datos descargados para el modo sin conexión **no se comparten con ningún tercero** y permanecen en el dispositivo mientras no se eliminen o se desinstale la aplicación.\r\n\r\n---\r\n\r\n## 8. Comunicación de datos a terceros\r\n\r\n### 8.1. Backend de Placeta Junior\r\n\r\nLa aplicación se conecta al servidor oficial de Placeta Junior (Grupo de La Placeta) para cargar actividades, guardar el progreso, gestionar Placetas y amigos. Los datos se transmiten mediante conexiones seguras.\r\n\r\n### 8.2. ARASAAC (pictogramas)\r\n\r\nAlgunas actividades pueden mostrar pictogramas del **Portal Aragonés de la Comunicación Aumentativa y Alternativa (ARASAAC)**, cuyas imágenes se cargan desde sus servidores bajo su licencia. La consulta a su API puede implicar el tratamiento de datos técnicos de conexión por parte de ARASAAC conforme a sus propios términos.\r\n\r\n### 8.3. Sin publicidad ni analíticas\r\n\r\nPlaceta Junior **no** muestra publicidad, **no** incorpora servicios de analíticas de terceros y **no** cede datos personales de los menores a terceros para fines comerciales.\r\n\r\n---\r\n\r\n## 9. Seguridad\r\n\r\nPlaceta Junior aplica medidas técnicas y organizativas razonables para proteger los datos:\r\n\r\n- Comunicaciones con el servidor mediante HTTPS.\r\n- Identificación por DIP y verificación de la tutela en el registro.\r\n- Almacenamiento local de la sesión en el contenedor privado de la aplicación.\r\n- Control parental: el menor no puede registrarse ni acceder a funciones sensibles sin el tutor.\r\n\r\nNingún sistema es completamente infalible. Si detectas un acceso no autorizado o un incidente de seguridad, contacta con `junta@laplaceta.org`.\r\n\r\n---\r\n\r\n## 10. Derechos del usuario\r\n\r\nEl **tutor legal** puede ejercer, en nombre del menor, los derechos de:\r\n\r\n- **Acceso** a los datos del menor.\r\n- **Rectificación** de datos incorrectos.\r\n- **Supresión** de los datos que ya no deban conservarse.\r\n- **Limitación** u **oposición** al tratamiento.\r\n- **Portabilidad** cuando sea aplicable.\r\n- **Retirada del consentimiento** en cualquier momento.\r\n\r\nPara ejercer estos derechos, escribe a `junta@laplaceta.org` indicando el DIP del menor y del tutor. Puede solicitarse información adicional para verificar la identidad y la tutela. También tienes derecho a presentar una reclamación ante la **Agencia Española de Protección de Datos (AEPD)** en [www.aepd.es](https://www.aepd.es).\r\n\r\n---\r\n\r\n## 11. Conservación de datos\r\n\r\nLos datos se conservan mientras el menor permanezca dado de alta en Placeta Junior y sean necesarios para prestar el servicio, mantener el progreso y cumplir obligaciones legales. Al causar baja del programa (solicitada por el tutor), se eliminan o anonimizan los datos conforme a la normativa aplicable. Los datos guardados localmente se eliminan al borrar los datos de la aplicación o desinstalarla.\r\n\r\n---\r\n\r\n## 12. Transferencias internacionales de datos\r\n\r\nLos servidores del ecosistema del Grupo de La Placeta pueden estar ubicados en la Unión Europea o en proveedores que ofrecen garantías adecuadas (Cláusulas Contractuales Tipo o marcos equivalentes). Las imágenes de ARASAAC se sirven desde sus infraestructuras bajo su propia política.\r\n\r\n---\r\n\r\n## 13. Menores y control parental\r\n\r\nPlaceta Junior está dirigida a menores de 6 a 16 años y **requiere la autorización expresa del tutor legal** en el momento del registro. El tutor es responsable de supervisar el uso de la aplicación. El Grupo de La Placeta no recopila intencionadamente datos de menores sin el consentimiento de sus tutores. Si se detecta que se han tratado datos de un menor sin autorización, se procederá a su eliminación inmediata.\r\n\r\n---\r\n\r\n## 14. Modificaciones de la política\r\n\r\nEl Grupo de La Placeta puede actualizar esta política para adaptarla a novedades legales, técnicas o funcionales. Los cambios relevantes se notificarán a través de la aplicación o de los canales habituales del ecosistema. La versión vigente estará siempre disponible en la aplicación y en el sitio web oficial.\r\n\r\n---\r\n\r\n## 15. Legislación aplicable\r\n\r\nEsta política se rige por la legislación **española** y de la **Unión Europea**, en particular:\r\n\r\n- **Reglamento (UE) 2016/679** (RGPD).\r\n- **Ley Orgánica 3/2018**, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).\r\n\r\n---\r\n\r\n## 16. Contacto\r\n\r\nPara cualquier cuestión relacionada con la privacidad y el tratamiento de los datos personales:\r\n\r\n**Grupo de La Placeta**\r\n**Correo electrónico:** junta@laplaceta.org\r\n\r\n---\r\n"
    },
    {
      codigo: 'PJ-CON-001',
      titulo: 'Consentimiento de Tratamiento de Datos del Menor — Placeta Junior',
      tipo: 'cni',
      categoria: 'sistema',
      estado: 'vigente',
      version: 1,
      fecha_aplicacion: '2026-08-10',
      fecha_aprobacion_junta: '2026-08-10',
      aprobada_en_junta: true,
      autor_dip: '23749931M',
      autor_nombre: 'Mikel Alegre Marcos',
      notas_cambio: 'Publicación inicial del Consentimiento del tutor legal para el tratamiento de datos del menor en Placeta Junior. Documento que el tutor debe firmar en el alta.',
      contenido_md: "# Consentimiento de Tratamiento de Datos del Menor — Placeta Junior\r\n\r\n**Documento:** PJ-CON-001\r\n**Aplicación:** Placeta Junior\r\n**Paquete Android:** `org.laplaceta.placetajunior`\r\n**Tipo:** Consentimiento del tutor legal\r\n**Versión:** 1.0\r\n**Última actualización:** Agosto de 2026\r\n\r\n---\r\n\r\n## 1. Datos del tutor legal\r\n\r\n| Campo | Valor |\r\n|---|---|\r\n| Nombre y apellidos | ______________________ |\r\n| DIP (Documento de Identidad PlacetaID) | ______________________ |\r\n| Relación con el menor | ☐ Padre/Madre ☐ Tutor legal ☐ Otro: ______ |\r\n\r\n---\r\n\r\n## 2. Datos del menor\r\n\r\n| Campo | Valor |\r\n|---|---|\r\n| Nombre | ______________________ |\r\n| Apellidos | ______________________ |\r\n| Fecha de nacimiento | ______________________ |\r\n| DIP Junior | ______________________ |\r\n\r\n---\r\n\r\n## 3. Declaración de tutela\r\n\r\nEl abajo firmante **declara ser el tutor o tutora legal** del menor identificado en el apartado anterior y, por tanto, estar legitimado para prestar el consentimiento en su nombre de conformidad con el **artículo 8 del Reglamento (UE) 2016/679 (RGPD)** y la **Ley Orgánica 3/2018 (LOPDGDD)**.\r\n\r\n---\r\n\r\n## 4. Consentimiento para el tratamiento de datos\r\n\r\nEn calidad de tutor legal del menor, **otorgo mi consentimiento** para que el **Grupo de La Placeta** trate los datos personales del menor con las siguientes finalidades:\r\n\r\n1. **Registro y alta**: creación de la cuenta junior y su vinculación al tutor.\r\n2. **Juego y aprendizaje**: ejecución de las actividades educativas y registro del progreso.\r\n3. **Seguimiento del progreso**: puntos verdes/rojos, estadísticas, recompensas y diplomas.\r\n4. **Economía interna**: gestión de Placetas, canjes, recompensas y compras de actividades con el saldo del menor.\r\n5. **Relaciones sociales del programa**: lista de amistades dentro del ecosistema (solo si el amigo existe).\r\n6. **Accesibilidad**: lectura en voz alta con el lector del dispositivo y ajustes de visualización.\r\n7. **Modo sin conexión**: guardado local de actividades descargadas y sus portadas.\r\n8. **Seguridad y control parental**: verificación de la tutela y protección de la cuenta.\r\n\r\nLos datos tratados son los detallados en la **Política de Privacidad** (PJ-PRV-001): nombre, edad/fecha de nacimiento, DIP Junior, progreso y puntos, Placetas, actividades realizadas y amigos.\r\n\r\n---\r\n\r\n## 5. Carácter voluntario y base legal\r\n\r\nEste consentimiento es **voluntario** y constituye la base legal del tratamiento de los datos del menor (art. 6.1.a y art. 8 RGPD). La negativa a prestarlo impedirá el alta y el uso de la aplicación por parte del menor.\r\n\r\n---\r\n\r\n## 6. Derechos del tutor\r\n\r\nEl tutor legal puede ejercer, en nombre del menor, los derechos de:\r\n\r\n- **Acceso**, **rectificación**, **supresión**, **limitación**, **oposición** y **portabilidad**.\r\n- **Retirada del consentimiento** en cualquier momento, sin efectos retroactivos.\r\n\r\nPara ejercer estos derechos, escriba a `junta@laplaceta.org` indicando el DIP del menor y del tutor. También puede presentar una reclamación ante la **Agencia Española de Protección de Datos (AEPD)** en [www.aepd.es](https://www.aepd.es).\r\n\r\n---\r\n\r\n## 7. Confirmación y firma\r\n\r\nConfirmo que he leído y comprendido este documento, la Política de Privacidad y los Términos y Condiciones de Placeta Junior, y que otorgo mi consentimiento libre, específico, informado e inequívoco para el tratamiento de los datos del menor conforme a lo anterior.\r\n\r\n**Firma del tutor legal:** ______________________\r\n**Fecha:** ____ / ____ / ______\r\n\r\n---\r\n\r\n**Grupo de La Placeta**\r\n**Contacto:** junta@laplaceta.org\r\n\r\n---\r\n"
    }
  ],

  // ── PLACETAID MÓVIL — Política de privacidad (enlazada en Google Play) ──
  placetaid: [
    {
      codigo: 'PM-PRV-001',
      titulo: 'Política de Privacidad — PlacetaID Móvil',
      tipo: 'cni',
      categoria: 'sistema',
      estado: 'vigente',
      version: 1,
      fecha_aplicacion: '2026-08-31',
      fecha_aprobacion_junta: '2026-08-31',
      aprobada_en_junta: true,
      autor_dip: '23749931M',
      autor_nombre: 'Mikel Alegre Marcos',
      notas_cambio: 'Publicación de la Política de Privacidad de PlacetaID Móvil v26.8.1, requerida para su publicación en Google Play.',
      contenido_md: '# Política de Privacidad — PlacetaID Móvil\r\n\r\n**Documento:** PM-PRV-001\r\n**Aplicación:** PlacetaID Móvil\r\n**Paquete Android:** `org.laplaceta.placetaid`\r\n**Tipo:** Política de Privacidad\r\n**Versión:** 26.8.1\r\n**Última actualización:** Agosto de 2026\r\n\r\n---\r\n\r\n## 1. Identificación del responsable\r\n\r\n**Responsable del tratamiento:** Grupo de La Placeta  \r\n**Aplicación:** PlacetaID Móvil  \r\n**Contacto:** junta@laplaceta.org  \r\n**Sitio web:** [https://id.laplaceta.org](https://id.laplaceta.org)\r\n\r\n---\r\n\r\n## 2. Ámbito de aplicación\r\n\r\nEsta política de privacidad regula el tratamiento de los datos personales recabados a través de la aplicación móvil **PlacetaID Móvil** (en adelante, «la aplicación»), diseñada como segundo factor de autenticación biométrica (2FA) para los servicios del ecosistema del Grupo de La Placeta.\r\n\r\nEl uso de la aplicación implica la aceptación plena de los términos de esta política. Si el usuario no está de acuerdo con alguno de los términos aquí recogidos, deberá abstenerse de utilizar la aplicación.\r\n\r\n---\r\n\r\n## 3. Datos que recopilamos\r\n\r\nPlacetaID Móvil **no recopila ni comparte** datos de uso, analíticas, telemetría ni información personal con terceros. Los únicos datos que se tratan son los estrictamente necesarios para el funcionamiento del servicio:\r\n\r\n### 3.1. Datos proporcionados voluntariamente por el usuario\r\n\r\n| Dato | Finalidad |\r\n|---|---|\r\n| **Documento de Identidad PlacetaID (DIP)** — 8 dígitos + letra | Identificación única de la identidad del usuario en el ecosistema del Grupo de La Placeta. |\r\n| **Nombre y apellidos** | Visualización en la interfaz de la aplicación para que el usuario pueda identificar sus identidades vinculadas. |\r\n| **Rol del PlacetaID** (miembro, administrador, entidad, moderador, empresa, visitante) | Visualización informativa en la interfaz. |\r\n| **Estado del PlacetaID** (activo, inactivo, bloqueado) | Control de disponibilidad para la autenticación. |\r\n\r\n### 3.2. Datos recabados automáticamente\r\n\r\n| Dato | Finalidad |\r\n|---|---|\r\n| **Token FCM (Firebase Cloud Messaging)** | Permitir el envío de notificaciones push en tiempo real para las solicitudes de autenticación. |\r\n| **Identificador único de dispositivo (UUID v4)** | Identificar el dispositivo ante el servidor para la vinculación exclusiva con un PlacetaID. |\r\n| **Nombre del dispositivo** | Mostrar al usuario qué terminal está vinculado a su identidad. |\r\n\r\n### 3.3. Datos de autenticación biométrica\r\n\r\nLos datos biométricos (huella dactilar o reconocimiento facial) **no son almacenados por la aplicación ni enviados al servidor**. La verificación biométrica se realiza exclusivamente a través del `BiometricPrompt` del sistema Android, que gestiona los datos biométricos dentro del entorno seguro del dispositivo (TEE/StrongBox). La aplicación únicamente recibe una confirmación binaria (autenticación exitosa / fallida) sin acceder en ningún momento a los datos biométricos del usuario.\r\n\r\n---\r\n\r\n## 4. Finalidades del tratamiento\r\n\r\nLos datos personales recabados se tratan exclusivamente para las siguientes finalidades:\r\n\r\n1. **Vinculación de identidad**: Asociar un PlacetaID a un dispositivo móvil para que actúe como segundo factor de autenticación.\r\n2. **Autenticación biométrica 2FA**: Procesar solicitudes de autenticación mediante notificaciones push y verificación biométrica, sustituyendo los códigos TOTP tradicionales.\r\n3. **Notificaciones push en tiempo real**: Enviar al usuario solicitudes de autorización de acceso a servicios del ecosistema.\r\n4. **Registro de accesos**: Mantener un historial de eventos de autenticación (accesos exitosos, errores, bloqueos) para su consulta por parte del usuario.\r\n5. **Seguridad**: Garantizar la regla de exclusividad de un dispositivo por identidad, evitando suplantaciones y accesos no autorizados.\r\n6. **Gestión de incidencias**: Permitir a la administración del Grupo de La Placeta auditar y resolver problemas relacionados con la autenticación.\r\n\r\n---\r\n\r\n## 5. Base legal del tratamiento\r\n\r\nEl tratamiento de los datos personales se fundamenta en las siguientes bases legales (de conformidad con el Reglamento General de Protección de Datos — RGPD):\r\n\r\n| Finalidad | Base legal |\r\n|---|---|\r\n| Vinculación de identidad y autenticación | **Ejecución de un contrato** (art. 6.1.b RGPD): el usuario utiliza la aplicación como servicio de autenticación del ecosistema del Grupo de La Placeta. |\r\n| Seguridad y exclusividad dispositivo-ID | **Interés legítimo** (art. 6.1.f RGPD): proteger la integridad del sistema de autenticación y prevenir el fraude. |\r\n| Cumplimiento normativo (PSD2/SCA) | **Obligación legal** (art. 6.1.c RGPD): cumplir con los requisitos de autenticación reforzada en servicios financieros. |\r\n\r\n---\r\n\r\n## 6. Almacenamiento y protección de datos\r\n\r\n### 6.1. Almacenamiento local\r\n\r\nLos datos se almacenan en el dispositivo del usuario mediante `EncryptedSharedPreferences` con **cifrado AES-256 GCM**. La clave maestra de cifrado se genera y protege mediante **Android Keystore**, que la almacena en un entorno seguro de hardware (TEE/StrongBox) cuando el dispositivo lo soporta.\r\n\r\n### 6.2. Almacenamiento en servidor\r\n\r\nEl servidor almacena exclusivamente:\r\n- El **DIP** del usuario (hash o índice único).\r\n- El **token FCM** del dispositivo.\r\n- El **nombre del dispositivo**.\r\n- El **historial de eventos de autenticación** (tipo de evento, servicio, dirección IP, fecha y hora).\r\n\r\nNo se almacenan contraseñas, datos biométricos ni información sensible adicional en el servidor.\r\n\r\n### 6.3. Exclusiones de backup\r\n\r\nLa aplicación tiene desactivadas las copias de seguridad (`allowBackup="false"` y `fullBackupContent="false"`). Los datos cifrados se excluyen explícitamente del backup en la nube y de la transferencia entre dispositivos mediante reglas `data-extraction-rules.xml`.\r\n\r\n### 6.4. Medidas de seguridad técnicas\r\n\r\n| Medida | Descripción |\r\n|---|---|\r\n| **Cifrado en reposo** | AES-256 GCM mediante Android Keystore. |\r\n| **Cifrado en tránsito** | HTTPS obligatorio con OkHttp. Timeouts de 15s (conexión) y 30s (lectura/escritura). |\r\n| **Autenticación biométrica** | BiometricPrompt con `BIOMETRIC_STRONG` obligatorio para autorizar solicitudes. |\r\n| **Regeneración de secretos** | Al desvincular un dispositivo, todos los datos locales se eliminan y la asociación en servidor se libera. |\r\n| **Expiración de solicitudes** | Las solicitudes de autenticación expiran a los 5 minutos (TTL index en MongoDB). |\r\n\r\n---\r\n\r\n## 7. Comunicación de datos a terceros\r\n\r\n### 7.1. Firebase Cloud Messaging (Google)\r\n\r\nLa aplicación utiliza **Firebase Cloud Messaging (FCM)**, un servicio de Google LLC, para el envío de notificaciones push. Esto implica que el **token de dispositivo** se comparte con Google para la correcta distribución de las notificaciones.\r\n\r\nGoogle LLC cumple con el Escudo de Privacidad UE-EE.UU. y opera bajo las garantías adecuadas establecidas en las Cláusulas Contractuales Tipo (SCC) adoptadas por la Comisión Europea.\r\n\r\nPara más información, consulte la [Política de Privacidad de Google](https://policies.google.com/privacy).\r\n\r\n### 7.2. Sin cesión a terceros\r\n\r\nSalvo lo indicado en el punto anterior, **PlacetaID Móvil no comunica ni cede datos personales a terceros** bajo ninguna circunstancia. No se utilizan servicios de analíticas, publicidad, redes sociales ni ningún otro servicio que implique la transferencia de datos del usuario a terceras entidades.\r\n\r\n---\r\n\r\n## 8. Derechos del usuario\r\n\r\nEl usuario puede ejercer los siguientes derechos en relación con sus datos personales:\r\n\r\n### 8.1. Desde la propia aplicación\r\n\r\n| Derecho | Cómo ejercerlo |\r\n|---|---|\r\n| **Acceso** | Consultar los PlacetaIDs almacenados desde la pantalla de Identidades. |\r\n| **Supresión** | Eliminar todos los datos locales desde Ajustes → «Eliminar todos los datos locales». Esta acción también desvincula el dispositivo del servidor. |\r\n| **Portabilidad** | Los datos almacenados localmente son visibles y exportables desde la interfaz de la aplicación. |\r\n| **Oposición y limitación** | Desvincular el dispositivo desde Ajustes → «Desvincular dispositivo» sin eliminar los datos locales. |\r\n\r\n### 8.2. Mediante solicitud directa\r\n\r\nPara ejercer los derechos de **acceso, rectificación, supresión, limitación, portabilidad y oposición** que no puedan ejercerse directamente desde la aplicación, el usuario puede dirigirse a la dirección de contacto del Grupo de La Placeta indicada al inicio de esta política.\r\n\r\nEl usuario también tiene derecho a presentar una reclamación ante la **Agencia Española de Protección de Datos (AEPD)** en [www.aepd.es](https://www.aepd.es).\r\n\r\n---\r\n\r\n## 9. Conservación de datos\r\n\r\n### 9.1. Datos locales\r\n\r\nLos datos permanecen almacenados en el dispositivo hasta que el usuario decida eliminarlos voluntariamente mediante las opciones de «Desvincular dispositivo» o «Eliminar todos los datos locales» disponibles en la pantalla de Ajustes.\r\n\r\n### 9.2. Datos en servidor\r\n\r\n| Tipo de dato | Período de conservación |\r\n|---|---|\r\n| **Vinculación dispositivo-DIP** | Hasta que el usuario desvincula el dispositivo o elimina todos los datos locales. |\r\n| **Historial de accesos** | Se conserva según la política de retención del Grupo de La Placeta para fines de auditoría y seguridad. |\r\n| **Solicitudes de autenticación** | Se eliminan automáticamente a los 5 minutos mediante TTL index en MongoDB. |\r\n| **Tokens FCM** | Se mantienen mientras el dispositivo esté vinculado. Se eliminan al desvincular. |\r\n\r\n---\r\n\r\n## 10. Transferencias internacionales de datos\r\n\r\nLos datos se almacenan en servidores ubicados en la **Unión Europea**. En el caso de Firebase Cloud Messaging, pueden producirse transferencias a Estados Unidos, amparadas por las Cláusulas Contractuales Tipo (SCC) adoptadas por la Comisión Europea y el Marco de Privacidad de Datos UE-EE.UU.\r\n\r\n---\r\n\r\n## 11. Menores de edad\r\n\r\nLa aplicación está dirigida a usuarios mayores de **14 años**. Los usuarios menores de 14 años no deben utilizar la aplicación. El Grupo de La Placeta no recopila intencionadamente datos personales de menores de 14 años. Si se detecta que se han recopilado datos de un menor sin consentimiento parental, se procederá a su eliminación inmediata.\r\n\r\n---\r\n\r\n## 12. Modificaciones de la política de privacidad\r\n\r\nEl Grupo de La Placeta se reserva el derecho a modificar la presente política de privacidad para adaptarla a novedades legislativas, jurisprudenciales o técnicas. Los cambios serán notificados al usuario a través de la propia aplicación o mediante los canales habituales de comunicación del ecosistema.\r\n\r\nLa versión actualizada estará disponible en todo momento dentro de la aplicación y en el sitio web oficial.\r\n\r\n---\r\n\r\n## 13. Legislación aplicable\r\n\r\nEsta política de privacidad se rige por la legislación **española** y, en particular, por:\r\n\r\n- **Reglamento (UE) 2016/679** del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD).\r\n- **Ley Orgánica 3/2018**, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).\r\n- **Real Decreto-ley 14/2019**, de 31 de octubre, por el que se adoptan medidas urgentes por razones de seguridad pública en materia de administración digital, contratación del sector público y telecomunicaciones (transposición de PSD2/SCA).\r\n\r\n---\r\n\r\n## 14. Contacto\r\n\r\nPara cualquier cuestión relacionada con la privacidad y el tratamiento de sus datos personales, el usuario puede dirigirse a:\r\n\r\n**Grupo de La Placeta**  \r\n**Correo electrónico:** junta@laplaceta.org\r\n\r\n---\r\n\r\n*PlacetaID Móvil v26.8.1 — Agosto de 2026*  \r\n*Documento generado para el ecosistema del Grupo de La Placeta.*\r\n'
    }
  ]
};

// Si estamos en navegador, exponer en window; si en Node, exportar
if (typeof window !== 'undefined') {
  window.BOP_MIGRADOS = BOP_MIGRADOS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BOP_MIGRADOS };
}
