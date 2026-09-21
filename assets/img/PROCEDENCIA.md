# Procedencia de las imágenes

**Ninguna de estas imágenes es una fotografía de Kalamarata.**

Las **156** imágenes de platos de esta carpeta fueron generadas por
inteligencia artificial el 2026-09-21 y se muestran en el sitio con la marca
visible «Imagen de referencia» sobre cada una. El logotipo
(`kalamarata-logo.webp`) sí es del cliente y no lleva esa marca.

## Bebidas de marca

Tres bebidas de la carta se nombran por su marca, y a petición del cliente sus
imágenes llevan la etiqueta: **Coca-Cola mega**, **Té o jugos Hit** y
**Té Hatsu**. Son productos que el restaurante vende de verdad, así que
mostrarlos es lo mismo que hacen la carta impresa y la nevera del local.

Las etiquetas están **generadas por IA**, no son fotografías del producto ni
material oficial de esas marcas. Si alguna de ellas pide que se retire su
imagen, se retira: no hay permiso de uso de por medio. Lo correcto a medio
plazo es reemplazarlas por una foto de las botellas que el restaurante tiene
en nevera, que además muestra el envase y el tamaño reales.

El resto de bebidas (`Gaseosa PET 400`, `Gaseosa 1.5 L PET`, `Botella de
agua`, `Soda`, `Ginger ale`, las sodas saborizadas) **no nombran marca en la
carta**, así que sus botellas van sin etiqueta: poner una supondría inventar
qué marca surte el restaurante.

Ninguna imagen lleva otro texto ni logotipos.

Se generaron porque el restaurante no tiene todavía fotografía propia
publicable, y porque las fotos que circulan en el repositorio del proveedor
están tomadas de la carta pública de otro restaurante y no se pueden publicar
aquí.

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

Una por cada uno de los 156 platos de la carta. Están enlazadas desde
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
