/* Marca el almuerzo de hoy en el inicio.
   El visitante primario llega buscando qué se come hoy: dejarlo barrer una
   rejilla de seis días iguales es hacerle el trabajo a él. */
(() => {
  'use strict';

  const ALMUERZOS = [
    null,                                             // domingo: no hay almuerzo
    { plato: 'Arroz mixto',        precio: '$21.000' },
    { plato: 'Chuleta valluna',    precio: '$21.000' },
    { plato: 'Pollo cordon bleu',  precio: '$21.000' },
    { plato: 'Bandeja paisa',      precio: '$24.000' },
    { plato: 'Carne en posta',     precio: '$21.000' },
    { plato: 'Chicken tenders',    precio: '$21.000' },
  ];
  const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

  /* El restaurante vive en America/Bogota: quien mire desde otro huso debe ver
     el día del local, no el suyo. */
  let dia;
  try {
    dia = DIAS.indexOf(new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota', weekday: 'long'
    }).format(new Date()).replace(/^./, c => c.toUpperCase()));
  } catch { dia = new Date().getDay(); }
  if (dia < 0) dia = new Date().getDay();

  const hoy = ALMUERZOS[dia];

  const cartel = document.querySelector('#hoy-cartel');
  if (cartel) {
    cartel.innerHTML = hoy
      ? `<p class="hoy-cartel__dia">Hoy ${DIAS[dia].toLowerCase()}, el almuerzo es</p>
         <p class="hoy-cartel__plato">${hoy.plato}</p>
         <p class="hoy-cartel__precio">${hoy.precio}</p>
         <p class="hoy-cartel__nota">Servido de 11:00 a 3:00 de la tarde, con sopa y bebida.</p>`
      : `<p class="hoy-cartel__dia">Hoy domingo</p>
         <p class="hoy-cartel__plato">No hay almuerzo</p>
         <p class="hoy-cartel__nota">Los domingos abrimos solo en la tarde: pizza,
            hamburguesa, perro y picada desde las 4:00.</p>`;
    cartel.hidden = false;
  }

  const tarjeta = document.querySelector(`[data-dia="${dia}"]`);
  if (tarjeta) {
    tarjeta.setAttribute('data-hoy', '');
    tarjeta.insertAdjacentHTML('afterbegin', '<span class="dato__hoy">Hoy</span>');
  }
})();
