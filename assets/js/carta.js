/* Kalamarata — carta y pedido.
   Sin dependencias. El pedido vive en el navegador del cliente y sale por
   WhatsApp: aquí no hay servidor, no se guarda nada nuestro y no se piden
   datos de pago. */

(() => {
  'use strict';

  const LLAVE = 'kalamarata.pedido.v1';
  /* Las notas van en su propia clave a proposito: si las metieramos dentro de
     la del pedido, un carrito ya guardado con el formato viejo se perderia. */
  const LLAVE_NOTAS = 'kalamarata.notas.v1';
  const TOPE_NOTAS  = 300;
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

  let notas = leerNotas();

  function leerNotas() {
    try { return (localStorage.getItem(LLAVE_NOTAS) || '').slice(0, TOPE_NOTAS); }
    catch { return ''; }
  }

  function guardarNotas(txt) {
    notas = String(txt || '').slice(0, TOPE_NOTAS);
    try { localStorage.setItem(LLAVE_NOTAS, notas); } catch { /* sin memoria */ }
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

  /* Las notas son lo que el cliente pidió cambiar: «sin cebolla» no es un
     adorno del mensaje, es parte del pedido. Por eso viajan en los tres
     niveles de resumen y nunca se recortan por longitud — para eso el campo
     tiene un tope de 300 y el contador lo enseña. */
  function lineasNotas() {
    const t = notas.trim();
    return t ? ['', 'Notas del pedido:', t] : [];
  }

  function redactar() {
    const cab = ['Hola Kalamarata, quiero hacer este pedido:', ''];
    const cuerpo = pedido.map(l => {
      const t = l.talla ? ` (${l.talla})` : '';
      return `• ${l.cant} × ${l.nombre}${t} — ${pesos(l.precio * l.cant)}`;
    });
    const pie = ['', `Total: ${pesos(totalPedido())}`, ...lineasNotas(),
                 '', 'Quedo atento para darle la dirección y la forma de pago.'];

    let texto = [...cab, ...cuerpo, ...pie].join('\n');

    // Si el pedido es tan largo que rompería el enlace, resumimos y lo decimos.
    if (encodeURIComponent(texto).length > TOPE_URL) {
      const cortas = pedido.map(l => `• ${l.cant} × ${l.nombre}${l.talla ? ` (${l.talla})` : ''}`);
      texto = [...cab, ...cortas, '', `Total: ${pesos(totalPedido())}`, ...lineasNotas(),
        '', `(${piezas()} productos en total. Si falta alguno se lo confirmo por aquí.)`].join('\n');
    }
    if (encodeURIComponent(texto).length > TOPE_URL) {
      texto = [...cab, `${piezas()} productos por un total de ${pesos(totalPedido())}.`,
        ...lineasNotas(), '', 'Le paso el detalle por aquí mismo.'].join('\n');
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

    const cuenta = $('#notas-cuenta');
    if (cuenta) cuenta.textContent = notas.length;
    const campo = $('#notas');
    if (campo && campo.value !== notas && document.activeElement !== campo) campo.value = notas;

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

  let abridor = null;

  function abrir() {
    if (!panel) return;
    abridor = document.activeElement;
    panel.classList.add('abierto');
    velo?.classList.add('abierto');
    panel.removeAttribute('inert');
    panel.setAttribute('aria-hidden', 'false');
    $('#panel-cerrar')?.focus();
  }

  function cerrar() {
    if (!panel) return;
    const teniaFoco = panel.contains(document.activeElement);
    panel.classList.remove('abierto');
    velo?.classList.remove('abierto');
    /* inert saca los controles del panel cerrado del orden de tabulación:
       sin esto el teclado aterriza en botones que están fuera de pantalla. */
    panel.setAttribute('inert', '');
    panel.setAttribute('aria-hidden', 'true');
    if (teniaFoco) (abridor || $('[data-abrir-pedido]'))?.focus();
  }

  panel?.setAttribute('inert', '');

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

    /* La carta impresa son dos cartas distintas: la de almuerzo y la de
       comidas rápidas. Mezclarlas en una sola lista obliga a pasar por
       pizzas para llegar al ejecutivo de pollo. Cada servicio es su propia
       sección, con su banda y su horario. */
    d.servicios.forEach(serv => {
      /* El riel solo lleva los dos servicios. Las categorías siguen
         seccionando cada carta dentro de la página, con su propio título. */
      navs.push({ id: `s-${serv.id}`, nombre: serv.nombre, servicio: true });

      const dentro = [];

      d.categorias.filter(c => c.servicios.includes(serv.id)).forEach(c => {
        const nombre = (c.nombrePorServicio && c.nombrePorServicio[serv.id]) || c.nombre;
        const id = `${serv.id}--${c.id}`;
        dentro.push(`
          <section class="grupo" id="${id}" aria-labelledby="t-${id}">
            <div class="grupo__tit"><h3 id="t-${id}">${esc(nombre)}</h3></div>
            ${c.nota ? `<p class="grupo__nota">${esc(c.nota)}</p>` : ''}
            <div class="platos">${c.items.map(i => tarjeta(c.id, i, nombre)).join('')}</div>
          </section>`);
      });

      d.pizzas.filter(c => c.servicios.includes(serv.id)).forEach(c => {
        const id = `${serv.id}--${c.id}`;
        dentro.push(`
          <section class="grupo" id="${id}" aria-labelledby="t-${id}">
            <div class="grupo__tit"><h3 id="t-${id}">${esc(c.nombre)}</h3></div>
            <p class="grupo__nota">${tallas.map(t => `${t.nombre}, ${t.porciones} porciones`).join(' · ')}</p>
            <div class="platos">${c.items.map(i => tarjetaPizza(c.id, i, tallas, c.nombre)).join('')}</div>
          </section>`);
      });

      if (d.adicionalesPizza.servicios.includes(serv.id)) {
        const a = d.adicionalesPizza, id = `${serv.id}--arma-tu-pizza`;
        dentro.push(`
          <section class="grupo" id="${id}" aria-labelledby="t-${id}">
            <div class="grupo__tit"><h3 id="t-${id}">Arma tu pizza</h3></div>
            <p class="grupo__nota">${esc(a.nota)} El precio depende del tamaño de la pizza.</p>
            <div class="platos">${a.items.map(i =>
              tarjetaPizza('arma-tu-pizza', { nombre: i.nombre, desc: '', precios: i.precios },
                           tallas, 'Arma tu pizza adicional')).join('')}</div>
          </section>`);
      }

      const bar = d.bar.categorias.filter(c => c.servicios.includes(serv.id));
      if (bar.length) {
        const id = `${serv.id}--bar`;
        dentro.push(`
          <section class="grupo" id="${id}" aria-labelledby="t-${id}">
            <div class="grupo__tit"><h3 id="t-${id}">Bar</h3></div>
            <p class="bar-aviso">${esc(d.bar.nota)}</p>
            ${bar.map(c => `
              <h4 style="margin-top:var(--r5)">${esc(c.nombre)}</h4>
              <ul class="lista-bar">
                ${c.items.map(i => `<li>
                  <span class="n">${esc(i.nombre)}${i.desc ? ` <span class="linea__d">${esc(i.desc)}</span>` : ''}</span>
                  <span class="g"></span>
                  <span class="p">${pesos(i.precio)}</span>
                </li>`).join('')}
              </ul>`).join('')}
          </section>`);
      }

      partes.push(`
        <div class="servicio servicio--${serv.id}">
          <div class="banda" id="s-${serv.id}">
            <div class="env banda__caja">
              <h2>${esc(serv.nombre)}</h2>
              <span class="banda__horario">${esc(serv.horario)}</span>
              <p class="banda__nota">${esc(serv.nota)}</p>
              <p class="banda__aviso">${esc(serv.aviso)}</p>
              <p class="banda__cerrado" data-cerrado="${esc(serv.id)}" hidden></p>
            </div>
          </div>
          <div class="env">${dentro.join('')}</div>
        </div>`);
    });

    zona.innerHTML = partes.join('');

    const cats = $('#cats');
    if (cats) {
      cats.innerHTML = navs.map(n =>
        `<a href="#${esc(n.id)}" data-ir="${esc(n.id)}"${n.servicio ? ' class="cats__serv"' : ''}>${esc(n.nombre)}</a>`).join('');
      hacerRecorrible(cats);
      seguirCarta(cats);
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

    /* El campo de comentarios: se guarda al escribir y el enlace de WhatsApp
       se rehace, para que lo que se manda sea siempre lo que se ve. */
    const campoNotas = $('#notas');
    if (campoNotas) {
      campoNotas.value = notas;
      campoNotas.addEventListener('input', () => guardarNotas(campoNotas.value));
    }

    marcarHoy();
    marcarDisponibilidad(d.servicios);
    abrirCartaDeAhora(d.servicios, $('#cats'));
    // Las fuentes cambian las alturas: si no se ha tocado nada, recolocamos.
    document.fonts?.ready.then(() => abrirCartaDeAhora(d.servicios, $('#cats')));
    pintarPedido();
  }

  /* Qué se está sirviendo AHORA, con el reloj del local. Un visitante a las
     8 de la noche mirando la bandeja paisa tiene que saber que a esa hora no
     se la pueden hacer, y al revés al mediodía con la pizza. */
  function ahoraEnBogota() {
    try {
      const f = new Intl.DateTimeFormat('es-CO', {
        timeZone: 'America/Bogota', weekday: 'short', hour: '2-digit',
        minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      const g = t => f.find(x => x.type === t)?.value || '';
      const dias = { dom:0, lun:1, mar:2, mié:3, mie:3, jue:4, vie:5, sáb:6, sab:6 };
      const dia = dias[g('weekday').toLowerCase().replace('.','').slice(0,3)];
      return { dia, minutos: Number(g('hour')) * 60 + Number(g('minute')) };
    } catch {
      const d = new Date();
      return { dia: d.getDay(), minutos: d.getHours() * 60 + d.getMinutes() };
    }
  }

  const aMin = h => Number(h.slice(0,2)) * 60 + Number(h.slice(3,5));

  /* A qué hora cierra ese servicio ese día. Las comidas rápidas cierran más
     tarde viernes y sábado, así que el día importa. */
  function cierreDe(serv, dia) {
    return serv.id === 'rapidas'
      ? aMin(dia === 5 || dia === 6 ? serv.cierraFinDeSemana : serv.cierraEntreSemana)
      : aMin(serv.cierra);
  }

  function estaAbierto(serv, dia, minutos) {
    return serv.dias.includes(dia)
        && minutos >= aMin(serv.abre)
        && minutos < cierreDe(serv, dia);
  }

  /* Cuántos minutos faltan para que ese servicio abra. Mira hasta una semana
     por delante: el domingo no hay almuerzo, así que «el próximo almuerzo»
     puede caer al día siguiente. */
  function minutosHastaAbrir(serv, dia, minutos) {
    for (let d = 0; d < 8; d++) {
      const diaN = (dia + d) % 7;
      if (!serv.dias.includes(diaN)) continue;
      const abre = d * 1440 + aMin(serv.abre);
      if (abre >= minutos) return abre - minutos;
    }
    return Infinity;
  }

  /* El que entra a las 8 de la noche viene por una pizza, no por el almuerzo.
     Abrimos en la carta que se está sirviendo; si no se sirve ninguna, en la
     que abra antes. La otra sigue ahí, a un golpe de rueda. */
  function abrirCartaDeAhora(servicios, cats) {
    // Un enlace directo o una posición restaurada mandan sobre esto.
    if (location.hash || window.scrollY > 0) return;
    const { dia, minutos } = ahoraEnBogota();
    if (dia === undefined) return;

    const abierto = servicios.find(x => estaAbierto(x, dia, minutos));
    const elegido = abierto || servicios
      .map(x => ({ x, espera: minutosHastaAbrir(x, dia, minutos) }))
      .sort((a, b) => a.espera - b.espera)[0]?.x;
    if (!elegido) return;

    if (cats) marcarChip(cats, `s-${elegido.id}`);

    // El primero ya está arriba: moverse sería trabajo para nada.
    if (servicios[0] && elegido.id === servicios[0].id) return;
    const secc = $(`.servicio--${elegido.id}`);
    if (!secc) return;
    // Sin animación: un desplazamiento suave al cargar marea y además se
    // corta en cuanto el visitante toca la rueda.
    secc.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  function marcarDisponibilidad(servicios) {
    const { dia, minutos } = ahoraEnBogota();
    if (dia === undefined) return;

    servicios.forEach(serv => {
      const cartel = $(`[data-cerrado="${serv.id}"]`);
      if (!cartel) return;

      const abierto = estaAbierto(serv, dia, minutos);

      if (abierto) {
        cartel.hidden = true;
      } else {
        cartel.textContent = serv.id === 'almuerzo'
          ? 'Ahora mismo no se está sirviendo almuerzo. Puedes pedirlo igual y te confirmamos por WhatsApp.'
          : 'Ahora mismo no se están sirviendo comidas rápidas. Puedes pedirlas igual y te confirmamos por WhatsApp.';
        cartel.hidden = false;
      }
      $(`.servicio--${serv.id}`)?.classList.toggle('servicio--cerrado', !abierto);
    });
  }

  /* El visitante del mediodía llega buscando qué se come hoy. Se marca con el
     día del local, no el del navegador: en UTC puede ser ya lunes mientras en
     Barranquilla sigue siendo domingo y la cocina no sirve almuerzo. */
  function marcarHoy() {
    const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    let dia;
    try {
      dia = DIAS.indexOf(new Intl.DateTimeFormat('es-CO', {
        timeZone: 'America/Bogota', weekday: 'long'
      }).format(new Date()).replace(/^./, c => c.toUpperCase()));
    } catch { dia = new Date().getDay(); }
    if (dia < 1) return; // domingo: no hay almuerzo que marcar

    const nombre = DIAS[dia];
    $$('.plato', zona).forEach(p => {
      if (p.querySelector('.plato__nombre')?.textContent.startsWith(nombre + ' ·')) {
        p.classList.add('plato--hoy');
        p.querySelector('.plato__cuerpo')
         ?.insertAdjacentHTML('afterbegin', '<span class="dato__hoy">Hoy</span>');
      }
    });
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
    /* Sin foto no se emite caja: una caja con forma de foto y el nombre dentro
       repite el titular de abajo y se come dos tercios del documento móvil.
       Nunca la foto de otro restaurante; tampoco un hueco fingiendo serlo. */
    return '';
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

  /* La pila pegajosa son dos piezas (cabecera + barra de carta) y la barra
     cambia de alto segun envuelva los chips y segun cargue la tipografia.
     Medirla es la unica forma de que el titulo de categoria no quede debajo
     al saltar: un numero fijo se desincroniza en cuanto algo envuelve. */
  function altoPegajoso() {
    const cab   = $('.cab');
    const barra = $('.barra');
    if (!cab || !barra) return 0;
    return Math.round(cab.getBoundingClientRect().height + barra.getBoundingClientRect().height);
  }

  function ajustarDesplazamiento() {
    const alto = altoPegajoso();
    if (!alto) return;
    document.documentElement.style.setProperty('--desplazamiento', `${alto + 16}px`);
  }

  /* De un elemento cualquiera de la carta al id del chip de su servicio. */
  function servicioDe(el) {
    const serv = el?.closest?.('.servicio');
    const clase = serv && [...serv.classList]
      .find(c => c.startsWith('servicio--') && c !== 'servicio--cerrado');
    return clase ? 's-' + clase.slice('servicio--'.length) : null;
  }

  /* Un solo sitio donde se decide qué chip va marcado. Antes lo ponía solo el
     observador, que no dispara hasta que algo entra en su franja: al cargar no
     había ninguno marcado, y si abríamos en comidas rápidas quedaba marcado
     «Almuerzo» por el camino recorrido. */
  function marcarChip(cats, idServ) {
    let actual = null;
    $$('a', cats).forEach(a => {
      if (idServ && a.dataset.ir === idServ) { a.setAttribute('aria-current', 'true'); actual = a; }
      else a.removeAttribute('aria-current');
    });
    return actual;
  }

  function arrastrarRiel(cats, chip) {
    // Si el usuario acaba de mover el riel a mano, mandan sus manos.
    if (Date.now() - (cats.dataset.tocado || 0) < 4000) return;
    const r = cats.getBoundingClientRect();
    const c = chip.getBoundingClientRect();
    const margen = 24;
    let delta = 0;
    if (c.left < r.left + margen) delta = c.left - r.left - margen;
    else if (c.right > r.right - margen) delta = c.right - r.right + margen;
    if (!delta) return;
    const quieto = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    cats.scrollBy({ left: delta, behavior: quieto ? 'auto' : 'smooth' });
  }

  /* El riel esconde su barra de scroll, y la rueda del ratón no desplaza en
     horizontal: en un PC, una vez que el riel se iba a la derecha no había
     forma de volver a «Almuerzo». Aquí se arregla eso, y de paso se marca
     cuándo lo mueve el usuario para que el auto-desplazamiento no le pelee. */
  function hacerRecorrible(cats) {
    const anotar = () => { cats.dataset.tocado = Date.now(); };
    cats.addEventListener('pointerdown', anotar, { passive: true });
    cats.addEventListener('touchstart', anotar, { passive: true });
    cats.addEventListener('keydown', anotar, { passive: true });

    cats.addEventListener('wheel', e => {
      // Un ratón normal solo manda deltaY; un trackpad ya manda deltaX y se
      // apaña solo. Solo traducimos cuando el gesto es claramente vertical.
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const margen = cats.scrollWidth - cats.clientWidth;
      if (margen <= 0) return;
      const hasta = Math.max(0, Math.min(margen, cats.scrollLeft + e.deltaY));
      // Si el riel ya está en el tope hacia ese lado, no secuestramos la
      // página: el usuario quiere seguir bajando.
      if (hasta === cats.scrollLeft) return;
      e.preventDefault();
      anotar();
      cats.scrollLeft = hasta;
      pintarBordes(cats);
    }, { passive: false });

    cats.addEventListener('scroll', () => pintarBordes(cats), { passive: true });
    window.addEventListener('resize', () => pintarBordes(cats), { passive: true });
    pintarBordes(cats);
  }

  /* Los degradados de los extremos dicen si queda carta hacia ese lado. El de
     la izquierda solo aparece cuando de verdad hay algo escondido detrás. */
  function pintarBordes(cats) {
    const caja = cats.parentElement;
    if (!caja) return;
    const margen = cats.scrollWidth - cats.clientWidth;
    // Marca de «esto ya lo midió el JS»: sin ella, el respaldo del CSS
    // dejaría el degradado derecho puesto aunque no haya nada escondido.
    caja.classList.add('cats-caja--medida');
    caja.classList.toggle('cats-caja--izq', cats.scrollLeft > 4);
    caja.classList.toggle('cats-caja--der', margen > 4 && cats.scrollLeft < margen - 4);
  }

  /* Qué carta estás leyendo, medida de la página y no deducida del orden en
     que llegan los eventos. Con un IntersectionObserver ganaba la última
     entrada del lote, que no es la que se ve: al abrir en comidas rápidas
     quedaba marcado «Almuerzo» por los grupos que el salto había cruzado. */
  function servicioEnPantalla() {
    const secciones = $$('.servicio');
    if (!secciones.length) return null;
    /* El sondeo va por debajo de donde aterriza una seccion al saltar a ella:
       el scroll-margin la deja en altoPegajoso()+16, asi que medir en +8 la
       dejaba siempre justo por encima de la linea y nunca contaba. */
    const tope = altoPegajoso() + 24;
    let elegido = secciones[0];
    secciones.forEach(sec => {
      if (sec.getBoundingClientRect().top <= tope) elegido = sec;
    });
    return servicioDe(elegido);
  }

  function seguirCarta(cats) {
    ajustarDesplazamiento();
    window.addEventListener('resize', ajustarDesplazamiento, { passive: true });
    document.fonts?.ready.then(ajustarDesplazamiento);

    let pedido = false;
    const revisar = () => {
      pedido = false;
      const actual = marcarChip(cats, servicioEnPantalla());
      if (actual) arrastrarRiel(cats, actual);
    };
    const alDesplazar = () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(revisar);
    };
    window.addEventListener('scroll', alDesplazar, { passive: true });
    window.addEventListener('resize', alDesplazar, { passive: true });
    revisar();
  }

  pintarPedido();
})();
