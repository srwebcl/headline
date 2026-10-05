# Sitio web Headline

Next.js 16 (App Router, 100% estático) + Tailwind v4. Diseño editorial inspirado en parla.cl; contenido según
el documento maestro *HEADLINE, Arquitectura y copywriting del sitio web* (no incluido en el repo).

Requiere Node 20+.

```bash
cp .env.example .env.local   # completar RESEND_API_KEY para el formulario
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Todo el texto (capacidades, casos, equipo, clientes, contacto) | `src/data/content.ts` |
| Colores, tipografía, tonos de bloque (claro / oscuro / lila), animaciones | `src/app/globals.css` |
| Logos de clientes y reconocimientos (máscaras monocromas) | `public/logos/`, generados con `node scripts/process-logos.mjs` (requiere la carpeta de logos originales `../Logos Clientes`, fuera del repo) |
| Logo Headline (color y versión para fondo oscuro) | `public/brand/` |
| Fotografía (provisoria, Unsplash vía Picsum, uso libre) | `public/images/` |
| Formulario de contacto (server action + Resend) | `src/app/contacto/` |

## Agregar contenido

- **Insight:** agregar un objeto al arreglo `insights` en `content.ts` (imagen en `public/insights/`). Aparece en Home, `/insights`, su página y el sitemap. Los 6 actuales vienen de headline.cl/blog.
- **Equipo:** en `team` (10 personas) reemplazar los 8 espacios `pending: true` por `name`, `role` y `photo` (retrato vertical 4:5 en `public/team/`). Las fotos de las socias se agregan con `photo` en `leadership`.
- **Redirecciones:** las URLs del sitio actual (`/la-agencia`, `/blog`, `/post/...`, etc.) redirigen con 301 a las nuevas; ver `next.config.ts`.
- **Logo nuevo:** copiarlo a la carpeta de clientes, sumarlo a `LOGOS` en `scripts/process-logos.mjs`, correr el script y usar su slug en `industries`.

## Pendientes antes de publicar (checklist del documento, sección 21)

Buscar `TODO` en el código. Principales:

- Validar autorización de uso de logos (faltan Snap, Clínica Bersant y Focco).
- Confirmar oficina (el sitio actual dice 915 y 916), WhatsApp corporativo y dominio en `site.url`.
- Retratos de las socias y nombre, cargo y foto de los 8 integrantes del equipo ampliado.
- Fecha/fuente del claim Marca Ciudadana / Merco (caso Laboratorio Chile).
- Reemplazar fotografía provisoria por fotografía documental propia.
- Configurar `RESEND_API_KEY` (ver `.env.example`) y revisar la política de privacidad con asesoría legal.
