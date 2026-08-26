# Política de Privacidad — Placeta Junior

**Documento:** PJ-PRV-001
**Aplicación:** Placeta Junior
**Paquete Android:** `org.laplaceta.placetajunior`
**Tipo:** Política de Privacidad
**Versión:** 3.3.15
**Última actualización:** Agosto de 2026

---

## 1. Identificación del responsable

**Responsable del tratamiento:** Grupo de La Placeta
**Aplicación:** Placeta Junior
**Contacto:** junta@laplaceta.org
**Sitio web:** [https://junior.laplaceta.org](https://junior.laplaceta.org)

---

## 2. Ámbito de aplicación y edad

Esta política regula el tratamiento de los datos personales recabados a través de la aplicación móvil **Placeta Junior** (en adelante, «la aplicación»), una plataforma educativa de actividades y juegos para **niñas y niños de 6 a 16 años** dentro del ecosistema del Grupo de La Placeta.

El alta de un menor **solo puede realizarla su tutor o tutora legal**, quien deberá leer, aceptar y firmar los documentos legales (términos y condiciones, política de privacidad y consentimiento de tratamiento de datos del menor) durante el proceso de registro. El uso de la aplicación implica la aceptación de esta política.

---

## 3. Datos que tratamos

### 3.1. Datos del tutor legal (mayor de edad)

| Dato | Finalidad |
|---|---|
| Nombre y apellidos | Identificar al responsable del menor en el programa. |
| DIP (Documento de Identidad PlacetaID) | Verificar la identidad del tutor y firmar los documentos legales. |
| Relación con el menor | Confirmar la tutela legal. |

### 3.2. Datos del menor

| Dato | Finalidad |
|---|---|
| Nombre | Personalizar la interfaz y los diplomas. |
| Edad / fecha de nacimiento | Ajustar la dificultad y la adecuación del contenido. |
| DIP Junior | Identificador único de la cuenta del menor dentro del programa. |
| Progreso y puntos (verdes/rojos) | Registrar el avance en las actividades y generar diplomas. |
| Placetas (moneda interna) | Gestionar la economía interna del programa (canjes, premios y compras de actividades con el saldo del menor). |
| Actividades realizadas | Calcular estadísticas, recompensas y diplomas. |
| Amigos (DIP) | Gestionar la lista de amistades dentro del programa. |

### 3.3. Datos recabados automáticamente

| Dato | Finalidad |
|---|---|
| Identificador de sesión | Mantener la sesión iniciada entre usos de la aplicación. |
| Actividades descargadas para sin conexión | Guardar localmente en el dispositivo el contenido (incluidas las portadas) para poder jugar sin conexión. |
| Ajustes de accesibilidad | Guardar las preferencias de MAYÚSCULAS, AUDIO (lectura en voz alta) y lectura. |

La aplicación **no** recopila datos de ubicación, contactos, fotos ni micrófono.

---

## 4. Finalidades del tratamiento

1. **Registro y alta del menor**: Crear la cuenta junior y vincularla a su tutor legal.
2. **Juego y aprendizaje**: Ejecutar las actividades educativas (test, sopa de letras, relacionar, ordenar, completar, cálculo mental y bloques de texto).
3. **Seguimiento del progreso**: Registrar puntos verdes/rojos, generar diplomas y mostrar estadísticas.
4. **Economía interna**: Gestionar las Placetas, canjes, recompensas y compras de actividades con el saldo del menor.
5. **Relaciones sociales del programa**: Añadir amigos (solo si existen) dentro del ecosistema.
6. **Accesibilidad**: Lectura en voz alta con el lector del dispositivo y ajustes de visualización.
7. **Juego sin conexión**: Guardar localmente actividades descargadas y sus portadas.
8. **Seguridad y control parental**: Verificar la tutela, impedir el autoadministrado y proteger la cuenta del menor.

---

## 5. Base legal del tratamiento

| Finalidad | Base legal |
|---|---|
| Registro y participación del menor | **Consentimiento del tutor legal** (art. 6.1.a y art. 8 RGPD), prestado al firmar los documentos legales. |
| Prestación del servicio educativo | **Ejecución de un contrato** (art. 6.1.b RGPD). |
| Seguridad y control parental | **Interés legítimo** (art. 6.1.f RGPD). |
| Cumplimiento normativo | **Obligación legal** (art. 6.1.c RGPD) cuando corresponda. |

---

## 6. Permisos de la aplicación

Placeta Junior solicita únicamente los permisos estrictamente necesarios:

| Permiso | Finalidad |
|---|---|
| `INTERNET` | Cargar actividades, pictogramas e imágenes desde el servidor. |
| `ACCESS_NETWORK_STATE` | Comprobar la conectividad (por ejemplo, para el modo sin conexión). |
| `CAMERA` | Escanear el código QR de un amigo para añadirlo por su DIP. Es **opcional** y solo se usa cuando el usuario lo solicita. |

La aplicación **no** utiliza micrófono: los efectos de sonido se generan internamente en el dispositivo y la lectura en voz alta usa el lector de texto (TTS) del sistema. Los textos leídos **no se envían** a terceros.

---

## 7. Almacenamiento local y juego sin conexión

La aplicación guarda localmente en el dispositivo:

- La **sesión** de la cuenta para mantenerla iniciada.
- Las **actividades descargadas** (contenido y portadas) para poder jugar sin conexión, hasta el límite configurado por el servicio.
- Los **ajustes de accesibilidad** (MAYÚSCULAS, AUDIO, lectura).

Estos datos se almacenan en el almacenamiento interno de la aplicación. Los datos descargados para el modo sin conexión **no se comparten con ningún tercero** y permanecen en el dispositivo mientras no se eliminen o se desinstale la aplicación.

---

## 8. Comunicación de datos a terceros

### 8.1. Backend de Placeta Junior

La aplicación se conecta al servidor oficial de Placeta Junior (Grupo de La Placeta) para cargar actividades, guardar el progreso, gestionar Placetas y amigos. Los datos se transmiten mediante conexiones seguras.

### 8.2. ARASAAC (pictogramas)

Algunas actividades pueden mostrar pictogramas del **Portal Aragonés de la Comunicación Aumentativa y Alternativa (ARASAAC)**, cuyas imágenes se cargan desde sus servidores bajo su licencia. La consulta a su API puede implicar el tratamiento de datos técnicos de conexión por parte de ARASAAC conforme a sus propios términos.

### 8.3. Sin publicidad ni analíticas

Placeta Junior **no** muestra publicidad, **no** incorpora servicios de analíticas de terceros y **no** cede datos personales de los menores a terceros para fines comerciales.

---

## 9. Seguridad

Placeta Junior aplica medidas técnicas y organizativas razonables para proteger los datos:

- Comunicaciones con el servidor mediante HTTPS.
- Identificación por DIP y verificación de la tutela en el registro.
- Almacenamiento local de la sesión en el contenedor privado de la aplicación.
- Control parental: el menor no puede registrarse ni acceder a funciones sensibles sin el tutor.

Ningún sistema es completamente infalible. Si detectas un acceso no autorizado o un incidente de seguridad, contacta con `junta@laplaceta.org`.

---

## 10. Derechos del usuario

El **tutor legal** puede ejercer, en nombre del menor, los derechos de:

- **Acceso** a los datos del menor.
- **Rectificación** de datos incorrectos.
- **Supresión** de los datos que ya no deban conservarse.
- **Limitación** u **oposición** al tratamiento.
- **Portabilidad** cuando sea aplicable.
- **Retirada del consentimiento** en cualquier momento.

Para ejercer estos derechos, escribe a `junta@laplaceta.org` indicando el DIP del menor y del tutor. Puede solicitarse información adicional para verificar la identidad y la tutela. También tienes derecho a presentar una reclamación ante la **Agencia Española de Protección de Datos (AEPD)** en [www.aepd.es](https://www.aepd.es).

---

## 11. Conservación de datos

Los datos se conservan mientras el menor permanezca dado de alta en Placeta Junior y sean necesarios para prestar el servicio, mantener el progreso y cumplir obligaciones legales. Al causar baja del programa (solicitada por el tutor), se eliminan o anonimizan los datos conforme a la normativa aplicable. Los datos guardados localmente se eliminan al borrar los datos de la aplicación o desinstalarla.

---

## 12. Transferencias internacionales de datos

Los servidores del ecosistema del Grupo de La Placeta pueden estar ubicados en la Unión Europea o en proveedores que ofrecen garantías adecuadas (Cláusulas Contractuales Tipo o marcos equivalentes). Las imágenes de ARASAAC se sirven desde sus infraestructuras bajo su propia política.

---

## 13. Menores y control parental

Placeta Junior está dirigida a menores de 6 a 16 años y **requiere la autorización expresa del tutor legal** en el momento del registro. El tutor es responsable de supervisar el uso de la aplicación. El Grupo de La Placeta no recopila intencionadamente datos de menores sin el consentimiento de sus tutores. Si se detecta que se han tratado datos de un menor sin autorización, se procederá a su eliminación inmediata.

---

## 14. Modificaciones de la política

El Grupo de La Placeta puede actualizar esta política para adaptarla a novedades legales, técnicas o funcionales. Los cambios relevantes se notificarán a través de la aplicación o de los canales habituales del ecosistema. La versión vigente estará siempre disponible en la aplicación y en el sitio web oficial.

---

## 15. Legislación aplicable

Esta política se rige por la legislación **española** y de la **Unión Europea**, en particular:

- **Reglamento (UE) 2016/679** (RGPD).
- **Ley Orgánica 3/2018**, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).

---

## 16. Contacto

Para cualquier cuestión relacionada con la privacidad y el tratamiento de los datos personales:

**Grupo de La Placeta**
**Correo electrónico:** junta@laplaceta.org

---
