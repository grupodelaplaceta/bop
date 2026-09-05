/* ═══════════════════════════════════════════════════════════════════════
   BOLP — Clasificación documental (secciones I–VI, departamentos, familias,
   estados). Módulo PURO (sin DOM): se usa en el navegador y en scripts de
   migración Node (module.exports) para mantener una única fuente de verdad.
   ═══════════════════════════════════════════════════════════════════════ */

// ── Secciones del BOLP (estructura documental) ────────────────────────
const BOLP_SECCIONES = [
  {
    id: 'asociativo', numero: 'I', icono: '🏛️',
    titulo: 'Asociativo',
    lema: 'Estatutos, fundamentos, reglamento interno y organización.',
    descripcion: 'Constitución legal del Grupo: estatutos fundacionales, misión y principios, reglamento interno y estructura orgánica (Junta, Presidencia, Secretaría, Tesorería, Departamentos).',
    familias: [
      { id: 'estatutos', nombre: 'Estatutos' },
      { id: 'fundamentos', nombre: 'Fundamentos' },
      { id: 'reglamento-interno', nombre: 'Reglamento interno' },
      { id: 'organizacion', nombre: 'Organización' }
    ]
  },
  {
    id: 'codigo-normativo', numero: 'II', icono: '📘',
    titulo: 'Código Normativo',
    lema: 'El núcleo normativo del Grupo de La Placeta.',
    descripcion: 'Código Normativo Interno (CNI) y normas por departamento. Cada norma es un documento versionado con órgano responsable, fechas de publicación y entrada en vigor.',
    familias: [
      { id: 'cni', nombre: 'Código Normativo Interno (CNI)' },
      { id: 'normas-junta', nombre: 'Normas de la Junta' },
      { id: 'normas-innovacion', nombre: 'Normas de Innovación' },
      { id: 'normas-economico', nombre: 'Normas del Departamento Económico' },
      { id: 'normas-educacion', nombre: 'Normas de Educación' }
    ]
  },
  {
    id: 'terminos-politicas', numero: 'III', icono: '📄',
    titulo: 'Términos y políticas',
    lema: 'Términos, privacidad, menores y propiedad intelectual.',
    descripcion: 'Términos y condiciones, políticas de privacidad, protección de menores (consentimientos y controles) y propiedad intelectual de todas las plataformas y servicios del ecosistema.',
    familias: [
      { id: 'terminos-condiciones', nombre: 'Términos y condiciones' },
      { id: 'privacidad', nombre: 'Privacidad' },
      { id: 'proteccion-menores', nombre: 'Protección de menores' },
      { id: 'propiedad-intelectual', nombre: 'Propiedad intelectual' }
    ]
  },
  {
    id: 'funcionamiento', numero: 'IV', icono: '🗂️',
    titulo: 'Documentación de funcionamiento',
    lema: 'Actas, votaciones, presupuestos y ayudas.',
    descripcion: 'Registro documental de la actividad del Grupo: actas de Junta, resultados de votaciones, presupuestos por departamento/proyecto y convocatorias de becas y subvenciones.',
    familias: [
      { id: 'actas', nombre: 'Actas' },
      { id: 'votaciones', nombre: 'Votaciones' },
      { id: 'presupuestos', nombre: 'Presupuestos' },
      { id: 'becas-subvenciones', nombre: 'Becas y subvenciones' }
    ]
  },
  {
    id: 'sistemas', numero: 'V', icono: '⚙️',
    titulo: 'Sistemas',
    lema: 'Documentación técnica pública del ecosistema.',
    descripcion: 'Documentación técnica de los sistemas: PlacetaID, Banco de La Placeta, Placeta Junior, Placeta Joven, PlacetaEDU, webs, aplicaciones, APIs e infraestructura, con historial de cambios técnicos.',
    familias: [
      { id: 'sistemas-placetaid', nombre: 'PlacetaID' },
      { id: 'sistemas-banco', nombre: 'Banco de La Placeta' },
      { id: 'sistemas-junior', nombre: 'Placeta Junior' },
      { id: 'sistemas-joven', nombre: 'Placeta Joven' },
      { id: 'sistemas-edu', nombre: 'PlacetaEDU' },
      { id: 'sistemas-infra', nombre: 'Web · Apps · APIs · Infraestructura' }
    ]
  },
  {
    id: 'publicaciones', numero: 'VI', icono: '📰',
    titulo: 'Publicaciones oficiales',
    lema: 'Resoluciones, acuerdos y anuncios con rango de BOLP.',
    descripcion: 'El equivalente al boletín oficial: leyes, reglamentos, resoluciones, acuerdos, instrucciones, convocatorias, anuncios y comunicaciones oficiales del Grupo.',
    familias: [
      { id: 'leyes', nombre: 'Ley' },
      { id: 'reglamentos', nombre: 'Reglamento' },
      { id: 'resoluciones', nombre: 'Resolución' },
      { id: 'acuerdos', nombre: 'Acuerdo' },
      { id: 'instrucciones', nombre: 'Instrucción' },
      { id: 'convocatorias', nombre: 'Convocatoria' },
      { id: 'anuncios', nombre: 'Anuncio' },
      { id: 'comunicaciones', nombre: 'Comunicación oficial' }
    ]
  }
];

// ── Departamentos / órganos responsables ───────────────────────────────
const BOLP_DEPARTAMENTOS = [
  { id: 'junta', nombre: 'Junta Directiva' },
  { id: 'secretaria', nombre: 'Secretaría' },
  { id: 'tesoreria', nombre: 'Tesorería' },
  { id: 'asociativo', nombre: 'Área Asociativa' },
  { id: 'innovacion', nombre: 'Departamento de Innovación' },
  { id: 'economico', nombre: 'Departamento Económico' },
  { id: 'educacion', nombre: 'Departamento de Educación' },
  { id: 'justicia', nombre: 'Departamento de Justicia' }
];

// ── Estados documentales (con su badge CSS) ────────────────────────────
const BOLP_ESTADOS = {
  vigente: { etiqueta: 'Vigente', clase: 'badge-vigente', icono: '🟢' },
  publicado: { etiqueta: 'Publicado', clase: 'badge-vigente', icono: '📌' },
  pendiente_vigor: { etiqueta: 'Pendiente de entrada en vigor', clase: 'badge-enmienda', icono: '⏳' },
  derogado: { etiqueta: 'Derogado / Histórico', clase: 'badge-derogado', icono: '⚪' },
  historico: { etiqueta: 'Histórico', clase: 'badge-derogado', icono: '🗄️' },
  proyecto: { etiqueta: 'Proyecto', clase: 'badge-proyecto', icono: '✏️' },
  borrador: { etiqueta: 'Borrador', clase: 'badge-proyecto', icono: '✏️' },
  enmienda: { etiqueta: 'Enmienda / Propuesta', clase: 'badge-enmienda', icono: '🔶' },
  revision: { etiqueta: 'En revisión', clase: 'badge-enmienda', icono: '🔍' }
};

function bolpSeccionPorId(id) {
  return BOLP_SECCIONES.find((s) => s.id === id) || null;
}
function bolpDepartamentoPorId(id) {
  return BOLP_DEPARTAMENTOS.find((d) => d.id === id) || null;
}
function bolpFamiliaEnSeccion(seccionId, familiaId) {
  const s = bolpSeccionPorId(seccionId);
  return s ? (s.familias.find((f) => f.id === familiaId) || null) : null;
}

/* Clasifica un documento en la taxonomía BOLP.
   Respeta los campos explícitos (seccion / familia / departamento) cuando
   el editor los guarda y, si no, los deduce del código/tipo del documento. */
function bolpClasificar(d) {
  const codigo = String((d && d.codigo) || '').toUpperCase();
  const tipo = String((d && d.tipo) || '').toLowerCase();
  const categoria = String((d && d.categoria) || '').toLowerCase();

  if (d && d.seccion && bolpSeccionPorId(d.seccion)) {
    const familiaId = d.familia && bolpFamiliaEnSeccion(d.seccion, d.familia) ? d.familia : null;
    return {
      seccion: d.seccion,
      familia: familiaId,
      departamento: d.departamento && bolpDepartamentoPorId(d.departamento) ? d.departamento : null,
      explicita: true,
      esCnic: false
    };
  }

  let seccion = null;
  let familia = null;
  let departamento = null;

  if (tipo === 'estatuto') {
    seccion = 'asociativo';
    familia = ['fundamentos', 'organizacion', 'reglamento-interno'].includes(categoria) ? categoria : 'estatutos';
    departamento = 'asociativo';
  } else if (/^CNI-/.test(codigo)) {
    seccion = 'codigo-normativo';
    familia = 'cni';
    departamento = 'junta';
  } else if (/^EST-/.test(codigo)) {
    seccion = 'asociativo';
    familia = 'estatutos';
    departamento = 'asociativo';
  } else if (/^PJ-/.test(codigo)) {
    seccion = 'terminos-politicas';
    if (/PJ-(TYC|TERMINOS)/.test(codigo)) familia = 'terminos-condiciones';
    else if (/PJ-(CON|CONSENT)/.test(codigo)) familia = 'proteccion-menores';
    else familia = 'privacidad';
    departamento = 'educacion';
  } else if (/^PJN-/.test(codigo)) {
    seccion = 'terminos-politicas';
    familia = /TYC/.test(codigo) ? 'terminos-condiciones' : 'privacidad';
    departamento = 'educacion';
  } else if (/^(PM|PLID)-/.test(codigo)) {
    seccion = 'terminos-politicas';
    familia = /TYC/.test(codigo) ? 'terminos-condiciones' : 'privacidad';
    departamento = 'innovacion';
  } else if (/^BAN-/.test(codigo)) {
    seccion = /(TYC|PRV)/.test(codigo) ? 'terminos-politicas' : 'codigo-normativo';
    familia = /TYC/.test(codigo) ? 'terminos-condiciones' : (/PRV/.test(codigo) ? 'privacidad' : 'normas-economico');
    departamento = 'economico';
  } else if (/^(RES|ACU|LEY|REG|INST|CONV|ANU|COM)-/.test(codigo)) {
    seccion = 'publicaciones';
    if (/^RES-/.test(codigo)) familia = 'resoluciones';
    else if (/^ACU-/.test(codigo)) familia = 'acuerdos';
    else if (/^LEY-/.test(codigo)) familia = 'leyes';
    else if (/^REG-/.test(codigo)) familia = 'reglamentos';
    else if (/^INST-/.test(codigo)) familia = 'instrucciones';
    else if (/^CONV-/.test(codigo)) familia = 'convocatorias';
    else if (/^ANU-/.test(codigo)) familia = 'anuncios';
    else familia = 'comunicaciones';
    departamento = 'junta';
  } else if (tipo === 'cnic') {
    return { seccion: null, familia: null, departamento: null, explicita: false, esCnic: true };
  } else if (categoria === 'sistema' || categoria === 'programa') {
    seccion = 'sistemas';
    familia = 'sistemas-infra';
    departamento = 'innovacion';
  }

  if (seccion === 'sistemas') {
    if (/PLACETAID|PLID/i.test(codigo)) familia = 'sistemas-placetaid';
    else if (/BANCO|BAN/i.test(codigo)) familia = 'sistemas-banco';
    else if (/JUNIOR|JUN/i.test(codigo)) familia = 'sistemas-junior';
    else if (/JOVEN|JOV/i.test(codigo)) familia = 'sistemas-joven';
    else if (/EDU/i.test(codigo)) familia = 'sistemas-edu';
    else familia = 'sistemas-infra';
  }

  return { seccion, familia, departamento, explicita: false, esCnic: false };
}

/* Nombre legible de familia (o del código si no hay familia). */
function bolpNombreFamilia(d) {
  const c = bolpClasificar(d);
  if (c.seccion && c.familia) {
    const f = bolpFamiliaEnSeccion(c.seccion, c.familia);
    if (f) return f.nombre;
  }
  return (d && d.titulo) ? 'Documento' : 'General';
}

/* Estado normalizado (acepta estados del plan y de la BD). */
function bolpEstado(d) {
  const est = String((d && d.estado) || 'vigente').toLowerCase();
  if (BOLP_ESTADOS[est]) return BOLP_ESTADOS[est];
  const generico = (d && d.vigente === false) ? BOLP_ESTADOS.derogado : BOLP_ESTADOS.vigente;
  return Object.assign({}, generico, { etiqueta: est, clase: generico.clase });
}

/* Fechas de publicación / entrada en vigor normalizadas. */
function bolpFechaPublicacion(d) {
  return (d && (d.fecha_publicacion || d.fecha_aplicacion || d.fecha_aprobacion_junta || d.updated_at || d.created_at)) || '';
}
function bolpFechaVigor(d) {
  return (d && (d.fecha_entrada_vigor || d.fecha_publicacion || d.fecha_aplicacion)) || '';
}

/* Nombre de persona a efectos de boletín oficial: nombre + iniciales de los
   apellidos (p. ej. «Mikel A. M.»). Nunca se publica el nombre completo. */
function bolpCensurarNombre(nombre) {
  if (!nombre) return '';
  const partes = String(nombre).trim().replace(/\s+/g, ' ').split(' ').filter(Boolean);
  if (partes.length <= 1) return partes[0] || '';
  const [primero, ...apellidos] = partes;
  const iniciales = apellidos.map((a) => a.charAt(0) + '.').join(' ');
  return `${primero} ${iniciales}`;
}

/* DIP enmascarado para publicación: conserva el prefijo y la letra de control,
   ocultando los dígitos centrales (p. ej. «237*****M»). */
function bolpCensurarDip(dip) {
  if (!dip) return '';
  const s = String(dip).trim();
  if (s.length <= 4) return '***';
  const cabeza = s.slice(0, 3);
  const cola = s.slice(-1);
  const ocultos = Math.max(3, s.length - 4);
  return `${cabeza}${'*'.repeat(ocultos)}${cola}`;
}

/* Autoría legible en boletín: «Nombre A. A. · DIP***» (sin datos completos). */
function bolpAutorLegible(nombre, dip) {
  const n = bolpCensurarNombre(nombre);
  const d = dip ? bolpCensurarDip(dip) : '';
  return [n, d ? `DIP ${d}` : ''].filter(Boolean).join(' · ');
}

/* Cifras para portada / paneles. */
function bolpCifras(docs, cnic) {
  const arr = Array.isArray(docs) ? docs : [];
  const vigentes = arr.filter((d) => {
    const e = String((d && d.estado) || 'vigente').toLowerCase();
    return ['vigente', 'publicado', 'pendiente_vigor'].includes(e) || (d && d.vigente === false ? false : !['derogado', 'historico', 'borrador', 'proyecto'].includes(e));
  });
  const porSeccion = {};
  arr.forEach((d) => {
    const c = bolpClasificar(d);
    if (c.seccion) porSeccion[c.seccion] = (porSeccion[c.seccion] || 0) + 1;
  });
  return {
    total: arr.length,
    vigentes: vigentes.length,
    cnic: Array.isArray(cnic) ? cnic.length : 0,
    porSeccion
  };
}

/* Índices canónicos para ordenar la normativa según el esquema documental
   (sección I–VI → familia → órgano responsable → código). */
function bolpIndiceSeccion(id) {
  const i = BOLP_SECCIONES.findIndex((s) => s.id === id);
  return i < 0 ? 99 : i;
}
function bolpIndiceFamilia(seccionId, familiaId) {
  const s = BOLP_SECCIONES[bolpIndiceSeccion(seccionId)];
  if (!s) return 99;
  const i = s.familias.findIndex((f) => f.id === familiaId);
  return i < 0 ? 99 : i;
}
function bolpIndiceDepartamento(id) {
  const i = BOLP_DEPARTAMENTOS.findIndex((d) => d.id === id);
  return i < 0 ? 99 : i;
}

/* Clave de orden de un documento dentro del esquema (sin mutar la entrada). */
function bolpClaveOrden(d) {
  const c = bolpClasificar(d);
  return {
    sec: bolpIndiceSeccion(c.seccion),
    fam: bolpIndiceFamilia(c.seccion, c.familia),
    dep: bolpIndiceDepartamento(c.departamento),
    cod: String((d && d.codigo) || '').toUpperCase(),
  };
}

/* Devuelve la lista ordenada según la taxonomía BOLP. */
function bolpOrdenDocumentos(lista) {
  return (Array.isArray(lista) ? lista : [])
    .slice()
    .map((d) => ({ d, k: bolpClaveOrden(d) }))
    .sort((a, b) => {
      if (a.k.sec !== b.k.sec) return a.k.sec - b.k.sec;
      if (a.k.fam !== b.k.fam) return a.k.fam - b.k.fam;
      if (a.k.dep !== b.k.dep) return a.k.dep - b.k.dep;
      return String(a.k.cod).localeCompare(String(b.k.cod), 'es', { numeric: true });
    })
    .map((x) => x.d);
}

// Exponer en navegador y en Node (migraciones)
if (typeof window !== 'undefined') {
  window.BOLP_SECCIONES = BOLP_SECCIONES;
  window.BOLP_DEPARTAMENTOS = BOLP_DEPARTAMENTOS;
  window.BOLP_ESTADOS = BOLP_ESTADOS;
  window.bolpSeccionPorId = bolpSeccionPorId;
  window.bolpDepartamentoPorId = bolpDepartamentoPorId;
  window.bolpFamiliaEnSeccion = bolpFamiliaEnSeccion;
  window.bolpClasificar = bolpClasificar;
  window.bolpNombreFamilia = bolpNombreFamilia;
  window.bolpEstado = bolpEstado;
  window.bolpFechaPublicacion = bolpFechaPublicacion;
  window.bolpFechaVigor = bolpFechaVigor;
  window.bolpCifras = bolpCifras;
  window.bolpOrdenDocumentos = bolpOrdenDocumentos;
  window.bolpCensurarNombre = bolpCensurarNombre;
  window.bolpCensurarDip = bolpCensurarDip;
  window.bolpAutorLegible = bolpAutorLegible;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BOLP_SECCIONES, BOLP_DEPARTAMENTOS, BOLP_ESTADOS,
    bolpSeccionPorId, bolpDepartamentoPorId, bolpFamiliaEnSeccion,
    bolpClasificar, bolpNombreFamilia, bolpEstado,
    bolpFechaPublicacion, bolpFechaVigor, bolpCifras,
    bolpOrdenDocumentos,
    bolpCensurarNombre, bolpCensurarDip, bolpAutorLegible
  };
}
