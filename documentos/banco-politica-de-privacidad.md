# Política de Privacidad — Banco de La Placeta

**Documento:** BCO-PRV-001
**Aplicación:** Banco de La Placeta (web y app)
**Paquete Android:** `org.laplaceta.banco`
**Tipo:** Política de Privacidad
**Versión:** 1.0
**Última actualización:** Septiembre de 2026

---

## 1. Identificación del responsable

**Responsable del tratamiento:** Grupo de La Placeta
**Servicio:** Banco de La Placeta
**Contacto:** junta@laplaceta.org
**Sitio web:** [https://banco.laplaceta.org](https://banco.laplaceta.org)

---

## 2. Ámbito de aplicación y edad

Banco de La Placeta es la **primera economía virtual sin ánimo de lucro** que unifica proyectos y una comunidad. Esta política regula el tratamiento de los datos personales recabados a través de la banca en línea (web) y de la aplicación móvil (Android) del Banco de La Placeta.

El acceso y uso del servicio implica la aceptación de esta política.

**Edad:** el Banco de La Placeta está dirigido a personas **mayores de 16 años**. Los **menores de 16 años** no pueden operar una cuenta corriente de adulto: deben utilizar **Placeta Junior**, cuya cuenta es abierta y supervisada por su tutor o tutora legal conforme a su propia política de privacidad.

---

## 3. Datos que tratamos

### 3.1. Datos de identidad

| Dato | Finalidad |
|---|---|
| DIP (Documento de Identidad PlacetaID) | Identificar de forma única al titular y vincular sus cuentas. |
| Nombre y apellidos / razón social | Personalizar la interfaz y emitir documentos. |
| Rol (persona, empresa, entidad) | Aplicar el régimen de cuentas y el censo tributario que corresponda. |

### 3.2. Datos bancarios

| Dato | Finalidad |
|---|---|
| Cuentas (IBAN, tipo, saldo) | Prestar el servicio de cuentas y saldos. |
| Movimientos y transacciones | Mostrar el historial y garantizar la trazabilidad. |
| Tarjetas digitales | Gestionar pagos y medios de cobro. |
| Gestores y cotitulares | Administrar la titularidad y la representación de las cuentas. |

### 3.3. Datos tributarios y de nómina

| Dato | Finalidad |
|---|---|
| Patrimonio, saldos y flujos mensuales | Calcular las declaraciones de IRM e IGF. |
| Facturas y ventas | Liquidar el IVA y la facturación central. |
| Contratos de nómina y complementos | Procesar el pago de nóminas (empresas). |

### 3.4. Datos recabados automáticamente

| Dato | Finalidad |
|---|---|
| Identificador de sesión (cookie/token) | Mantener la sesión iniciada de forma segura. |
| Datos técnicos de conexión | Garantizar la seguridad y el correcto funcionamiento del servicio. |

---

## 4. Finalidades del tratamiento

1. **Prestación del servicio bancario**: cuentas, saldos, movimientos, transferencias, tarjetas y justificantes.
2. **PlaceZUM**: envío de Placetas a varios destinatarios en un solo acto («en un zum»).
3. **Cumplimiento tributario**: cálculo y emisión de declaraciones (IRM, IGF, IVA) y pago de tributos.
4. **Gestión de nóminas y subvenciones**: procesamiento de pagos de empresa y ayudas.
5. **Seguridad y prevención**: verificación de identidad, límites y prevención del fraude.
6. **Cumplimiento normativo**: obligaciones legales del Grupo de La Placeta.

---

## 5. Base legal del tratamiento

| Finalidad | Base legal |
|---|---|
| Prestación del servicio bancario | **Ejecución de un contrato** (art. 6.1.b RGPD). |
| Cumplimiento tributario | **Obligación legal** (art. 6.1.c RGPD). |
| Seguridad y prevención del fraude | **Interés legítimo** (art. 6.1.f RGPD). |
| Operaciones de menores (vía tutor) | **Consentimiento del tutor legal** (art. 6.1.a y 8 RGPD). |

---

## 6. Permisos de la aplicación

La app móvil solicita únicamente los permisos estrictamente necesarios:

| Permiso | Finalidad |
|---|---|
| `INTERNET` | Conectarse a la API segura del banco. |
| `ACCESS_NETWORK_STATE` | Comprobar la conectividad. |
| Biometría (`USE_BIOMETRIC`) | Autorizar transferencias sensibles de forma segura. |

---

## 7. Comunicación de datos a terceros

- Los datos se procesan en la infraestructura oficial del Grupo de La Placeta (API del Banco, backend en MongoDB y servicios asociados).
- Las conexiones se realizan mediante HTTPS.
- El Banco de La Placeta **no** vende datos personales ni los cede a terceros con fines comerciales.
- Los datos tributarios se integran con el sistema administrativo del RSP (Red de Servicios de La Placeta) para el cumplimiento de las obligaciones fiscales internas.

---

## 8. Seguridad

El Banco de La Placeta aplica medidas técnicas y organizativas para proteger los datos:

- Comunicaciones cifradas (HTTPS).
- Autenticación con PlacetaID (JWT firmado) y, en la app, biometría para operaciones sensibles.
- La emisión de Placetas (creación de oferta monetaria) está restringida a administradores autorizados del RSP mediante una clave dedicada y no es accesible desde la API abierta.
- Acceso a los datos del titular estrictamente limitado al propio titular (scoping por propietario), con IBAN y tarjetas enmascarados.

Ningún sistema es infalible. Si detectas un acceso no autorizado, contacta con `junta@laplaceta.org`.

---

## 9. Derechos del usuario

Puedes ejercer los derechos de **acceso, rectificación, supresión, limitación, oposición y portabilidad** escribiendo a `junta@laplaceta.org` indicando tu DIP. Se podrá solicitar información adicional para verificar tu identidad.

También tienes derecho a presentar una reclamación ante la **Agencia Española de Protección de Datos (AEPD)** en [www.aepd.es](https://www.aepd.es).

---

## 10. Conservación de datos

Los datos se conservan mientras el titular permanezca dado de alta y sean necesarios para prestar el servicio, mantener la trazabilidad bancaria y cumplir las obligaciones legales y tributarias. Al solicitar la baja, los datos se eliminan o anonimizan conforme a la normativa aplicable.

---

## 11. Transferencias internacionales de datos

Los servidores del ecosistema del Grupo de La Placeta pueden estar ubicados en la Unión Europea o en proveedores que ofrecen garantías adecuadas (Cláusulas Contractuales Tipo o marcos equivalentes).

---

## 12. Menores y Placeta Junior

Los menores de 16 años deben utilizar **Placeta Junior** y no pueden operar cuentas de adulto. El Banco de La Placeta no recopila intencionadamente datos de menores para cuentas de adulto. La cuenta Junior tiene límites específicos y requiere la autorización del tutor legal.

---

## 13. Modificaciones de la política

El Grupo de La Placeta puede actualizar esta política para adaptarla a novedades legales, técnicas o funcionales. Los cambios relevantes se notificarán a través de la aplicación, la web o los canales habituales del ecosistema.

---

## 14. Legislación aplicable

Esta política se rige por la legislación **española** y de la **Unión Europea**, en particular:

- **Reglamento (UE) 2016/679** (RGPD).
- **Ley Orgánica 3/2018**, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
- Normativa interna del Grupo de La Placeta (Código Normativo Interno, CNI).

---

## 15. Contacto

**Grupo de La Placeta**
**Correo electrónico:** junta@laplaceta.org

---
