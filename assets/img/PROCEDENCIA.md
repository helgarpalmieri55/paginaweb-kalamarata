# Procedencia de las imágenes

**Ninguna de estas imágenes es una fotografía de Kalamarata.**

Las **156** imágenes de platos de esta carpeta fueron generadas por
inteligencia artificial el 2026-09-21 y se muestran en el sitio con la marca
visible «Imagen de referencia» sobre cada una. El logotipo
(`kalamarata-logo.webp`) sí es del cliente y no lleva esa marca.

Ninguna lleva texto, marcas comerciales ni logotipos: las bebidas de marca
(gaseosa de cola, té, jugos) se representan **sin etiqueta**, como un vaso o
una botella genérica, para no reproducir la identidad de otra empresa.

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
