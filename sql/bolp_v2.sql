-- ═══════════════════════════════════════════════════════════════════════
-- BOLP v2 — Taxonomía documental en bop_documentos
-- Añade los campos de clasificación BOLP (secciones I–VI) y fechas
-- editoriales. Idempotente (ADD COLUMN IF NOT EXISTS). Si ya está aplicado
-- (las columnas existen), ejecutar solo la migración de clasificación:
--     node scripts/migrar-bolp-rest.js
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE public.bop_documentos
  ADD COLUMN IF NOT EXISTS seccion              text,
  ADD COLUMN IF NOT EXISTS familia              text,
  ADD COLUMN IF NOT EXISTS departamento         text,
  ADD COLUMN IF NOT EXISTS organo_responsable   text,
  ADD COLUMN IF NOT EXISTS fecha_publicacion    text,
  ADD COLUMN IF NOT EXISTS fecha_entrada_vigor  text;

-- Índice para el catálogo por sección.
CREATE INDEX IF NOT EXISTS bop_documentos_seccion_idx ON public.bop_documentos (seccion);
