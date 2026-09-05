/* ═══════════════════════════════════════════════════════════════════════
   CNIC — Datos corregidos y estructurados (fuente canónica)
   ------------------------------------------------------------------------
   Objetivo: que cada valor sea UTILIZABLE.
   · Los CNIC escalares (tasa, IVA, RBU, exención, límite…) tienen un único
     `valor` numérico/legible para código ({{CNIC-XXXX}}, APIs, apps).
   · Los CNIC que en realidad son Baremos/escalas (límites por franja,
     cotizaciones por tramo, IRM/IGF, sueldos…) pasan a `tipo_valor:
     'baremo'` con `baremo: { columnas[], filas[][] }`, sin meter un texto
     suelto en `valor` (que antes "desbordaba" y no era usable).
   · CNIC con un valor principal + tabla auxiliar (p. ej. SMI) conservan su
     valor escalar y añaden `baremo` complementario.
   Se fusiona en el navegador (bop.js) y en las migraciones (migrar-cni.js);
   el volcado a la nueva base de datos usará este fichero como fuente.
   ═══════════════════════════════════════════════════════════════════════ */

const BOP_CNIC_DATOS = {
  'CNIC-7-1': {
    codigo: 'CNIC-7-1',
    etiqueta: 'Cuentas y límites por franja de edad',
    descripcion: 'Límites de cuenta, transferencia diaria y bono de bienvenida según la franja de edad (Art. 7).',
    tipo_valor: 'baremo',
    valor: '',
    unidad: 'Pz',
    articulo: 'Art. 7',
    vigente: true,
    es_baremo: true,
    resumen: 'Baremo de cuentas por franja de edad (4 filas)',
    baremo: {
      columnas: ['Modalidad', 'Saldo máximo', 'Transferencia diaria', 'Bono de bienvenida'],
      filas: [
        ['Junior básica', '500', '50 / día', '750'],
        ['Junior senior', '1.000', '100 / día', '500'],
        ['Ciudadana', '500.000', 'Sin límite', '500'],
        ['Institucional', '10.000.000', '—', '—']
      ]
    }
  },
  'CNIC-4.1': {
    codigo: 'CNIC-4.1',
    etiqueta: 'Límites de capital por tipo de cuenta',
    descripcion: 'Máximo de saldo y sanción por exceso en cada tipo de cuenta (Art. 4.1).',
    tipo_valor: 'baremo',
    valor: '',
    unidad: 'Pz',
    articulo: 'Art. 4.1',
    vigente: true,
    es_baremo: true,
    resumen: 'Baremo de límites de capital por tipo de cuenta (2 filas)',
    baremo: {
      columnas: ['Tipo de cuenta', 'Límite de capital', 'Multa por exceso'],
      filas: [
        ['Personal', '500.000', '225.000'],
        ['Empresarial / Estatal', '10.000.000', 'A determinar por la Junta']
      ]
    }
  },
  'CNIC-4.3': {
    codigo: 'CNIC-4.3',
    etiqueta: 'Tasa de transferencia',
    descripcion: 'Tasa operativa aplicada a transferencias internas, máximo 12 % (Art. 4.3).',
    tipo_valor: 'porcentaje',
    valor: '0.12',
    unidad: '%',
    articulo: 'Art. 4.3',
    vigente: true,
    es_baremo: false,
    resumen: '12 %'
  },
  'CNIC-4.4': {
    codigo: 'CNIC-4.4',
    etiqueta: 'IVA',
    descripcion: 'Impuesto sobre el Valor Añadido interno del Grupo (Art. 4.4).',
    tipo_valor: 'porcentaje',
    valor: '0.12',
    unidad: '%',
    articulo: 'Art. 4.4',
    vigente: true,
    es_baremo: false,
    resumen: '12 %'
  },
  'CNIC-4.5': {
    codigo: 'CNIC-4.5',
    etiqueta: 'Cotizaciones laborales',
    descripcion: 'Tramos de retención de cotizaciones laborales por salario (Art. 4.5).',
    tipo_valor: 'baremo',
    valor: '',
    unidad: '%',
    articulo: 'Art. 4.5',
    vigente: true,
    es_baremo: true,
    resumen: 'Baremo de cotizaciones por tramo de salario (3 filas)',
    baremo: {
      columnas: ['Tramo salarial (Pz/mes)', 'Trabajador', 'Empresa', 'Total'],
      filas: [
        ['Hasta 1.700', '7,5 %', '7,5 %', '15 %'],
        ['1.701 – 3.000', '10,5 %', '10,5 %', '21 %'],
        ['Desde 3.001', '17,5 %', '17,5 %', '35 %']
      ]
    }
  },
  'CNIC-4.6': {
    codigo: 'CNIC-4.6',
    etiqueta: 'RBU',
    descripcion: 'Renta Básica Universal semanal (Art. 4.6).',
    tipo_valor: 'placeta',
    valor: '5',
    unidad: 'Pz/semana',
    articulo: 'Art. 4.6',
    vigente: true,
    es_baremo: false,
    resumen: '5 Pz/semana'
  },
  'CNIC-4.7': {
    codigo: 'CNIC-4.7',
    etiqueta: 'SMI y salario máximo',
    descripcion: 'Salario Mínimo Interprofesional (referencia) y Salario Máximo Interprofesional mensual (Art. 4.7 y 4.7 bis).',
    tipo_valor: 'placeta',
    valor: '150',
    unidad: 'Pz/mes',
    articulo: 'Art. 4.7',
    vigente: true,
    es_baremo: true,
    resumen: 'SMI: 150 Pz/mes',
    baremo: {
      columnas: ['Concepto', 'Importe (Pz/mes)'],
      filas: [
        ['Salario Mínimo Interprofesional (SMI)', '150'],
        ['Salario Máximo Interprofesional', '1.750']
      ]
    }
  },
  'CNIC-4.10': {
    codigo: 'CNIC-4.10',
    etiqueta: 'Escala IRM',
    descripcion: 'Escala progresiva del Impuesto de Regulación Monetaria según el Índice de Acumulación (Art. 4.10).',
    tipo_valor: 'baremo',
    valor: '',
    unidad: '%',
    articulo: 'Art. 4.10',
    vigente: true,
    es_baremo: true,
    resumen: 'Baremo IRM por modalidad (3 filas)',
    baremo: {
      columnas: ['Modalidad', 'Escala IRM (5 tramos, %)'],
      filas: [
        ['Particular', '0 · 0,5 · 1,5 · 3 · 5'],
        ['Compartida', '0 · 0,75 · 2 · 4 · 6'],
        ['Empresa', '0 · 1 · 3 · 6 · 9']
      ]
    }
  },
  'CNIC-4.13': {
    codigo: 'CNIC-4.13',
    etiqueta: 'Escala IGF — personas físicas',
    descripcion: 'Escala progresiva del Impuesto de Grandes Fortunas para personas físicas (Art. 4.13).',
    tipo_valor: 'baremo',
    valor: '',
    unidad: '%',
    articulo: 'Art. 4.13',
    vigente: true,
    es_baremo: true,
    resumen: 'Baremo IGF personas físicas (3 tramos)',
    baremo: {
      columnas: ['Tramo de patrimonio (Pz)', 'Tipo'],
      filas: [
        ['Hasta 5.000', 'Exento'],
        ['5.001 – 20.000', '10 %'],
        ['20.001 – 500.000', '30 %']
      ]
    }
  },
  'CNIC-4.14': {
    codigo: 'CNIC-4.14',
    etiqueta: 'Escala IGF — empresas y entidades',
    descripcion: 'Escala progresiva del Impuesto de Grandes Fortunas para empresas y entidades (Art. 4.14).',
    tipo_valor: 'baremo',
    valor: '',
    unidad: '%',
    articulo: 'Art. 4.14',
    vigente: true,
    es_baremo: true,
    resumen: 'Baremo IGF empresas y entidades (4 tramos)',
    baremo: {
      columnas: ['Tramo de patrimonio (Pz)', 'Tipo'],
      filas: [
        ['Hasta 5.000', 'Exento'],
        ['5.001 – 20.000', '5 %'],
        ['20.001 – 500.000', '35 %'],
        ['Más de 500.000', '85 %']
      ]
    }
  },
  'CNIC-4.15': {
    codigo: 'CNIC-4.15',
    etiqueta: 'Exención IGF — empresa pequeña',
    descripcion: 'Umbral de patrimonio para la exención del IGF de empresas de reducida dimensión (Art. 4.15).',
    tipo_valor: 'placeta',
    valor: '20000',
    unidad: 'Pz',
    articulo: 'Art. 4.15',
    vigente: true,
    es_baremo: false,
    resumen: '20.000 Pz'
  },
  'CNIC-9-1': {
    codigo: 'CNIC-9-1',
    etiqueta: 'Límite de emisión por usuario',
    descripcion: 'Límite general de emisión de Placetas por usuario (Art. 9).',
    tipo_valor: 'placeta',
    valor: '7500',
    unidad: 'Pz',
    articulo: 'Art. 9',
    vigente: true,
    es_baremo: false,
    resumen: '7.500 Pz'
  },
  'CNIC-15-1': {
    codigo: 'CNIC-15-1',
    etiqueta: 'Tabla de sueldos públicos',
    descripcion: 'Sueldos mensuales (base + complemento) de los cargos del Grupo (Art. 15).',
    tipo_valor: 'baremo',
    valor: '',
    unidad: 'Pz',
    articulo: 'Art. 15',
    vigente: true,
    es_baremo: true,
    resumen: 'Baremo de sueldos públicos (6 cargos)',
    baremo: {
      columnas: ['Cargo', 'Base', 'Complemento', 'Total mensual'],
      filas: [
        ['Presidencia', '267', '67', '334'],
        ['Vicepresidencia', '217', '50', '267'],
        ['Director', '167', '33', '200'],
        ['Técnico', '100', '25', '125'],
        ['Colaborador', '50', '17', '67'],
        ['Estudiante', '17', '8', '25']
      ]
    }
  }
};

if (typeof window !== 'undefined') {
  window.BOP_CNIC_DATOS = BOP_CNIC_DATOS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BOP_CNIC_DATOS };
}
