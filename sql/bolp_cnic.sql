-- ═══════════════════════════════════════════════════════════════════════
--  BOLP — CNIC estructurados (datos utilizables)
--  Añade a bop_cnic los campos de baremo:
--    · es_baremo  → true si el CNIC es una tabla/escala (no un valor único)
--    · baremo     → jsonb { columnas: string[], filas: string[][] }
--    · resumen    → texto legible corto (valor escalar o resumen del baremo)
--  Los CNIC escalares mantienen su `valor` unitario (usable en código);
--  los baremos ya no guardan un texto suelto en `valor` (se deja vacío) y
--  sus tramos viven en `baremo`.
--  Compatible hacia atrás: solo añade columnas; migrar-cni.js rellena los
--  datos corregidos (fuente: public/js/cnic-datos.js).
-- ═══════════════════════════════════════════════════════════════════════
alter table public.bop_cnic
  add column if not exists es_baremo boolean not null default false,
  add column if not exists baremo jsonb not null default '[]'::jsonb,
  add column if not exists resumen text;

comment on column public.bop_cnic.es_baremo is 'Indica si el CNIC es un baremo/escala (tabla de tramos) y no un valor único.';
comment on column public.bop_cnic.baremo is 'Baremo estructurado: { columnas: string[], filas: string[][] }.';
comment on column public.bop_cnic.resumen is 'Resumen legible del valor (escalar) o del baremo para listados e inline.';
