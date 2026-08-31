# Inyecta el documento PM-PRV-001 (Política de Privacidad de PlacetaID Móvil)
# como respaldo estático en bop/public/js/datos-migrados.js, leyendo el
# contenido desde bop/documentos/placetaid-movil-politica-de-privacidad.md
# (fuente canónica), igual que se hizo con los documentos de Placeta Junior.

$ErrorActionPreference = 'Stop'
$mdPath = Join-Path $PSScriptRoot '..\documentos\placetaid-movil-politica-de-privacidad.md'
$jsPath = Join-Path $PSScriptRoot '..\public\js\datos-migrados.js'

$md = [System.IO.File]::ReadAllText($mdPath)
$js = $md.Replace('\', '\\').Replace("'", "\'")
$js = $js -replace "`r`n", '\r\n'
$js = $js -replace "`n", '\r\n'
$js = $js.TrimEnd()

$entry = @"

  // ── PLACETAID MÓVIL — Política de privacidad (enlazada en Google Play) ──
  placetaid: [
    {
      codigo: 'PM-PRV-001',
      titulo: 'Política de Privacidad — PlacetaID Móvil',
      tipo: 'cni',
      categoria: 'sistema',
      estado: 'vigente',
      version: 1,
      fecha_aplicacion: '2026-08-31',
      fecha_aprobacion_junta: '2026-08-31',
      aprobada_en_junta: true,
      autor_dip: '23749931M',
      autor_nombre: 'Mikel Alegre Marcos',
      notas_cambio: 'Publicación de la Política de Privacidad de PlacetaID Móvil v26.8.1, requerida para su publicación en Google Play.',
      contenido_md: '$js'
    }
  ]
"@

$content = [System.IO.File]::ReadAllText($jsPath)
# Detectar estilo de salto de línea del fichero
$nl = if ($content.Contains("`r`n")) { "`r`n" } else { "`n" }

if ($content.Contains("placetaid:")) {
  Write-Output 'Ya existe una sección placetaid en datos-migrados.js; no se modifica.'
  exit 0
}

$pattern = "  ]" + $nl + $nl + "};"
if (-not $content.Contains($pattern)) {
  Write-Error 'No se encontró el patrón de cierre ("]\n\n};") en datos-migrados.js.'
  exit 1
}

$content = $content.Replace($pattern, "  ]," + $nl + $entry + $nl + "};")
[System.IO.File]::WriteAllText($jsPath, $content, (New-Object System.Text.UTF8Encoding($false)))
Write-Output 'OK: PM-PRV-001 inyectado en datos-migrados.js'
