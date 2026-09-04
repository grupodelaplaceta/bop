#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOLP v2 — Migración a la taxonomía BOLP (secciones I–VI).
   Ejecutar: node scripts/migrar-bolp.js   (requiere bop/sql/bolp_v2.sql
   aplicado antes: añade seccion/familia/departamento/fechas a bop_documentos).

   Clasifica TODOS los documentos de bop_documentos usando la MISMA lógica
   que la web (public/js/bolp-clasificacion.js, módulo puro compartido) y
   rellena en Supabase:
     seccion · familia · departamento · organo_responsable
     fecha_publicacion · fecha_entrada_vigor
   Idempotente: no sobrescribe valores ya establecidos manualmente.
   ═══════════════════════════════════════════════════════════════════════ */
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const {
  bolpClasificar, bolpDepartamentoPorId, bolpFechaPublicacion, bolpFechaVigor
} = require(path.join(__dirname, '..', 'public', 'js', 'bolp-clasificacion.js'));

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SECRET_KEY || '';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';

function isValidKey(k) {
  return !!k && typeof k === 'string' && !k.includes('•') && !k.includes('…') && k.includes('.') && k.length >= 20;
}
const key = isValidKey(SUPABASE_KEY) ? SUPABASE_KEY : (isValidKey(FALLBACK_KEY) ? FALLBACK_KEY : null);
if (!key) { console.error('No hay clave Supabase válida'); process.exit(1); }
const supabase = createClient(SUPABASE_URL, key, { auth: { autoRefreshToken: false, persistSession: false } });

async function migrar() {
  const { data: docs, error } = await supabase
    .from('bop_documentos')
    .select('id, codigo, titulo, tipo, categoria, estado, departamento, organo_responsable, fecha_aplicacion, fecha_aprobacion_junta, fecha_publicacion, fecha_entrada_vigor');

  if (error) { console.error('✗ No se pudieron leer los documentos:', error.message); process.exit(1); }
  if (!docs || !docs.length) { console.log('No hay documentos en bop_documentos.'); return; }

  let ok = 0, saltados = 0, errs = 0;
  for (const d of docs) {
    const cl = bolpClasificar(d);
    const dep = cl.departamento ? bolpDepartamentoPorId(cl.departamento) : null;

    const patch = {};
    if (cl.seccion && !d.seccion) patch.seccion = cl.seccion;
    if (cl.familia && !d.familia) patch.familia = cl.familia;
    if (cl.departamento && !d.departamento) patch.departamento = cl.departamento;
    if (!d.organo_responsable) {
      patch.organo_responsable = (dep && dep.nombre) || (d.organo_responsable || '');
    }
    if (!d.fecha_publicacion) {
      const f = bolpFechaPublicacion(d);
      if (f) patch.fecha_publicacion = String(f).slice(0, 10);
    }
    if (!d.fecha_entrada_vigor) {
      const f = bolpFechaVigor(d);
      if (f) patch.fecha_entrada_vigor = String(f).slice(0, 10);
    }

    const campos = Object.keys(patch);
    if (!campos.length) { saltados++; continue; }

    const { error: uerr } = await supabase.from('bop_documentos').update(patch).eq('id', d.id);
    if (uerr) { console.error('✗', d.codigo, uerr.message); errs++; }
    else { console.log(`✅ ${d.codigo} → seccion=${patch.seccion || d.seccion || '—'} familia=${patch.familia || d.familia || '—'} dep=${patch.departamento || d.departamento || '—'} (${campos.join(', ')})`); ok++; }
  }

  console.log(`\nMigración BOLP v2 completada: ${ok} actualizados, ${saltados} ya clasificados, ${errs} errores.`);
}

migrar().catch((e) => { console.error('Fatal:', e); process.exit(1); });
