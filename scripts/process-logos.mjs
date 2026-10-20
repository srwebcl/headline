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
const N = "Material Nuevo/Logos restantes (clientes)";

/** [slug, nombre visible, archivo, opciones] */
const LOGOS = [
  // --- Salud ---
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
  ["astrazeneca", "AstraZeneca", `${N}/Salud/astrazeneca.png`],
  ["gsk", "GlaxoSmithKline", `${N}/Salud/Glaxo-SmithKline-PLC_company.png`],
  ["o-boticario", "O Boticário", `${N}/Salud/O Boticario.webp`],
  ["snab", "Snab", `${N}/Salud/Snab.png`],
  ["stiefel", "Stiefel", `${N}/Salud/Stiefel.png`],
  ["fundacion-san-cristobal", "Fundación Médica San Cristóbal", `${N}/Salud/clinica-fundacion-medica-san-cristobal-1582156729.png`],
  ["fundacion-aire", "Fundación Aire", `${N}/Salud/fundación aire.png`],
  ["garden-house", "Garden House", `${N}/Salud/garden house.png`],
  ["sochidiab", "SOCHIDIAB", `${N}/Salud/sochidiab.jpg`],

  // --- Minería, industria e infraestructura ---
  ["ausenco", "Ausenco", `${C}/02 Minería e Industrial/ausenco-logo.webp`],
  ["jej", "JEJ", `${C}/02 Minería e Industrial/logo-blanco-300x129.png`, { lightOnTransparent: true }],
  ["gardilcic", "Constructora Gardilcic", `${C}/02 Minería e Industrial/Gardilcic.png`],
  ["sierra-gorda", "Sierra Gorda", `${C}/02 Minería e Industrial/WELCOME_RESOURCE-OFFER5237.png`],
  ["mas-errazuriz", "Mas Errázuriz", `${C}/02 Minería e Industrial/Logo-ME-Errazuriz-color-scaled.png`],
  ["geovita", "Geovita", `${C}/02 Minería e Industrial/6885_96.557.400-K.png`],
  ["joy-global", "Joy Global", `${C}/02 Minería e Industrial/Joy_Global_Logo.svg.webp`],
  ["yamana", "Yamana Gold", `${C}/02 Minería e Industrial/Logo_Yamana_Gold.svg`],
  ["aeropuerto-diego-aracena", "Consorcio Aeropuerto Diego Aracena", `${N}/Industrial minería infraestructura/consorcio aeropuerto diego de Aracena.png`],
  ["sk-comsa", "SK Comsa", `${N}/Industrial minería infraestructura/SK COMSA.jpg`],
  ["comin", "Comin SAC", `${N}/Industrial minería infraestructura/comin_sac_logo.jpg`],
  ["eminic", "EMINIC", `${N}/Industrial minería infraestructura/EMINIC-logo-azul.png`],
  ["buffer", "Buffer", `${N}/Industrial minería infraestructura/Buffer.png`],
  ["aerotas", "Aerotas", `${N}/Industrial minería infraestructura/Aerotas.jpg`],

  // --- Construcción e inmobiliario ---
  ["irc", "IRC", `${C}/03 Construcción e inmobiliario/IRC.jpg`],
  ["fundamenta", "Fundamenta", `${C}/03 Construcción e inmobiliario/Logo-fundamenta.webp`],
  ["tecsa", "Tecsa", `${C}/03 Construcción e inmobiliario/tecsa.jpg`],
  ["paz", "Paz Froimovich", `${C}/03 Construcción e inmobiliario/Paz.png`],
  ["henkel", "Henkel", `${C}/03 Construcción e inmobiliario/Henkel-Logo.svg.webp`],
  ["absalon", "Absalón", `${N}/Construcción inmobiliaria falta/absalon espinosa.jpg`, { crop: 8 }],
  ["tres-l", "Inmobiliaria 3L", `${N}/Construcción inmobiliaria falta/3L.png`],
  ["engel-volkers", "Engel & Völkers", `${N}/Construcción inmobiliaria falta/Engel & Volkers.png`],
  ["construtec", "Construtec", `${N}/Construcción inmobiliaria falta/Construtec.png`, { darkBg: true }],
  ["basco", "Basco Arquitectura", `${N}/Construcción inmobiliaria falta/basco.png`],
  ["grupo-isa", "Grupo ISA", `${N}/Construcción inmobiliaria falta/grupo Isa.png`],
  ["ferbocar", "Ferbocar", `${N}/Construcción inmobiliaria falta/Ferbocar.jpg`],
  ["nexo", "Nexo Inmobiliaria", `${N}/Construcción inmobiliaria falta/nexo.jpg`],

  // --- Tecnología ---
  // Adobe primero en la lista como solicitó la agencia
  ["adobe", "Adobe", `${N}/Tecnología /adobe, poner de los primeros.png`],
  ["ascenty", "Ascenty", `${C}/04 Tecnología/ascenty.png`],
  ["dynatrace", "Dynatrace", `${C}/04 Tecnología/Dynatrace.webp`],
  ["xerox", "Xerox", `${C}/04 Tecnología/Xerox_logo.svg`],
  ["vertiv", "Vertiv", `${C}/04 Tecnología/Vertiv_logo.svg.webp`],
  ["micron", "Micron", `${C}/04 Tecnología/Micron_Logo.png`],
  ["arcserve", "Arcserve", `${C}/04 Tecnología/Arcserve.jpg`],
  ["latamwin", "Latamwin", `${C}/04 Tecnología/clientes02.png`],
  ["kepler", "Kepler Data Recovery", `${C}/04 Tecnología/logo_sobreblanco_bajada_ALTA.png`],
  ["nubox", "Nubox", `${N}/Tecnología /Nubox.png`],
  ["atrapalo", "Atrápalo", `${N}/Tecnología /Atrapalo.cl.jpg`],
  ["comscore", "Comscore", `${N}/Tecnología /comscore.png`],
  ["atentus", "Atentus", `${N}/Tecnología /atentus.jpg`],
  ["instituto-3ie", "Instituto 3IE", `${N}/Tecnología /3ie.jpg`],
  ["finfast", "Finfast", `${N}/Tecnología /finfast.png`],
  ["xentic", "Xentic", `${N}/Tecnología /xentic.png`],

  // --- Energía ---
  ["engie", "Engie", `${N}/Energía /Engie.png`],
  ["solarity", "Solarity", `${N}/Energía /Solariity.png`],
  ["cce", "CCE Generación", `${N}/Energía /CCE.jpeg`],

  // --- Automotriz ---
  ["scania", "Scania", `${N}/automotriz /Scania.png`],
  ["infiniti", "Infiniti", `${N}/automotriz /Infiniti.png`],
  ["gama-leasing", "Gama Leasing", `${N}/automotriz /Gama Leasing.png`, { lightOnTransparent: true }],

  // --- Consumo y servicios ---
  ["baker-mckenzie", "Baker McKenzie", `${N}/Consumo de servicios/Backet Mackenzie.webp`],
  ["sodexo", "Sodexo", `${N}/Consumo de servicios/Sodexo.png`],
  ["canal-13", "Canal 13", `${N}/Consumo de servicios/Canal 13.png`],
  ["triumph", "Triumph", `${N}/Consumo de servicios/Triumph.png`],
  ["flores", "Flores", `${N}/Consumo de servicios/Flores.png`],
  ["emma", "Emma The Sleep Company", `${N}/Consumo de servicios/Emma.jpg`],
  ["disal", "Disal", `${N}/Consumo de servicios/Disal.png`],
  ["kdm", "KDM Empresas", `${N}/Consumo de servicios/KDM grupo Urbaser Daner.png`],
  ["puerto-caldera", "Puerto Caldera", `${N}/Consumo de servicios/puerto caldera.jpg`],
  ["muelles-de-penco", "Muelles de Penco", `${N}/Consumo de servicios/muelles_de_penco_s_a_logo.jpg`],
  ["brunapoli", "Brunapoli", `${N}/Consumo de servicios/Brunapoli.jpg`],

  // --- Institucional ---
  ["union-europea", "Delegación de la Unión Europea", `${C}/05 institucional/images.png`, { lumOnly: true }],
  ["bcn", "Biblioteca del Congreso Nacional", `${C}/05 institucional/biblioteca congreso nacional.png`],
  ["itpo", "ITPO, Indian Trade Promotion Organisation", `${C}/05 institucional/india-trade-promotion-organisation-itpo-logo-vector-2023.png`],
  ["embajada-india", "Embajada de la India en Chile", `${C}/05 institucional/Embajada de la India en Chile.png`],
  ["municipalidad-iquique", "Ilustre Municipalidad de Iquique", `${N}/Industrial minería infraestructura/iquique.png`, { lightOnTransparent: true }],
  ["pnuma", "PNUMA", `${N}/Instituciones /PNUMA.jpg`],
  ["focco", "Focco", `${N}/logo focco.png`],

  // --- Ferias y entretenimiento ---
  ["oktoberfest", "Oktoberfest Chile", `${C}/06 Ferias y entretencion/oktoberfest.webp`],
  ["expo-mujer", "Expo Mujer", `${C}/06 Ferias y entretencion/expo mujer.png`],
  ["feria-naciones", "Feria de las Naciones", `${C}/06 Ferias y entretencion/Feria de las Naciones.jpg`],
  ["expo-reciclaje", "Expo Reciclaje", `${C}/06 Ferias y entretencion/expo_reciclables_logo_neu_14416.webp`],
  ["expo-india", "Expo India", `${N}/Eventos/Expoindia.jpg`],
  ["diwali", "Festival Diwali", `${N}/Eventos/Diwali.png`],
  ["grupo-security", "Grupo Security", `${N}/Eventos/Grupo Security.png`],
  ["seleccion-croacia", "Federación Croata de Fútbol", `${N}/Eventos/croatia-national-team-logo-footylogos-1200.webp`],

  // --- Reconocimientos y alianzas ---
  ["leaders-league", "Leaders League", `${R}/LOGO leaders-league.png`],
  ["sello-transforma", "Sello Transforma", `${R}/Logo-Sello-Transforma-2024-292x300.png`],
  ["amcham", "AmCham Chile", `${R}/amcham-chile- logo.webp`, { lumOnly: true, floor: 0.3 }],
  ["pr-latam", "PR LATAM", `${R}/LOGO-PR-LATAM-COLOR-3.webp`],
];

async function toMask(file, { lightOnTransparent = false, lumOnly = false, floor = 0.08, darkBg = false, crop = 0 } = {}) {
  let pipeline = sharp(path.join(ROOT, file), { density: 300 });
  if (crop > 0) {
    const meta = await pipeline.metadata();
    pipeline = sharp(path.join(ROOT, file), { density: 300 }).extract({
      left: crop,
      top: crop,
      width: meta.width - crop * 2,
      height: meta.height - crop * 2,
    });
  }
  const input = await pipeline
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
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    let ink;
    if (darkBg) {
      const diffFromBg = Math.sqrt(Math.pow(r - 19, 2) + Math.pow(g - 19, 2) + Math.pow(b - 19, 2));
      ink = Math.min(255, diffFromBg * 1.5 + sat);
    } else {
      ink = lightOnTransparent ? lum : lumOnly ? 255 - lum : Math.max(255 - lum, sat * 0.9);
    }
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
  console.log(`${slug.padEnd(25)} ${width}x${height}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${Object.keys(manifest).length} logos -> public/logos`);
