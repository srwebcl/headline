// Contenido del sitio, tomado de "HEADLINE - Arquitectura, estructura y
// copywriting integral del nuevo sitio web". Las páginas sólo componen.
// Antes de publicar revisar el checklist del documento (sección 21).

export const site = {
  name: "Headline",
  url: "https://www.headline.cl", // TODO: confirmar dominio definitivo
  tagline: "Consultoría estratégica en comunicaciones, crisis y reputación corporativa.",
  description:
    "Desde 2003 acompañamos a empresas e instituciones en desafíos de comunicación, reputación, liderazgo y relacionamiento.",
  // Datos tomados del sitio actual (headline.cl).
  // TODO(checklist): el sitio actual muestra "of 915" y "of 916"; confirmar. WhatsApp sólo si hay canal corporativo.
  contact: {
    email: "headline@headline.cl",
    phone: "+56 2 2232 1282",
    phoneHref: "tel:+56222321282",
    linkedin: "https://www.linkedin.com/company/headline-comunicaciones/",
    instagram: "https://www.instagram.com/headline_comunicaciones/",
    address: "San Sebastián 2807, oficina 915, Las Condes, Santiago",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=San+Sebasti%C3%A1n+2807+Las+Condes",
    whatsapp: null as string | null,
  },
};

export const nav = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Qué hacemos", href: "/que-hacemos" },
  { label: "Nuestro modelo", href: "/nuestro-modelo" },
  { label: "Clientes", href: "/clientes" },
  { label: "Casos", href: "/casos" },
  { label: "Insights", href: "/insights" },
];

export const CTA = { label: "Conversemos", href: "/contacto" };

/* ------------------------------------------------------------------ */
/* Capacidades                                                         */
/* ------------------------------------------------------------------ */

export type Capability = {
  slug: string;
  num: string;
  name: string;
  summary: string;
  title: string;
  body: string[];
  quote?: string;
  listLabel: "Soluciones" | "Enfoques";
  items: string[];
  closing: string;
  image: { src: string; alt: string };
};

export const capabilities: Capability[] = [
  {
    slug: "posicionamiento-reputacion",
    num: "01",
    name: "Posicionamiento y reputación corporativa",
    summary:
      "Construimos reputación y relaciones de confianza con las audiencias que influyen en el éxito de tu organización.",
    title: "Construimos reputación y relaciones de confianza donde realmente importan.",
    body: [
      "Nuestro foco es fortalecer la reputación y construir relaciones de confianza con las audiencias que influyen en el éxito de tu organización.",
      "Colaboramos estrechamente con nuestros clientes para involucrar a sus colaboradores, reforzar relaciones con consumidores, atraer inversionistas y alinearse con intereses públicos y gubernamentales.",
      "Diseñamos e implementamos acciones integradas y multicanales alineadas con objetivos de negocio para posicionar narrativas, fortalecer liderazgos y generar visibilidad en los espacios que realmente importan.",
    ],
    quote:
      "Con conocimiento y experiencia, damos solución a tus problemas y nos enfocamos en generar resultados cuantificables.",
    listLabel: "Soluciones",
    items: [
      "Auditoría y estudios de percepción / diagnóstico de reputación",
      "Análisis e información del entorno",
      "Diseño de narrativa y relato corporativo",
      "Speaking opportunities",
      "Relaciones públicas",
      "Gestión con medios de prensa",
      "Posicionamiento digital",
      "Comunicaciones internas",
      "Entrenamiento de voceros corporativos",
    ],
    closing: "Conversemos sobre tu desafío.",
    image: { src: "/images/ciudad-niebla.webp", alt: "Vista aérea de una ciudad entre la niebla" },
  },
  {
    slug: "gestion-prevencion-riesgos",
    num: "02",
    name: "Gestión y prevención de riesgos",
    summary:
      "Anticipamos escenarios, preparamos equipos y diseñamos respuestas para proteger la confianza y la continuidad de la organización.",
    title: "Anticipar una crisis también es una forma de proteger el negocio.",
    body: [
      "Los eventos negativos pueden transformarse rápidamente en crisis y afectar la credibilidad e incluso la operación de una empresa, poniendo en riesgo la confianza construida durante años.",
      "Te ayudamos a anticipar riesgos, preparar equipos y responder de manera estratégica cuando enfrentas escenarios de alta exposición.",
    ],
    quote:
      "Liderado por profesionales especialistas en gestión de riesgos y crisis en organizaciones complejas, incluyendo industria farmacéutica, educación, sector público y minería.",
    listLabel: "Soluciones",
    items: [
      "Mapa dinámico de riesgos reputacionales",
      "Programas de prevención de crisis",
      "Manuales y protocolos de crisis",
      "Gestión integral de crisis",
      "Monitoreo y social listening",
      "Capacitaciones",
      "Planes de recuperación post crisis",
    ],
    closing: "Preparémonos antes de la próxima crisis.",
    image: { src: "/images/anticipar.webp", alt: "Camino iluminado en medio de la niebla nocturna" },
  },
  {
    slug: "relaciones-institucionales",
    num: "03",
    name: "Relaciones institucionales y grupos de interés",
    summary:
      "Integramos inteligencia de entorno y gestión de stakeholders para fortalecer relaciones y abordar asuntos relevantes para la organización.",
    title: "Comprender a los grupos de interés es clave para avanzar.",
    body: [
      "Apoyamos a nuestros clientes en el desarrollo de sus relaciones institucionales a largo plazo, integrando sus actividades de negocios con las políticas públicas.",
      "Diseñamos programas para identificar e involucrar a líderes de opinión, promover discusiones sobre temas de interés relacionados con regulaciones o cambios legislativos y abordar causas socialmente relevantes.",
    ],
    quote:
      "Combinamos inteligencia de entorno, gestión de stakeholders y una mirada estratégica orientada a resultados.",
    listLabel: "Enfoques",
    items: [
      "Inteligencia de entorno",
      "Mapeo y priorización de stakeholders",
      "Relacionamiento institucional",
      "Líderes de opinión",
      "Regulación y cambios legislativos",
      "Vinculación con comunidades",
      "Conversaciones multisectoriales",
    ],
    closing: "Hablemos de tu entorno.",
    image: { src: "/images/institucional.webp", alt: "Fachada de un edificio institucional" },
  },
  {
    slug: "comunicacion-interna",
    num: "04",
    name: "Comunicación interna",
    summary:
      "Alineamos personas, cultura y comunicación para fortalecer el compromiso y convertir a los colaboradores en embajadores de la organización.",
    title: "El posicionamiento y la confianza también comienzan dentro de la organización.",
    body: [
      "La comunicación apoya los planes de engagement de las empresas, la alineación de los equipos, la creación de cultura y la productividad.",
      "Esto implica un conocimiento profundo de las personas, su rol y lo que los mueve. Te apoyamos para tener una organización irresistible y atraer el mejor talento.",
    ],
    quote:
      "Hoy los colaboradores se convierten en los principales embajadores de la marca frente a distintos públicos de interés. El posicionamiento y la confianza parten por casa.",
    listLabel: "Soluciones",
    items: [
      "Diagnóstico y encuestas de comunicación interna",
      "Desarrollo de estrategias y planes",
      "Operación de sistemas de comunicación y canales internos",
      "Programa de embajadores de marca",
      "Capacitación de voceros internos",
      "Eventos",
    ],
    closing: "Fortalece tu comunicación interna.",
    image: { src: "/images/equipo-trabajo.webp", alt: "Persona trabajando en un escritorio con notebook" },
  },
  {
    slug: "vocerias",
    num: "05",
    name: "Vocerías y habilidades comunicacionales",
    summary:
      "Fortalecemos la capacidad de líderes y equipos para comunicar con claridad, confianza y credibilidad en contextos de alta exposición.",
    title: "Líderes preparados para comunicar con claridad cuando más importa.",
    body: [
      "Fortalecemos las capacidades de comunicación de líderes y equipos para enfrentar entrevistas, presentaciones, crisis y situaciones de alta exposición con confianza, claridad y credibilidad.",
    ],
    listLabel: "Soluciones",
    items: [
      "Media training",
      "Talleres de comunicación efectiva",
      "Talleres de LinkedIn",
      "Talleres de marca personal",
      "Presentaciones de alto impacto",
    ],
    closing: "Prepara a tus voceros.",
    image: { src: "/images/escenario.webp", alt: "Escenario iluminado frente a una audiencia" },
  },
];

/* ------------------------------------------------------------------ */
/* Modelo                                                              */
/* ------------------------------------------------------------------ */

export const model = [
  {
    num: "01",
    name: "Escuchar",
    short: "Entender contexto, expectativas, diagnóstico y stakeholders.",
    goal: "Comprender el contexto antes de definir la respuesta.",
    items: [
      "Contexto",
      "Expectativas de los directivos",
      "Diagnóstico de comunicaciones",
      "KOL / mapa de stakeholders",
      "Recomendaciones",
    ],
  },
  {
    num: "02",
    name: "Planificar",
    short: "Definir estrategia, pilares, mensajes, acciones, objetivos y KPIs.",
    goal: "Transformar los hallazgos en una estrategia accionable.",
    items: [
      "Diseño de un plan estratégico de comunicaciones",
      "Definición de pilares y mensajes clave",
      "Creación del plan de acción",
      "Definición de objetivos y KPIs",
    ],
  },
  {
    num: "03",
    name: "Visibilizar",
    short: "Activar el plan, movilizar embajadores, implementar acciones y evaluar impacto.",
    goal: "Activar la estrategia y evaluar su impacto.",
    items: [
      "Socialización del plan",
      "Programa de embajadores / LinkedIn",
      "Implementación de acciones",
      "Evaluación del impacto",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Clientes por industria (slugs = public/logos, ver src/data/logos.json) */
/* ------------------------------------------------------------------ */

// TODO(checklist): validar autorización de uso de logos y escritura oficial.
// Snap y Clínica Bersant figuran en el documento pero no tienen logo en la carpeta.
export const industries = [
  {
    slug: "salud",
    name: "Salud",
    logos: [
      "labchile-teva", "abbott", "merck", "boehringer", "janssen", "jjmd", "organon", "grunenthal",
      "zoetis", "csl-behring", "adium", "virbac", "sanderson", "axon", "cien",
    ],
  },
  {
    slug: "mineria-industria",
    name: "Minería e industria",
    logos: ["sierra-gorda", "yamana", "joy-global", "ausenco", "gardilcic", "jej", "mas-errazuriz", "geovita"],
  },
  {
    slug: "construccion-inmobiliario",
    name: "Construcción e inmobiliario",
    logos: ["tecsa", "henkel", "irc", "fundamenta", "paz"],
  },
  {
    slug: "tecnologia",
    name: "Tecnología",
    logos: ["xerox", "micron", "vertiv", "dynatrace", "arcserve", "ascenty", "kepler", "latamwin"],
  },
  {
    slug: "instituciones",
    name: "Instituciones",
    logos: ["union-europea", "bcn", "itpo", "embajada-india"],
  },
  {
    slug: "ferias-entretenimiento",
    name: "Ferias y entretenimiento",
    logos: ["oktoberfest", "expo-mujer", "feria-naciones", "expo-reciclaje"],
  },
];

/* ------------------------------------------------------------------ */
/* Casos                                                               */
/* ------------------------------------------------------------------ */

export type Case = {
  slug: string;
  client: string;
  area: string;
  title: string;
  challenge: string;
  actions: string[];
  result?: string;
  note?: string;
};

// TODO(checklist): confirmar que cada caso puede publicarse con nombre y verificar resultados y fechas.
export const cases: Case[] = [
  {
    slug: "tecsa",
    client: "TECSA",
    area: "Posicionamiento y gestión de riesgos",
    title: "Posicionamiento y gestión de riesgos del Grupo TECSA",
    challenge:
      "Fortalecer el valor de la marca a través de los años, gestionando oportunamente riesgos y potenciando oportunidades del contexto. Apoyar, desde las comunicaciones estratégicas, las metas comerciales y reputacionales del grupo.",
    actions: [
      "Asesoramos al VP y primera línea en la gestión de riesgos y posicionamiento frente a sus distintos grupos de interés, con el fin de facilitar la operación de las distintas unidades de negocio y el logro de objetivos.",
      "Monitoreo permanente del entorno, proyección de escenarios críticos, mapeo de riesgos por unidad de negocio, capacitación y procedimientos de abordaje, gestión del mapa de grupos de interés y proyectos de vinculación con las comunidades en proyectos de impacto.",
    ],
    result:
      "Se construyó una marca fuerte y valorada por los distintos stakeholders, desarrolladora de grandes proyectos de infraestructura, edificación e inmobiliario de Chile y la región.",
  },
  {
    slug: "congreso-nacional",
    client: "Congreso Nacional / BCN",
    area: "Modernización y vinculación ciudadana",
    title: "Modernización del Congreso Nacional y vinculación ciudadana",
    challenge:
      "Transformar la gestión parlamentaria incorporando tecnología y procedimientos para agilizar el estudio de proyectos y la tramitación de leyes. Al mismo tiempo, favorecer la vinculación ciudadana y la comprensión de las leyes por parte de la ciudadanía.",
    actions: [
      "Diseño del plan para postularlo a fondos BID.",
      "Implementación y desarrollo que implicó diagnóstico y las distintas etapas contempladas en el proyecto de vinculación y relacionamiento con grupos de interés clave.",
    ],
    result:
      "Desarrollo exitoso del proyecto, con herramientas concretas de acceso a la comunidad, incorporación de software libre en la operación interna, agilización de procesos internos y de estudios comparados, pupitres electrónicos, entre otros.",
  },
  {
    slug: "chile-india",
    client: "Chile-India / ITPO",
    area: "Promoción de negocios",
    title: "Promoción de negocios Chile-India",
    challenge:
      "Favorecer la llegada de empresas de India a Chile, principalmente en tecnología y manufactura, y promover el intercambio entre ambos países a través de ITPO.",
    actions: [
      "Diseño de un programa de cuatro años que incluyó un mega evento comercial anual, ruedas de negocios, charlas y presentaciones, encuentros one to one y generación de artículos de interés en el área de negocios.",
    ],
    result:
      "Generación de alianzas entre empresas, aumento de ventas de ciertos segmentos y visibilización de oportunidades de inversión e intercambio.",
  },
  {
    slug: "angioedema-hereditario",
    client: "AEH",
    area: "Grupos de interés y acceso a tratamiento",
    title: "Acceso a tratamiento para el Angioedema Hereditario",
    challenge:
      "Lograr que el tratamiento biológico de alto costo para esta enfermedad rara fuera financiado mediante instrumentos estatales.",
    actions: [
      "Diseño de un plan de gestión de grupos de interés para relacionarse con autoridades competentes del Ministerio de Salud y obtener financiamiento en el segundo decreto de la Ley Ricarte Soto.",
      "Las etapas incluyeron desarrollo de relato objetivo de costos, identificación de aliados, trabajo con la Comisión de Salud del Senado, asociaciones médicas, academia y líderes de opinión; creación de una asociación de pacientes; relacionamiento institucional; intercambio de experiencias internacionales y mesas de trabajo multisectoriales.",
    ],
    result:
      "Incorporación del tratamiento de AEH en el segundo decreto de la Ley Ricarte Soto. Hoy los pacientes tienen acceso.",
  },
  {
    slug: "puerto-caldera",
    client: "Puerto Caldera",
    area: "Sustentabilidad y vinculación con la comunidad",
    title: "Puerto Caldera, plataforma portuaria de Atacama",
    challenge:
      "Posicionarlo como principal plataforma portuaria de Atacama para empresas del norte de Chile y Argentina, considerando sus condiciones climáticas y continuidad operacional.",
    actions: [
      "Plan de posicionamiento, gestión de stakeholders y trabajo para lograr la adherencia de la comunidad y autoridades locales.",
      "Proyectos colaborativos pro crecimiento local, comunicación permanente con la comunidad y medios locales, redes sociales y fortalecimiento de vocerías institucionales.",
    ],
    result:
      "Se logró fortalecer la marca, apoyar sus metas comerciales y gestionar riesgos que podían afectar su operación.",
  },
  {
    slug: "laboratorio-chile",
    client: "Laboratorio Chile / Teva",
    area: "Construcción de reputación",
    title: "Laboratorio Chile: una marca con alta aprobación ciudadana",
    challenge:
      "Construir una marca con alta aprobación ciudadana, reconocida por su trabajo por la salud de los chilenos y su contribución al crecimiento del país.",
    actions: [
      "Plan de posicionamiento, vinculación con la comunidad y gestión de grupos de interés.",
      "Acciones para minimizar eventos críticos que pudieran afectar reputación y confianza.",
      "Conversaciones multisectoriales sobre acceso a medicamentos e iniciativas con actores relevantes del mundo de la salud.",
    ],
    // TODO(checklist): publicar como claim histórico con fecha y fuente (Marca Ciudadana / Merco).
    result:
      "La compañía se transformó en una de las marcas más confiables y respetadas en el ámbito de la salud en Chile, y apareció por tercer año consecutivo en los primeros lugares de Marca Ciudadana y Merco.",
  },
  {
    slug: "gardilcic",
    client: "Constructora Gardilcic",
    area: "Comunicaciones estratégicas para el crecimiento",
    title: "Comunicaciones estratégicas para el crecimiento de Constructora Gardilcic",
    challenge:
      "Proteger y fortalecer su imagen en grupos de interés, incorporando las comunicaciones estratégicas en todas sus áreas.",
    actions: [
      "Plan anual de comunicaciones con diagnóstico de contexto, proyección de riesgos y relacionamiento con grupos de interés.",
      "Comunicación permanente con colaboradores y capacitaciones de comunicación efectiva, comunicación en crisis y simulacros.",
    ],
  },
];

export const citizenProjects = [
  {
    name: "Proyecto Aula",
    partner: "Boehringer Ingelheim",
    body: "Aporte a la educación en salud animal y humana en sectores vulnerables, trabajando con colegios y comunidades.",
  },
  {
    name: "Proyecto ANGELS",
    partner: "Acción ACV",
    body: "Desde 2016, articulación de un proyecto multisectorial de visibilización de síntomas para evitar muertes e impactos negativos. Incluyó trabajo con el sistema público de salud, médicos y pacientes, capacitaciones, difusión, activaciones territoriales y una app de ayuda.",
  },
  {
    name: "Hidrógeno verde y su poder",
    partner: "Fundación Chile y Delegación de la Unión Europea",
    body: "Trabajo conjunto para posicionar el tema a través de distintos canales.",
  },
];

/* ------------------------------------------------------------------ */
/* Equipo y reconocimientos                                            */
/* ------------------------------------------------------------------ */

export type Person = {
  name: string;
  role: string;
  bio?: string[];
  /** Ruta en /public/team, p. ej. "/team/ana-maria-matulic.webp" (retrato vertical 4:5). */
  photo?: string;
  /** true = espacio reservado: falta confirmar nombre, cargo y foto. */
  pending?: boolean;
};

// TODO(checklist): validar nombres y cargos; agregar retratos en /public/team.
export const leadership: Person[] = [
  {
    name: "Ana María Matulic",
    role: "Socia directora y fundadora",
    bio: [
      "Periodista de la Pontificia Universidad Católica de Chile y Magíster en Gestión de Negocios de la Universidad Adolfo Ibáñez.",
      "Cuenta con más de 25 años de experiencia asesorando a empresas e instituciones en comunicación estratégica, posicionamiento corporativo, asuntos públicos, relacionamiento con stakeholders y gestión de crisis.",
    ],
  },
  {
    name: "María Ignacia Vargas",
    role: "Directora ejecutiva",
    bio: [
      "Periodista con estudios en comunicación corporativa. Cuenta con más de 12 años de experiencia liderando el diseño y ejecución de estrategias comunicacionales, orientadas a fortalecer el posicionamiento y el relacionamiento de diversas organizaciones mediante propuestas multiplataforma, con foco en la creación de valor.",
      "Ha trabajado con compañías como Copec, Forestal Arauco, SOFOFA Hub y Roche Pharma, entre otras. Su experiencia incluye manejo de crisis, relacionamiento con stakeholders, gestión de reputación corporativa y posicionamiento estratégico de marca.",
    ],
  },
];

// Equipo completo (10 personas): foto, nombre y cargo, sin biografía.
// Las socias van primero; luego el equipo ampliado.
// TODO(checklist): reemplazar los 8 espacios `pending` por nombre, cargo y foto reales.
export const team: Person[] = [
  ...leadership.map(({ name, role, photo }) => ({ name, role, photo })),
  ...Array.from({ length: 8 }, () => ({ name: "Nombre por confirmar", role: "Cargo por confirmar", pending: true })),
];

export const recognitions = [
  {
    logo: "leaders-league",
    name: "Leaders League",
    period: "Desde 2023",
    body: "Reconocidos como una de las agencias líderes en Chile en las categorías de Comunicación Estratégica y Gestión de Crisis. Este reconocimiento refleja nuestra experiencia acompañando a organizaciones en escenarios complejos y de alta exposición.",
  },
  {
    logo: "sello-transforma",
    name: "Sello Transforma",
    period: "2024 y 2025",
    body: "Obtenido por nuestro compromiso con la inclusión laboral de jóvenes en riesgo social, otorgado por Fundación Proyecto B y Fundación MC.",
  },
];

// TODO: agregar Focco cuando esté disponible su logo.
export const alliances = ["amcham", "pr-latam"];

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

export const insightCategories = [
  {
    slug: "perspectivas",
    name: "Perspectivas",
    body: "Análisis y reflexiones sobre comunicación estratégica, reputación, liderazgo y asuntos corporativos.",
  },
  {
    slug: "tendencias",
    name: "Tendencias",
    body: "Cambios, oportunidades y desafíos que están transformando la forma en que las organizaciones se relacionan con sus audiencias.",
  },
  {
    slug: "casos-y-aprendizajes",
    name: "Casos y aprendizajes",
    body: "Experiencias, buenas prácticas y lecciones obtenidas a partir de desafíos reales de comunicación y reputación.",
  },
];

export type Insight = {
  slug: string;
  category: (typeof insightCategories)[number]["slug"];
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO
  readingMinutes: number;
  image?: string;
  imageSize?: [number, number];
  /** Publicación original en headline.cl */
  source?: string;
  /** Párrafos; los que empiezan con "## " son subtítulos. */
  body: string[];
};

// Artículos publicados en https://www.headline.cl/blog (texto original, autor y fecha de publicación).
// Categoría asignada según las líneas editoriales del documento maestro (sección 14).
export const insights: Insight[] = [
  {
    "slug": "conocimiento-tecnico-audiencias",
    "category": "perspectivas",
    "title": "¿Por qué tantas organizaciones con gran conocimiento técnico tienen dificultades para conectar con sus audiencias?",
    "excerpt": "La minería, la salud y la tecnología suelen percibirse como industrias muy diferentes entre sí, pero comparten el hecho de tener operaciones en temas altamente especializados que impactan directamente la vida de las personas y comunidades.",
    "author": "Headline Comunicaciones",
    "date": "2026-07-17",
    "readingMinutes": 2,
    "image": "/insights/conocimiento-tecnico-audiencias.webp",
    "imageSize": [1080, 1350],
    "source": "https://www.headline.cl/post/por-qué-tantas-organizaciones-con-gran-conocimiento-técnico-tienen-dificultades-para-conectar-con-s",
    "body": [
      "La minería, la salud y la tecnología suelen percibirse como industrias muy diferentes entre sí, pero comparten el hecho de tener operaciones en temas altamente especializados que impactan directamente la vida de las personas y comunidades.",
      "Un nuevo tratamiento médico, un proyecto minero, una plataforma tecnológica o una innovación industrial pueden tener profundas implicancias para pacientes, comunidades, clientes, autoridades o inversionistas. Sin embargo, con frecuencia esas organizaciones comunican desde la lógica del experto, utilizando conceptos, indicadores y lenguaje técnico que son naturales para quienes conocen la industria, pero difíciles de entender para buena parte de sus audiencias.",
      "El problema no es la falta de información, por el contrario, muchas veces ocurre que hay una gran cantidad de conocimiento disponible, pero que no siempre logra responder a la pregunta que se hacen las personas: ¿por qué esto es importante para mí?",
      "Esa es una de las principales diferencias entre informar y comunicar. Para informar basta con entregar datos, pero para comunicar realmente se debe construir un puente entre ese conocimiento especializado y las necesidades de las personas.",
      "Por eso, traducir no significa simplificar ni perder rigurosidad. Significa identificar qué necesita comprender cada audiencia para interpretar correctamente un tema complejo. Un mismo proyecto no se explica de la misma manera a una comunidad, a un periodista, a un regulador o a un inversionista. Los hechos pueden ser los mismos; lo que cambia es el contexto desde el cual cada grupo los interpreta.",
      "En industrias altamente técnicas, esta capacidad se vuelve especialmente relevante porque una buena comunicación ayuda a reducir incertidumbres, fortalecer la confianza y generar conversaciones más informadas.",
      "En Headline creemos que ese es uno de los principales desafíos de las comunicaciones estratégicas. No se trata de perder profundidad o explicar de más, sino de lograr que el conocimiento sea accesible para quienes lo necesitan para entender cómo determinados cambios impactan su realidad."
    ]
  },
  {
    "slug": "datos-en-salud",
    "category": "tendencias",
    "title": "¿Por qué generar más datos en salud ya no basta?",
    "excerpt": "La inteligencia artificial, la trazabilidad y la transformación digital fueron algunos de los temas centrales del Encuentro GS1 Healthcare 2026: Salud en Código.",
    "author": "Headline Comunicaciones",
    "date": "2026-06-26",
    "readingMinutes": 2,
    "image": "/insights/datos-en-salud.webp",
    "imageSize": [1800, 1013],
    "source": "https://www.headline.cl/post/nunca-habíamos-generado-tantos-datos-estamos-logrando-convertirlos-en-valor",
    "body": [
      "La inteligencia artificial, la trazabilidad y la transformación digital fueron algunos de los temas centrales del Encuentro GS1 Healthcare 2026: Salud en Código. Sin embargo, más allá de las distintas exposiciones, hubo una idea que atravesó prácticamente toda la jornada, la transformación del sistema sanitario ya no depende únicamente de incorporar nuevas tecnologías, sino de la capacidad de conectar información, instituciones y personas.",
      "\"Nunca habíamos generado tantos datos y, sin embargo, nunca habíamos tenido tantos problemas para convertirlos en valor\", afirmó Mónica Soler durante el encuentro. Su reflexión resume uno de los principales desafíos que enfrenta hoy el sector, transformar la enorme cantidad de información que generan los sistemas de salud en conocimiento útil para pacientes, profesionales e instituciones.",
      "Digitalizar procesos o incorporar nuevas herramientas no garantiza, por sí solo, una mejor atención. El verdadero cambio ocurre cuando esa información puede compartirse de manera segura, interpretarse y utilizarse para tomar mejores decisiones.",
      "Por eso, no es casualidad que uno de los conceptos más repetidos durante la jornada fuera la interoperabilidad. Lejos de tratarse únicamente de un desafío tecnológico, se presentó como una condición habilitante para mejorar la trazabilidad de medicamentos y dispositivos médicos, fortalecer la seguridad del paciente, optimizar la gestión sanitaria y facilitar la continuidad de la atención.",
      "Pero la interoperabilidad tampoco es suficiente por sí sola. Uno de los consensos que dejó el encuentro fue que ningún actor podrá impulsar esta transformación de manera aislada. Gobierno, industria, academia, prestadores de salud y empresas tecnológicas deberán avanzar con una visión compartida para construir un sistema más integrado, eficiente y centrado en las personas.",
      "La innovación ya existe. El desafío ahora consiste en generar los acuerdos, la coordinación y la voluntad necesaria para que esa innovación produzca un impacto real.",
      "## ¿Qué tiene que ver esto con las comunicaciones?",
      "Podría parecer una conversación exclusivamente tecnológica, pero también plantea desafíos para las organizaciones y la forma en que comunican.",
      "En un entorno donde la información, las opiniones y los análisis abundan, el valor ya no está sólo en acceder a ellos, sino en interpretarlos, comprender cómo están transformando una industria y traducirlos en decisiones estratégicas.",
      "En Headline creemos que esa también es parte de nuestra labor. Comprender las conversaciones que hoy están redefiniendo sectores como la salud nos permite acompañar a nuestros clientes con una mirada más informada, capaz de anticipar tendencias, identificar oportunidades y construir estrategias alineadas con la evolución de su entorno.",
      "Porque una buena estrategia de comunicación no sólo ayuda a explicar el presente. También prepara a las organizaciones para el futuro."
    ]
  },
  {
    "slug": "de-ejecutar-a-orientar-decisiones",
    "category": "perspectivas",
    "title": "De ejecutar acciones a orientar decisiones: así ha evolucionado la comunicación",
    "excerpt": "Durante años, muchas organizaciones evaluaron la comunicación principalmente por la cantidad de publicaciones realizadas y las apariciones en los diferentes medios de comunicación.",
    "author": "Headline Comunicaciones",
    "date": "2026-06-10",
    "readingMinutes": 3,
    "image": "/insights/de-ejecutar-a-orientar-decisiones.webp",
    "imageSize": [1800, 2634],
    "source": "https://www.headline.cl/post/de-ejecutar-acciones-a-orientar-decisiones-así-ha-evolucionado-la-comunicación",
    "body": [
      "Durante años, muchas organizaciones evaluaron la comunicación principalmente por la cantidad de publicaciones realizadas y las apariciones en los diferentes medios de comunicación. Bajo esa lógica, el éxito parecía estar asociado al volumen de acciones ejecutadas y al cumplimiento de determinados KPI. Sin embargo, la historia ha ido cambiando.",
      "Las marcas operan en un entorno marcado por la sobreinformación, la exposición permanente y cambios cada vez más rápidos. Cada día compiten por la atención de audiencias que reciben cientos de mensajes y consumen información desde múltiples plataformas. Es por ello, que comunicar ya no consiste únicamente en desarrollar acciones o estar presente en la mayor cantidad de canales posible. El valor de la comunicación hoy, está en comprender el contexto, identificar oportunidades, anticipar riesgos y construir mensajes alineados con los objetivos estratégicos de cada organización. Ha ocurrido una evolución, desde una función centrada en la ejecución hacia un rol que ayuda a interpretar el entorno, comprender a las audiencias y orientar decisiones.",
      "## La estrategia como puente entre objetivos y audiencias",
      "Este cambio también ha transformado la manera en que se mide el impacto de una estrategia comunicacional. Durante mucho tiempo se asumió que publicar más equivalía a comunicar mejor. Sin embargo, la experiencia demuestra que una organización puede generar una gran cantidad de contenidos, pero sin conectar con sus audiencias ni fortalecer su posicionamiento.",
      "Lo mismo ocurre con la cobertura de los medios. Conseguir apariciones en medios relevantes sigue siendo importante, pero más cobertura no necesariamente significa una mejor reputación. La visibilidad, por sí sola, no genera confianza ni credibilidad. Lo que realmente importa es la calidad de los mensajes que se transmiten y la percepción que contribuyen a construir.",
      "La misma reflexión aplica al ecosistema digital. El gran aumento de plataformas ha llevado a muchas empresas a intentar estar presentes en todos los canales disponibles. Sin embargo, más canales tampoco garantizan una mayor influencia. La capacidad de impactar no depende de la cantidad de espacios utilizados, sino de llegar a las audiencias correctas con mensajes relevantes y consistentes.",
      "## La estrategia como factor diferenciador",
      "En este contexto, la diferencia está en la estrategia que permite llegar a las audiencias correctas con mensajes relevantes y consistentes. Cada publicación, entrevista, campaña o vocería debería responder a una pregunta simple pero fundamental: ¿Qué queremos lograr y con quién necesitamos conectar para conseguirlo?",
      "Cuando existe claridad sobre el propósito, resulta más fácil definir qué mensajes impulsar, qué canales utilizar y cómo evaluar los resultados. La comunicación deja de ser una seguidilla de acciones aisladas y pasa a formar parte de una visión más amplia, alineada con las prioridades de la empresa.",
      "Esta mirada estratégica permite aprovechar mejor las oportunidades de posicionamiento, fortalecer la reputación y construir conversaciones relevantes para las audiencias.",
      "A medida que las organizaciones enfrentan escenarios más complejos, también han cambiado las expectativas sobre el rol de los equipos de comunicación. Ya no se espera únicamente que produzcan contenidos o gestionen relaciones con medios. Cada vez más, se les exige aportar análisis, contexto y una mirada estratégica sobre el entorno.",
      "El desafío es comunicar con propósito, coherencia y visión estratégica. Porque en un entorno donde la información es abundante y la atención es cada vez más escasa, las organizaciones que logran diferenciarse no son necesariamente las que más comunican, sino aquellas que entienden mejor a sus audiencias, construyen mensajes relevantes y saben qué decir, cuándo decirlo y para qué hacerlo."
    ]
  },
  {
    "slug": "nuevo-desafio-comunicaciones-corporativas",
    "category": "tendencias",
    "title": "El nuevo desafío de las comunicaciones corporativas",
    "excerpt": "¿Tu marca existe para la IA? La inteligencia artificial está transformando mucho más que la productividad o la automatización.",
    "author": "Headline Comunicaciones",
    "date": "2026-05-28",
    "readingMinutes": 3,
    "image": "/insights/nuevo-desafio-comunicaciones-corporativas.webp",
    "imageSize": [1408, 768],
    "source": "https://www.headline.cl/post/el-nuevo-desafío-de-las-comunicaciones-corporativas",
    "body": [
      "La inteligencia artificial está transformando mucho más que la productividad o la automatización. También está modificando la manera en que las personas buscan información, validan fuentes, construyen confianza y toman decisiones. En ese contexto, las comunicaciones corporativas enfrentan una transformación profunda: ya no basta con emitir mensajes claros o generar cobertura; hoy también importa cómo, dónde y bajo qué lógica tecnológica circula esa información.",
      "Las predicciones 2026 para líderes de comunicaciones de Gartner apuntan precisamente en esa dirección. El informe anticipa una creciente influencia de los motores de respuesta impulsados por IA, una mayor relevancia del earned media, nuevas exigencias en reputación digital y un rol cada vez más estratégico de la analítica en las decisiones comunicacionales.",
      "Uno de los cambios más relevantes tiene relación con la evolución de los hábitos de búsqueda. Herramientas como ChatGPT, Gemini o Perplexity están comenzando a consolidarse como espacios habituales de consulta, modificando la manera en que las audiencias descubren contenido, contrastan información y evalúan credibilidad. Y eso cambia profundamente las reglas del juego para las marcas.",
      "Según Gartner, este fenómeno podría impulsar una mayor inversión en PR y earned media, debido a que las plataformas de IA tienden a priorizar contenido considerado confiable, validado y proveniente de fuentes reconocidas, como cobertura editorial, menciones orgánicas o fuentes independientes.",
      "En otras palabras, las comunicaciones corporativas ya no solo influyen en la reputación frente a las personas, sino que también empiezan a influir en cómo los sistemas de inteligencia artificial interpretan, recomiendan y posicionan a una organización.",
      "Desde Headline Comunicaciones vemos cómo las relaciones públicas están ampliando su alcance estratégico. Hoy no se trata únicamente de generar cobertura o posicionamiento mediático. También implica construir autoridad digital en ecosistemas cada vez más influenciados por la inteligencia artificial. Esto exige desarrollar contenido capaz de generar relevancia tanto para las audiencias como para los motores de respuesta, comprender qué fuentes priorizan los grandes modelos de lenguaje y analizar nuevas oportunidades asociadas al GEO o Generative Engine Optimization.",
      "La reputación, al mismo tiempo, entra en una etapa más compleja y dinámica. Gartner anticipa un crecimiento del uso de tecnologías de narrative intelligence para monitorear conversaciones, detectar riesgos y comprender cómo evolucionan determinadas narrativas en un contexto marcado por la desinformación y la sobreabundancia de información digital.",
      "En la práctica, esto refleja una realidad cada vez más evidente: las conversaciones que impactan la percepción de una marca no siempre nacen en medios tradicionales ni en redes sociales masivas. Muchas veces surgen desde comunidades digitales específicas, espacios de nicho o dinámicas amplificadas por inteligencia artificial. En ese entorno, el monitoreo convencional deja de ser suficiente.",
      "Por eso, herramientas como la escucha social, el análisis reputacional y el seguimiento permanente de conversaciones digitales adquieren un rol mucho más estratégico. En Headline, esto forma parte del trabajo cotidiano; entender qué temas están creciendo, cómo evolucionan determinadas percepciones, qué riesgos emergen para una organización y qué oportunidades de posicionamiento aparecen a partir de la conversación pública.",
      "Otro punto relevante identificado por Gartner es el aumento esperado de la inversión en datos y analítica dentro de las áreas de comunicaciones. La disciplina avanza hacia modelos capaces de demostrar impacto, acelerar decisiones y conectar las acciones comunicacionales con resultados de negocio.",
      "Este cambio también se refleja en la forma en que hoy se diseñan y ajustan las estrategias. Métricas de cobertura, share of voice, desempeño de contenido, escucha social o visibilidad digital permiten complementar la mirada creativa y editorial con evidencia cada vez más sofisticada sobre influencia, reputación y efectividad estratégica.",
      "Las comunicaciones corporativas están entrando, en definitiva, en una etapa más analítica, más reputacional y profundamente influida por la inteligencia artificial. El desafío ya no es solo emitir mensajes o amplificar logros. Es construir credibilidad, autoridad y relevancia en un entorno donde la información se evalúa, se contrasta y, cada vez más, también es interpretada por algoritmos.",
      "Porque en el nuevo ecosistema comunicacional la pregunta ya no es únicamente qué estamos diciendo. También es si estamos logrando ser encontrados, comprendidos y considerados relevantes tanto por las audiencias como por las plataformas que hoy median gran parte de esas conversaciones."
    ]
  },
  {
    "slug": "preparacion-crisis-comunicacional",
    "category": "casos-y-aprendizajes",
    "title": "Por qué la preparación es tan importante como el manejo de una crisis comunicacional",
    "excerpt": "Las crisis comunicacionales no se gestionan únicamente cuando ocurren.",
    "author": "Headline Comunicaciones",
    "date": "2026-05-12",
    "readingMinutes": 2,
    "image": "/insights/preparacion-crisis-comunicacional.webp",
    "imageSize": [1800, 1200],
    "source": "https://www.headline.cl/post/por-qué-la-preparación-es-tan-importante-como-el-manejo-de-una-crisis-comunicacional",
    "body": [
      "Las crisis comunicacionales no se gestionan únicamente cuando ocurren. En la práctica, gran parte del trabajo comienza mucho antes de enfrentar una contingencia. Hoy, en un escenario marcado por la inmediatez de las redes sociales, la presión pública y la velocidad de los medios; las empresas necesitan preparación, estructura y capacidad de respuesta para actuar con claridad en momentos complejos.",
      "Uno de los errores más comunes es pensar que una crisis se resuelve con una declaración o una reacción rápida. Sin embargo, una gestión efectiva requiere un trabajo previo que permita identificar riesgos reputacionales, detectar posibles escenarios de contingencia y definir protocolos claros de acción. Esto incluye establecer flujos internos de comunicación, entrenar voceros, preparar mensajes clave y alinear criterios entre las distintas áreas de la organización.",
      "En ese proceso, los entrenamientos de vocería cumplen un rol clave. No basta con tener información, pues los líderes deben saber cómo comunicar bajo presión, enfrentar entrevistas, responder preguntas complejas y transmitir seguridad frente a distintos públicos. La preparación también implica revisar permanentemente el contexto, monitorear conversaciones y entender cómo una situación interna puede escalar rápidamente hacia medios tradicionales, LinkedIn, Instagram u otras plataformas digitales.",
      "Cuando la crisis ocurre, el foco cambia hacia la capacidad de reacción y coordinación. Lo primero es evaluar el impacto real de la situación, detectando qué ocurrió, a quién afecta, cuáles son los riesgos reputacionales y qué información ya está circulando públicamente. A partir de ese análisis, se define una estrategia comunicacional que permita ordenar el mensaje, evitar contradicciones y actuar de manera efectiva frente a los distintos escenarios.",
      "En ese momento, la velocidad es importante, pero también la precisión. Comunicar apresuradamente sin claridad puede profundizar el problema. Por eso, una buena gestión de crisis considera la elaboración de mensajes clave, la definición de vocerías, la coordinación con medios y el relacionamiento constante con stakeholders, incluyendo colaboradores, clientes, proveedores, autoridades y socios estratégicos.",
      "Las comunicaciones internas (CCII) también adquieren especial relevancia durante una crisis. Muchas veces, los propios colaboradores se enteran de la situación a través de redes sociales o medios externos, generando incertidumbre y desinformación. Mantener una comunicación interna clara, transparente y oportuna ayuda a resguardar la cultura organizacional y fortalecer la confianza dentro de la compañía.",
      "Además, la gestión no termina con una declaración pública. Durante toda la contingencia es necesario monitorear el entorno, analizar reacciones, ajustar mensajes y mantener una comunicación constante con las distintas audiencias. La reputación de una empresa no depende de evitar todas las crisis, sino de cómo enfrenta los momentos más difíciles.",
      "En Headline Comunicaciones trabajamos junto a organizaciones y líderes en la planificación estratégica, gestión de crisis, entrenamiento de vocerías y relacionamiento con medios, ayudando a preparar a las compañías antes de una contingencia y acompañándolas durante todo el proceso comunicacional."
    ]
  },
  {
    "slug": "sostenibilidad-relatos-vacios",
    "category": "perspectivas",
    "title": "Por qué la comunicación en sostenibilidad ya no admite relatos vacíos",
    "excerpt": "A propósito del Día Mundial de la Tierra…la sostenibilidad dejó de ser una promesa aspiracional para convertirse en una exigencia concreta para las empresas.",
    "author": "Headline Comunicaciones",
    "date": "2026-04-23",
    "readingMinutes": 2,
    "image": "/insights/sostenibilidad-relatos-vacios.webp",
    "imageSize": [712, 712],
    "source": "https://www.headline.cl/post/por-qué-la-comunicación-en-sostenibilidad-ya-no-admite-relatos-vacíos",
    "body": [
      "A propósito del Día Mundial de la Tierra…la sostenibilidad dejó de ser una promesa aspiracional para convertirse en una exigencia concreta para las empresas. Hoy, audiencias más informadas y stakeholders más críticos no solo observan lo que las organizaciones declaran, sino, con mayor rigor, lo que realmente hacen. La coherencia entre relato y acción se ha transformado en el principal activo reputacional.",
      "El estudio “Comunicando el Progreso” del Pacto Mundial de las Naciones Unidas muestra que el 75% de los CEOs ya revisa periódicamente los riesgos asociados a la sostenibilidad, mientras que un 74% supervisa directamente reportes en materia ambiental, social y de gobernanza. Este cambio no es menor, pues evidencia que la sostenibilidad dejó de ser un tema periférico para instalarse en el núcleo de la toma de decisiones.",
      "A nivel local, la evolución también es significativa. En Chile, el aumento sostenido en la publicación de reportes de sostenibilidad, que supera el 40% en los últimos análisis, responde tanto a nuevas exigencias regulatorias como a una presión creciente por parte del mercado y la opinión pública. La transparencia, en este escenario, dejó de ser un atributo deseable para convertirse en un estándar mínimo.",
      "En paralelo, los organismos internacionales han elevado el nivel de urgencia. El más reciente informe de los Objetivos de Desarrollo Sostenible de la ONU advierte que solo entre el 17% y el 18% de las metas globales está en camino de cumplirse al 2030, mientras que cerca de la mitad muestra avances insuficientes y una parte relevante incluso retrocede. La brecha entre compromiso y ejecución sigue siendo crítica, y exige acelerar cambios concretos tanto en el ámbito público como privado.",
      "Construir una narrativa creíble exige mucho más que buenas intenciones. Las empresas están llamadas a comunicar desde la evidencia, con datos concretos, avances tangibles y métricas claras que permitan evaluar su desempeño. La sostenibilidad no se posiciona desde el discurso, sino desde la gestión, y la comunicación debe ser un reflejo fiel de esa realidad.",
      "Este cambio también redefine el rol de la comunicación corporativa. Ya no se trata únicamente de amplificar logros, sino de integrar la sostenibilidad como un eje estratégico del relato organizacional. Cada mensaje, en este sentido, es también una decisión que impacta directamente en la credibilidad y en la construcción de confianza.",
      "En un contexto donde todo se expone y se contrasta, la sostenibilidad se construye todos los días. El desafío es comunicar con la misma solidez con la que se gestiona, entendiendo que cada mensaje también es una decisión estratégica. ¿Estamos realmente contando lo que hacemos, o seguimos diciendo lo que queremos ser?"
    ]
  }
];
