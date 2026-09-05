# CAPÍTULO II — PLACETAID Y DOCUMENTO DE IDENTIDAD (DIP)

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

Los datos de vinculación dispositivo-DIP se conservarán mientras el dispositivo permanezca vinculado. Las solicitudes de autenticación se eliminan automáticamente transcurridos cinco minutos desde su generación. El historial de accesos se conservará conforme a la política interna de auditoría y seguridad del GDLP y a los plazos generales establecidos en el Capítulo XII.
