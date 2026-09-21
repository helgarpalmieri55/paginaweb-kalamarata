# Lo que falta antes de publicar y de mandar a verificar

Esta lista es la del §8 del spec, aterrizada a lo que de verdad falta en este
repositorio. Está ordenada por lo que bloquea: lo de arriba bloquea lo de abajo.

Cada marcador `PENDIENTE_*` aparece **visible en rojo** en las páginas, para que
sea imposible publicar el sitio sin darse cuenta de que falta.

---

## 1. Datos que hay que pedirle al dueño

Sin estos no se manda la verificación de empresa de Meta.

| Marcador | Qué es | Dónde sale |
|---|---|---|
| `PENDIENTE_RAZON_SOCIAL` | Razón social **exacta**, carácter por carácter, como aparece en el Certificado de Cámara de Comercio | Pie de las 6 páginas, bloque de identidad del inicio, y ambos textos legales |
| `PENDIENTE_NIT` | NIT del negocio | Igual |
| `PENDIENTE_CORREO_CORPORATIVO` | Correo en el dominio propio, p. ej. `contacto@…` | Pie de las 6 páginas, inicio, contacto |
| `PENDIENTE_DOMINIO` | Dominio propio **a nombre del negocio**, no del proveedor | `robots.txt`, `sitemap.xml` |
| `PENDIENTE_CORREO_DATOS` | Buzón para solicitudes de datos personales | Política de datos, contacto |
| `PENDIENTE_RESPONSABLE_DATOS` | Persona que atiende esas solicitudes dentro de los plazos de ley | Política de datos |
| `PENDIENTE_DIRECCION_NOTIFICACIONES` | Dirección de notificaciones judiciales | Política de datos |
| `PENDIENTE_FECHA_VIGENCIA` | Fecha desde la que rigen los textos legales | Política de datos, términos |
| `PENDIENTE_DECISION_PROMOCIONES` | Si el restaurante va a enviar publicidad. Es un permiso distinto del de atender el pedido | Política de datos |

Además, sin marcador en el código pero igual de bloqueantes:

- **Un teléfono que pueda recibir el código de Meta**, y alguien avisado de que
  va a entrar una llamada o un SMS. El 311 428 0292 lo contesta quien esté en
  caja.
- **Confirmar quién es administrador del portafolio comercial** y su usuario de
  Facebook. Solo un administrador puede completar la verificación.
- **La dirección como figura en el documento.** Usamos «Calle 72 #61 esquina»,
  que es lo que dice la carta impresa. Si el certificado dice otra cosa,
  rechazan la verificación.

## 2. Archivos que faltan

- **El logo**, en PNG con fondo transparente o SVG. La cabecera usa hoy el
  nombre compuesto con tipografía. Al llegar, reemplazar en `.marca` de las 6
  páginas y rehacer `favicon.svg`, que hoy es una K provisional.
- **Fotografías propias** de los platos y del local. Las 8 imágenes de
  `assets/img/` son generadas por IA y salen marcadas «Imagen de referencia»;
  ver `assets/img/PROCEDENCIA.md`.

## 3. Cuando exista el dominio

- [ ] Poner el dominio real en `robots.txt` (descomentar la línea `Sitemap:`) y
      en `sitemap.xml`.
- [ ] Añadir `<link rel="canonical">` a las 6 páginas. **Hoy no está a
      propósito**: un canonical apuntando a un dominio inexistente desindexa el
      sitio en silencio, mientras que su ausencia no hace daño.
- [ ] Añadir `og:image` y `og:url` absolutos.
- [ ] Comprobar que el sitio carga por HTTPS sin advertencias.
- [ ] Probarlo en **ventana de incógnito**: sin sesión, sin caché y sin 404.

## 4. Enganche con el asistente de WhatsApp

- [ ] Escribir la URL de la política publicada en `business_info.privacy_policy_url`
      del tenant. El bot ya la nombra al pedir la autorización, pero hoy no la
      puede enlazar. Ese campo no tiene casilla en el panel: se pone a mano.
- [ ] Cargar el logo en `Tenant.logo`.
- [ ] Acordar cómo se mantienen sincronizados los precios de `data/carta.json`
      con el catálogo del bot. Hoy son dos copias: en la primera subida de
      precios se separan, y el que queda mal es el bot.

## 5. Coherencia que Meta compara

Esto se revisa al final, cuando ya estén los datos de arriba:

- [ ] Nombre en la web = nombre en el formulario de Meta = nombre en el documento
- [ ] Dirección en la web = dirección en el formulario = dirección en el documento
- [ ] Teléfono en la web = teléfono en el formulario
- [ ] El display name que se pida ante Meta se lee igual que el nombre de la web

---

## Lo que ya está hecho y verificado

- [x] La dirección física aparece en texto, no dentro de una imagen
- [x] El teléfono aparece en texto, en las 6 páginas
- [x] Los horarios coinciden con los que contesta el bot (confirmados por el cliente)
- [x] La política de datos y los términos están escritos y abren
- [x] La carta no ofrece alcohol por canales digitales, y lo dice explícitamente
- [x] El botón de WhatsApp abre el chat con el número correcto y texto prellenado
- [x] El sitio se ve bien a 390 px, sin desborde horizontal
- [x] Contraste WCAG AA (4.5:1) en tema claro y oscuro
- [x] El sitio es indexable: `robots.txt` lo permite explícitamente
