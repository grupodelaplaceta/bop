/* ═══════════════════════════════════════════════════════════════════════
   BOP — Migración del Código Normativo Interno (CNI)
   Fuente: CODIGO_NORMATIVO_INTERNO.pdf (edición unificada, aprobada por la
   Junta Directiva el 3 de julio de 2026). Se migra TODO el contenido.
   Estatutos: VACÍOS por ahora (no estaban en el PDF).
   Estructura BOP: Estatutos / CNI (capítulos, sistemas, programas) / CNIC.
   ═══════════════════════════════════════════════════════════════════════ */

const BOP_MIGRADOS = {
  // ── ESTATUTOS (VACÍOS por ahora: no estaban en el PDF del CNI) ─────────
  estatutos: [],

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

## § 15.1. Evaluación de Impacto relativa a la Protección de Datos (EIPD/DPIA)

### Art. 15.1.1 — Obligatoriedad de la EIPD

Toda organización dependiente del GDLP (privada, pública o asociación) realizará una EIPD/DPIA antes de iniciar tratamientos que puedan suponer un alto riesgo para los derechos y libertades de los integrantes, conforme al Art. 35 RGPD. Se considerarán de alto riesgo, entre otros:

- Tratamientos sistemáticos a gran escala de categorías especiales de datos (Art. 9 RGPD).
- Evaluación sistemática de aspectos personales mediante perfilado automatizado con efectos significativos (ej.: scoring crediticio en Pz).
- Tratamientos que impliquen el uso de nuevas tecnologías con impacto no evaluado previamente, incluidos los agentes de Inteligencia Artificial habilitados conforme al Art. 12 bis.
- Tratamientos de datos de menores de edad a escala o con finalidades sensibles.

### Art. 15.1.2 — Contenido mínimo de la EIPD

La EIPD incluirá: descripción del tratamiento y sus finalidades; evaluación de la necesidad y proporcionalidad; identificación y evaluación de riesgos para los derechos y libertades; y medidas previstas para afrontar dichos riesgos. Será elaborada con la participación del DPD o responsable de privacidad y aprobada por la Junta antes del inicio del tratamiento.

## § 15.2. Régimen sancionador específico en protección de datos

| Tipo | Conductas | Sanción interna GDLP | Escala real (RGPD) |
|---|---|---|---|
| Leve | Omisión de cláusula informativa en comunicación puntual · Retraso < 15 días en respuesta a solicitud de derechos · Falta de actualización del RAT sin consecuencias para integrantes | Advertencia formal + 100-500 Pz | Hasta 10 M€ o 2 % facturación (Art. 83.4 RGPD) |
| Grave | Tratamiento de datos sin base jurídica identificada · Omisión reiterada de información a los interesados · Cesión de datos entre departamentos sin aprobación de Junta · No notificación de brecha de seguridad dentro del plazo | Suspensión 7-30 días + 500-2.000 Pz + plan de corrección obligatorio | Hasta 10 M€ o 2 % facturación (Art. 83.4 RGPD) |
| Muy grave | Tratamiento ilícito de categorías especiales sin base jurídica ni consentimiento · Transferencia internacional sin garantías · Vulneración de derechos de menores · Evasión deliberada del régimen de protección de datos · Falsificación del registro de tratamiento | Suspensión o disolución de la organización + confiscación de activos en Pz + derivación a AEPD | Hasta 20 M€ o 4 % facturación (Art. 83.5 RGPD) |

Las sanciones internas del GDLP son independientes y acumulables a las responsabilidades legales reales conforme al RGPD y la LOPDGDD. La Junta podrá derivar a la AEPD cualquier incumplimiento que considere constitutivo de infracción real del ordenamiento vigente.

## § 15.3. Revisión periódica de la normativa de protección de datos

Los capítulos de protección de datos (XI-XV) serán revisados por la Junta, como mínimo, una vez al año o cuando se produzca: modificación relevante del RGPD o la LOPDGDD; resolución o directriz de la AEPD que afecte a los tratamientos del GDLP; incorporación de nuevas organizaciones dependientes o nuevas categorías de tratamiento; o incidente de seguridad significativo. Toda modificación requerirá aprobación expresa de la Junta y será comunicada a todas las organizaciones dependientes en el plazo máximo de **15 días**, entrando en vigor **30 días** después de la comunicación, salvo urgencia declarada por la Junta.`
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
  ]
};

// Si estamos en navegador, exponer en window; si en Node, exportar
if (typeof window !== 'undefined') {
  window.BOP_MIGRADOS = BOP_MIGRADOS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BOP_MIGRADOS };
}
