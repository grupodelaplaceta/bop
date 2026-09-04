/* ═══════════════════════════════════════════════════════════════════════
   BOP — Navegación global: buscador en cabecera + menú móvil
   Incluir SIEMPRE después de bop.js (necesita BOP.buscar y BOP.init).
   ═══════════════════════════════════════════════════════════════════════ */

let __bopInicializado = false;
async function __bopListo() {
  if (!__bopInicializado) { await BOP.init(); __bopInicializado = true; }
}

function __esc(html) {
  return String(html == null ? '' : html)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ── Buscador global (resultados agrupados, accesible) ─────────────────── */
function iniciarBuscadorGlobal() {
  const input = document.getElementById('buscadorGlobalInput');
  const drop = document.getElementById('buscadorGlobalResultados');
  if (!input || !drop) return;

  const abrir = () => {
    drop.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  };
  const cerrar = () => {
    drop.hidden = true;
    input.setAttribute('aria-expanded', 'false');
  };

  input.addEventListener('input', async () => {
    const q = input.value.trim();
    if (q.length < 2) { cerrar(); return; }
    await __bopListo();
    const r = BOP.buscar(q);

    // Agrupar por tipo de contenido para «encontrarlo todo» fácilmente
    const docs = (r.docs || []).slice(0, 6);
    const cnic = (r.cnic || []).slice(0, 6);
    const total = (r.docs || []).length + (r.cnic || []).length;

    if (!total) {
      drop.innerHTML = `<div class="sg-vacio" role="status">Sin resultados para «${__esc(q)}». Prueba con otro término o revisa el catálogo.</div>`;
      abrir();
      return;
    }

    const itemHtml = (it) => `
      <a class="sg-item" role="option" href="${it.url}" tabindex="-1">
        <span class="sg-codigo">${__esc(it.codigo)}</span>
        <span class="sg-titulo">${__esc(it.titulo)}</span>
        <span class="badge ${it.tipo === 'cnic' ? 'badge-cnic' : 'badge-cni'}">${__esc(String(it.tipo).toUpperCase())}</span>
      </a>`;

    let html = `<div class="sg-mas" role="status" style="text-align:left;border-bottom:1px solid var(--bop-borde)">${total} ${total === 1 ? 'resultado' : 'resultados'} para «${__esc(q)}»</div>`;
    if (docs.length) {
      html += `<div class="sg-grupo">Normativa</div>` + docs.map((d) => itemHtml({
        codigo: d.codigo, titulo: d.titulo, tipo: 'cni',
        url: 'documento.html?codigo=' + encodeURIComponent(d.codigo)
      })).join('');
    }
    if (cnic.length) {
      html += `<div class="sg-grupo">Valores variables (CNIC)</div>` + cnic.map((c) => itemHtml({
        codigo: c.codigo, titulo: c.etiqueta, tipo: 'cnic',
        url: 'cnic.html?codigo=' + encodeURIComponent(c.codigo)
      })).join('');
    }
    html += `<div class="sg-mas"><a href="normativa.html?q=${encodeURIComponent(q)}">Ver todos los resultados (${total}) →</a></div>`;
    drop.innerHTML = html;
    abrir();
  });

  input.addEventListener('focus', () => {
    const tiene = drop.querySelector('.sg-item');
    if (tiene) abrir();
  });

  function opciones() { return Array.from(drop.querySelectorAll('.sg-item')); }

  input.addEventListener('keydown', (e) => {
    const opts = opciones();
    if (e.key === 'Enter') {
      const activo = drop.querySelector('.sg-item:focus') || opts[0];
      if (activo) { e.preventDefault(); location.href = activo.getAttribute('href'); }
    } else if (e.key === 'Escape') {
      cerrar(); input.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = opts.indexOf(document.activeElement);
      const next = opts[idx + 1] || opts[0];
      if (next) next.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = opts.indexOf(document.activeElement);
      const prev = opts[idx - 1] || opts[opts.length - 1];
      if (prev) prev.focus();
    }
  });

  drop.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', (e) => { if (!e.target.closest('.buscador-global')) cerrar(); });
}

/* ── Fecha institucional en la cabecera de gaceta ─────────────────────── */
function rellenarFechaMasthead() {
  const el = document.getElementById('mastFecha');
  if (!el) return;
  const hoy = new Date();
  const texto = hoy.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  el.textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
}

/* ── Menú móvil (hamburguesa) ─────────────────────────────────────────── */
function iniciarMenuMovil() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navPrincipal');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const abierto = nav.classList.toggle('abierto');
    toggle.textContent = abierto ? '✕' : '☰';
    toggle.setAttribute('aria-expanded', String(abierto));
  });

  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('abierto');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.bop-header')) {
      nav.classList.remove('abierto');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Submenús de navegación (accesibles) ──────────────────────────────── */
function iniciarSubmenus() {
  const subBtns = Array.from(document.querySelectorAll('.nav-sub-btn'));
  if (!subBtns.length) return;
  const abrir = (b) => { b.setAttribute('aria-expanded', 'true'); b.closest('.nav-hijo')?.classList.add('abierto'); };
  const cerrar = (b) => { b.setAttribute('aria-expanded', 'false'); b.closest('.nav-hijo')?.classList.remove('abierto'); };
  const cerrarTodos = () => subBtns.forEach(cerrar);

  subBtns.forEach((b) => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const yaAbierto = b.getAttribute('aria-expanded') === 'true';
      cerrarTodos();
      if (!yaAbierto) abrir(b);
    });
    b.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { cerrar(b); b.focus(); }
    });
  });
  document.querySelectorAll('.nav-hijo .nav-submenu a').forEach((a) => a.addEventListener('click', cerrarTodos));
  document.addEventListener('click', (e) => { if (!e.target.closest('.nav-hijo')) cerrarTodos(); });
}

document.addEventListener('DOMContentLoaded', () => {
  rellenarFechaMasthead();
  iniciarBuscadorGlobal();
  iniciarSubmenus();
  iniciarMenuMovil();
});
