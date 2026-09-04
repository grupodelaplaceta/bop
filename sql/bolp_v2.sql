-- ═══════════════════════════════════════════════════════════════════════
--  BOLP v2 — Boletín Oficial de La Placeta (bop.laplaceta.org)
--  Migración del modelo documental a la estructura BOLP (secciones I–VI).
--
--  Añade a bop_documentos los campos de la taxonomía BOLP:
--    · seccion           → I Asociativo · II Código Normativo ·
--                          III Términos y políticas · IV Funcionamiento ·
--                          V Sistemas · VI Publicaciones oficiales
--    · familia           → subapartado dentro de la sección
--    · departamento      → órgano responsable (id del catálogo)
--    · organo_responsable→ nombre legible del órgano responsable
--    · fecha_publicacion / fecha_entrada_vigor → ciclo Publicado→Vigente
--    · aprobacion_referencia → Acuerdo/Resolución de Junta que la aprobó
--    · documento_anterior / documento_posterior → versiones encadenadas
--    · etiquetas         → palabras clave para el buscador
--
--  Compatible hacia atrás: solo ADICIONA columnas con valor por defecto;
--  el editor actual de RSP y las versiones anteriores siguen funcionando.
--  ═══════════════════════════════════════════════════════════════════════

-- ── bop_documentos: taxonomía BOLP ─────────────────────────────────────
alter table public.bop_documentos
  add column if not exists seccion text,
  add column if not exists familia text,
  add column if not exists departamento text,
  add column if not exists organo_responsable text,
  add column if not exists fecha_publicacion date,
  add column if not exists fecha_entrada_vigor date,
  add column if not exists aprobacion_referencia text,
  add column if not exists documento_anterior text,
  add column if not exists documento_posterior text,
  add column if not exists etiquetas jsonb not null default '[]'::jsonb;

comment on column public.bop_documentos.seccion is 'Sección documental BOLP (asociativo|codigo-normativo|terminos-politicas|funcionamiento|sistemas|publicaciones)';
comment on column public.bop_documentos.familia is 'Familia/subapartado dentro de la sección';
comment on column public.bop_documentos.departamento is 'Órgano responsable (id: junta|secretaria|tesoreria|asociativo|innovacion|economico|educacion|justicia)';
comment on column public.bop_documentos.organo_responsable is 'Nombre legible del órgano responsable';
comment on column public.bop_documentos.fecha_publicacion is 'Fecha de publicación en el BOLP';
comment on column public.bop_documentos.fecha_entrada_vigor is 'Fecha de entrada en vigor (puede diferir de la publicación)';

create index if not exists idx_bop_docs_seccion on public.bop_documentos (seccion);
create index if not exists idx_bop_docs_familia on public.bop_documentos (familia);
create index if not exists idx_bop_docs_departamento on public.bop_documentos (departamento);

-- ── Clasificación automática de los documentos existentes ──────────────
-- Reglas idénticas a public/js/bolp-clasificacion.js. Se ejecutan una vez;
-- a partir de aquí la clasificación puede sobrescribirse desde el editor.
update public.bop_documentos set
  seccion = case
    when tipo = 'estatuto' or codigo like 'EST-%' then 'asociativo'
    when codigo like 'CNI-%' then 'codigo-normativo'
    when codigo like 'PJ-%' or codigo like 'PJN-%' or codigo like 'PM-%' or codigo like 'PLID-%' or codigo like 'BAN-%' then 'terminos-politicas'
    when codigo ~ '^(RES|ACU|LEY|REG|INST|CONV|ANU|COM)-' then 'publicaciones'
    else seccion
  end,
  familia = case
    when codigo like 'CNI-%' then 'cni'
    when codigo like 'PJ-TYC-%' or codigo like 'PJ-TERMINOS%' then 'terminos-condiciones'
    when codigo like 'PJ-CON-%' or codigo like 'PJ-CONSENT%' then 'proteccion-menores'
    when codigo like 'PM-%' or codigo like 'PLID-%' then 'privacidad'
    when codigo like 'PJ-PRV-%' then 'privacidad'
    when codigo like 'BAN-TYC%' then 'terminos-condiciones'
    when codigo like 'BAN-PRV%' then 'privacidad'
    else familia
  end,
  departamento = case
    when codigo like 'PJ-%' or codigo like 'PJN-%' then 'educacion'
    when codigo like 'PM-%' or codigo like 'PLID-%' or (categoria in ('sistema','programa')) then coalesce(departamento, 'innovacion')
    when codigo like 'BAN-%' then 'economico'
    when tipo = 'estatuto' or codigo like 'EST-%' then 'asociativo'
    else coalesce(departamento, 'junta')
  end,
  fecha_publicacion = coalesce(fecha_publicacion, fecha_aplicacion, fecha_aprobacion_junta),
  fecha_entrada_vigor = coalesce(fecha_entrada_vigor, fecha_aplicacion, fecha_aprobacion_junta)
where true;

-- Nombre legible del órgano responsable (según el departamento ya asignado)
update public.bop_documentos set organo_responsable = coalesce(organo_responsable, case departamento
  when 'junta' then 'Junta Directiva'
  when 'secretaria' then 'Secretaría'
  when 'tesoreria' then 'Tesorería'
  when 'asociativo' then 'Área Asociativa'
  when 'innovacion' then 'Departamento de Innovación'
  when 'economico' then 'Departamento Económico'
  when 'educacion' then 'Departamento de Educación'
  when 'justicia' then 'Departamento de Justicia'
  else 'Junta Directiva'
end)
where organo_responsable is null or organo_responsable = '';

-- ── Opcional: tabla de secciones (catálogo estático) ───────────────────
create table if not exists public.bop_secciones (
  id text primary key,
  numero text not null,
  titulo text not null,
  lema text not null default '',
  descripcion text not null default '',
  icono text not null default '',
  orden int not null default 0
);

insert into public.bop_secciones (id, numero, titulo, lema, icono, orden) values
  ('asociativo', 'I', 'Asociativo', 'Estatutos, fundamentos, reglamento interno y organización.', '🏛️', 1),
  ('codigo-normativo', 'II', 'Código Normativo', 'El núcleo normativo del Grupo de La Placeta.', '📘', 2),
  ('terminos-politicas', 'III', 'Términos y políticas', 'Términos, privacidad, menores y propiedad intelectual.', '📄', 3),
  ('funcionamiento', 'IV', 'Documentación de funcionamiento', 'Actas, votaciones, presupuestos y ayudas.', '🗂️', 4),
  ('sistemas', 'V', 'Sistemas', 'Documentación técnica pública del ecosistema.', '⚙️', 5),
  ('publicaciones', 'VI', 'Publicaciones oficiales', 'Resoluciones, acuerdos y anuncios con rango de BOLP.', '📰', 6)
on conflict (id) do update set
  numero = excluded.numero, titulo = excluded.titulo, lema = excluded.lema,
  descripcion = excluded.descripcion, icono = excluded.icono, orden = excluded.orden;
