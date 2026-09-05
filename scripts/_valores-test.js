/* ═══════════════════════════════════════════════════════════════════════
   Pruebas locales del servicio de valores + API CNIC (sin red ni Supabase).
   Levanta un servidor HTTP que delega en api/valores.js y api/cnic.js
   (usa el espejo canónico local) y verifica: alias, grupos, pendientes,
   CORS, revisión y errores. Uso:  node scripts/_valores-test.js
   ═══════════════════════════════════════════════════════════════════════ */
const http = require('http');
const fs = require('fs');
const path = require('path');
const valoresApi = require('../api/valores.js');
const cnicApi = require('../api/cnic.js');

const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json' };

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (u.pathname === '/api/valores' || u.pathname === '/api/valores.js') return valoresApi(req, res);
  if (u.pathname === '/api/cnic') return cnicApi(req, res);
  const file = path.join(__dirname, '..', 'public', decodeURIComponent(u.pathname).replace(/^\/+/, ''));
  try {
    const data = fs.readFileSync(file);
    res.statusCode = 200;
    res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  } catch (e) {
    res.statusCode = 404;
    res.end('not found');
  }
});

function pedir(port, p, headers) {
  return new Promise((resolve) => {
    const req = http.request({ host: '127.0.0.1', port, path: p, method: 'GET', headers: headers || {} }, (res) => {
      let b = '';
      res.on('data', (c) => { b += c; });
      res.on('end', () => {
        let j = null;
        try { j = JSON.parse(b); } catch (e) { /* no json */ }
        resolve({ status: res.statusCode, acao: res.headers['access-control-allow-origin'], body: b, json: j });
      });
    });
    req.end();
  });
}

let fallos = 0;
function comprobar(nombre, cond, extra) {
  const ok = !!cond;
  console.log((ok ? 'PASS' : 'FAIL') + '  ' + nombre + (extra ? '  → ' + extra : ''));
  if (!ok) fallos++;
}

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;

  // — Valores — directos
  let r = await pedir(port, '/api/valores?refs=CNIC-IVA,CNIC-SMI-MENSUAL');
  comprobar('valores 200', r.status === 200, 'status ' + r.status);
  comprobar('valores IVA 12 %', r.json && r.json.valores['CNIC-IVA'].resumen === '12 %', r.json && r.json.valores['CNIC-IVA'].resumen);
  comprobar('valores IVA numero 12', r.json && r.json.valores['CNIC-IVA'].numero === 12, String(r.json && r.json.valores['CNIC-IVA'].numero));
  comprobar('valores SMI 150 Pz', r.json && r.json.valores['CNIC-SMI-MENSUAL'].resumen === '150 Pz');
  comprobar('valores encontrados 2 sin fallos', r.json && r.json.encontrados === 2 && r.json.no_encontrados.length === 0);
  comprobar('valores revision fecha', r.json && /^\d{4}-\d{2}-\d{2}$/.test(r.json.revision), r.json && r.json.revision);

  // — Catálogo completo (todo=1)
  r = await pedir(port, '/api/valores?todo=1');
  comprobar('todo=1 total 68', r.status === 200 && r.json.total === 68 && r.json.encontrados === 68, 'total ' + (r.json && r.json.total));
  comprobar('todo=1 valores tipados', r.json && r.json.valores['CNIC-IA-TRAMO-2'].numero === 5 && r.json.valores['CNIC-IGF-PF-TIPO-3'].numero === 30);
  comprobar('todo=1 sin no_encontrados', r.json && r.json.no_encontrados.length === 0);

  // — Alias único
  r = await pedir(port, '/api/valores?refs=CNIC-4.4');
  comprobar('alias CNIC-4.4 → CNIC-IVA', r.status === 200 && r.json.valores['CNIC-IVA'] && r.json.valores['CNIC-4.4'] && r.json.valores['CNIC-4.4'].alias_de === 'CNIC-IVA');
  comprobar('alias único sin no_encontrados', r.json && r.json.no_encontrados.length === 0);

  // — Alias grupo / pendiente / inexistente
  r = await pedir(port, '/api/valores?refs=CNIC-4.5');
  comprobar('grupo CNIC-4.5 motivo', r.json && r.json.no_encontrados[0] && r.json.no_encontrados[0].motivo === 'legacy_agrupado');
  comprobar('grupo CNIC-4.5 sustitutos 11', r.json && r.json.no_encontrados[0].sustitutos.length === 11, 'len ' + (r.json && r.json.no_encontrados[0].sustitutos.length));
  r = await pedir(port, '/api/valores?refs=CNIC-15-1');
  comprobar('pendiente CNIC-15-1', r.json && r.json.no_encontrados[0] && r.json.no_encontrados[0].motivo === 'pendiente');
  r = await pedir(port, '/api/valores?refs=CNIC-NOEXISTE');
  comprobar('inexistente no_existe', r.json && r.json.no_encontrados[0] && r.json.no_encontrados[0].motivo === 'no_existe');
  comprobar('grupo por parametro', (await pedir(port, '/api/valores?grupo=CNIC-4.6')).json.valores['CNIC-RBU-SEMANAL'].resumen === '5 Pz');

  // — Revisión
  r = await pedir(port, '/api/valores?refs=CNIC-IVA&revision=1999-01-01');
  comprobar('revision 409 desactualizada', r.status === 409 && r.json.error === 'revision_desactualizada');
  comprobar('refs vacio 400', (await pedir(port, '/api/valores')).status === 400);

  // — CORS
  r = await pedir(port, '/api/valores?refs=CNIC-IVA', { Origin: 'https://banco.laplaceta.org' });
  comprobar('CORS laplaceta OK', r.status === 200 && r.acao === 'https://banco.laplaceta.org');
  r = await pedir(port, '/api/valores?refs=CNIC-IVA', { Origin: 'https://sub.laplaceta.org' });
  comprobar('CORS subdominio OK', r.status === 200 && r.acao === 'https://sub.laplaceta.org');
  r = await pedir(port, '/api/valores?refs=CNIC-IVA', { Origin: 'https://example.com' });
  comprobar('CORS example.com 403', r.status === 403 && r.json && r.json.error === 'origen_no_permitido');

  // — API CNIC
  r = await pedir(port, '/api/cnic');
  comprobar('cnic listado 68', r.status === 200 && r.json.total === 68, 'total ' + r.json && r.json.total);
  r = await pedir(port, '/api/cnic?codigo=CNIC-4.4');
  comprobar('cnic alias 4.4 → IVA', r.status === 200 && r.json.codigo === 'CNIC-IVA' && r.json.alias_de === 'CNIC-4.4' && r.json.valor === '12');
  r = await pedir(port, '/api/cnic?codigo=CNIC-4.5');
  comprobar('cnic grupo 4.5', r.status === 200 && r.json.tipo === 'grupo' && r.json.sustitutos.length === 11);
  r = await pedir(port, '/api/cnic?codigo=CNIC-15-1');
  comprobar('cnic pendiente 15-1', r.status === 200 && r.json.tipo === 'pendiente');
  r = await pedir(port, '/api/cnic?codigo=CNIC-NOEXISTE');
  comprobar('cnic desconocido 404', r.status === 404);
  r = await pedir(port, '/api/cnic', { Origin: 'https://example.com' });
  comprobar('cnic CORS 403', r.status === 403);

  server.close();
  console.log(fallos === 0 ? '\nTODO OK' : '\n' + fallos + ' FALLOS');
  process.exit(fallos === 0 ? 0 : 1);
})();
