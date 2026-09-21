/* Kalamarata — carta y pedido.
   Sin dependencias. El pedido vive en el navegador del cliente y sale por
   WhatsApp: aquí no hay servidor, no se guarda nada nuestro y no se piden
   datos de pago. */

(() => {
  'use strict';

  const LLAVE = 'kalamarata.pedido.v1';
  /* Límite práctico para el enlace wa.me. Por encima de esto algunos
     navegadores cortan la URL y el mensaje llega mutilado, así que preferimos
     resumir a propósito antes que dejar que se rompa solo. */
  const TOPE_URL = 1800;

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const pesos = n => '$' + n.toLocaleString('es-CO');

  const llave = (id, talla) => (talla ? `${id}::${talla}` : id);

  /* ---------------------------------------------------------------- pedido */

  let pedido = leer();

  function leer() {
    try {
      const crudo = localStorage.getItem(LLAVE);
      const datos = crudo ? JSON.parse(crudo) : [];
      return Array.isArray(datos) ? datos.filter(l => l && l.nombre && l.precio > 0) : [];
    } catch {
      return []; // modo privado, almacenamiento bloqueado: seguimos sin memoria
    }
  }

  function guardar() {
    try { localStorage.setItem(LLAVE, JSON.stringify(pedido)); } catch { /* sin memoria, el pedido igual funciona en esta visita */ }
    pintarPedido();
  }

  function sumar(linea) {
    const k = llave(linea.id, linea.talla);
    const ya = pedido.find(l => llave(l.id, l.talla) === k);
    if (ya) ya.cant += 1;
    else pedido.push({ ...linea, cant: 1 });
    guardar();
  }

  function mover(k, delta) {
    const i = pedido.findIndex(l => llave(l.id, l.talla) === k);
    if (i < 0) return;
    pedido[i].cant += delta;
    if (pedido[i].cant <= 0) pedido.splice(i, 1);
    guardar();
  }

  const totalPedido = () => pedido.reduce((s, l) => s + l.precio * l.cant, 0);
  const piezas      = () => pedido.reduce((s, l) => s + l.cant, 0);

  /* -------------------------------------------------------------- whatsapp */

  function redactar() {
    const cab = ['Hola Kalamarata, quiero hacer este pedido:', ''];
    const cuerpo = pedido.map(l => {
      const t = l.talla ? ` (${l.talla})` : '';
      return `• ${l.cant} × ${l.nombre}${t} — ${pesos(l.precio * l.cant)}`;
    });
    const pie = ['', `Total: ${pesos(totalPedido())}`, '', 'Quedo atento para darle la dirección y la forma de pago.'];

    let texto = [...cab, ...cuerpo, ...pie].join('\n');

    // Si el pedido es tan largo que rompería el enlace, resumimos y lo decimos.
    if (encodeURIComponent(texto).length > TOPE_URL) {
      const cortas = pedido.map(l => `• ${l.cant} × ${l.nombre}${l.talla ? ` (${l.talla})` : ''}`);
      texto = [...cab, ...cortas, '', `Total: ${pesos(totalPedido())}`,
        '', `(${piezas()} productos en total. Si falta alguno se lo confirmo por aquí.)`].join('\n');
    }
    if (encodeURIComponent(texto).length > TOPE_URL) {
      texto = [...cab, `${piezas()} productos por un total de ${pesos(totalPedido())}.`,
        'Le paso el detalle por aquí mismo.'].join('\n');
    }
    return texto;
  }

  function enlaceWA(numero) {
    return `https://wa.me/${numero}?text=${encodeURIComponent(redactar())}`;
  }

  /* ------------------------------------------------------------- pintado   */

  const panel  = $('#panel');
  const velo   = $('#velo');
  const lista  = $('#panel-lista');

  function pintarPedido() {
    const n = piezas();

    $$('[data-cuenta]').forEach(el => {
      el.textContent = n;
      el.hidden = n === 0;
    });
    $$('[data-total]').forEach(el => { el.textContent = pesos(totalPedido()); });

    const barra = $('#barra-movil-btn');
    if (barra) {
      barra.textContent = n === 0 ? 'Aún no has elegido nada' : `Ver el pedido · ${n} · ${pesos(totalPedido())}`;
      barra.setAttribute('aria-disabled', String(n === 0));
      barra.disabled = n === 0;
    }

    if (!lista) return;

    if (n === 0) {
      lista.innerHTML =
        '<li class="vacio"><strong>Tu pedido está vacío</strong>' +
        'Toca el botón naranja de cualquier plato para empezar.</li>';
    } else {
      lista.innerHTML = pedido.map(l => {
        const k = llave(l.id, l.talla);
        return `<li class="linea">
          <div>
            <div class="linea__n">${esc(l.nombre)}</div>
            ${l.talla ? `<div class="linea__d">${esc(l.talla)}</div>` : ''}
            <div class="cant">
              <button type="button" data-menos="${esc(k)}" aria-label="Quitar uno de ${esc(l.nombre)}">−</button>
              <span>${l.cant}</span>
              <button type="button" data-mas="${esc(k)}" aria-label="Añadir uno de ${esc(l.nombre)}">+</button>
            </div>
          </div>
          <div class="linea__p">${pesos(l.precio * l.cant)}</div>
        </li>`;
      }).join('');
    }

    const enviar = $('#enviar');
    if (enviar) {
      const vacio = n === 0;
      enviar.setAttribute('aria-disabled', String(vacio));
      if (vacio) {
        enviar.removeAttribute('href');
      } else {
        enviar.href = enlaceWA(enviar.dataset.wa);
      }
    }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* --------------------------------------------------------------- panel   */

  function abrir()  { panel?.classList.add('abierto'); velo?.classList.add('abierto'); panel?.setAttribute('aria-hidden', 'false'); $('#panel-cerrar')?.focus(); }
  function cerrar() { panel?.classList.remove('abierto'); velo?.classList.remove('abierto'); panel?.setAttribute('aria-hidden', 'true'); }

  $$('[data-abrir-pedido]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); abrir(); }));
  $('#panel-cerrar')?.addEventListener('click', cerrar);
  velo?.addEventListener('click', cerrar);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });

  lista?.addEventListener('click', e => {
    const menos = e.target.closest('[data-menos]');
    const mas   = e.target.closest('[data-mas]');
    if (menos) mover(menos.dataset.menos, -1);
    if (mas)   mover(mas.dataset.mas, +1);
  });

  /* ---------------------------------------------------------------- carta  */

  const zona = $('#carta');

  if (zona) {
    fetch('data/carta.json')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(pintarCarta)
      .catch(err => {
        console.error(err);
        zona.innerHTML =
          '<div class="vacio"><strong>No pudimos cargar la carta</strong>' +
          'Revisa tu conexión y vuelve a intentar. Si sigue así, escríbenos por WhatsApp al ' +
          '311 428 0292 y te la contamos.</div>';
      });
  }

  function pintarCarta(d) {
    const tallas = d.tamanosPizza;
    const partes = [];
    const navs   = [];

    d.categorias.forEach(c => {
      navs.push({ id: c.id, nombre: c.nombre });
      partes.push(`
        <section class="grupo" id="${c.id}" aria-labelledby="t-${c.id}">
          <div class="grupo__tit"><h2 id="t-${c.id}">${esc(c.nombre)}</h2></div>
          ${c.nota ? `<p class="grupo__nota">${esc(c.nota)}</p>` : ''}
          <div class="platos">${c.items.map(i => tarjeta(c.id, i, c.nombre)).join('')}</div>
        </section>`);
    });

    d.pizzas.forEach(c => {
      navs.push({ id: c.id, nombre: c.nombre });
      partes.push(`
        <section class="grupo" id="${c.id}" aria-labelledby="t-${c.id}">
          <div class="grupo__tit"><h2 id="t-${c.id}">${esc(c.nombre)}</h2></div>
          <p class="grupo__nota">${tallas.map(t => `${t.nombre}, ${t.porciones} porciones`).join(' · ')}</p>
          <div class="platos">${c.items.map(i => tarjetaPizza(c.id, i, tallas, c.nombre)).join('')}</div>
        </section>`);
    });

    if (d.adicionalesPizza) {
      const a = d.adicionalesPizza;
      navs.push({ id: 'adicionales-pizza', nombre: 'Arma tu pizza' });
      partes.push(`
        <section class="grupo" id="adicionales-pizza" aria-labelledby="t-adicionales-pizza">
          <div class="grupo__tit"><h2 id="t-adicionales-pizza">Arma tu pizza</h2></div>
          <p class="grupo__nota">${esc(a.nota)} El precio depende del tamaño de la pizza.</p>
          <div class="platos">${a.items.map(i =>
            tarjetaPizza('adicionales-pizza', { nombre: i.nombre, desc: '', precios: i.precios }, tallas, 'Arma tu pizza adicional')
          ).join('')}</div>
        </section>`);
    }

    // Bar: se muestra completo y se deja claro que no sale del local.
    navs.push({ id: 'bar', nombre: 'Bar' });
    partes.push(`
      <section class="grupo" id="bar" aria-labelledby="t-bar">
        <div class="grupo__tit"><h2 id="t-bar">Bar</h2></div>
        <p class="bar-aviso">${esc(d.bar.nota)}</p>
        ${d.bar.categorias.map(c => `
          <h3 style="margin-top:var(--r5)">${esc(c.nombre)}</h3>
          <ul class="lista-bar">
            ${c.items.map(i => `<li>
              <span class="n">${esc(i.nombre)}${i.desc ? ` <span class="linea__d">${esc(i.desc)}</span>` : ''}</span>
              <span class="g"></span>
              <span class="p">${pesos(i.precio)}</span>
            </li>`).join('')}
          </ul>`).join('')}
      </section>`);

    zona.innerHTML = partes.join('');

    const cats = $('#cats');
    if (cats) {
      cats.innerHTML = navs.map(n =>
        `<button type="button" data-ir="${esc(n.id)}" aria-pressed="false">${esc(n.nombre)}</button>`).join('');
      cats.addEventListener('click', e => {
        const b = e.target.closest('[data-ir]');
        if (!b) return;
        document.getElementById(b.dataset.ir)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      observarGrupos(cats);
    }

    zona.addEventListener('click', e => {
      const talla = e.target.closest('[data-talla]');
      if (talla) {
        const caja = talla.closest('.plato');
        $$('[data-talla]', caja).forEach(b => b.setAttribute('aria-pressed', 'false'));
        talla.setAttribute('aria-pressed', 'true');
        $('.plato__precio', caja).textContent = pesos(Number(talla.dataset.precio));
        return;
      }
      const add = e.target.closest('[data-add]');
      if (!add) return;
      const caja = add.closest('.plato');
      const sel  = $('[data-talla][aria-pressed="true"]', caja);
      sumar({
        id: add.dataset.add,
        nombre: add.dataset.nombre,
        precio: sel ? Number(sel.dataset.precio) : Number(add.dataset.precio),
        talla: sel ? sel.dataset.talla : null
      });
    });

    const buscador = $('#buscar');
    buscador?.addEventListener('input', () => filtrar(buscador.value));

    pintarPedido();
  }

  function lienzo(nombre, img) {
    /* Con imagen: se muestra marcada como referencia, porque es generada y no
       es una fotografía del plato real. Sin imagen: el hueco queda ocupado por
       el nombre, nunca por la foto de otro restaurante. */
    if (img) {
      return `<div class="plato__lienzo">
        <img src="assets/img/${esc(img)}" alt="" loading="lazy" decoding="async" width="760" height="574">
        <span class="plato__ref">Imagen de referencia</span>
      </div>`;
    }
    return `<div class="plato__lienzo"><div class="plato__sinfoto"><span>${esc(nombre)}</span></div></div>`;
  }

  function tarjeta(cat, i, catNombre = '') {
    const id = `${cat}--${i.nombre}`;
    const busca = `${i.nombre} ${i.desc || ''} ${catNombre}`;
    return `<article class="plato" data-busca="${esc(busca)}">
      ${lienzo(i.nombre, i.img)}
      <div class="plato__cuerpo">
        <h3 class="plato__nombre">${esc(i.nombre)}</h3>
        ${i.desc ? `<p class="plato__desc">${esc(i.desc)}</p>` : ''}
        <div class="plato__pie">
          <span class="plato__precio">${pesos(i.precio)}</span>
          <button class="mas" type="button" data-add="${esc(id)}" data-nombre="${esc(i.nombre)}"
                  data-precio="${i.precio}" aria-label="Añadir ${esc(i.nombre)} al pedido">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none"
                 stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
              <path d="M10 4.5v11M4.5 10h11"/>
            </svg>
          </button>
        </div>
      </div>
    </article>`;
  }

  function tarjetaPizza(cat, i, tallas, catNombre = '') {
    const id = `${cat}--${i.nombre}`;
    const busca = `${i.nombre} ${i.desc || ''} ${catNombre} pizza`;
    return `<article class="plato" data-busca="${esc(busca)}">
      ${lienzo(i.nombre, i.img)}
      <div class="plato__cuerpo">
        <h3 class="plato__nombre">${esc(i.nombre)}</h3>
        ${i.desc ? `<p class="plato__desc">${esc(i.desc)}</p>` : ''}
        <div class="tallas" role="group" aria-label="Tamaño de ${esc(i.nombre)}">
          ${tallas.map((t, n) => `<button type="button" data-talla="${esc(t.nombre)}"
              data-precio="${i.precios[t.id]}" aria-pressed="${n === 0}">${esc(t.nombre)}</button>`).join('')}
        </div>
        <div class="plato__pie">
          <span class="plato__precio">${pesos(i.precios[tallas[0].id])}</span>
          <button class="mas" type="button" data-add="${esc(id)}" data-nombre="${esc(i.nombre)}"
                  data-precio="${i.precios[tallas[0].id]}" aria-label="Añadir ${esc(i.nombre)} al pedido">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none"
                 stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
              <path d="M10 4.5v11M4.5 10h11"/>
            </svg>
          </button>
        </div>
      </div>
    </article>`;
  }

  function filtrar(q) {
    const t = q.trim().toLowerCase();
    let vistos = 0;

    $$('.grupo', zona).forEach(g => {
      let enGrupo = 0;
      $$('.plato', g).forEach(p => {
        const texto = (p.dataset.busca || p.textContent).toLowerCase();
        const ok = !t || texto.includes(t);
        p.hidden = !ok;
        if (ok) enGrupo++;
      });
      const lb = $('.lista-bar', g);
      if (lb) {
        $$('li', lb).forEach(li => {
          const ok = !t || li.textContent.toLowerCase().includes(t);
          li.hidden = !ok;
          if (ok) enGrupo++;
        });
      }
      g.hidden = enGrupo === 0;
      vistos += enGrupo;
    });

    let nada = $('#sin-resultados');
    if (vistos === 0) {
      if (!nada) {
        nada = document.createElement('div');
        nada.id = 'sin-resultados';
        nada.className = 'vacio';
        zona.appendChild(nada);
      }
      nada.innerHTML = `<strong>No encontramos “${esc(q)}”</strong>Prueba con otra palabra, o escríbenos por WhatsApp y te ayudamos.`;
      nada.hidden = false;
    } else if (nada) {
      nada.hidden = true;
    }
  }

  function observarGrupos(cats) {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        $$('button', cats).forEach(b =>
          b.setAttribute('aria-pressed', String(b.dataset.ir === e.target.id)));
      });
    }, { rootMargin: '-150px 0px -70% 0px' });
    $$('.grupo', zona).forEach(g => obs.observe(g));
  }

  pintarPedido();
})();
