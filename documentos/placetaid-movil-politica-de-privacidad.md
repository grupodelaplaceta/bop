# Política de Privacidad — PlacetaID Móvil

**Documento:** PM-PRV-001
**Aplicación:** PlacetaID Móvil
**Paquete Android:** `org.laplaceta.placetaid`
**Tipo:** Política de Privacidad
**Versión:** 26.8.1
**Última actualización:** Agosto de 2026

---

## 1. Identificación del responsable

**Responsable del tratamiento:** Grupo de La Placeta  
**Aplicación:** PlacetaID Móvil  
**Contacto:** junta@laplaceta.org  
**Sitio web:** [https://id.laplaceta.org](https://id.laplaceta.org)

---

## 2. Ámbito de aplicación

Esta política de privacidad regula el tratamiento de los datos personales recabados a través de la aplicación móvil **PlacetaID Móvil** (en adelante, «la aplicación»), diseñada como segundo factor de autenticación biométrica (2FA) para los servicios del ecosistema del Grupo de La Placeta.

El uso de la aplicación implica la aceptación plena de los términos de esta política. Si el usuario no está de acuerdo con alguno de los términos aquí recogidos, deberá abstenerse de utilizar la aplicación.

---

## 3. Datos que recopilamos

PlacetaID Móvil **no recopila ni comparte** datos de uso, analíticas, telemetría ni información personal con terceros. Los únicos datos que se tratan son los estrictamente necesarios para el funcionamiento del servicio:

### 3.1. Datos proporcionados voluntariamente por el usuario

| Dato | Finalidad |
|---|---|
| **Documento de Identidad PlacetaID (DIP)** — 8 dígitos + letra | Identificación única de la identidad del usuario en el ecosistema del Grupo de La Placeta. |
| **Nombre y apellidos** | Visualización en la interfaz de la aplicación para que el usuario pueda identificar sus identidades vinculadas. |
| **Rol del PlacetaID** (miembro, administrador, entidad, moderador, empresa, visitante) | Visualización informativa en la interfaz. |
| **Estado del PlacetaID** (activo, inactivo, bloqueado) | Control de disponibilidad para la autenticación. |

### 3.2. Datos recabados automáticamente

| Dato | Finalidad |
|---|---|
| **Token FCM (Firebase Cloud Messaging)** | Permitir el envío de notificaciones push en tiempo real para las solicitudes de autenticación. |
| **Identificador único de dispositivo (UUID v4)** | Identificar el dispositivo ante el servidor para la vinculación exclusiva con un PlacetaID. |
| **Nombre del dispositivo** | Mostrar al usuario qué terminal está vinculado a su identidad. |

### 3.3. Datos de autenticación biométrica

Los datos biométricos (huella dactilar o reconocimiento facial) **no son almacenados por la aplicación ni enviados al servidor**. La verificación biométrica se realiza exclusivamente a través del `BiometricPrompt` del sistema Android, que gestiona los datos biométricos dentro del entorno seguro del dispositivo (TEE/StrongBox). La aplicación únicamente recibe una confirmación binaria (autenticación exitosa / fallida) sin acceder en ningún momento a los datos biométricos del usuario.

---

## 4. Finalidades del tratamiento

Los datos personales recabados se tratan exclusivamente para las siguientes finalidades:

1. **Vinculación de identidad**: Asociar un PlacetaID a un dispositivo móvil para que actúe como segundo factor de autenticación.
2. **Autenticación biométrica 2FA**: Procesar solicitudes de autenticación mediante notificaciones push y verificación biométrica, sustituyendo los códigos TOTP tradicionales.
3. **Notificaciones push en tiempo real**: Enviar al usuario solicitudes de autorización de acceso a servicios del ecosistema.
4. **Registro de accesos**: Mantener un historial de eventos de autenticación (accesos exitosos, errores, bloqueos) para su consulta por parte del usuario.
5. **Seguridad**: Garantizar la regla de exclusividad de un dispositivo por identidad, evitando suplantaciones y accesos no autorizados.
6. **Gestión de incidencias**: Permitir a la administración del Grupo de La Placeta auditar y resolver problemas relacionados con la autenticación.

---

## 5. Base legal del tratamiento

El tratamiento de los datos personales se fundamenta en las siguientes bases legales (de conformidad con el Reglamento General de Protección de Datos — RGPD):

| Finalidad | Base legal |
|---|---|
| Vinculación de identidad y autenticación | **Ejecución de un contrato** (art. 6.1.b RGPD): el usuario utiliza la aplicación como servicio de autenticación del ecosistema del Grupo de La Placeta. |
| Seguridad y exclusividad dispositivo-ID | **Interés legítimo** (art. 6.1.f RGPD): proteger la integridad del sistema de autenticación y prevenir el fraude. |
| Cumplimiento normativo (PSD2/SCA) | **Obligación legal** (art. 6.1.c RGPD): cumplir con los requisitos de autenticación reforzada en servicios financieros. |

---

## 6. Almacenamiento y protección de datos

### 6.1. Almacenamiento local

Los datos se almacenan en el dispositivo del usuario mediante `EncryptedSharedPreferences` con **cifrado AES-256 GCM**. La clave maestra de cifrado se genera y protege mediante **Android Keystore**, que la almacena en un entorno seguro de hardware (TEE/StrongBox) cuando el dispositivo lo soporta.

### 6.2. Almacenamiento en servidor

El servidor almacena exclusivamente:
- El **DIP** del usuario (hash o índice único).
- El **token FCM** del dispositivo.
- El **nombre del dispositivo**.
- El **historial de eventos de autenticación** (tipo de evento, servicio, dirección IP, fecha y hora).

No se almacenan contraseñas, datos biométricos ni información sensible adicional en el servidor.

### 6.3. Exclusiones de backup

La aplicación tiene desactivadas las copias de seguridad (`allowBackup="false"` y `fullBackupContent="false"`). Los datos cifrados se excluyen explícitamente del backup en la nube y de la transferencia entre dispositivos mediante reglas `data-extraction-rules.xml`.

### 6.4. Medidas de seguridad técnicas

| Medida | Descripción |
|---|---|
| **Cifrado en reposo** | AES-256 GCM mediante Android Keystore. |
| **Cifrado en tránsito** | HTTPS obligatorio con OkHttp. Timeouts de 15s (conexión) y 30s (lectura/escritura). |
| **Autenticación biométrica** | BiometricPrompt con `BIOMETRIC_STRONG` obligatorio para autorizar solicitudes. |
| **Regeneración de secretos** | Al desvincular un dispositivo, todos los datos locales se eliminan y la asociación en servidor se libera. |
| **Expiración de solicitudes** | Las solicitudes de autenticación expiran a los 5 minutos (TTL index en MongoDB). |

---

## 7. Comunicación de datos a terceros

### 7.1. Firebase Cloud Messaging (Google)

La aplicación utiliza **Firebase Cloud Messaging (FCM)**, un servicio de Google LLC, para el envío de notificaciones push. Esto implica que el **token de dispositivo** se comparte con Google para la correcta distribución de las notificaciones.

Google LLC cumple con el Escudo de Privacidad UE-EE.UU. y opera bajo las garantías adecuadas establecidas en las Cláusulas Contractuales Tipo (SCC) adoptadas por la Comisión Europea.

Para más información, consulte la [Política de Privacidad de Google](https://policies.google.com/privacy).

### 7.2. Sin cesión a terceros

Salvo lo indicado en el punto anterior, **PlacetaID Móvil no comunica ni cede datos personales a terceros** bajo ninguna circunstancia. No se utilizan servicios de analíticas, publicidad, redes sociales ni ningún otro servicio que implique la transferencia de datos del usuario a terceras entidades.

---

## 8. Derechos del usuario

El usuario puede ejercer los siguientes derechos en relación con sus datos personales:

### 8.1. Desde la propia aplicación

| Derecho | Cómo ejercerlo |
|---|---|
| **Acceso** | Consultar los PlacetaIDs almacenados desde la pantalla de Identidades. |
| **Supresión** | Eliminar todos los datos locales desde Ajustes → «Eliminar todos los datos locales». Esta acción también desvincula el dispositivo del servidor. |
| **Portabilidad** | Los datos almacenados localmente son visibles y exportables desde la interfaz de la aplicación. |
| **Oposición y limitación** | Desvincular el dispositivo desde Ajustes → «Desvincular dispositivo» sin eliminar los datos locales. |

### 8.2. Mediante solicitud directa

Para ejercer los derechos de **acceso, rectificación, supresión, limitación, portabilidad y oposición** que no puedan ejercerse directamente desde la aplicación, el usuario puede dirigirse a la dirección de contacto del Grupo de La Placeta indicada al inicio de esta política.

El usuario también tiene derecho a presentar una reclamación ante la **Agencia Española de Protección de Datos (AEPD)** en [www.aepd.es](https://www.aepd.es).

---

## 9. Conservación de datos

### 9.1. Datos locales

Los datos permanecen almacenados en el dispositivo hasta que el usuario decida eliminarlos voluntariamente mediante las opciones de «Desvincular dispositivo» o «Eliminar todos los datos locales» disponibles en la pantalla de Ajustes.

### 9.2. Datos en servidor

| Tipo de dato | Período de conservación |
|---|---|
| **Vinculación dispositivo-DIP** | Hasta que el usuario desvincula el dispositivo o elimina todos los datos locales. |
| **Historial de accesos** | Se conserva según la política de retención del Grupo de La Placeta para fines de auditoría y seguridad. |
| **Solicitudes de autenticación** | Se eliminan automáticamente a los 5 minutos mediante TTL index en MongoDB. |
| **Tokens FCM** | Se mantienen mientras el dispositivo esté vinculado. Se eliminan al desvincular. |

---

## 10. Transferencias internacionales de datos

Los datos se almacenan en servidores ubicados en la **Unión Europea**. En el caso de Firebase Cloud Messaging, pueden producirse transferencias a Estados Unidos, amparadas por las Cláusulas Contractuales Tipo (SCC) adoptadas por la Comisión Europea y el Marco de Privacidad de Datos UE-EE.UU.

---

## 11. Menores de edad

La aplicación está dirigida a usuarios mayores de **14 años**. Los usuarios menores de 14 años no deben utilizar la aplicación. El Grupo de La Placeta no recopila intencionadamente datos personales de menores de 14 años. Si se detecta que se han recopilado datos de un menor sin consentimiento parental, se procederá a su eliminación inmediata.

---

## 12. Modificaciones de la política de privacidad

El Grupo de La Placeta se reserva el derecho a modificar la presente política de privacidad para adaptarla a novedades legislativas, jurisprudenciales o técnicas. Los cambios serán notificados al usuario a través de la propia aplicación o mediante los canales habituales de comunicación del ecosistema.

La versión actualizada estará disponible en todo momento dentro de la aplicación y en el sitio web oficial.

---

## 13. Legislación aplicable

Esta política de privacidad se rige por la legislación **española** y, en particular, por:

- **Reglamento (UE) 2016/679** del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD).
- **Ley Orgánica 3/2018**, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
- **Real Decreto-ley 14/2019**, de 31 de octubre, por el que se adoptan medidas urgentes por razones de seguridad pública en materia de administración digital, contratación del sector público y telecomunicaciones (transposición de PSD2/SCA).

---

## 14. Contacto

Para cualquier cuestión relacionada con la privacidad y el tratamiento de sus datos personales, el usuario puede dirigirse a:

**Grupo de La Placeta**  
**Correo electrónico:** junta@laplaceta.org

---

*PlacetaID Móvil v26.8.1 — Agosto de 2026*  
*Documento generado para el ecosistema del Grupo de La Placeta.*
