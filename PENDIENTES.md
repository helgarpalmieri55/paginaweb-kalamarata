# Lo que falta antes de publicar y de mandar a verificar

Esta lista es la del §8 del spec, aterrizada a lo que de verdad falta en este
repositorio. Está ordenada por lo que bloquea: lo de arriba bloquea lo de abajo.

Cada marcador `PENDIENTE_*` aparece **visible en rojo** en las páginas, para que
sea imposible publicar el sitio sin darse cuenta de que falta.

---

## 1. Datos que hay que pedirle al dueño

**Resueltos el 21/09/2026** con el Certificado de Matrícula de Persona Natural
de la Cámara de Comercio de Barranquilla (expedido 09/02/2026, recibo
13178876, código de verificación FM6A267AFF) y con el correo que indicó el
dueño.

| Marcador | Valor puesto | De dónde sale |
|---|---|---|
| ~~`PENDIENTE_RAZON_SOCIAL`~~ | Néstor Mauricio Ortiz González | Certificado, «Nombre». Es persona natural: la razón social es su nombre |
| ~~`PENDIENTE_NIT`~~ | 1.140.880.235-8 | Certificado, «NIT» |
| ~~`PENDIENTE_CORREO_CORPORATIVO`~~ | pedidos@kalamarata.com | Lo indicó el dueño |
| ~~`PENDIENTE_CORREO_DATOS`~~ | pedidos@kalamarata.com | Lo indicó el dueño (dio un solo correo) |
| ~~`PENDIENTE_RESPONSABLE_DATOS`~~ | Néstor Mauricio Ortiz González, propietario | Certificado: no hay más titular |
| ~~`PENDIENTE_DIRECCION_NOTIFICACIONES`~~ | Calle 72 No. 60-53, Barranquilla, Atlántico | Certificado, campo «Dirección para notificación judicial» |
| ~~`PENDIENTE_FECHA_VIGENCIA`~~ | 21 de septiembre de 2026 | Fecha en que se publicaron los textos |

### Siguen en rojo, y no salen del certificado

| Marcador | Qué falta decidir |
|---|---|
| ~~`PENDIENTE_DOMINIO`~~ | **kalamarata.com**, confirmado por el dueño el 21/09/2026. Está en GoDaddy y se sirve por Cloudflare |
| `PENDIENTE_DECISION_PROMOCIONES` | **Lo único que queda.** Si el restaurante va a mandar publicidad. Ver «La decisión de promociones» más abajo |

---

## 1-bis. DOS COSAS DEL CERTIFICADO QUE BLOQUEAN LA VERIFICACIÓN DE META

No son detalles de redacción. Meta compara lo que dice el sitio contra lo que
dice el certificado, y hoy **no coinciden**.

### a) RESUELTO — se verifica como GATO'S LA 72

**Decisión del dueño, 21/09/2026:** la verificación ante Meta se hace con el
nombre real del establecimiento, **GATO'S LA 72**, que es el que respalda el
certificado. El sitio sigue llamándose Kalamarata, que es el nombre comercial
con el que atiende. Para que el sitio sostenga esa verificación, el pie de las
6 páginas ahora dice, además de la razón social y el NIT:
«Establecimiento GATO'S LA 72».

El certificado lo escribe como `GATO"S LA 72`, con comilla doble: es cómo lo
guarda el registro. En el sitio se escribe con apóstrofo, que es como se lee.
**En el formulario de Meta hay que copiar la forma exacta del registro.**

### a-bis) De dónde venía el problema

El establecimiento de comercio matriculado a nombre de Néstor Mauricio Ortiz
González se llama:

> **GATO"S LA 72** — matrícula 259.522, desde el 03 de julio de 1998

No hay ningún establecimiento llamado Kalamarata en este certificado. El sitio
entero se llama Kalamarata.

Eso deja tres caminos, y **los tres son del dueño, no nuestros**:

1. Kalamarata es un nombre comercial nuevo y **hay que matricularlo** (o
   cambiarle el nombre al establecimiento) en la Cámara de Comercio.
2. Existe otro certificado, de otro establecimiento, que sí dice Kalamarata y
   que no se nos ha entregado.
3. Se verifica ante Meta como GATO'S LA 72, que es lo que respalda el papel.

Mientras no se resuelva, **la verificación se rechaza**: el nombre del negocio
no lo respalda ningún documento.

### b) RESUELTO — manda la dirección del certificado

**Decisión del dueño, 21/09/2026:** se usa la del certificado en todo el sitio.
Las **17 menciones** (héroe, pies, JSON-LD, meta descripciones, `carta.json` y
los dos textos legales) dicen ahora **Calle 72 No. 60-53**. El botón «Cómo
llegar» ya apuntaba a coordenadas fijas, así que llegar no dependía del texto.

Sobre **las coordenadas** (`11.0029612,-74.7964900`): al incrustar el mapa se
pudo por fin mirar dónde cae el pin, y **cae en la Calle 72 entre la Carrera 60
y la 61**, que es justo lo que significa «60-53» en la nomenclatura colombiana.
Es coherente con el certificado. Lo que sigue sin poder comprobarse desde aquí
es **la puerta exacta**: eso se mira una vez desde el local.

Las coordenadas están repetidas en **tres sitios**: el botón «Cómo llegar» y el
mapa de `donde-estamos.html`, y el JSON-LD de `index.html`. Si hay que
corregirlas, hay que tocar los tres.

### b-bis) De dónde venía el problema

| Fuente | Dirección |
|---|---|
| Certificado (domicilio principal y notificación judicial) | **CL 72 No 60 - 53**, Barranquilla - Atlántico |
| Sitio y carta impresa | **Calle 72 #61 esquina**, Barranquilla |

Puede que sea el mismo local descrito de dos maneras —un predio numerado 60-53
está entre la carrera 60 y la 61—, pero **eso no se supone, se confirma**.

Lo hecho mientras tanto, para no afirmar nada falso:

- Las **dos frases de identificación legal** (responsable del tratamiento en la
  política de datos, y a quién aplican los términos) usan **la del
  certificado**, porque ahí manda el papel.
- Las **16 menciones de cómo llegar** (héroe, pies de página, JSON-LD, meta
  descripciones, `carta.json`) siguen diciendo **Calle 72 #61 esquina**, que es
  lo que el restaurante publica y lo que la gente usa para llegar. Cambiar por
  dónde le dicen a los clientes que entren no es nuestro de decidir.

En cuanto el dueño confirme cuál es, se unifica en un solo cambio.

### c) Un aviso, no un problema

Al ser persona natural, **el NIT es la cédula** del dueño más el dígito de
verificación. Publicarlo es lo normal y lo que pide el Estatuto del Consumidor
para identificar a quien vende, y ya es público en el RUES — pero conviene que
el dueño sepa que su número de cédula queda a la vista en el sitio.

### Para el formulario de Meta, copiar tal cual del certificado

Meta compara carácter por carácter. En el sitio el nombre va en orden natural y
con tildes, que es como se lee bien; **en el formulario hay que poner la forma
exacta del registro**:

```
Nombre:          ORTIZ GONZALEZ NESTOR MAURICIO
Identificación:  1.140.880.235
NIT:             1.140.880.235 - 8
Matrícula:       906.393
Establecimiento: GATO"S LA 72   (matrícula 259.522)
Dirección:       CL 72 No 60 - 53
Municipio:       Barranquilla - Atlantico
CIIU:            5611
```

El certificado registra además el correo `n.ortiz_95@hotmail.com` y el teléfono
`3007835040`. **No se publicaron**: el sitio usa el correo corporativo que pidió
el dueño y el 311 428 0292 que ya estaba. Si Meta exige que el correo coincida
con el del registro, hay que actualizarlo en la Cámara de Comercio.

Además, sin marcador en el código pero igual de bloqueantes:

- **Un teléfono que pueda recibir el código de Meta**, y alguien avisado de que
  va a entrar una llamada o un SMS. El 311 428 0292 lo contesta quien esté en
  caja.
- **Confirmar quién es administrador del portafolio comercial** y su usuario de
  Facebook. Solo un administrador puede completar la verificación.

## 1-ter. La decisión de promociones (lo único que queda en rojo)

**La pregunta, en una línea:** ¿el restaurante va a mandarle publicidad por
WhatsApp a quien ya pidió —ofertas, el menú del día, promociones— o los datos
del cliente se usan **solo** para atender su pedido?

**Por qué hay que decidirlo y no se puede dejar en blanco.** La Ley 1581 de
2012 y el Decreto 1377 de 2013 tratan la publicidad como una finalidad
**distinta** de atender el pedido. Quien te da su teléfono para que le lleves
un almuerzo no te ha autorizado a mandarle promociones: eso es un permiso
aparte, que se pide aparte y que el cliente puede negar sin perder el pedido.

La política ya tiene escrito el párrafo que lo explica; lo que falta es la
frase que dice qué hace el restaurante. Las dos opciones:

| Si la respuesta es | Lo que se publica |
|---|---|
| **No, por ahora no** | «Hoy no enviamos promociones: tus datos se usan solo para atender tu pedido.» Es lo más simple y lo más seguro. Si mañana se quiere, se cambia la política y se pide el permiso |
| **Sí, queremos** | «Si nos das permiso, podemos enviarte promociones…» y **además** hay que añadir una casilla de aceptación separada en el pedido, y una forma de darse de baja |

**Recomendación:** empezar por **no**. Es una línea de texto, no bloquea nada, y
evita tener que montar la casilla y la baja antes de publicar. Cambiarlo
después cuesta lo mismo.

## 1-quater. El mapa incrusta Google

`donde-estamos.html` lleva ahora un mapa de Google incrustado, interactivo y
con el pin del local. Eso significa que **Google recibe la IP de quien visita
esa página** y puede poner sus cookies.

Está declarado en la política de datos, §5, junto a los demás encargados. Si
alguna vez se quiere evitar del todo, la alternativa es quitar el `<iframe>` y
dejar solo el botón «Cómo llegar», que abre la app de mapas sin incrustar nada.
El mapa **solo** está en esa página; ninguna otra carga nada de Google.

## 2. Archivos que faltan

- ~~**El logo**~~ — **entregado el 21/09/2026** en PNG con canal alfa real.
  Está en la cabecera de las 5 páginas (`assets/img/kalamarata-logo.webp`,
  13 KB) y el camarón de la marca es ahora el favicon, sobre el verde de marca
  porque naranja sobre naranja no contrasta. La K provisional se eliminó.
- **Fotografías propias** de los platos y del local. De las **156** imágenes
  de `assets/img/`, **153** son generadas por IA y salen marcadas «Imagen de
  referencia»; ver `assets/img/PROCEDENCIA.md`. Reemplazarlas por fotografía
  real en cuanto el restaurante la tenga, y quitar entonces esa marca.
- **Permiso de uso de las tres fotos de bebida de marca** (Coca-Cola mega,
  Té o jugos Hit, Té Hatsu). Las aportó el cliente y muestran el producto
  correcto, pero **no consta de dónde salieron ni bajo qué licencia**. En un
  sitio que vende, publicar la foto de otro sin permiso es un riesgo real.
  Se cierra de dos formas: una foto de las botellas de la nevera del local
  (gratis y exacta), o el material de producto del embotellador (Coca-Cola
  FEMSA y Postobón se lo dan a sus clientes, con permiso incluido).
- **Aclarar qué es una «Coca-Cola mega»**. La carta la llama así y la foto
  aportada es de **600 mL**; en Colombia «mega» suele ser un formato mayor.
  O la foto no es del envase que se vende, o el nombre de la carta no es el
  del producto. Lo dice el restaurante; no se ha supuesto nada.

## 3. Un paso manual en GitHub, una sola vez

- [ ] **Settings → Pages → Source = «GitHub Actions»** (no «Deploy from a
      branch»). Sin esto el workflow construye pero no publica. Detalle
      completo en `DEPLOY.md`.

## 4. Cuando exista el dominio

- [ ] Poner el dominio real en `robots.txt` (descomentar la línea `Sitemap:`) y
      en `sitemap.xml`.
- [ ] Añadir `<link rel="canonical">` a las 5 páginas. **Hoy no está a
      propósito**: un canonical apuntando a un dominio inexistente desindexa el
      sitio en silencio, mientras que su ausencia no hace daño.
- [ ] Añadir `og:image` y `og:url` absolutos.
- [ ] Comprobar que el sitio carga por HTTPS sin advertencias.
- [ ] Probarlo en **ventana de incógnito**: sin sesión, sin caché y sin 404.

## 5. Enganche con el asistente de WhatsApp

- [ ] Escribir la URL de la política publicada en `business_info.privacy_policy_url`
      del tenant. El bot ya la nombra al pedir la autorización, pero hoy no la
      puede enlazar. Ese campo no tiene casilla en el panel: se pone a mano.
- [ ] Cargar el logo en `Tenant.logo`.
- [ ] Acordar cómo se mantienen sincronizados los precios de `data/carta.json`
      con el catálogo del bot. Hoy son dos copias: en la primera subida de
      precios se separan, y el que queda mal es el bot.

## 6. Coherencia que Meta compara

Esto se revisa al final, cuando ya estén los datos de arriba:

- [ ] Nombre en la web = nombre en el formulario de Meta = nombre en el documento
- [ ] Dirección en la web = dirección en el formulario = dirección en el documento
- [ ] Teléfono en la web = teléfono en el formulario
- [ ] El display name que se pida ante Meta se lee igual que el nombre de la web

---

## Lo que ya está hecho y verificado

- [x] La dirección física aparece en texto, no dentro de una imagen
- [x] El teléfono aparece en texto, en las 5 páginas
- [x] Los horarios coinciden con los que contesta el bot (confirmados por el cliente)
- [x] La política de datos y los términos están escritos y abren
- [x] La carta no ofrece alcohol por canales digitales, y lo dice explícitamente
- [x] El botón de WhatsApp abre el chat con el número correcto y texto prellenado
- [x] El sitio se ve bien a 390 px, sin desborde horizontal
- [x] Contraste WCAG AA (4.5:1) en todo el sitio
- [x] El sitio es indexable: `robots.txt` lo permite explícitamente
- [x] El logo real del cliente está en la cabecera y en los iconos
- [x] Las 5 páginas son alcanzables desde cualquier página **en móvil**: la
      navegación de cabecera se oculta por debajo de 52 rem y no hay menú
      hamburguesa, así que el pie lleva la lista completa
- [x] Publicación automática en GitHub Pages al hacer merge a `main`, con la
      vista previa marcada `noindex` porque `github.io` no es el dominio del
      negocio (ver `DEPLOY.md`)
- [x] Solo tema claro: el modo oscuro se eliminó a petición del cliente
- [x] La carta separa **Almuerzo** (72 platos) de **Comidas rápidas** (135),
      según las dos cartas impresas que entregó el cliente
