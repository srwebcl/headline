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

- **Insight:** agregar un objeto al arreglo de artículos en `content.ts` (imagen en `public/insights/`). El orden no importa: se ordenan por fecha y el más reciente queda destacado en el Home. Ver "Publicar un artículo" más abajo.
- **Equipo:** `leadership` (socias, con biografía) y `team` (todo el equipo) en `content.ts`. Retratos verticales 3:4 en `public/team/` (WebP, ~720×960; socias 1050×1400).
- **Redirecciones:** las URLs del sitio actual (`/la-agencia`, `/blog`, `/post/...`, etc.) redirigen con 301 a las nuevas; ver `next.config.ts`.
- **Logo nuevo:** copiarlo a la carpeta de clientes, sumarlo a `LOGOS` en `scripts/process-logos.mjs`, correr el script y usar su slug en `industries`.

## Pendientes antes de publicar (checklist del documento, sección 21)

Buscar `TODO` en el código. Principales:

- Validar autorización de uso de logos (faltan Snap, Clínica Bersant y Focco).
- Confirmar oficina (el sitio actual dice 915 y 916), WhatsApp corporativo y dominio en `site.url`.
- Fecha/fuente del claim Marca Ciudadana / Merco (caso Laboratorio Chile).
- Reemplazar fotografía provisoria por fotografía documental propia.
- Configurar `RESEND_API_KEY` (ver `.env.example`) y revisar la política de privacidad con asesoría legal.

## SEO y GEO (buscadores con IA)

Todo lo de SEO vive en `src/data/seo.ts`: títulos y descripciones de cada página, la descripción de la organización
y los datos estructurados (schema.org). Se genera automáticamente:

- **Datos estructurados:** organización (`ProfessionalService`) en todas las páginas, `Service` en cada servicio,
  `BlogPosting` en cada artículo, `Blog` en `/insights` y migas de pan (`BreadcrumbList`).
- **`/sitemap.xml`** con fechas e imágenes, **`/robots.txt`** (permite buscadores y asistentes de IA),
  **`/llms.txt`** (resumen del sitio para ChatGPT, Perplexity, Claude, Gemini) y **`/insights/rss.xml`**.
- **Imagen al compartir:** `public/og/headline.jpg` por defecto; los servicios y artículos usan su propia imagen.

Validar con el [Rich Results Test](https://search.google.com/test/rich-results) después de cambios grandes.

### Publicar un artículo

1. **Imagen:** WebP en `public/insights/`, idealmente horizontal (1600 px de ancho o más) y menos de 200 KB.
   El nombre del archivo debe describir el tema (`medicos-influencers-industria-farmaceutica.webp`).
2. **`slug`:** corto, en minúsculas, sin tildes y con las palabras clave (`gestion-crisis-redes-sociales`). No cambiarlo
   después de publicado (si cambia, agregar una redirección en `next.config.ts`).
3. **`title`:** el título visible. Si supera 60 caracteres, agregar `seoTitle` con una versión corta para Google.
4. **`excerpt`:** primer párrafo o resumen; es la descripción en Google. Si es muy largo o poco claro, agregar
   `seoDescription` (140 a 160 caracteres) que diga de qué trata y para quién.
5. **`keywords`:** 3 a 6 temas o búsquedas a las que responde el artículo.
6. **Cuerpo:** párrafos claros; usar subtítulos (`"## ..."`) cuando el texto sea largo. Los asistentes de IA citan
   mejor los textos que responden una pregunta concreta, con datos, ejemplos y una conclusión explícita.
7. **`updated`:** si más adelante se actualiza el contenido de forma relevante, poner la fecha (ISO).

El artículo aparece solo en el Home, `/insights`, el sitemap, el RSS y `/llms.txt`. Después de publicar, se puede pedir
la indexación en Google Search Console (Inspección de URLs).
