#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   BOP — Migración del CNI completo a Supabase (RSP)
   Ejecutar: npm run migrar  (o: node scripts/migrar-cni.js)
   Lee los datos migrados del PDF (public/js/datos-migrados.js) y hace
   upsert en las tablas bop_documentos y bop_cnic. También guarda la
   primera versión en bop_versiones.
   ═══════════════════════════════════════════════════════════════════════ */
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Cargar datos migrados (CommonJS)
const { BOP_MIGRADOS } = require(path.join(__dirname, '..', 'public', 'js', 'datos-migrados.js'));
// Datos CNIC corregidos y estructurados (escalares + baremos)
const { BOP_CNIC_DATOS } = require(path.join(__dirname, '..', 'public', 'js', 'cnic-datos.js'));

// ── Configuración Supabase (igual que admin-placeta) ────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://htikrqaywapshlkdonvs.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SECRET_KEY || '';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aWtycWF5d2Fwc2hsa2RvbnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg0MTQ2NywiZXhwIjoyMDk4NDE3NDY3fQ.wiL-rKidW9XawEISg56mOLZEFCfq4UMm1ufil5BdaG0';

function isValidKey(k) {
  return !!k && typeof k === 'string' && !k.includes('•') && !k.includes('…') && k.includes('.') && k.length >= 20;
}
const key = isValidKey(SUPABASE_KEY) ? SUPABASE_KEY : (isValidKey(FALLBACK_KEY) ? FALLBACK_KEY : null);
if (!key) { console.error('No hay clave Supabase válida'); process.exit(1); }
const supabase = createClient(SUPABASE_URL, key, { auth: { autoRefreshToken: false, persistSession: false } });

const AUTOR = { dip: '23749931M', nombre: 'Mikel Alegre Marcos' };

async function migrar() {
  const docs = [...(BOP_MIGRADOS.estatutos || []), ...(BOP_MIGRADOS.cni || []), ...(BOP_MIGRADOS.junior || [])];
  let okDocs = 0, okCnic = 0, errs = 0;

  // ── Documentos ──────────────────────────────────────────────────────
  for (const d of docs) {
    const row = {
      codigo: d.codigo,
      titulo: d.titulo,
      tipo: d.tipo || 'cni',
      categoria: d.categoria || 'capitulo',
      estado: d.estado || 'vigente',
      contenido_md: d.contenido_md || '',
      version: d.version || 1,
      fecha_aplicacion: d.fecha_aplicacion || null,
      fecha_propuesta: d.fecha_propuesta || null,
      fecha_aprobacion_junta: d.fecha_aprobacion_junta || null,
      aprobada_en_junta: d.aprobada_en_junta !== false,
      cnic_refs: d.cnic_refs || [],
      autor_dip: AUTOR.dip,
      autor_nombre: AUTOR.nombre,
      notas_cambio: d.notas_cambio || 'Migrado del Código Normativo Interno (PDF, edición unificada 03/07/2026).'
    };
    const { error } = await supabase.from('bop_documentos').upsert(row, { onConflict: 'codigo' });
    if (error) { console.error('✗ doc', d.codigo, error.message); errs++; }
    else { okDocs++; }

    // Versión 1 en historial
    if (!error) {
      const { data: exist } = await supabase.from('bop_documentos').select('id').eq('codigo', d.codigo).maybeSingle();
      if (exist?.id) {
        await supabase.from('bop_versiones').upsert({
          documento_id: exist.id, version: 1, estado: d.estado || 'vigente',
          contenido_md: d.contenido_md || '', autor_dip: AUTOR.dip, autor_nombre: AUTOR.nombre,
          notas_cambio: 'Migración inicial del CNI.', fecha_aprobacion_junta: d.fecha_aprobacion_junta || null,
          aprobada_en_junta: d.aprobada_en_junta !== false
        }, { onConflict: 'documento_id,version' });
      }
    }
  }

  // ── CNIC ────────────────────────────────────────────────────────────
  for (const orig of (BOP_MIGRADOS.cnic || [])) {
    const c = Object.assign({}, orig, (BOP_CNIC_DATOS[orig.codigo] || {}));
    const row = {
      codigo: c.codigo, etiqueta: c.etiqueta, descripcion: c.descripcion || '',
      tipo_valor: c.tipo_valor || 'texto', valor: c.valor || '', unidad: c.unidad || '',
      articulo: c.articulo || '', vigente: c.vigente !== false,
      es_baremo: !!c.es_baremo,
      baremo: c.baremo || [],
      resumen: c.resumen || '',
      historial: c.historial || [{ valor: c.valor || '', desde: c.desde || null, autor_dip: AUTOR.dip, notas: 'Migración inicial.' }],
      autor_dip: AUTOR.dip
    };
    const { error } = await supabase.from('bop_cnic').upsert(row, { onConflict: 'codigo' });
    if (error) { console.error('✗ cnic', c.codigo, error.message); errs++; }
    else okCnic++;
  }

  console.log(`✅ Migración completada: ${okDocs} documentos, ${okCnic} CNIC, ${errs} errores.`);
}

migrar().catch((e) => { console.error('Fatal:', e); process.exit(1); });
