/* ═══════════════════════════════════════════════════════════════════════
   CNIC — Alias de compatibilidad (códigos antiguos → registro canónico)
   -----------------------------------------------------------------------
   Los códigos del CNI-PDF original (CNIC-4.x, CNIC-7-1, CNIC-9-1,
   CNIC-15-1…) se han sustituido por valores atómicos con nombre
   descriptivo. Este mapa permite que webs, documentos y enlaces antiguos
   sigan resolviendo sin romperse:

     tipo 'unico'     → un solo código canónico  (CNIC-4.4 → CNIC-IVA)
     tipo 'grupo'     → varios canónicos que sustituyen al agregado antiguo
     tipo 'pendiente' → contenido antiguo que aún no tiene equivalente
                        atómico publicado (p. ej. la tabla de sueldos)

   La fuente de verdad son los 68 códigos canónicos de cnic-datos.js
   (espejo de bop_cnic en Supabase). Este archivo solo contiene la capa de
   compatibilidad histórica: edítalo aquí cuando cambie el CNI.
   ═══════════════════════════════════════════════════════════════════════ */

const BOP_CNIC_ALIAS = {
  'CNIC-4.1': {
    tipo: 'grupo',
    etiqueta: 'Límites de capital',
    grupo: [
      'CNIC-LIMITE-CAPITAL-PERSONAL',
      'CNIC-LIMITE-CAPITAL-INSTITUCIONAL',
      'CNIC-SANCION-SALDO-EXCESO-PERSONAL',
      'CNIC-SANCION-SALDO-EXCESO-INSTITUCIONAL'
    ]
  },
  'CNIC-4.3': { tipo: 'unico', etiqueta: 'Tasa de transferencia', canonico: 'CNIC-TASA-TRANSFERENCIA-MAXIMA' },
  'CNIC-4.4': { tipo: 'unico', etiqueta: 'IVA', canonico: 'CNIC-IVA' },
  'CNIC-4.5': {
    tipo: 'grupo',
    etiqueta: 'Cotizaciones laborales',
    grupo: [
      'CNIC-COTIZACION-TRAMO-1', 'CNIC-COTIZACION-EMPRESA-TRAMO-1',
      'CNIC-COTIZACION-TRABAJADOR-TRAMO-1', 'CNIC-COTIZACION-TOTAL-TRAMO-1',
      'CNIC-COTIZACION-TRAMO-2', 'CNIC-COTIZACION-EMPRESA-TRAMO-2',
      'CNIC-COTIZACION-TRABAJADOR-TRAMO-2', 'CNIC-COTIZACION-TOTAL-TRAMO-2',
      'CNIC-COTIZACION-EMPRESA-TRAMO-3', 'CNIC-COTIZACION-TRABAJADOR-TRAMO-3',
      'CNIC-COTIZACION-TOTAL-TRAMO-3'
    ]
  },
  'CNIC-4.6': { tipo: 'unico', etiqueta: 'RBU', canonico: 'CNIC-RBU-SEMANAL' },
  'CNIC-4.7': {
    tipo: 'grupo',
    etiqueta: 'SMI y salario máximo',
    grupo: ['CNIC-SMI-MENSUAL', 'CNIC-SALARIO-MAXIMO-MENSUAL']
  },
  'CNIC-4.10': {
    tipo: 'grupo',
    etiqueta: 'Escala IRM',
    grupo: [
      'CNIC-IA-TRAMO-1', 'CNIC-IA-TRAMO-2', 'CNIC-IA-TRAMO-3', 'CNIC-IA-TRAMO-4',
      'CNIC-IRM-PARTICULAR-0', 'CNIC-IRM-PARTICULAR-1', 'CNIC-IRM-PARTICULAR-2',
      'CNIC-IRM-PARTICULAR-3', 'CNIC-IRM-PARTICULAR-4',
      'CNIC-IRM-COMPARTIDA-0', 'CNIC-IRM-COMPARTIDA-1', 'CNIC-IRM-COMPARTIDA-2',
      'CNIC-IRM-COMPARTIDA-3', 'CNIC-IRM-COMPARTIDA-4',
      'CNIC-IRM-EMPRESA-0', 'CNIC-IRM-EMPRESA-1', 'CNIC-IRM-EMPRESA-2',
      'CNIC-IRM-EMPRESA-3', 'CNIC-IRM-EMPRESA-4'
    ]
  },
  'CNIC-4.13': {
    tipo: 'grupo',
    etiqueta: 'Escala IGF personas físicas',
    grupo: [
      'CNIC-IGF-PF-TRAMO-1', 'CNIC-IGF-PF-TRAMO-2', 'CNIC-IGF-PF-TRAMO-3',
      'CNIC-IGF-PF-TIPO-1', 'CNIC-IGF-PF-TIPO-2', 'CNIC-IGF-PF-TIPO-3'
    ]
  },
  'CNIC-4.14': {
    tipo: 'grupo',
    etiqueta: 'Escala IGF empresas y entidades',
    grupo: [
      'CNIC-IGF-EMPRESA-TRAMO-1', 'CNIC-IGF-EMPRESA-TRAMO-2', 'CNIC-IGF-EMPRESA-TRAMO-3',
      'CNIC-IGF-EMPRESA-TIPO-1', 'CNIC-IGF-EMPRESA-TIPO-2', 'CNIC-IGF-EMPRESA-TIPO-3',
      'CNIC-IGF-EMPRESA-TIPO-4'
    ]
  },
  'CNIC-4.15': { tipo: 'unico', etiqueta: 'Exención IGF empresa pequeña', canonico: 'CNIC-IGF-EMPRESA-REDUCIDA-UMBRAL' },
  'CNIC-7-1': {
    tipo: 'grupo',
    etiqueta: 'Cuentas y límites por franja de edad',
    grupo: [
      'CNIC-CUENTA-CIUDADANA-SALDO', 'CNIC-CUENTA-INSTITUCIONAL-SALDO',
      'CNIC-CUENTA-JUNIOR-BASICA-SALDO', 'CNIC-CUENTA-JUNIOR-SENIOR-SALDO',
      'CNIC-CUENTA-JUNIOR-BASICA-TRANSFERENCIA', 'CNIC-CUENTA-JUNIOR-SENIOR-TRANSFERENCIA',
      'CNIC-BONO-BIENVENIDA-CIUDADANA', 'CNIC-BONO-BIENVENIDA-JUNIOR-BASICA',
      'CNIC-BONO-BIENVENIDA-JUNIOR-SENIOR'
    ]
  },
  'CNIC-9-1': {
    tipo: 'grupo',
    etiqueta: 'Límite de emisión por usuario',
    grupo: [
      'CNIC-EMISION-ORDINARIA-MAXIMA',
      'CNIC-EMISION-EXCEPCIONAL-BANCO',
      'CNIC-EMISION-EXCEPCIONAL-TESORO',
      'CNIC-EMISION-EXCEPCIONAL-ADMINISTRACION'
    ]
  },
  'CNIC-15-1': {
    tipo: 'pendiente',
    etiqueta: 'Tabla de sueldos públicos',
    aviso: 'La tabla de sueldos de cargos del Grupo (CNI, Art. 15) todavía no se publica como valores atómicos. Hasta entonces este código no puede usarse en cálculos ni webs externas.'
  }
};

/* Resuelve un código → información de alias (o null si no es alias). */
function bopCnicAliasResolver(codigo) {
  if (!codigo) return null;
  const a = BOP_CNIC_ALIAS[String(codigo).toUpperCase().trim()];
  return a || null;
}

if (typeof window !== 'undefined') {
  window.BOP_CNIC_ALIAS = BOP_CNIC_ALIAS;
  window.bopCnicAliasResolver = bopCnicAliasResolver;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BOP_CNIC_ALIAS, bopCnicAliasResolver };
}
