# Publicación del sitio

Hay dos destinos y **los dos usan el mismo guion**, `construir.sh`, que arma en
`_site/` solo lo que es el sitio público.

| Destino | Para qué | Dominio |
|---|---|---|
| GitHub Pages | Vista previa. Lleva `noindex` inyectado | `helgarpalmieri55.github.io` |
| **Cloudflare Pages** | **El sitio de verdad** | **kalamarata.com** (GoDaddy → Cloudflare) |

---

## Cloudflare Pages, paso a paso

Verificado contra la documentación de Cloudflare el 21/09/2026:
<https://developers.cloudflare.com/pages/get-started/git-integration/> y
<https://developers.cloudflare.com/pages/configuration/custom-domains/>.

### 1. Crear el proyecto

1. Entra al panel de Cloudflare y abre **Workers & Pages**.
2. **Create application → Pages → Connect to Git**.
3. Inicia sesión en GitHub y autoriza. En **Install & Authorize** puedes darle
   acceso solo a `paginaweb-kalamarata`; no hace falta darle todos los
   repositorios.
4. Elige `helgarpalmieri55/paginaweb-kalamarata` y pulsa **Begin setup**.

### 2. Las casillas de construcción

Esta es la pantalla que importa. **Si estas dos se quedan en blanco, Cloudflare
sirve el repositorio ENTERO** y publica `PENDIENTES.md`, `PRODUCT.md`,
`DESIGN.md`, `DEPLOY.md` y `.claude/` — con el NIT, la cédula del dueño y el
código del certificado dentro. Es el mismo fallo que ya ocurrió aquí con GitHub
Pages en modo «Deploy from a branch» el 21/09/2026.

| Casilla | Valor |
|---|---|
| **Project name** | `kalamarata` (genera `kalamarata.pages.dev`) |
| **Production branch** | `main` |
| **Build command** | `bash construir.sh` |
| **Build output directory** | `_site` |
| **Root directory (advanced)** | *dejar vacío* |
| **Environment variables** | ninguna |

Pulsa **Save and Deploy**. El primer despliegue tarda un par de minutos.

`construir.sh` solo necesita `bash` y `python3`, y la imagen de construcción de
Cloudflare (v3, Ubuntu 22.04) trae Python 3.13 por defecto, así que no hay que
fijar versión ni añadir `.python-version`.

### 3. Comprobar ANTES de apuntar el dominio

Cuando termine, Cloudflare te da una URL `…pages.dev`. Compruébala:

```bash
# Debe dar 404. Si da 200, las casillas del paso 2 están mal.
curl -s -o /dev/null -w '%{http_code}\n' https://kalamarata.pages.dev/PENDIENTES.md

# Debe dar 200.
curl -s -o /dev/null -w '%{http_code}\n' https://kalamarata.pages.dev/carta.html
```

**No pases al paso 4 hasta que el primero dé 404.**

### 4. El dominio propio

El dominio ya está en Cloudflare (nameservers apuntados desde GoDaddy), así que
esto es lo corto:

1. **Workers & Pages → kalamarata → Custom domains → Set up a domain**.
2. Escribe `kalamarata.com` y confirma. Al ser ya una zona de Cloudflare, **el
   registro DNS se crea solo**; no hay que tocar nada a mano.
3. Repite con `www.kalamarata.com`. Ahí Cloudflare crea un `CNAME` hacia
   `kalamarata.pages.dev`.

**No crees el CNAME a mano en el DNS sin hacer antes el paso 1.** La
documentación de Cloudflare avisa de que añadir el registro por tu cuenta sin
asociar primero el dominio al proyecto hace que el dominio no resuelva.

Para que `www` lleve al dominio sin `www` (o al revés, como prefieras), se hace
con una **Redirect Rule** en la sección **Rules** de la zona.

### 5. A partir de ahí

Cada `git push` a `main` dispara una construcción y un despliegue nuevos. No hay
que hacer nada más.

Las ramas distintas de `main` generan **vistas previas** en URLs propias. Son
públicas si alguien acierta la URL; si eso molesta, se apagan en
**Settings → Builds & deployments → Preview deployments**.

### 6. Dos cosas que conviene mirar después

**El caché.** Los recursos se sirven sin marca de versión, así que un visitante
que vuelve puede recibir el CSS y el JS viejos. En Cloudflare se arregla con un
archivo `_headers`; no está puesto todavía.

**GitHub Pages sigue vivo.** La copia de `github.io` no estorba —lleva `noindex`
y `Disallow: /`, así que no compite con kalamarata.com— pero si quieres apagarla
del todo es **Settings → Pages → Source = None** en GitHub.

### Lo que Cloudflare NO lleva

El paso de `noindex` es **solo** para la vista previa de github.io, y vive en el
workflow, no en `construir.sh`. Cloudflare publica el `robots.txt` del
repositorio, que permite la indexación: kalamarata.com **tiene** que ser
indexable, porque es la prueba de que el negocio existe para la verificación de
Meta.

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
