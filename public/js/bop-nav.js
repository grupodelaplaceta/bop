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

/* ── Buscador global (dropdown de resultados) ─────────────────────────── */
function iniciarBuscadorGlobal() {
  const input = document.getElementById('buscadorGlobalInput');
  const drop = document.getElementById('buscadorGlobalResultados');
  if (!input || !drop) return;

  const cerrar = () => { drop.hidden = true; };

  input.addEventListener('input', async () => {
    const q = input.value.trim();
    if (q.length < 2) { cerrar(); return; }
    await __bopListo();
    const r = BOP.buscar(q);
    const items = [];
    (r.docs || []).forEach(d => items.push({
      codigo: d.codigo, titulo: d.titulo, tipo: d.tipo || 'cni',
      url: 'documento.html?codigo=' + encodeURIComponent(d.codigo)
    }));
    (r.cnic || []).forEach(c => items.push({
      codigo: c.codigo, titulo: c.etiqueta, tipo: 'cnic',
      url: 'cnic.html?codigo=' + encodeURIComponent(c.codigo)
    }));

    if (!items.length) {
      drop.innerHTML = '<div class="sg-vacio">Sin resultados para «' + __esc(q) + '»</div>';
      drop.hidden = false;
      return;
    }
    const lista = items.slice(0, 8).map(it => `
      <a class="sg-item" href="${it.url}">
        <span class="sg-codigo">${__esc(it.codigo)}</span>
        <span class="sg-titulo">${__esc(it.titulo)}</span>
        <span class="badge ${it.tipo === 'cnic' ? 'badge-cnic' : 'badge-cni'}">${__esc(String(it.tipo).toUpperCase())}</span>
      </a>`).join('');
    drop.innerHTML = lista + `
      <div class="sg-mas"><a href="normativa.html?q=${encodeURIComponent(q)}">Ver todos los resultados (${items.length})</a></div>`;
    drop.hidden = false;
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const first = drop.querySelector('a.sg-item');
      if (first) { e.preventDefault(); location.href = first.getAttribute('href'); }
    } else if (e.key === 'Escape') {
      cerrar(); input.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const first = drop.querySelector('a.sg-item');
      if (first) first.focus();
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

document.addEventListener('DOMContentLoaded', () => {
  rellenarFechaMasthead();
  iniciarBuscadorGlobal();
  iniciarMenuMovil();
});
