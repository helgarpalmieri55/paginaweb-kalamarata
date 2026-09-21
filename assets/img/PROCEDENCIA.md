# Procedencia de las imágenes

**Ninguna de estas imágenes es una fotografía de Kalamarata.**

Las **153** imágenes de platos de esta carpeta fueron generadas por
inteligencia artificial el 2026-09-21 y se muestran en el sitio con la marca
visible «Imagen de referencia» sobre cada una. El logotipo
(`kalamarata-logo.webp`) sí es del cliente y no lleva esa marca.

## Bebidas de marca: sin imagen, a propósito

**Coca-Cola mega**, **Té o jugos Hit** y **Té Hatsu** son las tres bebidas que
la carta nombra por su marca. No tienen imagen.

Se generaron con etiqueta y el cliente las revisó: **no concordaban con el
producto real** —envases y sabores que no son los que vende—. Una imagen que
enseña un producto distinto del que llega a la mesa es peor que ninguna, así
que se quitaron.

No se sustituyeron por fotos de internet: las de los buscadores son de quien
las tomó, y publicarlas en un sitio que vende sería usar su trabajo sin
permiso. El buscador de stock con licencia está bloqueado por la política de
la organización.

Las dos formas correctas de llenar ese hueco, por orden de utilidad:

1. **Una foto de las botellas de la nevera del local.** Gratis, exacta, sin
   permisos de por medio, y enseña el envase y el tamaño que el cliente va a
   recibir. Basta un teléfono y luz de día.
2. **El material de producto del embotellador.** Coca-Cola FEMSA y Postobón se
   lo dan a sus clientes; se le pide al asesor comercial. Viene con permiso de
   uso incluido.

El resto de bebidas (`Gaseosa PET 400`, `Gaseosa 1.5 L PET`, `Botella de
agua`, `Soda`, `Ginger ale`, las sodas saborizadas) **no nombran marca en la
carta**, así que sus botellas van sin etiqueta: poner una supondría inventar
qué marca surte el restaurante.

Ninguna imagen lleva texto ni logotipos.

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

Una por cada plato de la carta menos las tres bebidas de marca: 153 de 156.
Están enlazadas desde
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

Formato: WebP, 760 px de ancho, calidad 76. Los originales PNG se descartaron
por peso (32 MB en total frente a 424 KB).
