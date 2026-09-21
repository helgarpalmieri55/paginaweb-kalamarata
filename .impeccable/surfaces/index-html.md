---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["carta.html"]
---

Ámbito: sitio público de Kalamarata (6 páginas) — modo Persuadir en Inicio,
Operar en Carta. Objetivo doble: que el cliente arme el pedido y que Meta tenga
qué verificar. Cuando chocan, gana Meta.

## Direction contract

THESIS: A delivery-ordering site for a 172-item Caribbean kitchen, where the
legal identity of the business is first-class content rather than footer
residue. It refuses the restaurant-site default of a photographic hero over a
decorative menu: here the menu IS the page and the address is as prominent as
the food.

OWN-WORLD: The client's own logo palette, taken literally — orange in two
roles that are not interchangeable (#E8720C as the brand mark, #B8550A wherever
text sits on it or in it, because the brand orange does not clear AA as text),
grass green #1E6B1D, near-black ink on warm paper #F6F3EE / #FFFFFF. Archivo
and Archivo Black (Omnibus-Type, Buenos Aires), self-hosted, with tabular
figures on every price. Depth from 1px hairlines and paper→surface steps; one
sanctioned two-layer shadow with a single owner, the floating order panel,
because an overlay needs real separation and a hairline alone does not give it.
Recognisable with all content removed by: the round orange add button on every
card, the green category pill, and the two-line card foot where price sits left
and the add button right.

REVISED after the user pinned the direction to Salvator's ordering site. The
previous OWN-WORLD promised a single right-aligned tabular price column, which
belongs to the printed-menu world the pin superseded; the canon puts price
inside each card. The finish review correctly scored that promise as missing —
the fault was this contract going stale, not the build drifting from it.

STORY: A hungry person in Barranquilla understands in one screen what the
kitchen serves and what it costs, assembles an order without typing, and hands
it to WhatsApp already written. A Meta reviewer, on the same page, reads the
legal name, NIT, street address and phone as selectable text.

FIRST VIEWPORT: Sticky white header with the wordmark left and the order button
right. On Carta, a search field and a horizontally scrolling row of category
pills sit directly under it, and the first rows of product cards are already
visible above the fold — image or typographic tile at 4:3, name, description,
price, round orange add button. Primary action is the add button on every card;
the order panel slides from the right on desktop and a fixed bar carries it on
mobile.

FORM: Pinned by the user to the category canon (Salvator's own ordering site,
reviewed live at domicilios.salvators.com.co), which beats the roll. A pinned
direction overrides the dice by contract. Seed key: c085a681, re-roll round 1,
assigned index 4 — superseded by the pin, recorded for provenance.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.

## Decisiones del cliente que atan el build

- Carrito que compone el mensaje de WhatsApp, no botón simple ni backend.
- Datos legales ausentes van como marcadores PENDIENTE_* visibles.
- Horarios y tarifas confirmados verbalmente por el cliente: van sin marca.
- Fotos generadas por IA, marcadas «Imagen de referencia».
- Alcance completo: 6 páginas, incluidas las dos legales.

## Sin resolver

Razón social, NIT, dominio, correo corporativo, correo de datos personales,
responsable de datos, dirección de notificaciones, fecha de vigencia y la
decisión sobre promociones. Todos bloquean la verificación de Meta.
