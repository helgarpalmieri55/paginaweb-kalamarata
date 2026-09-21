# Publicación en GitHub Pages

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

- Las 7 páginas (`index`, `carta`, `donde-estamos`, `contacto`,
  `politica-de-datos`, `terminos`, `404`)
- `assets/` (estilos, scripts, imágenes, tipografías) y `data/carta.json`
- `favicon.ico`, `robots.txt`, `sitemap.xml`

**No** se publica: `.claude/` (18 MB de la skill de diseño), `.impeccable/`,
ni `PRODUCT.md`, `DESIGN.md` y `PENDIENTES.md`, que son documentación interna
—`PENDIENTES.md` además dice en voz alta qué datos del negocio faltan—.

Lo publicado pesa **832 KB**.

## La vista previa NO se indexa, a propósito

El workflow inyecta `<meta name="robots" content="noindex, nofollow">` en las
7 páginas y sustituye `robots.txt` por un `Disallow: /`, **solo en la copia que
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
   `sitemap.xml`, `<link rel="canonical">` en las 6 páginas, y `og:image` y
   `og:url` absolutos.

## Una limitación que conviene saber

En un sitio de proyecto (`usuario.github.io/repositorio/`), los rastreadores
leen `github.io/robots.txt`, **no** el que sirve el repositorio. Mientras la
vista previa viva ahí, el `robots.txt` publicado no manda: quien manda es la
etiqueta `noindex` de cada página, que sí se respeta. Con dominio propio deja
de ser un problema.
