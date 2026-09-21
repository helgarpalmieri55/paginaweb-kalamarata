# Publicación del sitio

Hay dos destinos y **los dos usan el mismo guion**, `construir.sh`, que arma en
`_site/` solo lo que es el sitio público.

| Destino | Para qué | Dominio |
|---|---|---|
| GitHub Pages | Vista previa. Lleva `noindex` inyectado | `helgarpalmieri55.github.io` |
| **Cloudflare Pages** | **El sitio de verdad** | **kalamarata.com** (GoDaddy → Cloudflare) |

---

## Cloudflare, paso a paso

Verificado contra la documentación de Cloudflare el 21/09/2026.

### Aviso: el panel ya no lleva a Pages

Al conectar un repositorio nuevo, Cloudflare mete el proyecto en **Workers**, no
en Pages. Se reconoce porque la pantalla dice «Configure your **Worker**
project», pide un **Deploy command** (`npx wrangler deploy`) y **no tiene la
casilla «Build output directory»**.

Eso cambia una cosa importante: **Workers necesita `wrangler.jsonc` en el
repositorio** para saber qué carpeta publicar. Ya está puesto en la raíz. Pages
no lo necesitaba, pero Pages ya no es lo que ofrece el panel por defecto.

Las dos rutas funcionan para este sitio. Abajo va la de Workers, que es la que
da el panel; al final, cómo volver a Pages si se prefiere.

### 1. Crear la aplicación

1. Panel de Cloudflare → **Workers & Pages** → **Create** → **Connect to Git**.
2. Autoriza GitHub. Puedes darle acceso solo a `paginaweb-kalamarata`.
3. Elige el repositorio.

### 2. La pantalla «Set up your application»

| Casilla | Valor | Por qué |
|---|---|---|
| **Project name** | `kalamarata` | **Tiene que coincidir con el `name` de `wrangler.jsonc`.** Si no, la construcción falla |
| **Build command** | `bash construir.sh` | Arma `_site/` con solo lo publicable |
| **Deploy command** | `npx wrangler deploy` | Lo que trae por defecto; se deja |
| **Builds for non-production branches** | a gusto | Si se desmarca, solo construye `main` |
| **Protect with Cloudflare Access** | apagado | El sitio es público |
| **Path** (Advanced) | `/` | La raíz del repositorio |
| **API token** | *Create new token* | Lo crea solo |
| **Variable name / value** | vacías | El sitio no usa variables |

### 3. `wrangler.jsonc` tiene que estar en `main` ANTES de desplegar

La construcción lee la rama de producción. Si se pulsa **Deploy** antes de que
el archivo esté en `main`, el despliegue falla con un error de configuración
—no es un fallo del panel—. Basta con volver a lanzar la construcción cuando ya
esté.

### Si la construcción falla con «jekyll build»

Síntoma exacto, visto el 21/09/2026:

```
Detected Project Settings:
 - Framework: Static
 - Build Command: npx bundle exec jekyll build
[build] npm error could not determine executable to run
✘ [ERROR] Running custom build `npx bundle exec jekyll build` failed.
```

**No es un fallo de `construir.sh`** —en ese mismo log se ve `_site listo: 180
archivos` justo antes—. Lo que pasó es que `wrangler deploy` **no encontró
`wrangler.jsonc` en la rama de producción**, así que arrancó su
autoconfiguración, vio el `_config.yml` de la raíz, dedujo «esto es Jekyll» e
intentó construirlo con Ruby, que no está en la imagen.

**La cura es fusionar primero.** La construcción clona `main`: si
`wrangler.jsonc` solo está en una rama, es como si no existiera. Con el archivo
en `main`, wrangler no adivina nada y publica `_site/` directamente.

El `_config.yml` se queda: protege de que GitHub Pages publique la rama entera,
que es una fuga silenciosa. Una construcción fallida, en cambio, se ve.

### El 307 de las páginas es normal, y NO hay que «arreglarlo»

Comprobado el 21/09/2026 sobre el sitio vivo:

```
/            -> 200
/carta.html  -> 307 hacia /carta  -> 200
/carta       -> 200
```

Workers quita el «.html» por su cuenta: es su esquema de URL canónica, y viene
de `html_handling`, cuyo valor por defecto es `auto-trailing-slash`. El sitio
funciona; el coste es un salto por enlace.

**Tienta poner `"html_handling": "none"` para quitarlo. No lo hagas.** Esa
opción apaga también el mapeo de `/` a `index.html`, así que **la portada
empezaría a devolver la página de 404**. Un salto de más es barato; la página
principal caída, no.
<https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/>

Si algún día molesta de verdad, la salida es cambiar los enlaces internos y el
`sitemap.xml` a las URL sin extensión —pero entonces dejan de funcionar en la
vista previa de GitHub Pages, que sí sirve `/carta.html` directo—. Es un
intercambio, no una mejora gratis.

### 4. Comprobar ANTES de apuntar el dominio

Cloudflare da una URL `…workers.dev`. Compruébala:

```bash
# Debe dar 404. Si da 200, se está publicando la raíz del repositorio.
curl -s -o /dev/null -w '%{http_code}\n' https://<tu-url>.workers.dev/PENDIENTES.md

# Debe dar 200.
curl -s -o /dev/null -w '%{http_code}\n' https://<tu-url>.workers.dev/carta.html
```

**No pases al paso 5 hasta que el primero dé 404.**

### 5. El dominio propio

Con el proyecto abierto: **Settings → Domains & Routes → Add → Custom domain**,
y escribe `kalamarata.com`. Como el dominio ya es zona de Cloudflare, el
registro DNS se crea solo. Repite con `www.kalamarata.com`.

### 6. A partir de ahí

Cada `git push` a `main` construye y despliega. Nada más que hacer.

### Si se prefiere Pages

Sigue existiendo: **Workers & Pages → Create → Pages → Connect to Git**. Ahí las
casillas son **Build command** `bash construir.sh` y **Build output directory**
`_site`, y `wrangler.jsonc` se ignora. Es más simple de explicar; Workers es
donde Cloudflare está invirtiendo. Para un sitio estático como este, da igual.

### Lo que Cloudflare NO lleva

El paso de `noindex` es **solo** para la vista previa de github.io, y vive en el
workflow, no en `construir.sh`. Cloudflare publica el `robots.txt` del
repositorio, que permite la indexación: kalamarata.com **tiene** que ser
indexable, porque es la prueba de que el negocio existe para la verificación de
Meta.

### Pendiente: el caché

Los recursos se sirven sin marca de versión, así que un visitante que vuelve
puede recibir el CSS y el JS viejos. Se arregla con un archivo `_headers` dentro
de `_site/`; no está puesto todavía.

**Fuentes** (consultadas el 21/09/2026):
<https://developers.cloudflare.com/workers/static-assets/>,
<https://developers.cloudflare.com/workers/ci-cd/builds/>,
<https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/>,
<https://developers.cloudflare.com/pages/get-started/git-integration/>,
<https://developers.cloudflare.com/pages/configuration/custom-domains/>

---

# Publicación en GitHub Pages (la vista previa)

El sitio se publica solo cuando entra código en `main` — es decir, **cuando tú
haces merge del pull request**. No se publica desde ramas ni desde el propio PR.

El workflow es `.github/workflows/pages.yml`.

---

## Un paso manual, una sola vez

Esto no lo puede hacer el código: hay que tocarlo en la interfaz de GitHub.

1. Abre **Settings → Pages** del repositorio.
2. En **Source**, elige **GitHub Actions**. No «Deploy from a branch».
3. Guarda.

**Esto ya falló una vez, así que conviene leerlo con cuidado.** Si se deja
«Deploy from a branch», el workflow corre, construye y **reporta éxito** —
pero GitHub publica la rama `main` entera y el artefacto del workflow se
ignora. El resultado observado el 21/09/2026 fue:

- `PENDIENTES.md` y `PRODUCT.md` servidos públicamente
- `test` y `DEPLOY.md` servidos públicamente
- Cero etiquetas `noindex` en las páginas

Cómo saber en qué modo estás sin entrar a los ajustes: si en la pestaña
**Actions** aparece un workflow llamado **«pages build and deployment»** que tú
no escribiste, Pages está en modo rama. Con Source = «GitHub Actions» solo
corre «Publicar en GitHub Pages».

Otra comprobación rápida, desde fuera:

```bash
curl -s -o /dev/null -w '%{http_code}\n' \
  https://helgarpalmieri55.github.io/paginaweb-kalamarata/PENDIENTES.md
```

`404` es lo correcto. `200` significa que se está publicando la rama.

Hay una red de seguridad en `_config.yml`: si Pages publica la rama, Jekyll lee
ese archivo y su lista `exclude` deja fuera la documentación interna. **Pero no
puede añadir el noindex**, que solo existe en el paso del workflow. Es una
mitigación parcial, no un sustituto del ajuste.

Después del primer merge, la dirección será:

```
https://helgarpalmieri55.github.io/paginaweb-kalamarata/
```

## Qué se publica y qué no

Se publica una **lista explícita**, no una lista de exclusiones, para que nada
nuevo acabe en internet por descuido:

- Las 6 plantillas (`index`, `carta`, `donde-estamos`,
  `politica-de-datos`, `terminos`, `404`)
- `assets/` (estilos, scripts, imágenes, tipografías) y `data/carta.json`
- `favicon.ico`, `robots.txt`, `sitemap.xml`

**No** se publica: `.claude/` (18 MB de la skill de diseño), `.impeccable/`,
ni `PRODUCT.md`, `DESIGN.md` y `PENDIENTES.md`, que son documentación interna
—`PENDIENTES.md` además dice en voz alta qué datos del negocio faltan—.

Lo publicado pesa **832 KB**.

## La vista previa NO se indexa, a propósito

El workflow inyecta `<meta name="robots" content="noindex, nofollow">` en las
6 plantillas y sustituye `robots.txt` por un `Disallow: /`, **solo en la copia que
se publica**. El código del repositorio queda tal cual, listo para el dominio
propio.

Esto es deliberado y conviene entender por qué antes de quitarlo:

- `github.io` **no es el dominio del negocio**. Todo el objetivo del §1 del
  spec es que Meta encuentre un sitio en el dominio de Kalamarata. Una copia
  indexada en otro dominio compite con el sitio real.
- La vista previa muestra los marcadores `PENDIENTE_RAZON_SOCIAL`,
  `PENDIENTE_NIT` y compañía. Eso no debería salir en una búsqueda.

**Para quitarlo** cuando el sitio sea el definitivo: borra el paso
«Marcar la vista previa como no indexable» del workflow, entero.

## Lo que el workflow comprueba antes de publicar

Si algo de esto falla, no se publica nada y el sitio anterior sigue en pie:

- Que existan `index.html`, `data/carta.json`, el CSS, el JS y el logo
- Que `carta.json` sea JSON válido
- Que **todos** los recursos referenciados en el HTML existan de verdad en lo
  que se va a subir

## Dominio propio

Cuando exista el dominio del negocio:

1. **Settings → Pages → Custom domain**, escribe el dominio y activa
   **Enforce HTTPS**.
2. En el DNS del dominio, apunta a GitHub Pages.
3. Añade un archivo `CNAME` en la raíz del repositorio con el dominio dentro.
4. Borra el paso de noindex del workflow.
5. Haz lo que dice `PENDIENTES.md` §3: dominio real en `robots.txt` y
   `sitemap.xml`, `<link rel="canonical">` en las 5 páginas, y `og:image` y
   `og:url` absolutos.

## Una limitación que conviene saber

En un sitio de proyecto (`usuario.github.io/repositorio/`), los rastreadores
leen `github.io/robots.txt`, **no** el que sirve el repositorio. Mientras la
vista previa viva ahí, el `robots.txt` publicado no manda: quien manda es la
etiqueta `noindex` de cada página, que sí se respeta. Con dominio propio deja
de ser un problema.
