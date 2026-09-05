/* ═══════════════════════════════════════════════════════════════════════
   BOP · Valores oficiales — widget para webs de organizaciones de La Placeta
   -----------------------------------------------------------------------
   Inclúyelo en una web dentro de laplaceta.org (o un subdominio) con:

     <bop-valor data-bop-valor="CNIC-IVA">…</bop-valor>
     <bop-valor data-bop-valor="CNIC-SMI-MENSUAL">…</bop-valor>

     <script src="https://bop.laplaceta.org/valores.js"
             data-refs="CNIC-IVA,CNIC-SMI-MENSUAL"
             data-bloqueo="area"></script>

   data-refs      valores obligatorios (separados por comas). Si alguno no
                  se puede resolver, la página NO se da por válida.
   data-revision  (opcional) fecha AAAA-MM-DD de la revisión que esta web
                  está usando; si ya no es la vigente → fallo (409).
   data-bloqueo   area (defecto) | pagina | aviso
                  area   → aviso y desactiva la zona que depende de valores
                  pagina → aviso a pantalla completa e impide el uso de la web
                  aviso  → solo mensaje informativo
   data-area      selector CSS de la zona que queda bloqueada en modo area
                  (si no se indica, se usa el ancestro común de los valores).

   Eventos: «bop:valores-ok» (todo correcto) y «bop:valores-fallo».
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__BOP_VALORES__) return;
  window.__BOP_VALORES__ = true;

  var S = document.currentScript;
  if (!S) return;
  var attr = function (n, d) { var v = S.getAttribute(n); return v === null || v === '' ? d : v; };

  var refs = attr('data-refs', '').split(',').map(function (x) { return x.trim().toUpperCase(); }).filter(Boolean);
  var revision = (S.getAttribute('data-revision') || '').trim();
  var modo = attr('data-bloqueo', 'area').toLowerCase();
  if (['area', 'pagina', 'aviso'].indexOf(modo) < 0) modo = 'area';
  var api = (S.getAttribute('data-api') || '').trim();

  if (!refs.length) return;
  if (!api) {
    try { api = new URL(S.src, location.href).origin + '/api/valores'; }
    catch (e) { return; }
  }

  var ESTILO = '' +
    '.bop-valores-aviso{border:1px solid #b00020;background:#fff5f6;color:#6b0f1e;' +
    'border-radius:8px;padding:12px 16px;font:13px/1.5 system-ui,sans-serif;max-width:640px;' +
    'box-shadow:0 4px 14px rgba(107,15,30,.18);}' +
    '.bop-valores-aviso strong{display:block;font-size:14px;margin-bottom:4px;}' +
    '.bop-valores-aviso p{margin:0 0 4px;}' +
    '.bop-valores-aviso small{opacity:.75;word-break:break-all;}' +
    '.bop-valores-aviso-flotante{position:relative;z-index:5;margin:0 0 12px;}' +
    '.bop-valores-zona-bloqueada{position:relative;}' +
    '.bop-valores-zona-bloqueada > *:not(.bop-valores-aviso-flotante){pointer-events:none;opacity:.5;}' +
    '.bop-valores-aviso-overlay{position:fixed;inset:0;z-index:999999;background:rgba(255,250,250,.97);' +
    'display:flex;align-items:center;justify-content:center;padding:24px;}' +
    '.bop-valores-aviso-overlay .bop-valores-aviso{max-width:520px;}' +
    'html.bop-valores-bloqueo{overflow:hidden;}' +
    '.bop-valor-oficial{font-variant-numeric:tabular-nums;}';

  function asegurarEstilo() {
    if (document.getElementById('bop-valores-css')) return;
    var st = document.createElement('style');
    st.id = 'bop-valores-css';
    st.textContent = ESTILO;
    (document.head || document.documentElement).appendChild(st);
  }

  function nodos() { return Array.prototype.slice.call(document.querySelectorAll('[data-bop-valor]')); }

  function rellenar(valores) {
    nodos().forEach(function (el) {
      var ref = (el.getAttribute('data-bop-valor') || '').trim().toUpperCase();
      var v = valores[ref];
      if (!v || v.resumen == null) return;
      el.textContent = v.resumen;
      el.removeAttribute('data-bop-valor');
      el.setAttribute('data-bop-valor', 'resuelto');
      el.classList.add('bop-valor-oficial');
    });
  }

  function hayPendientes() {
    return nodos().some(function (el) {
      return el.getAttribute('data-bop-valor') !== 'resuelto';
    });
  }

  function areaAfectada() {
    var sel = attr('data-area', '').trim();
    if (sel) { var a = document.querySelector(sel); if (a) return a; }
    var area = document.querySelector('[data-bop-area]');
    if (area) return area;
    var ns = nodos();
    if (!ns.length) return document.body;
    var p = ns[0];
    while (p.parentElement && ns.some(function (n) { return !p.contains(n); })) p = p.parentElement;
    return p;
  }

  function bloquear(msg) {
    asegurarEstilo();
    var ya = document.getElementById('bop-valores-fallo');
    if (ya) ya.remove();

    var box = document.createElement('div');
    box.id = 'bop-valores-fallo';
    box.className = 'bop-valores-aviso';
    box.setAttribute('role', 'alert');
    box.innerHTML = '<strong>Valores oficiales no disponibles</strong>' +
      '<p>' + msg + ' No debe usarse esta página con datos que no se puedan garantizar.</p>' +
      '<small>Servicio de valores: ' + api + '</small>';

    if (modo === 'pagina') {
      var wrap = document.createElement('div');
      wrap.className = 'bop-valores-aviso-overlay';
      wrap.appendChild(box);
      document.documentElement.classList.add('bop-valores-bloqueo');
      document.body.appendChild(wrap);
    } else if (modo === 'area') {
      var area = areaAfectada();
      box.classList.add('bop-valores-aviso-flotante');
      area.classList.add('bop-valores-zona-bloqueada');
      area.setAttribute('aria-busy', 'true');
      area.insertBefore(box, area.firstChild);
    } else {
      // modo «aviso»: banner al inicio del documento
      box.classList.add('bop-valores-aviso-flotante');
      document.body.insertBefore(box, document.body.firstChild);
    }

    var ev;
    try { ev = new CustomEvent('bop:valores-fallo', { detail: { mensaje: msg } }); }
    catch (e) { ev = { type: 'bop:valores-fallo' }; }
    window.dispatchEvent(ev);
  }

  var intentos = 0;
  var MAX_INTENTOS = 3;

  function fallo(m) {
    if (intentos < MAX_INTENTOS) { setTimeout(pedir, 500 * intentos); return; }
    bloquear(m);
  }

  function pedir() {
    intentos++;
    var q = '?refs=' + encodeURIComponent(refs.join(','));
    if (revision) q += '&revision=' + encodeURIComponent(revision);

    fetch(api + q, { credentials: 'omit' })
      .then(function (r) {
        return r.json().then(function (d) { return { ok: r.ok, d: d }; });
      })
      .then(function (o) {
        var d = o.d || {};
        if (o.ok && d.servicio && Array.isArray(d.no_encontrados) && d.no_encontrados.length === 0) {
          rellenar(d.valores || {});
          if (hayPendientes()) {
            fallo('Algunos valores mostrados no disponen de valor oficial.');
            return;
          }
          document.documentElement.setAttribute('data-bop-valores', 'ok');
          var ev;
          try { ev = new CustomEvent('bop:valores-ok', { detail: d }); }
          catch (e) { ev = { type: 'bop:valores-ok' }; }
          window.dispatchEvent(ev);
        } else {
          var motivo = (d.no_encontrados && d.no_encontrados[0] && d.no_encontrados[0].motivo) || '';
          var sugiere = (d.no_encontrados && d.no_encontrados[0] && d.no_encontrados[0].sustitutos) || [];
          var detalle = motivo ? ' (' + motivo + (sugiere.length ? ': ' + sugiere.slice(0, 3).join(', ') : '') + ')' : '';
          fallo('Algunos valores solicitados no están disponibles' + detalle + '.');
        }
      })
      .catch(function () {
        fallo('No se ha podido contactar con el servicio oficial de valores.');
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pedir);
  else pedir();
})();
