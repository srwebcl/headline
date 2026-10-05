// Normaliza los logos de clientes y reconocimientos a máscaras monocromas.
// Cada logo se aplana, se convierte a alpha según su oscuridad, se recorta y
// se exporta como PNG transparente de altura fija. En la web se usan como
// `mask-image`, así toman el color del tema (gris, lila en hover, modo oscuro).
//
// Uso: node scripts/process-logos.mjs
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const OUT = path.resolve(import.meta.dirname, "../public/logos");
const MANIFEST = path.resolve(import.meta.dirname, "../src/data/logos.json");
const HEIGHT = 140;

const C = "Logos Clientes ";
const R = "otros logos - reconocimiento";

/** [slug, nombre visible, archivo, opciones] */
const LOGOS = [
  // Salud
  ["labchile-teva", "Laboratorio Chile / Teva", `${C}/01 Salud/logo-labchile-teva.webp`],
  ["abbott", "Abbott", `${C}/01 Salud/Abbott_Laboratories_logo.svg`],
  ["merck", "Merck", `${C}/01 Salud/merck.jpg`],
  ["adium", "Adium", `${C}/01 Salud/Adium-1.png`],
  ["virbac", "Virbac", `${C}/01 Salud/Virbac.png`],
  ["zoetis", "Zoetis", `${C}/01 Salud/Zoetis_logo.svg.webp`],
  ["janssen", "Janssen", `${C}/01 Salud/janssen-logo.png`],
  ["jjmd", "Johnson & Johnson Medical Device", `${C}/01 Salud/LOGO_JJMD.jpg`],
  ["grunenthal", "Grünenthal", `${C}/01 Salud/Grünenthal_logo_green.png`],
  ["organon", "Organon", `${C}/01 Salud/Organon_Digital_FullColor_Logo-2.webp`],
  ["sanderson", "Sanderson", `${C}/01 Salud/sanderson.png`],
  ["boehringer", "Boehringer Ingelheim", `${C}/01 Salud/Boehringer_Ingelheim_Logo.svg.webp`],
  ["csl-behring", "CSL Behring", `${C}/01 Salud/CSLBehring_RGB_highres.jpg`],
  ["cien", "CIEN", `${C}/01 Salud/05cc77_c90f5949e558409a9e620c778864ed5a~mv2.png`],
  ["axon", "Axon Pharma", `${C}/01 Salud/logo-axon 1 png.webp`],
  // Minería e industrial
  ["ausenco", "Ausenco", `${C}/02 Minería e Industrial/ausenco-logo.webp`],
  ["jej", "JEJ", `${C}/02 Minería e Industrial/logo-blanco-300x129.png`, { lightOnTransparent: true }],
  ["gardilcic", "Constructora Gardilcic", `${C}/02 Minería e Industrial/Gardilcic.png`],
  ["sierra-gorda", "Sierra Gorda", `${C}/02 Minería e Industrial/WELCOME_RESOURCE-OFFER5237.png`],
  ["mas-errazuriz", "Mas Errázuriz", `${C}/02 Minería e Industrial/Logo-ME-Errazuriz-color-scaled.png`],
  ["geovita", "Geovita", `${C}/02 Minería e Industrial/6885_96.557.400-K.png`],
  ["joy-global", "Joy Global", `${C}/02 Minería e Industrial/Joy_Global_Logo.svg.webp`],
  ["yamana", "Yamana Gold", `${C}/02 Minería e Industrial/Logo_Yamana_Gold.svg`],
  // Construcción e inmobiliario
  ["irc", "IRC", `${C}/03 Construcción e inmobiliario/IRC.jpg`],
  ["fundamenta", "Fundamenta", `${C}/03 Construcción e inmobiliario/Logo-fundamenta.webp`],
  ["tecsa", "Tecsa", `${C}/03 Construcción e inmobiliario/tecsa.jpg`],
  ["paz", "Paz Froimovich", `${C}/03 Construcción e inmobiliario/Paz.png`],
  ["henkel", "Henkel", `${C}/03 Construcción e inmobiliario/Henkel-Logo.svg.webp`],
  // Tecnología
  ["ascenty", "Ascenty", `${C}/04 Tecnología/ascenty.png`],
  ["dynatrace", "Dynatrace", `${C}/04 Tecnología/Dynatrace.webp`],
  ["xerox", "Xerox", `${C}/04 Tecnología/Xerox_logo.svg`],
  ["vertiv", "Vertiv", `${C}/04 Tecnología/Vertiv_logo.svg.webp`],
  ["micron", "Micron", `${C}/04 Tecnología/Micron_Logo.png`],
  ["arcserve", "Arcserve", `${C}/04 Tecnología/Arcserve.jpg`],
  ["latamwin", "Latamwin", `${C}/04 Tecnología/clientes02.png`],
  ["kepler", "Kepler Data Recovery", `${C}/04 Tecnología/logo_sobreblanco_bajada_ALTA.png`],
  // Institucional
  ["union-europea", "Delegación de la Unión Europea", `${C}/05 institucional/images.png`, { lumOnly: true }],
  ["bcn", "Biblioteca del Congreso Nacional", `${C}/05 institucional/biblioteca congreso nacional.png`],
  ["itpo", "ITPO, Indian Trade Promotion Organisation", `${C}/05 institucional/india-trade-promotion-organisation-itpo-logo-vector-2023.png`],
  ["embajada-india", "Embajada de la India en Chile", `${C}/05 institucional/Embajada de la India en Chile.png`],
  // Ferias y entretenimiento
  ["oktoberfest", "Oktoberfest Chile", `${C}/06 Ferias y entretencion/oktoberfest.webp`],
  ["expo-mujer", "Expo Mujer", `${C}/06 Ferias y entretencion/expo mujer.png`],
  ["feria-naciones", "Feria de las Naciones", `${C}/06 Ferias y entretencion/Feria de las Naciones.jpg`],
  ["expo-reciclaje", "Expo Reciclaje", `${C}/06 Ferias y entretencion/expo_reciclables_logo_neu_14416.webp`],
  // Reconocimientos y alianzas
  ["leaders-league", "Leaders League", `${R}/LOGO leaders-league.png`],
  ["sello-transforma", "Sello Transforma", `${R}/Logo-Sello-Transforma-2024-292x300.png`],
  ["amcham", "AmCham Chile", `${R}/amcham-chile- logo.webp`, { lumOnly: true, floor: 0.3 }],
  ["pr-latam", "PR LATAM", `${R}/LOGO-PR-LATAM-COLOR-3.webp`],
];

async function toMask(file, { lightOnTransparent = false, lumOnly = false, floor = 0.08 } = {}) {
  const input = await sharp(path.join(ROOT, file), { density: 300 })
    .resize({ height: 800, withoutEnlargement: false, fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = input;
  const px = info.width * info.height;
  const alpha = Buffer.alloc(px);
  let max = 0;

  for (let i = 0; i < px; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3] / 255;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // Fondo blanco (o transparente) = vacío; tinta = oscuridad o saturación.
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    const ink = lightOnTransparent ? lum : lumOnly ? 255 - lum : Math.max(255 - lum, sat * 0.9);
    const v = ink * a;
    alpha[i] = v;
    if (v > max) max = v;
  }

  // Estira el contraste para que colores claros (amarillos, naranjos) sigan legibles.
  const k = max > 0 ? 255 / max : 1;
  for (let i = 0; i < px; i++) {
    const n = Math.min(1, (alpha[i] * k) / 255);
    alpha[i] = n < floor ? 0 : Math.round(Math.pow(n, 0.7) * 255);
  }

  const rgba = Buffer.alloc(px * 4);
  for (let i = 0; i < px; i++) {
    rgba[i * 4] = 20; rgba[i * 4 + 1] = 20; rgba[i * 4 + 2] = 24; rgba[i * 4 + 3] = alpha[i];
  }

  const trimmed = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer()
    .then((b) => sharp(b).trim({ threshold: 1 }).toBuffer());

  return sharp(trimmed).resize({ height: HEIGHT, fit: "inside" }).png({ compressionLevel: 9 });
}

await mkdir(OUT, { recursive: true });
await mkdir(path.dirname(MANIFEST), { recursive: true });

const manifest = {};
for (const [slug, name, file, opts] of LOGOS) {
  const img = await toMask(file, opts);
  const { width, height } = await img.toFile(path.join(OUT, `${slug}.png`));
  manifest[slug] = { name, src: `/logos/${slug}.png`, width, height };
  console.log(`${slug.padEnd(18)} ${width}x${height}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${Object.keys(manifest).length} logos -> public/logos`);
