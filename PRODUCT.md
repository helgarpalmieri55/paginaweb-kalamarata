# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step, no backend, no CMS. Set by the project spec
(`docs/spec-web-kalamarata.md`, §5): the site changes about twice a year, so a
CMS would be one more server to maintain and one more door to secure. The order
cart is client-side only and hands off to WhatsApp.

## Users

**Primary: a hungry person in Barranquilla, on a phone.** Reaches the site at
lunch (11:00–15:00, looking for the almuerzo del día) or at night (16:00 on,
looking for pizza, salchipapa or hamburguesa). Hot city, one hand on the phone,
low patience. The job is: see what there is, see what it costs, and get the
order to the restaurant without typing the whole thing out.

**Secondary: a Meta reviewer.** Not a customer — a person or system checking
that this business exists before approving WhatsApp Business verification. They
read the legal name, the physical address and the phone, in text. This audience
is why the site exists at all (spec §1, Objetivo B), and when the two conflict,
this one wins.

## Product Purpose

Public, indexable website for Kalamarata, a restaurante bar y pizzería in
Barranquilla, so that (A) customers can assemble an order and send it over
WhatsApp, and (B) Meta has something verifiable to check against the business's
registration documents.

Success: an order message that arrives in WhatsApp already written, and a site
whose legal name, address and phone match the Cámara de Comercio certificate
character for character.

## Positioning

A single-location Caribbean kitchen with an unusually wide range: mojarra frita
and salmón next to salchipapas, chuzos, mazorca desgranada, pizza, hamburguesas
and perros calientes. 172 items across 22 categories is the product truth — not
a focused menu. The site's structural problem is navigating that breadth on a
390px screen, not filling space.

## Operating Context

- Orders are taken over WhatsApp at **+57 311 428 0292**, by an automated
  assistant. The site does not take payment and does not store orders.
- The restaurant also runs an existing token-gated web menu
  (`noindex, nofollow`) opened from inside the chat. That is a different
  artifact. **This public site never links to it** — those links are
  single-use secrets (spec §6).
- Delivery covers up to 6 km from the restaurant. Beyond that, no coverage.
- Alcohol is served **in the restaurant only**. It is not sold over WhatsApp or
  delivered, because Meta's commerce policy forbids selling alcohol over the
  channel. The site must show the bar exists and show that it is not orderable.

## Capabilities and Constraints

Confirmed and usable:

| Fact | Value |
|---|---|
| Commercial name | Kalamarata — Restaurante Bar · Pizzería |
| City | Barranquilla, Colombia |
| Address | Calle 72 #61 esquina |
| Phone / WhatsApp | +57 311 428 0292 |
| Instagram | @kalamaratapizzeria |
| Locations | One |
| Timezone | America/Bogota |
| Language | es-CO |
| Lunch service | Mon–Sat 11:00–15:00. **No lunch on Sunday** |
| Pizzeria service | Sun–Thu 16:00–22:00 · Fri–Sat 16:00–23:00 |
| Almuerzo del día | Mon arroz mixto · Tue chuleta valluna · Wed pollo cordon bleu · Thu bandeja paisa · Fri carne en posta · Sat chicken tenders |
| Delivery | ≤1,5 km $4.000 / 30 min · ≤3 km $8.000 / 45 min · ≤6 km $12.000 / 60 min · >6 km no coverage · **no minimum order** |
| Payment | Efectivo, Nequi, Daviplata, llave. No card details over chat |
| Pizza sizes | Personal (6 slices) · Small (8) · Medium (12) · Large (16) |
| Tables for reservation | 15 |

**Undecided / missing — must not be invented.** These block Meta verification
(spec §3.1) and are shipped as visible `PENDIENTE_*` placeholders:

- Legal name (razón social) exactly as on the Cámara de Comercio certificate
- NIT
- Registered address, if it differs from the street address above
- Own domain in the business's name, and a corporate email on that domain
- Logo file and brand colors
- Own photographs of food and the restaurant
- Data-protection contact channel and the person answering it

## Brand Commitments

- The name is **Kalamarata** (from *calamar*). The existing printed menu uses a
  shrimp/calamar mascot character, an orange-and-green wordmark, and a
  wood-plus-parchment background.
- This is Kalamarata's identity, **not Novieri's**. Novieri is the technology
  provider; its palette and logo have no place here (spec §1).
- Voice: Spanish of the Colombian Caribbean coast. Plain, warm, no emoji.
- The printed menu is evidence of what the business is, not authority over what
  the site becomes.

## Evidence on Hand

**Real and usable:** four photographs of the current printed menu, supplied by
the client. These are the primary source for every item and price on the site,
and they independently corroborate the phone number, address, Instagram handle,
pizza sizes and daily specials.

**Asserted by the spec but not independently verifiable in this session:**
opening hours, delivery tariffs, payment methods, table count, the restaurant's
coordinates and the alcohol policy. The spec cites a repository
(`backend/app/seeds/kalamarata.py` and neighbors) that is not reachable from
here — `helgarpalmieri55/Novieri` contains no such file and no occurrence of
"kalamarata". **The client confirmed these facts directly**, which is what they
now rest on.

**Absent — must not be fabricated:** any photograph of Kalamarata's food or
premises. The food photos in the provider's repository are borrowed from
another restaurant's public menu and cannot be published here. The site is
therefore designed to work with type and price alone.

## Product Principles

1. **Verifiability outranks beauty.** Legal name, address and phone appear as
   selectable text on every page, in the footer, even when it costs the
   composition. An address inside a JPG does not exist to a reviewer.
2. **Never invent a business fact.** A missing datum ships as a visible
   placeholder, never as a plausible guess. A wrong NIT is worse than an
   obvious blank.
3. **The site and the bot must say the same thing.** Prices, hours and delivery
   tariffs that disagree with the assistant turn into an argument at the
   counter.
4. **Show the bar, don't sell it.** Alcohol is visible and explicitly marked as
   in-restaurant only.
5. **390px is the real screen.** Everything is decided for a phone held in one
   hand in the street, and allowed to expand from there.

## Accessibility & Inclusion

Spanish (es-CO) throughout. Text contrast at WCAG AA. The whole ordering path —
browse, add, review, send — works by keyboard and with a screen reader, and
every price is real text, never an image.
