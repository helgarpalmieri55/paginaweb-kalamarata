# Procedencia de las imágenes

**Ninguna de estas imágenes es una fotografía de Kalamarata.**

De las **156** imágenes de platos de esta carpeta, **153** fueron generadas
por inteligencia artificial el 2026-09-21 y **3** son fotografía de producto
aportada por el cliente (ver más abajo). Todas se muestran en el sitio con la
marca visible «Imagen de referencia» encima. El logotipo
(`kalamarata-logo.webp`) sí es del cliente y no lleva esa marca.

## Bebidas de marca: foto de producto aportada por el cliente

**Coca-Cola mega**, **Té o jugos Hit** y **Té Hatsu** son las tres bebidas que
la carta nombra por su marca. Hoy llevan **foto de producto real**, no imagen
generada.

Primero se generaron con IA y con etiqueta. El cliente las revisó y las
rechazó: **no concordaban con el producto real**. Se comprobó y tenía razón
—las etiquetas inventadas traían texto ilegible—, así que se quitaron.

El cliente aportó entonces varias imágenes de producto y se escogieron tres.
Cada una se revisó a tamaño grande antes de aceptarla:

| Archivo | Qué muestra | Comprobado |
|---|---|---|
| `coca-cola-mega.webp` | Botella de 600 mL, sabor original | Sello MINSALUD «EXCESO EN AZÚCARES», «600 mL / 3 PORCIONES / BEBIDA GASEOSA», todo legible y correcto |
| `te-hatsu.webp` | Tres botellas de 400 mL (flor de loto, frutos rojos, limón y hierbabuena) | «SIN AZÚCAR & SIN CALORÍAS», «Cont. Neto 400 ml (13,33 fl oz)», tabla nutricional legible |
| `te-o-jugos-hit.webp` | Tres cajas (frutas tropicales, mango, mora) | Sellos MINSALUD «EXCESO EN AZÚCARES» y «CONTIENE EDULCORANTE», legibles |

Se descartó una cuarta imagen de Hatsu sobre fondo floral: era **generada por
IA** y tenía el texto de la etiqueta alucinado (la tabla nutricional decía
«chrpnt Snts Gsh.» y el pie «De un porcentaje de 2006 ozcalorias»). Una
etiqueta con texto inventado es exactamente lo que el cliente rechazó.

### Lo que no sabemos de estas tres

**No consta de dónde salieron ni bajo qué licencia.** Las aportó el cliente;
no son fotografías del local ni material que el embotellador nos haya
entregado a nosotros con permiso por escrito. Si proceden de un buscador, son
de quien las tomó y publicarlas en un sitio que vende es usar su trabajo sin
permiso.

**Esto sigue abierto y es del cliente resolverlo.** Las dos formas limpias de
cerrarlo, por orden de utilidad:

1. **Una foto de las botellas de la nevera del local.** Gratis, exacta, sin
   permisos de por medio, y enseña el envase y el tamaño que el cliente va a
   recibir. Basta un teléfono y luz de día.
2. **El material de producto del embotellador.** Coca-Cola FEMSA y Postobón se
   lo dan a sus clientes; se le pide al asesor comercial. Viene con permiso de
   uso incluido.

### Dos desajustes medidos, no supuestos

- **La carta dice «Coca-Cola mega» y la foto es de 600 mL.** En Colombia
  «mega» suele nombrar un formato mayor. O la foto no es del envase que se
  vende, o el nombre de la carta no es el del producto. **Lo aclara el
  restaurante**, no nosotros.
- **La foto de Hit viene de un original de 554×554 px**, por debajo de los
  760 px que usa el sitio, así que se ve algo más blanda que las demás. Se
  publicó igual porque muestra el producto correcto; una foto propia la
  mejoraría.

El resto de bebidas (`Gaseosa PET 400`, `Gaseosa 1.5 L PET`, `Botella de
agua`, `Soda`, `Ginger ale`, las sodas saborizadas) **no nombran marca en la
carta**, así que sus botellas van sin etiqueta: poner una supondría inventar
qué marca surte el restaurante.

Ninguna imagen **generada** lleva texto ni logotipos; las tres de marca sí,
porque son fotografía de producto y la etiqueta es el producto.

## Qué hay que hacer con ellas

Reemplazarlas por fotografía propia de los platos de Kalamarata en cuanto el
restaurante la entregue. Al hacerlo, quitar también la marca
«Imagen de referencia» del renderizado (`lienzo()` en `assets/js/carta.js`).

## Riesgo que el dueño aceptó conscientemente

Una imagen junto a un plato se lee como ese plato, aunque diga «referencia».
Si un cliente reclama en caja porque lo que recibió no se parece a la foto, la
causa es esta. La decisión de publicarlas así fue del cliente, no una
suposición nuestra.

## Cuántas hay

Una por cada plato de la carta: **156 de 156** (153 generadas + 3 fotos de
producto). Están enlazadas desde
`data/carta.json` en el campo `img` de cada plato; el nombre del archivo es el
del plato en minúsculas y sin tildes.

## Qué representa cada archivo

| Archivo | Plato al que acompaña |
|---|---|
| `bandeja-paisa.webp` | Jueves · Bandeja paisa |
| `mojarra-roja-frita.webp` | Mojarra roja frita |
| `parrillada-mixta.webp` | Parrillada mixta |
| `kalamarata-burger.webp` | Kalamarata Burger |
| `salchipapa-kalamarata.webp` | Salchipapa Kalamarata |
| `sandwich-kalamarata.webp` | Sándwich Kalamarata |
| `perro-italo-suizo.webp` | Perro ítalo-suizo |
| `pizza-kalamarata.webp` | Pizza Kalamarata |

Formato: WebP, 760×574 px, calidad 76 las generadas y 82 las tres fotos de
producto. Los originales PNG se descartaron por peso.

Las tres fotos venían cuadradas. El lienzo de la tarjeta es 4:3 con
`object-fit: cover`, así que recortarlas habría decapitado las botellas: se
**rellenaron** hasta 760×574 con su propio color de fondo en vez de recortar.
