#!/usr/bin/env bash
# Arma en _site/ SOLO lo que es el sitio público.
#
# Lo usan los dos destinos, y por la misma razón: tanto GitHub Pages en modo
# «Deploy from a branch» como Cloudflare Pages conectado a git publican el
# repositorio ENTERO si nadie les dice otra cosa. Eso ya pasó una vez aquí
# (PENDIENTES.md servido en público, 21/09/2026).
#
# En Cloudflare Pages:
#     Build command             bash construir.sh
#     Build output directory    _site
#
# Sin esas dos casillas, Cloudflare sirve la raíz del repositorio y se publican
# PENDIENTES.md, PRODUCT.md, DESIGN.md, DEPLOY.md y .claude/.
set -euo pipefail

rm -rf _site
mkdir -p _site

# Lista explícita, no exclusiones: así nada nuevo se publica por descuido.
cp index.html carta.html donde-estamos.html \
   politica-de-datos.html terminos.html 404.html \
   robots.txt sitemap.xml favicon.ico _site/
cp -r assets data _site/

# `cp -r assets` se lleva todo lo que haya dentro, y ahí vive
# assets/img/PROCEDENCIA.md, que es documentación interna.
find _site -name '*.md' -type f -print -delete

# Sin esto GitHub Pages pasa el sitio por Jekyll, que se salta cualquier
# archivo o carpeta que empiece por guion bajo. A Cloudflare no le estorba.
touch _site/.nojekyll

# --- Comprobaciones: mejor fallar aquí que publicar algo roto ---
test -s _site/index.html
test -s _site/data/carta.json
test -s _site/assets/css/kalamarata.css
test -s _site/assets/js/carta.js
test -s _site/assets/img/kalamarata-logo.webp
python3 -c "import json;json.load(open('_site/data/carta.json'))"

if find _site -name '*.md' -type f | grep -q .; then
  echo "Se cuela documentacion interna en el sitio:"
  find _site -name '*.md' -type f
  exit 1
fi

for prohibido in PENDIENTES.md PRODUCT.md DESIGN.md DEPLOY.md .claude .impeccable test; do
  if [ -e "_site/$prohibido" ]; then
    echo "NO debe publicarse y está en _site: $prohibido"
    exit 1
  fi
done

echo "_site listo: $(find _site -type f | wc -l) archivos, $(du -sh _site | cut -f1)"
