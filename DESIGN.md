---
name: Kalamarata
description: Sitio de pedidos de un restaurante bar y pizzería de Barranquilla, con la carta como página y los datos legales como contenido de primera.
colors:
  naranja: "#E8720C"
  naranja-vivo: "#F5821F"
  naranja-hondo: "#B8550A"
  naranja-texto: "#B8550A"
  naranja-prensa: "#9E4907"
  sobre-marca: "#FFFFFF"
  verde: "#2C8B2B"
  verde-hondo: "#1E6B1D"
  verde-prensa: "#175616"
  verde-claro: "#E8F4E7"
  enlace: "#1E6B1D"
  papel: "#FFFFFF"
  fondo: "#F6F3EE"
  fondo-hondo: "#EDE8E0"
  tinta: "#1A1512"
  tinta-suave: "#5C534B"
  tinta-tenue: "#6E645B"
  linea: "#E2DBD1"
  linea-fuerte: "#C9BFB2"
  alerta: "#A8341A"
  alerta-fondo: "#FBEDE9"
typography:
  display:
    fontFamily: "Archivo Black, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo Black, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 1.15rem + 1.1vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo Black, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.06rem"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "0.1em"
  precio:
    fontFamily: "Archivo Black, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 400
    lineHeight: 1.08
    fontFeature: "tabular-nums"
rounded:
  chico: "6px"
  base: "10px"
  pildora: "99px"
spacing:
  r1: "0.25rem"
  r2: "0.5rem"
  r3: "0.75rem"
  r4: "1rem"
  r5: "1.5rem"
  r6: "2rem"
  r7: "3rem"
  r8: "4.5rem"
components:
  button-pedido:
    backgroundColor: "{colors.naranja-hondo}"
    textColor: "{colors.sobre-marca}"
    rounded: "{rounded.base}"
    padding: "0.8rem 1.25rem"
  button-pedido-hover:
    backgroundColor: "{colors.naranja-prensa}"
    textColor: "{colors.sobre-marca}"
  button-whatsapp:
    backgroundColor: "{colors.verde-hondo}"
    textColor: "{colors.sobre-marca}"
    rounded: "{rounded.base}"
    padding: "0.8rem 1.25rem"
  button-whatsapp-hover:
    backgroundColor: "{colors.verde-prensa}"
    textColor: "{colors.sobre-marca}"
  button-linea:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.base}"
    padding: "0.8rem 1.25rem"
  button-disabled:
    backgroundColor: "{colors.fondo-hondo}"
    textColor: "{colors.tinta-tenue}"
    rounded: "{rounded.base}"
    padding: "0.8rem 1.25rem"
  boton-mas:
    backgroundColor: "{colors.naranja-hondo}"
    textColor: "{colors.sobre-marca}"
    rounded: "{rounded.pildora}"
    height: "40px"
    width: "40px"
  boton-mas-hover:
    backgroundColor: "{colors.naranja-prensa}"
    textColor: "{colors.sobre-marca}"
  chip-categoria:
    backgroundColor: "{colors.fondo}"
    textColor: "{colors.tinta-suave}"
    rounded: "{rounded.pildora}"
    padding: "0.5rem 0.9rem"
  chip-categoria-activo:
    backgroundColor: "{colors.naranja-hondo}"
    textColor: "{colors.sobre-marca}"
    rounded: "{rounded.pildora}"
    padding: "0.5rem 0.9rem"
  chip-talla:
    backgroundColor: "{colors.fondo}"
    textColor: "{colors.tinta-suave}"
    rounded: "{rounded.chico}"
    padding: "0.32rem 0.55rem"
  chip-talla-activo:
    backgroundColor: "{colors.verde-hondo}"
    textColor: "{colors.sobre-marca}"
    rounded: "{rounded.chico}"
    padding: "0.32rem 0.55rem"
  tarjeta-plato:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.base}"
    padding: "{spacing.r4}"
  input-buscar:
    backgroundColor: "{colors.fondo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.base}"
    padding: "0.7rem 0.9rem 0.7rem 2.4rem"
    width: "min(100%, 420px)"
  badge-cuenta:
    backgroundColor: "{colors.verde-hondo}"
    textColor: "{colors.sobre-marca}"
    rounded: "{rounded.pildora}"
    height: "21px"
  panel-pedido:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    padding: "{spacing.r4}"
    width: "min(420px, 100%)"
---

# Design System: Kalamarata

## Overview

**Creative North Star: "La carta impresa del local, pasada a pantalla"**

El sistema sale del logo del cliente leído literalmente: naranja, verde y negro
sobre papel cálido. No hay hero fotográfico ni menú decorativo: la carta *es* la
página, y los datos legales del establecimiento (razón social, NIT, dirección,
teléfono) son contenido de primera categoría, en texto seleccionable, no residuo
de pie de página. La densidad es la de una carta de restaurante real: 172
productos en 22 categorías, leídos con una mano en un celular de 390 px.

La materialidad es de papel y tinta. Las superficies son blancas o de un beige
cálido (`fondo`, `#F6F3EE`) y se separan entre sí por filetes de 1px y por
escalones de tono, no por pilas de sombra. El color de marca aparece poco y
siempre trabajando: el botón redondo naranja de «añadir», la píldora de
categoría, la columna de precios. Todo lo demás es tinta sobre papel.

Hay dos esquemas, claro y oscuro, porque hay dos escenas de uso reales: el
celular en la calle a mediodía con sol, y el mismo celular en un sofá a las ocho
de la noche. El oscuro no es una inversión decorativa: los rellenos de marca se
aclaran para sobrevivir al fondo, y por eso existe un token dedicado al texto
que va encima de ellos.

**Key Characteristics:**
- Paleta derivada del logo del cliente, no elegida de una plantilla.
- Archivo / Archivo Black (Omnibus-Type, Buenos Aires), grotesca dibujada para imprenta latinoamericana.
- Cifras tabulares en todo precio, cantidad y total.
- Profundidad por filete de 1px y escalón de superficie.
- Radios 10 / 6 / 99 px y nada más.
- Reconocible sin contenido por: el botón redondo naranja, la columna única de precios alineada a la derecha y la píldora de categoría.

## Colors

Tres colores de marca sacados del logo (naranja, verde, negro) sobre una escala
neutra cálida. El naranja manda la acción, el verde confirma y enlaza, la tinta
lo lee todo.

### Primary
- **Naranja de marca** (`naranja`, #E8720C): el naranja del logo. Va en rellenos grandes, en el anillo de foco (`outline: 3px`), en el borde inferior del enlace de navegación activo y en `::selection`. **No se usa como color de texto sobre papel**: contra blanco queda en ~3.0:1 y no pasa AA.
- **Naranja de texto y relleno** (`naranja-hondo` / `naranja-texto`, #B8550A): el mismo naranja bajado hasta pasar AA (~4.8:1 sobre #FFFFFF). Es el que rellena el botón «Pedir ahora», el botón redondo de añadir y la píldora de categoría activa, y el que colorea texto acentuado (`<em>` de la portada, `.dato__cifra`).
- **Naranja pulsado** (`naranja-prensa`, #9E4907): único estado hover de los rellenos naranjas.

### Secondary
- **Verde pasto** (`verde`, #2C8B2B): el verde del logo. Vive en el wordmark y en tipografía sobre fondo verde claro.
- **Verde hondo** (`verde-hondo`, #1E6B1D): relleno del botón de WhatsApp, del chip de tamaño seleccionado y del contador del pedido. Es también el valor de `enlace`.
- **Verde pulsado** (`verde-prensa`, #175616): hover del botón de WhatsApp.
- **Verde claro** (`verde-claro`, #E8F4E7): fondo del aviso de horario y del lienzo tipográfico de los platos sin foto.

### Neutral
- **Papel** (`papel`, #FFFFFF): superficie elevada — cabecera, portada, barra de carta, tarjetas de plato, panel de pedido, páginas legales.
- **Fondo** (`fondo`, #F6F3EE): lienzo del documento y relleno de controles en reposo (buscador, chips, botones de cantidad).
- **Fondo hondo** (`fondo-hondo`, #EDE8E0): el escalón más bajo — bloque de identidad legal, hueco de imagen antes de cargar, botón deshabilitado.
- **Tinta** (`tinta`, #1A1512): todo el texto corrido y el fondo del pie en esquema claro.
- **Tinta suave** (`tinta-suave`, #5C534B): texto secundario — entradilla, descripción de plato, notas de sección.
- **Tinta tenue** (`tinta-tenue`, #6E645B): terciario — rótulos de identidad, placeholders, iconos de apoyo.
- **Línea** (`linea`, #E2DBD1): el filete de 1px que separa todo.
- **Línea fuerte** (`linea-fuerte`, #C9BFB2): borde de control interactivo y filete en hover de tarjeta.

### Tertiary
- **Alerta** (`alerta`, #A8341A) y **fondo de alerta** (`alerta-fondo`, #FBEDE9): el aviso de que el bar se muestra pero no se despacha, y los marcadores `PENDIENTE_*` de datos legales sin resolver.

### Dark scheme values

Se aplican bajo `@media (prefers-color-scheme: dark)` sobre
`:root:not([data-tema="claro"])`, de modo que el atributo `data-tema="claro"`
puede forzar el esquema claro. Todo token de marca se redefine aquí: los
rellenos se aclaran y por eso `sobre-marca` se oscurece con ellos.

| Token | Claro | Oscuro |
|---|---|---|
| `papel` | `#FFFFFF` | `#201A16` |
| `fondo` | `#F6F3EE` | `#151110` |
| `fondo-hondo` | `#EDE8E0` | `#0E0B0A` |
| `tinta` | `#1A1512` | `#F6F1EA` |
| `tinta-suave` | `#5C534B` | `#BCB0A4` |
| `tinta-tenue` | `#6E645B` | `#8D8277` |
| `linea` | `#E2DBD1` | `#362D27` |
| `linea-fuerte` | `#C9BFB2` | `#4A3F37` |
| `naranja` | `#E8720C` | `#F5861E` |
| `naranja-vivo` | `#F5821F` | `#FF9833` |
| `naranja-hondo` | `#B8550A` | `#F5861E` |
| `naranja-texto` | `#B8550A` | `#FF9833` |
| `naranja-prensa` | `#9E4907` | `#FFAA55` |
| `verde` | `#2C8B2B` | `#4FB24D` |
| `verde-hondo` | `#1E6B1D` | `#5FC25D` |
| `verde-prensa` | `#175616` | `#86D884` |
| `verde-claro` | `#E8F4E7` | `#1C2E1B` |
| `enlace` | `#1E6B1D` | `#4FB24D` |
| `sobre-marca` | `#FFFFFF` | `#17120F` |
| `alerta` | `#A8341A` | `#F0836A` |
| `alerta-fondo` | `#FBEDE9` | `#2E1A15` |

Los dos esquemas están medidos: **todo par de texto y fondo llega a 4.5:1**, el
mínimo AA para cuerpo, no solo el 3:1 de texto grande. Cualquier token nuevo
entra con esa medición hecha, no con la suposición de que «se ve bien».

### Named Rules

**La Regla de los Dos Naranjas.** Hay dos naranjas y no son intercambiables.
`naranja` (#E8720C) es el de la marca: relleno grande, foco, selección, filete
de navegación. `naranja-texto` (#B8550A) es el de texto y de todo relleno que
lleve texto encima, porque el de marca no pasa AA como texto. Escribir texto en
`naranja` sobre papel es un error de contraste, no una variante.

**La Regla de `sobre-marca`.** El texto que va encima de un relleno de marca
(naranja o verde) se pinta siempre con `var(--sobre-marca)`, nunca con `#fff`
literal. En esquema oscuro los rellenos se aclaran y ese token pasa a
`#17120F`: el texto se oscurece con ellos. Un `#fff` fijo se vuelve ilegible en
la mitad de las noches.

**La Regla del Enlace por Token.** El color de enlace vive en el token
`--enlace` y se redefine dentro del bloque oscuro como token, nunca como una
regla `a { color: … }` dentro del media query. Esa versión tiene más
especificidad que `.btn` y le repinta el texto a todos los botones que son
anclas. Si un enlace necesita otro color, se cambia el token o se le pone clase.

## Typography

**Display Font:** Archivo Black (con `Archivo`, `ui-sans-serif`, `system-ui` de reserva). Auto-hospedada en `assets/fonts/`, subconjuntos latin y latin-ext, declarada en `assets/css/fuentes.css`. No se sirve desde un CDN: eso manda la IP del visitante a un tercero que la política de datos no declara, y en datos móviles el primer pintado sale con cara de sistema.
**Body Font:** Archivo 400/600/700/800 (con `ui-sans-serif`, `system-ui`, `-apple-system`, `Segoe UI` de reserva)

**Character:** Una sola familia, Archivo, de Omnibus-Type (Buenos Aires): una
grotesca dibujada para imprenta latinoamericana, de ojo grande y ancho estrecho,
que aguanta bien el sol y la pantalla pequeña. Archivo Black hace todo el peso
del titular; el cuerpo se queda en el regular. No hay segunda familia
decorativa, ni serif editorial, ni cara de sistema haciendo de display.

### Hierarchy
- **Display** (Archivo Black, `clamp(2rem, 1.4rem + 2.6vw, 3.4rem)`, interlineado 1.08, tracking −0.02em, `text-wrap: balance`): el `h1` de cada página. Uno por página.
- **Headline** (Archivo Black, `clamp(1.4rem, 1.15rem + 1.1vw, 2rem)`): títulos de sección y de categoría de la carta.
- **Title** (Archivo Black, 1.06rem, tracking −0.01em): `h3`, nombre de plato, nombre del pedido en el panel.
- **Body** (Archivo 400, 1rem, interlineado 1.55, máximo 68ch; 70ch de caja en páginas legales): texto corrido. La entradilla de portada sube a 1.16rem y se corta en 46ch.
- **Label** (Archivo 700/800, 0.70–0.74rem, tracking 0.10–0.12em, versalitas por `text-transform: uppercase`): rótulos de dato en el bloque de identidad, cabeceras de columna del pie, bajada del wordmark y la marca «Imagen de referencia» sobre las fotos.
- **Precio** (Archivo Black, 1.12rem en tarjeta / 1.5rem en total, `tabular-nums`): la columna de precios.
- **Cuerpo menor** (Archivo 400/600, 0.94rem): enlaces de navegación, párrafos y dirección del pie, descripción de plato en la tarjeta.
- **Meta** (Archivo 400, 0.9rem): notas de sección, texto legal del pie, aviso del bar, nota del total.
- **Menor** (Archivo 700, 0.82rem): botones de talla de pizza, detalle de línea del pedido, marcador `PENDIENTE_*`.
- **Cifra grande** (Archivo Black, 1.75rem, `tabular-nums`): el precio del almuerzo de hoy en la portada, la única cifra que compite con el titular.

### Size ramp

Cuatro escalones en el extremo pequeño, no nueve. Antes convivían `.64`, `.68`,
`.78`, `.82`, `.84`, `.86`, `.88`, `.89`, `.92`, `.94` y `.95rem`: diferencias
que nadie percibe y que ningún criterio explica. Se colapsaron aquí, y `.64rem`
además quedaba en 10.2 px, por debajo del piso de 11 px para texto funcional.

| Paso | Valor | Para qué |
|---|---|---|
| micro | `0.7rem` | Rótulos en versalitas con tracking: bajada de marca, badge «Imagen de referencia», etiqueta «Hoy» |
| rótulo | `0.74rem` | Encabezados de columna del pie |
| menor | `0.82rem` | Talla de pizza, detalle de línea del pedido, marcador `PENDIENTE_*` |
| meta | `0.9rem` | Notas de sección, texto legal del pie, avisos |
| cuerpo menor | `0.94rem` | Enlaces de navegación, párrafos del pie, descripción de plato |
| cuerpo | `1rem` | Texto corrido, medida 68ch |
| entrada | `1.16rem` | Entradilla de portada, título del panel de pedido |
| título | `1.06rem` | `h3`, nombre de plato |
| precio | `1.12rem` | Precio en tarjeta |
| cifra | `1.5rem` | Total del pedido, wordmark, cifra de domicilio |
| cifra grande | `1.75rem` | Precio del almuerzo de hoy |
| titular | `clamp(1.4rem, 1.15rem + 1.1vw, 2rem)` | `h2` |
| display | `clamp(2rem, 1.4rem + 2.6vw, 3.4rem)` | `h1` |

Un tamaño nuevo entra en esta tabla o no entra.

### Named Rules

**La Regla de las Cifras Tabulares.** Todo número que el cliente compare o sume
lleva `font-variant-numeric: tabular-nums`: precio de plato, precio de bar,
total del pedido, contador de unidades, contador del botón y las horas del
bloque de horarios. Una columna de precios que baila es una columna que no se
lee de un vistazo.

**La Regla del Hueco Tipográfico.** Un plato sin foto no lleva icono genérico ni
la foto de otro restaurante: el lienzo 4:3 se rellena con el nombre del plato en
Archivo Black sobre `verde-claro`. La ausencia de imagen se resuelve con
tipografía.

**La Regla del Rótulo en Versalitas.** Las versalitas con tracking abierto son
exclusivamente rótulos de metadato (`dt`, cabecera de columna, marca de
procedencia de imagen). No se usan como antetítulo ni como línea de entrada
sobre un titular.

## Layout

Un contenedor único: `.env` = `width: min(100% - 2rem, 1180px)` centrado. Las
páginas legales estrechan a `min(100% - 2rem, 70ch)` para lectura larga.

El ritmo vertical es una escala de ocho pasos en `rem` (0.25 / 0.5 / 0.75 / 1 /
1.5 / 2 / 3 / 4.5). Las secciones respiran a `r7` (3rem) de padding vertical; la
portada abre a `r8` (4.5rem) arriba. Dentro de una tarjeta o de una fila, la
distancia por defecto es `r4` (1rem) y el apretón es `r2` (0.5rem).

Las rejillas son todas automáticas, sin breakpoints propios:
`repeat(auto-fit, minmax(210px, 1fr))` para identidad legal y pie,
`minmax(230px, 1fr)` para las tarjetas de dato y
`repeat(auto-fill, minmax(268px, 1fr))` para la parrilla de platos. La portada es
la única rejilla explícita: una columna hasta 60rem, `1.15fr .85fr` por encima.

Hay un solo corte declarado, en **52rem**: por debajo desaparece la navegación
horizontal, aparece la barra fija inferior del pedido (`body.con-barra` reserva
5.5rem y la barra suma `env(safe-area-inset-bottom)`), y la cabecera baja de
68px a 60px de alto. Las dos barras pegajosas están encadenadas a esa altura: la
cabecera en `top: 0` y la barra de carta en `top: 68px` (60px en móvil), con
`scroll-margin-top: 140px` en cada grupo de categoría para que el salto por chip
no quede debajo de ellas.

Capas `z-index` declaradas: barra de carta 30, cabecera 40, barra móvil 45, velo
50, panel 60, enlace de salto 100.

## Elevation & Depth

El sistema es plano por doctrina. La profundidad se construye con dos
herramientas: **el filete de 1px** en `linea` (y `linea-fuerte` para bordes
interactivos) y **el escalón de superficie** `fondo-hondo` → `fondo` → `papel`.
La cabecera, la barra de carta, la portada, el bloque de identidad y las
secciones de papel se distinguen del documento por un filete y un cambio de
tono, no por elevación.

Existen dos tokens de sombra, y se usan en exactamente dos sitios: la tarjeta de
plato al pasar el puntero, y el panel de pedido que flota sobre la página. No
son sombras duras ni desplazadas: son dos capas difusas de ambiente.

### Shadow Vocabulary
- **Sombra de reacción** (`box-shadow: 0 1px 2px rgba(26,21,18,.06), 0 4px 12px rgba(26,21,18,.07)`): solo en `.plato:hover`, acompañada del cambio de filete a `linea-fuerte`. En oscuro sube a `rgba(0,0,0,.4/.45)`.
- **Sombra de panel flotante** (`box-shadow: 0 2px 4px rgba(26,21,18,.08), 0 12px 28px rgba(26,21,18,.12)`): solo en el panel de pedido, que sí está fuera del plano del documento.

El velo del panel es `rgba(26,21,18,.5)` con `backdrop-filter: blur(2px)`; es la
única desenfocadura del sitio.

### Named Rules

**La Regla del Filete de 1px.** Si dos superficies tienen que separarse, se
separan con un filete de 1px en `linea` y, si hace falta más, con un escalón de
tono. Una superficie nueva no nace con sombra. La sombra es respuesta a un
estado (hover) o a que el elemento esté literalmente flotando sobre la página
(panel). No se apilan más de las dos capas ya definidas ni se inventan tokens de
elevación nuevos.

## Shapes

Tres radios y ninguno más: **10px** (`radio`) para todo lo rectangular —
botones, tarjetas, campos, avisos, horarios; **6px** (`radio-chico`) para piezas
pequeñas o anidadas — chips de tamaño, marca de imagen de referencia, botón de
cerrar el panel, grupo de cantidad, anillo de foco; **99px** (`pildora`) para lo
redondo — chips de categoría, botón de añadir (40×40), contador del pedido, asa
de la barra de desplazamiento.

Los bordes son siempre de 1px sólido. La única excepción es el marcador
`PENDIENTE_*`, que usa borde punteado a propósito para señalar que es andamiaje.
El único elemento con punteado decorativo es el guion de la lista del bar
(`border-bottom: 1px dotted`), que hace de hoja de carta impresa entre nombre y
precio.

El botón redondo naranja de 40px es la silueta firmante del sitio: aparece en
cada una de las 172 tarjetas y es la acción primaria de toda la carta.

## Components

### Buttons
- **Forma:** rectángulo de esquinas suaves (10px), `inline-flex` centrado, `gap: .5rem`, peso 700, `line-height: 1`, padding `.8rem 1.25rem`, borde de 1px transparente para que las variantes con borde no salten de tamaño.
- **Pedir** (`.btn--ped`): relleno `naranja-hondo`, texto `sobre-marca`; hover `naranja-prensa`. Acción primaria de la casa.
- **WhatsApp** (`.btn--wa`): relleno `verde-hondo`, texto `sobre-marca`; hover `verde-prensa`.
- **De línea** (`.btn--linea`): fondo transparente, texto `tinta`, borde `linea-fuerte`; hover sube el borde a `tinta`. Es el botón «Tu pedido» de la cabecera.
- **Estados:** todos comparten `:active { transform: translateY(1px) }` y transición de 160ms `cubic-bezier(.2,.8,.2,1)`. Deshabilitado (`[disabled]` o `[aria-disabled="true"]`): fondo `fondo-hondo`, texto `tinta-tenue`, borde `linea`, `cursor: not-allowed`, sin desplazamiento al pulsar.
- **Foco:** `outline: 3px solid var(--naranja)` con `outline-offset: 2px` y radio de 6px. Es global y no se quita nunca.

### Chips
- **Categoría** (píldora, 99px): en reposo fondo `fondo`, texto `tinta-suave`, borde `linea-fuerte`, peso 700 a 0.88rem. Hover sube borde a `tinta-tenue` y texto a `tinta`. Seleccionado (`aria-pressed="true"`): relleno `naranja-hondo`, texto `sobre-marca`. La fila desplaza horizontalmente con la barra de scroll oculta y el chip activo lo marca un `IntersectionObserver` sobre la sección visible, no el clic.
- **Tamaño de pizza** (6px, más pequeño): mismo esquema en reposo; seleccionado va en `verde-hondo`, no en naranja, porque es una elección dentro de la tarjeta y no una navegación. Cambiar de tamaño reescribe el precio de la tarjeta en el sitio.

### Cards / Containers
- **Tarjeta de plato:** columna flex sobre `papel`, borde `linea` de 1px, radio 10px, `overflow: hidden`. Lienzo superior en relación 4:3 sobre `fondo-hondo` (imagen a `object-fit: cover` con la marca «Imagen de referencia» abajo a la izquierda, o el nombre del plato en Archivo Black sobre `verde-claro`). Cuerpo a `r4` de padding con `gap: r2`; el pie se empuja al fondo con `margin-top: auto` y alinea precio a la izquierda y botón redondo a la derecha.
- **Hover:** borde a `linea-fuerte` + sombra de reacción, 160ms.
- **Tarjeta de dato** (`.dato`) y **bloque de horarios** (`.horario`): mismo lenguaje — `papel` o `fondo`, filete `linea`, radio 10px, filas separadas por filete con la última sin borde.

### Inputs
- **Buscador:** único campo del sitio. Fondo `fondo`, borde `linea-fuerte`, radio 10px, padding `.7rem .9rem .7rem 2.4rem` para dejar sitio al icono SVG de lupa (17px, `currentColor`, `tinta-tenue`) posicionado a la izquierda. Placeholder en `tinta-tenue`. Ancho `flex: 1` con tope de 420px. El foco lo da el anillo naranja global; el borde no cambia.

### Navigation
- Enlaces en Archivo 600 a 0.94rem, color `tinta`, sin subrayado, con `border-bottom: 2px solid transparent` reservado desde el reposo. Hover y `[aria-current="page"]` pintan el texto en `naranja-hondo` y el filete inferior en `naranja` (en oscuro el texto sube a `naranja-vivo`). Por debajo de 52rem la navegación se oculta y la acción de pedido pasa a la barra fija inferior.
- La marca es texto, no imagen: «Kalamarata» en Archivo Black 1.5rem, `verde`, con la K inicial en `naranja`, y debajo la bajada en versalitas `tinta-suave`.

### Panel de pedido (componente firmante)
Cajón fijo a la derecha, `min(420px, 100%)`, sobre `papel`, con filete izquierdo
`linea` y sombra de panel flotante. Entra con `transform: translateX(100%) → 0`
en 260ms `cubic-bezier(.16,1,.3,1)`; el velo entra con la misma curva. Cabecera
con título 1.15rem y botón de cerrar fantasma (hover con fondo `fondo`), lista
desplazable a `r4`, pie sobre `fondo` con total en Archivo Black 1.5rem tabular.
Cada línea es una rejilla `1fr auto` con nombre en 700, talla en `tinta-tenue`
0.82rem y control de cantidad de 30px con `−` / `+`.

**La Regla del `inert`.** El panel cerrado lleva `inert` y `aria-hidden="true"`,
y se los quita al abrirse. Sin `inert` el teclado aterriza en botones que están
fuera de pantalla. Al cerrar, el foco vuelve al elemento que abrió el panel.
Cualquier superficie que se oculte por `transform` en vez de por `display` hereda
esta regla.

### Barra móvil de pedido
Barra fija inferior por debajo de 52rem, sobre `papel` con filete superior,
padding que incluye `env(safe-area-inset-bottom)`, y un solo `.btn--ped` a ancho
completo que dice el estado en texto («Aún no has elegido nada» / «Ver el pedido
· 3 · $48.000»), deshabilitado cuando el pedido está vacío.

## Do's and Don'ts

### Do:
- **Do** usar `naranja-texto` / `naranja-hondo` (#B8550A) para cualquier naranja que lleve o sea texto, y reservar `naranja` (#E8720C) para filetes, foco, selección y marca.
- **Do** pintar el texto sobre relleno de marca con `var(--sobre-marca)`.
- **Do** poner `font-variant-numeric: tabular-nums` en todo precio, total y contador.
- **Do** separar superficies con un filete de 1px en `linea` y un escalón `fondo-hondo` → `fondo` → `papel`.
- **Do** quedarse en los tres radios: 10px, 6px, 99px.
- **Do** usar el ritmo `--r1..--r8`; si una distancia no está en la escala, es que está mal medida.
- **Do** marcar el estado seleccionado con `aria-pressed` y pintarlo desde ese atributo, nunca con una clase paralela.
- **Do** dar a toda superficie oculta por `transform` el par `inert` + `aria-hidden="true"`.
- **Do** dejar el anillo de foco naranja de 3px con 2px de separación tal cual está.
- **Do** llenar con tipografía los huecos donde falte una imagen.
- **Do** dejar los datos legales en texto seleccionable, nunca dentro de una imagen.

### Don't:
- **Don't** escribir una regla `a { color: … }` dentro del media query oscuro: gana en especificidad a `.btn` y repinta el texto de los botones. El color de enlace se cambia en el token `--enlace`.
- **Don't** escribir `#fff` ni `#FFFFFF` literal como color de texto sobre un relleno de marca.
- **Don't** añadir tokens de sombra nuevos ni apilar elevación: las dos sombras existentes tienen dueño (hover de tarjeta, panel flotante) y nada más las usa.
- **Don't** introducir una segunda familia tipográfica ni una cara de sistema haciendo de titular. Archivo y Archivo Black cubren todo.
- **Don't** usar versalitas con tracking como antetítulo o línea de entrada sobre un titular: son rótulo de metadato.
- **Don't** resolver la ausencia de una foto con un icono genérico de cubiertos ni con la foto de otro restaurante.
- **Don't** rellenar con `verde` un chip o botón de navegación: el verde es confirmación, enlace y WhatsApp; la acción de pedido es naranja.
- **Don't** inventar breakpoints: el corte del sitio es 52rem y las rejillas se resuelven solas con `auto-fit` / `auto-fill`.
- **Don't** quitar el `overflow: hidden` de la tarjeta de plato ni el `[hidden] { display: none }` explícito: `display:flex` le gana a `[hidden]` del navegador y la tarjeta filtrada reaparece.


## Revisión final: cambios aplicados

La revisión final marcó siete arreglos materiales. Lo que cambió en el sistema:

- **El hueco de foto solo existe cuando hay foto.** `lienzo()` no emite
  `.plato__lienzo` sin `img`. Antes reservaba una caja 4:3 en los 148 platos sin
  imagen y la rellenaba con el nombre del plato, que ya iba en el `<h3>` de
  abajo: duplicación leída como fallo de render, y dos tercios del documento
  móvil en verde vacío. Medido: el documento móvil pasó de 68.405 px a 28.735 px
  y el de escritorio de 22.433 px a 13.468 px.
- **La píldora de categoría activa es verde, no naranja.** El naranja significa
  una sola cosa: esto se pulsa para pedir. Cuando la píldora activa también era
  naranja, el color dejaba de decidir nada.
- **El riel de categorías declara su desbordamiento.** La barra de scroll está
  oculta, así que `.cats-caja::after` pone un degradado de corte en el borde
  derecho. Sin él, 20 de 22 categorías eran invisibles y sin señal.
- **Las píldoras son enlaces, no interruptores.** Eran `<button aria-pressed>`
  para un control que solo desplaza: un lector de pantalla anunciaba «botón, no
  presionado» de algo que navega. Ahora son `<a href="#id">` con `aria-current`.
- **Una sola sombra en todo el sistema.** El hover de tarjeta se resuelve solo
  con el filete; la sombra sobraba. Queda `--sombra-alta` con un único dueño, el
  panel de pedido.
- **El almuerzo de hoy se resuelve en el inicio**, con el día de
  `America/Bogota` y no el del navegador: en UTC puede ser ya lunes mientras en
  Barranquilla sigue siendo domingo y la cocina no sirve almuerzo.


## Rediseño del 21/09: portada mínima y color comprometido

Petición del cliente: el sitio se veía «muy básico, muy IA», sobraba el modo
oscuro y la carta mezclaba el almuerzo con las comidas rápidas.

**Fuera el esquema oscuro.** Era una decisión mía, tomada desde la escena de
uso; el cliente la revocó: esto es una página web de restaurante, no una app, y
el blanco es su decisión. `color-scheme: only light`, y los tokens que existían
solo para invertirse (`sobre-marca`, `enlace`, los `*-prensa`) siguen vivos
porque ya cumplían otra función en claro.

**El suelo es blanco, no crema.** El detector marcó `cream-palette` sobre el
fondo anterior (#F6F3EE) y tenía razón: el blanco tostado cálido es la
superficie a la que se recurre por reflejo, y es parte de por qué el sitio se
leía como generado. La página es `#FFFFFF`; el escalón (`fondo-hondo`,
`control`) es `#F1F4F0`, un gris de **matiz verde derivado de la marca**, no
otro beige. Los filetes se neutralizaron igual. Dentro del campo verde el texto
secundario usa `sobre-verde` (#E9F0E7), no el crema que tenía antes.

**El color se compromete a escala de página.** El diagnóstico de por qué se veía
generado: todo era una tarjeta blanca con filete de 1 px sobre gris claro, y el
naranja y el verde de la marca aparecían solo en botones pequeños. El estándar
de oficio lo dice literalmente — *el color commits at page scale: campos que
ocupan regiones enteras, no acentos salpicados sobre fondo neutro*. Ahora:

- **`.hero`**: campo `verde-hondo` entero, titular blanco a `clamp(2.1rem, …,
  4rem)`, y dos acciones grandes en la pauta de la categoría (icono, acción en
  Archivo Black, subtítulo de qué pasa al pulsar).
- **`.accion--pedir`**: relleno `naranja-accion` (#F5821F) con texto
  `sobre-accion` (#1A1512). El blanco encima de ese naranja da **2.59:1** y no
  se usa; la tinta oscura da 6.98:1.
- **`.banda`**: rótulo blanco sobre campo verde para cada servicio de la carta.
  No es un recurso inventado: es el de la carta impresa de Kalamarata.

**La portada es mínima.** Héroe y bloque de identidad legal, nada más. Las
tarjetas de domicilios, la rejilla del almuerzo semanal y el mapa se fueron: la
portada dice qué es y lleva a pedir.

**La carta son dos servicios.** `data/carta.json` etiqueta cada categoría con
`servicios: ['almuerzo'|'rapidas']`, tomado de las dos cartas impresas del
cliente. Cuatro categorías están en ambas — Asados y parrilladas (que la carta
de día llama «Parrilladas» y la de noche «Asados», mismos platos y precios),
Lasañas, Bebidas y Cervezas — y se renderizan en las dos con el nombre que les
corresponde vía `nombrePorServicio`. Dentro de un servicio los títulos de
categoría son `h3`: el `h2` es la banda.

**Contacto desapareció.** Su contenido propio (lista de contacto y formas de
pago) vive en «Dónde estamos». La navegación es Inicio · Pide aquí · Dónde
estamos, y «Pide aquí» es la carta: mirar y pedir en la misma página.


## Separación de servicios y aviso de disponibilidad

El cliente no veía la separación entre las dos cartas y pidió que cada una
avisara de que no se sirve a la hora de la otra. Tres piezas, no una:

- **Separación visible al pasar.** `.servicio--rapidas` cambia de fondo
  (`fondo-hondo`) y abre con un filete de 3 px en `verde-hondo`. El salto entre
  las dos cartas se ve, no se adivina.
- **Aviso dentro de la banda** (`.banda__aviso`): dice en prosa que esa carta
  es de almuerzo o de noche y que a la otra hora no está disponible. Va dentro
  de la banda para que viaje con ella.
- **Estado real** (`.banda__cerrado`): calculado con el reloj de
  `America/Bogota`, no el del navegador. Si el servicio no se está sirviendo
  ahora mismo lo dice en naranja y atenúa sus platos al 72 %, sin impedir el
  pedido: se puede pedir igual y se confirma por WhatsApp.

**El indicador pegajoso** (`.barra__serv`) viaja en la barra de categorías, que
ya está siempre a la vista, y dice en qué servicio estás según bajas. No es una
tercera capa pegajosa a propósito: a 390 px la cabecera y la barra ya ocupan
210 px, y una banda más se comería un tercio de la pantalla. Se estiliza como
un «estás aquí» —sin relleno, con un punto verde— y no como los chips de salto:
dos píldoras verdes idénticas no dejan claro cuál se pulsa.

La lógica de horario está probada con el reloj falseado en seis momentos: lunes
12:00, lunes 19:00, lunes 21:30, lunes 22:30, domingo 13:00 y sábado 22:30
—este último cubre el cierre a las 23:00 del fin de semana—.
