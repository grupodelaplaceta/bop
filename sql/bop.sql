-- ═══════════════════════════════════════════════════════════════════════
--  BOLETÍN OFICIAL DE LA PLACETA (BOP) — bop.laplaceta.org
--  Esquema Supabase (RSP) para el Sistema de Clasificación de la Normativa.
--
--  Jerarquía:
--    ESTATUTOS  -> Constitución legal del Grupo de La Placeta
--    CNI        -> Código Normativo Interno (base)
--       · Capítulos  (generales, estables)
--       · Sistemas   (cómo funciona un sistema en concreto)
--       · Programas  (proyectos globales de La Placeta)
--    CNIC       -> Códigos Normativos Internos Complementarios (datos
--                  variables: %, precios en Placetas, límites…) que NO se
--                  imprimen físicamente como fuente fiable de revisión.
--
--  Los CNIC evitan modificar el CNI "cada dos por tres": el CNI cita la
--  referencia CNIC-XXXX y el valor vive en el complementario.
-- ═══════════════════════════════════════════════════════════════════════

-- ── Documentos (normativa publicada) ─────────────────────────────────────
create table if not exists public.bop_documentos (
  id              uuid primary key default gen_random_uuid(),
  codigo          text not null,                 -- p.ej. "CNI-IV", "CNIC-4.10", "EST-1"
  titulo          text not null,
  tipo            text not null default 'cni',   -- estatuto | cni | cnic
  categoria       text not null default 'capitulo', -- capitulo | sistema | programa | general | complementario
  estado          text not null default 'vigente',  -- vigente | derogado | proyecto | enmienda
  contenido_md    text not null default '',
  version         int not null default 1,
  -- Fechas normativas:
  --  · Anteriores a Junio 2026 → solo fecha_aplicacion.
  --  · Posteriores a Junio 2026 → fecha_propuesta y fecha_aprobacion_junta.
  fecha_aplicacion    date,
  fecha_propuesta     date,
  fecha_aprobacion_junta date,
  aprobada_en_junta   boolean not null default false,
  -- Referencia cruzada a CNIC (para datos variables)
  cnic_refs           jsonb not null default '[]',  -- [{ codigo: "CNIC-4.10", etiqueta: "Tipo IRM" }]
  -- Auditoría
  autor_dip           text,
  autor_nombre        text,
  notas_cambio        text,                        -- motivo/justificación de la versión
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ── Historial de versiones (cada edición guarda la versión anterior) ────
create table if not exists public.bop_versiones (
  id             uuid primary key default gen_random_uuid(),
  documento_id   uuid not null references public.bop_documentos(id) on delete cascade,
  version        int not null,
  estado         text not null,
  contenido_md   text not null default '',
  autor_dip      text,
  autor_nombre   text,
  notas_cambio   text,
  fecha_propuesta date,
  fecha_aprobacion_junta date,
  aprobada_en_junta boolean not null default false,
  creado_en      timestamptz not null default now(),
  unique (documento_id, version)
);

-- ── Códigos Normativos Internos Complementarios (CNIC) ──────────────────
-- Valores variables (%, precios, límites, plazos…) referenciados desde el
-- CNI. El CNI no se modifica por cada cambio de un valor: se actualiza el
-- CNIC y el historial queda aquí.
create table if not exists public.bop_cnic (
  id          uuid primary key default gen_random_uuid(),
  codigo      text not null unique,          -- p.ej. "CNIC-4.10-01"
  etiqueta    text not null,                 -- "Tipo IRM - escala"
  descripcion text,
  tipo_valor  text not null default 'porcentaje', -- porcentaje | placeta | entero | texto | fecha
  valor       text not null,                 -- valor actual (string normalizado)
  unidad      text default 'Pz',             -- Pz | % | días | …
  vigente     boolean not null default true,
  -- Artículo del CNI al que complementa (referencia cruzada)
  articulo    text,                          -- p.ej. "Art. 4.10"
  historial   jsonb not null default '[]',   -- [{valor, desde, autor_dip, notas}]
  autor_dip   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Índices ──────────────────────────────────────────────────────────────
create index if not exists idx_bop_docs_codigo on public.bop_documentos (codigo);
create index if not exists idx_bop_docs_tipo on public.bop_documentos (tipo);
create index if not exists idx_bop_docs_estado on public.bop_documentos (estado);
create index if not exists idx_bop_vers_doc on public.bop_versiones (documento_id, version desc);
create index if not exists idx_bop_cnic_codigo on public.bop_cnic (codigo);

-- ── RLS: lectura pública, escritura solo RSP/administradores ─────────────
alter table public.bop_documentos enable row level security;
alter table public.bop_versiones enable row level security;
alter table public.bop_cnic enable row level security;

create policy "bop_lectura_publica" on public.bop_documentos
  for select using (true);
create policy "bop_lectura_publica_versiones" on public.bop_versiones
  for select using (true);
create policy "bop_lectura_publica_cnic" on public.bop_cnic
  for select using (true);

-- Escritura: el servicio RSP (admin-placeta) usa la clave service_role, que
-- omite RLS. Para clientes anónimos NO se habilitan políticas de escritura.

-- ── Seed: estructura inicial (CNI Capítulo IV y CNIC de ejemplo) ─────────
insert into public.bop_documentos (codigo, titulo, tipo, categoria, estado, contenido_md, version, fecha_aplicacion, aprobada_en_junta, autor_dip, autor_nombre, notas_cambio) values
  ('EST-1', 'Estatutos del Grupo de La Placeta', 'estatuto', 'general', 'vigente',
   E'# Estatutos del Grupo de La Placeta\n\nDonde se constituye legalmente el Grupo.\n\n## Título I\n…',
   1, '2024-01-01', true, '23749931M', 'Mikel Alegre Marcos', 'Versión inicial de los Estatutos.'),
  ('CNI-IV', 'Capítulo IV: Banca, Capital e Impuestos', 'cni', 'capitulo', 'vigente',
   E'# Capítulo IV: Banca, Capital e Impuestos\n\nBase de la normativa interna del sistema bancario.\n\n## Art. 4.8 a 4.16\nIRM mensual e IGF progresivo. Los tipos y límites están en los CNIC correspondientes (ver cnic_refs).',
   1, '2026-07-01', true, '23749931M', 'Mikel Alegre Marcos', 'Aprobado en Junta de julio 2026.')
on conflict do nothing;

insert into public.bop_cnic (codigo, etiqueta, descripcion, tipo_valor, valor, unidad, articulo, vigente, historial) values
  ('CNIC-4.10-01', 'Tipo IRM - Cuenta Personal (IA 0.02)', 'Tipo aplicable a cuenta personal según escala del Art. 4.10.', 'porcentaje', '0.02', '%', 'Art. 4.10', true,
   '[{"valor":"0.02","desde":"2026-07-01","autor_dip":"23749931M","notas":"Valor inicial aprobado en Junta."}]'),
  ('CNIC-4.12-01', 'Umbral IGF - exención primeros 5000 Pz', 'Exención IGF de los primeros 5.000 Pz de patrimonio medio.', 'placeta', '5000', 'Pz', 'Art. 4.12', true,
   '[{"valor":"5000","desde":"2026-07-01","autor_dip":"23749931M","notas":"Valor inicial."}]')
on conflict (codigo) do nothing;
