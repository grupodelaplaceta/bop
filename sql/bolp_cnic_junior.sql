-- ═══════════════════════════════════════════════════════════════════════
-- bop_cnic — Valores curados de Placeta Junior (CNI-BANCO no los recoge)
-- Ejecutar en el editor SQL de Supabase. Idempotente (ON CONFLICT).
-- Tras ejecutarlo, regenerar el espejo:
--     node scripts/exportar-cnic-canonicos.js
-- ═══════════════════════════════════════════════════════════════════════

INSERT INTO bop_cnic
  (codigo, etiqueta, descripcion, tipo_valor, valor, unidad, articulo, vigente, es_baremo, resumen)
VALUES
  ('CNIC-JUNIOR-RBU-DIARIA', 'RBU diaria Placeta Junior',
   'Cantidad diaria de Renta Básica Universal que Placeta Junior abona a cada menor desde la cuenta de la Fundación.',
   'placeta', '5', 'Pz/día', 'Placeta Junior · Academia', true, false, '5 Pz/día'),
  ('CNIC-JUNIOR-GASTO-DIARIO', 'Límite de gasto diario Placeta Junior',
   'Límite diario de gasto de la cuenta infantil por defecto (el tutor puede ajustarlo en el control parental).',
   'placeta', '10', 'Pz/día', 'Placeta Junior · Control parental', true, false, '10 Pz/día'),
  ('CNIC-JUNIOR-GASTO-SEMANAL', 'Límite de gasto semanal Placeta Junior',
   'Límite semanal de gasto de la cuenta infantil por defecto (el tutor puede ajustarlo en el control parental).',
   'placeta', '50', 'Pz/semana', 'Placeta Junior · Control parental', true, false, '50 Pz/semana'),
  ('CNIC-JUNIOR-APROBACION-TUTOR', 'Umbral de aprobación del tutor',
   'A partir de este importe, las operaciones de Placeta Junior requieren la aprobación del tutor.',
   'placeta', '1000', 'Pz', 'Placeta Junior · Control parental', true, false, '1000 Pz')
ON CONFLICT (codigo) DO UPDATE SET
  etiqueta   = EXCLUDED.etiqueta,
  descripcion= EXCLUDED.descripcion,
  tipo_valor = EXCLUDED.tipo_valor,
  valor      = EXCLUDED.valor,
  unidad     = EXCLUDED.unidad,
  articulo   = EXCLUDED.articulo,
  vigente    = EXCLUDED.vigente,
  es_baremo  = false,
  resumen    = EXCLUDED.resumen;
