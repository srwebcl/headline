// Contenido del sitio, tomado de "HEADLINE - Arquitectura, estructura y
// copywriting integral del nuevo sitio web". Las páginas sólo componen.
// Antes de publicar revisar el checklist del documento (sección 21).

export const site = {
  name: "Headline",
  url: "https://www.headline.cl", // Dominio principal (headline.cl redirige aquí en Vercel).
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
  // Identificación legal del responsable de datos (Ley 21.719, art. 14 ter letra b).
  legal: {
    razonSocial: "Headline Comunicaciones Ltda.",
    rut: "76.423.431-6",
    representante: "Ana María Matulic Moreno",
  },
};

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Qué hacemos", href: "/que-hacemos" },
  { label: "Nuestro modelo", href: "/nuestro-modelo" },
  { label: "Clientes", href: "/clientes" },
  { label: "Casos de Éxito", href: "/casos-de-exito" },
  { label: "Blog", href: "/insights" },
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
  listLabel: "Soluciones";
  items: string[];
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
      "Auditoría y estudios de percepción.",
      "Análisis e información del entorno.",
      "Diseño de narrativa y relato corporativo.",
      "Speaking opportunities.",
      "Relaciones Públicas.",
      "Gestión con medios de prensa.",
      "Posicionamiento digital.",
      "Comunicaciones internas.",
      "Entrenamiento de voceros corporativos.",
    ],
    image: { src: "/services/posicionamiento-reputacion.webp", alt: "Equipo en una presentación de posicionamiento con indicadores de medios" },
  },
  {
    slug: "prevencion-gestion-crisis",
    num: "02",
    name: "Prevención y gestión de crisis",
    summary:
      "Anticipamos escenarios, preparamos equipos y diseñamos respuestas para proteger la confianza y la continuidad de la organización.",
    title: "Anticipar una crisis también es una forma de proteger el negocio.",
    body: [
      "Los eventos negativos pueden transformarse rápidamente en crisis y afectar la credibilidad e incluso la operación de una empresa, poniendo en riesgo la confianza construida durante años.",
      "Te ayudamos a anticipar riesgos, preparar equipos y responder de manera estratégica cuando enfrentas escenarios de alta exposición.",
    ],
    quote:
      "Liderado por profesionales especialistas en gestión de riesgos y crisis en organizaciones complejas, incluyendo industria farmacéutica, educación, construcción, minería y sector público.",
    listLabel: "Soluciones",
    items: [
      "Mapa dinámico de riesgos reputacionales.",
      "Programas de prevención de crisis.",
      "Manuales y protocolos de crisis.",
      "Gestión integral de crisis.",
      "Monitoreo y social listening.",
      "Capacitaciones.",
      "Planes de recuperación post crisis.",
    ],
    image: { src: "/services/prevencion-gestion-crisis.webp", alt: "Reunión de análisis de riesgos frente a un panel de monitoreo" },
  },
  {
    slug: "relaciones-institucionales-grupos-interes",
    num: "03",
    name: "Relaciones institucionales y vinculación con grupos de interés",
    summary:
      "Integramos inteligencia de entorno y gestión de stakeholders para fortalecer relaciones y abordar asuntos relevantes para la organización.",
    title: "Comprender a los grupos de interés es clave para avanzar.",
    body: [
      "Apoyamos a nuestros clientes en el desarrollo de sus relaciones institucionales a largo plazo, vinculando sus actividades de negocios con las políticas públicas.",
      "Diseñamos programas para identificar e involucrar a líderes de opinión, promover discusiones sobre temas de interés relacionados con regulaciones o cambios legislativos y abordar causas socialmente relevantes.",
    ],
    quote:
      "Combinamos inteligencia de entorno, gestión de stakeholders y una mirada estratégica orientada a resultados.",
    listLabel: "Soluciones",
    items: [
      "Inteligencia del entorno y seguimiento regulatorio y legislativo.",
      "Mapeo y priorización de grupos de interés y líderes de opinión.",
      "Relacionamiento institucional y diálogo multisectorial.",
      "Vinculación con comunidades.",
    ],
    image: { src: "/services/relaciones-institucionales-2026.webp", alt: "Reunión de trabajo frente a un mapa de grupos de interés: sector público, clientes, comunidad, medios, socios e inversionistas" },
  },
  {
    slug: "comunicacion-interna",
    num: "04",
    name: "Comunicación interna",
    summary:
      "Alineamos personas, cultura y comunicación para fortalecer el compromiso y convertir a los colaboradores en embajadores de la organización.",
    title: "El posicionamiento y la confianza también se construyen desde dentro de la organización.",
    body: [
      "La comunicación interna fortalece el compromiso de las personas, alinea a los equipos con los objetivos del negocio y contribuye a consolidar la cultura y mejorar la productividad.",
      "Para lograrlo, buscamos comprender a las personas, sus roles y lo que las motiva. Te acompañamos a fortalecer su vínculo con la organización y a construir un lugar donde quieran trabajar y desarrollarse.",
    ],
    quote:
      "Hoy los colaboradores se convierten en los principales embajadores de la marca frente a distintos públicos de interés. El posicionamiento y la confianza parten por casa.",
    listLabel: "Soluciones",
    items: [
      "Diagnóstico y encuestas de CI.",
      "Desarrollo de estrategias y planes.",
      "Operación de sistemas de comunicación y canales internos.",
      "Programa de Embajadores de marca.",
      "Capacitación de voceros internos.",
      "Eventos.",
    ],
    image: { src: "/services/comunicacion-interna.webp", alt: "Equipo conversando en torno a una mesa de trabajo" },
  },
  {
    slug: "vocerias",
    num: "05",
    name: "Vocerías y habilidades comunicacionales",
    summary:
      "Fortalecemos la capacidad de líderes y equipos para comunicar con claridad, confianza y credibilidad en contextos de alta exposición.",
    title: "Líderes preparados para comunicar con efectividad cuando más importa.",
    body: [
      "La vocería fortalece el posicionamiento de las organizaciones y la confianza de sus públicos, al conectar los objetivos del negocio con mensajes relevantes y consistentes.",
      "Preparamos a líderes y voceros para transmitir sus mensajes con efectividad, desenvolverse con seguridad y responder a las exigencias de cada audiencia y contexto.",
    ],
    quote:
      "Nuestro equipo combina experiencia en comunicación estratégica y medios con una metodología práctica que incluye simulación de escenarios y retroalimentación personalizada.",
    listLabel: "Soluciones",
    items: [
      "Media Training.",
      "Talleres de comunicación efectiva.",
      "Talleres de LinkedIn.",
      "Talleres de Marca personal.",
      "Presentaciones de alto impacto.",
    ],
    image: { src: "/services/vocerias.webp", alt: "Vocero en un entrenamiento frente a cámara" },
  },
];

/* ------------------------------------------------------------------ */
/* Modelo                                                              */
/* ------------------------------------------------------------------ */

export type ModelDeliverable = {
  code: string;
  title: string;
  description: string;
};

export type ModelStep = {
  num: string;
  name: string;
  short: string;
  goal: string;
  description: string;
  items: string[];
  deliverables: ModelDeliverable[];
};

export const model: ModelStep[] = [
  {
    num: "01",
    name: "Escuchar",
    short: "Entender contexto, expectativas, diagnóstico y stakeholders.",
    goal: "Comprender el entorno antes de definir la respuesta.",
    description:
      "Ninguna estrategia eficaz nace de supuestos. En Headline iniciamos cada proceso con una inmersión rigurosa en la realidad de la organización: analizamos los objetivos del negocio, recogemos las expectativas del equipo directivo, auditamos las comunicaciones vigentes y mapeamos a los líderes de opinión y grupos de interés prioritarios para fundamentar cada decisión con inteligencia estratégica.",
    items: [
      "Contexto y expectativas directivas",
      "Diagnóstico de comunicaciones",
      "KOL / mapa de stakeholders",
      "Recomendaciones estratégicas",
    ],
    deliverables: [
      {
        code: "01.1",
        title: "Contexto y expectativas directivas",
        description:
          "Entrevistas en profundidad con líderes y directores para alinear la comunicación con los objetivos y prioridades estratégicas del negocio.",
      },
      {
        code: "01.2",
        title: "Diagnóstico integral de comunicaciones",
        description:
          "Auditoría de canales, coherencia del relato corporativo, tono editorial y análisis de la percepción histórica de la marca.",
      },
      {
        code: "01.3",
        title: "Mapa de stakeholders y KOL",
        description:
          "Identificación y priorización de grupos de interés, autoridades regulatorias, líderes gremiales y actores clave del ecosistema.",
      },
      {
        code: "01.4",
        title: "Recomendaciones estratégicas",
        description:
          "Hallazgos prioritarios, detección de riesgos latentes y oportunidades de diferenciación para la toma de decisiones.",
      },
    ],
  },
  {
    num: "02",
    name: "Planificar",
    short: "Definir estrategia, pilares, mensajes, acciones, objetivos y KPIs.",
    goal: "Transformar los hallazgos en una estrategia accionable.",
    description:
      "La inteligencia de entorno se convierte en un plan estructurado y con sentido de negocio. Definimos la narrativa corporativa, articulamos pilares temáticos que sustentan la reputación y construimos mensajes adaptados a cada audiencia. Cada iniciativa se planifica con un cronograma táctico, voceros definidos y metas claras que orientan los recursos hacia resultados medibles.",
    items: [
      "Diseño de un plan estratégico de comunicaciones",
      "Construcción de pilares y mensajes clave",
      "Creación del plan de acción",
      "Definición de objetivos y KPIs",
    ],
    deliverables: [
      {
        code: "02.1",
        title: "Plan estratégico de comunicaciones",
        description:
          "Hoja de ruta integral que conecta los desafíos corporativos con los requerimientos de relacionamiento y posicionamiento.",
      },
      {
        code: "02.2",
        title: "Pilares y mensajes clave",
        description:
          "Construcción del relato central, argumentos diferenciadores y matrices de mensajes segmentadas por audiencia.",
      },
      {
        code: "02.3",
        title: "Plan de acción y calendario",
        description:
          "Cronograma de hitos, campañas institucionales, planes de contenido y selección estratégica de canales de difusión.",
      },
      {
        code: "02.4",
        title: "Definición de objetivos y KPIs",
        description:
          "Establecimiento de indicadores de gestión, cobertura cualitativa, posicionamiento y cumplimiento de metas.",
      },
    ],
  },
  {
    num: "03",
    name: "Visibilizar",
    short: "Activar el plan, movilizar embajadores y desplegar acciones de comunicación.",
    goal: "Activar la estrategia y visibilizar los mensajes ante audiencias clave.",
    description:
      "Desplegamos el plan con consistencia en todos los puntos de contacto. Movilizamos a líderes corporativos como voceros autorizados, activamos programas de embajadores institucionales en plataformas de influencia profesional y gestionamos una presencia sólida en medios y debates públicos. Convertimos los mensajes estratégicos en conversaciones de impacto que generan credibilidad y reputación.",
    items: [
      "Socialización interna del plan",
      "Programa de embajadores / LinkedIn",
      "Implementación de acciones y campañas",
      "Despliegue de vocerías y medios",
    ],
    deliverables: [
      {
        code: "03.1",
        title: "Socialización interna del plan",
        description:
          "Alineamiento de equipos y voceros para asegurar coherencia cultural y comunicacional en toda la organización.",
      },
      {
        code: "03.2",
        title: "Programa de embajadores y LinkedIn",
        description:
          "Estrategia de posicionamiento de ejecutivos y líderes de opinión en redes profesionales para amplificar la voz de la compañía.",
      },
      {
        code: "03.3",
        title: "Implementación de acciones y campañas",
        description:
          "Ejecución de iniciativas de contenidos, eventos corporativos, relaciones públicas y proyectos con propósito institucional.",
      },
      {
        code: "03.4",
        title: "Despliegue de vocerías y medios",
        description:
          "Gestión proactiva de prensa, tribunas de opinión especializadas y posicionamiento en temas clave de la agenda pública.",
      },
    ],
  },
  {
    num: "04",
    name: "Evaluar",
    short: "Medir resultados, evaluar cumplimiento de KPIs y calibrar el impacto.",
    goal: "Medir el impacto de las acciones y retroalimentar la estrategia.",
    description:
      "Nuestro modelo opera como un ciclo de retroalimentación continua. Evaluamos el cumplimiento de los KPIs, monitoreamos las conversaciones y medimos la evolución de la percepción pública de la marca. Esta información permite calibrar periódicamente la estrategia, optimizar la toma de decisiones y responder oportunamente a los cambios en el entorno.",
    items: [
      "Medición de objetivos y KPIs",
      "Monitoreo de reputación y medios",
      "Análisis de efectividad e impacto",
      "Calibración y mejora continua",
    ],
    deliverables: [
      {
        code: "04.1",
        title: "Medición de objetivos y KPIs",
        description:
          "Evaluación cuantitativa y cualitativa del alcance, cumplimiento de hitos y rendimiento de cada iniciativa.",
      },
      {
        code: "04.2",
        title: "Monitoreo de reputación y medios",
        description:
          "Seguimiento en tiempo real de cobertura, share of voice, tono editorial y evolución de la conversación digital.",
      },
      {
        code: "04.3",
        title: "Análisis de efectividad e impacto",
        description:
          "Informes de inteligencia reputacional para determinar la incidencia real de la comunicación en los objetivos del negocio.",
      },
      {
        code: "04.4",
        title: "Calibración y mejora continua",
        description:
          "Ajuste continuo de mensajes, canales y prioridades para asegurar que la estrategia evolucione junto al entorno.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Clientes por industria (slugs = public/logos, ver src/data/logos.json) */
/* ------------------------------------------------------------------ */

// TODO(checklist): validar autorización de uso de logos y escritura oficial.
export const industries = [
  {
    slug: "salud",
    name: "Salud",
    logos: [
      "labchile-teva", "abbott", "merck", "boehringer", "janssen", "jjmd", "organon", "grunenthal",
      "zoetis", "csl-behring", "adium", "virbac", "sanderson", "axon", "cien",
      "astrazeneca", "gsk", "o-boticario", "snab", "stiefel", "fundacion-san-cristobal", "fundacion-aire", "garden-house", "sochidiab",
    ],
  },
  {
    slug: "mineria-energia-industria",
    name: "Minería, energía e industria",
    logos: [
      "sierra-gorda", "yamana", "joy-global", "ausenco", "gardilcic", "jej", "mas-errazuriz", "geovita",
      "aeropuerto-diego-aracena", "sk-comsa", "comin", "eminic", "buffer", "aerotas", "kdm", "metecno",
      "chilemat", "engie", "solarity", "cce", "puerto-caldera",
    ],
  },
  {
    slug: "tecnologia",
    name: "Tecnología",
    logos: [
      "adobe", "xerox", "micron", "vertiv", "dynatrace", "arcserve", "ascenty", "kepler", "latamwin",
      "nubox", "atrapalo", "comscore", "atentus", "instituto-3ie", "finfast", "xentic",
    ],
  },
  {
    slug: "construccion-inmobiliario",
    name: "Construcción e inmobiliario",
    logos: [
      "tecsa", "henkel", "irc", "fundamenta", "paz",
      "absalon", "tres-l", "engel-volkers", "construtec", "basco", "grupo-isa", "ferbocar", "nexo",
    ],
  },
  {
    slug: "organizaciones",
    name: "Organizaciones",
    logos: [
      "union-europea", "bcn", "itpo", "embajada-india", "pnuma", "canal-13", "coanil", "conama", "coprin",
      "mujeres-empresarias", "olimpiadas-especiales",
    ],
  },
  {
    slug: "servicios-consumo-entretencion",
    name: "Servicios, consumo, retail y entretención",
    logos: [
      "scania", "infiniti", "gama-leasing", "baker-mckenzie", "sodexo", "triumph", "flores", "emma", "disal", "kdm",
      "muelles-de-penco", "brunapoli", "oktoberfest", "expo-mujer", "feria-naciones", "expo-reciclaje", "expo-india",
      "diwali", "grupo-security", "afp-uno", "grupo-planeta", "paccari", "seleccion-croacia",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Casos                                                               */
/* ------------------------------------------------------------------ */

export type Case = {
  slug: string;
  client: string;
  /** Tipo de trabajo (p. ej. "Posicionamiento B2B"). */
  area: string;
  /** Título opcional cuando el cliente no basta (p. ej. Congreso Nacional). */
  title?: string;
  /** Párrafos del caso: el primero es el contexto/desafío; el último se destaca en la tarjeta. */
  body: string[];
  image: string;
  imageAlt: string;
  /** "contain" para piezas con texto o logos (no se recortan). */
  imageFit?: "contain";
};

// Casos definitivos: casos_de_exitos.md (entregado por Headline). Orden de presentación en /casos-de-exito.
export const cases: Case[] = [
  {
    "slug": "laboratorio-chile",
    "client": "Laboratorio Chile / Teva",
    "area": "Posicionamiento de marca",
    "body": [
      "En una industria marcada por la desconfianza, la compañía busca ser reconocida por su aporte a la salud de los chilenos y al desarrollo del país, construyendo una relación de confianza con la ciudadanía.",
      "Para ello, trabajamos en su posicionamiento ante distintos grupos de interés, con foco en acceso y calidad, promoviendo el diálogo con actores del sector y la educación de los pacientes. Este trabajo ha contribuido a fortalecer su reconocimiento y confianza en Chile. Por tercer año consecutivo, la compañía se ubica entre los primeros lugares de Marca Ciudadana y Merco."
    ],
    "image": "/cases/laboratorio-chile.webp",
    "imageAlt": "Equipo de Laboratorio Chile / Teva en la premiación Humanizando la Salud 2024"
  },
  {
    "slug": "ascenty",
    "client": "Ascenty",
    "area": "Posicionamiento B2B",
    "body": [
      "Trabajamos en el posicionamiento de Ascenty en Chile, fortaleciendo su reconocimiento como proveedor de infraestructura de data centers y su relación con grupos de interés clave.",
      "En coordinación con su equipo regional, desarrollamos una estrategia de comunicaciones corporativas que combina la difusión de sus inversiones y proyectos, el posicionamiento de voceros y el relacionamiento con medios y otras audiencias, tanto en Chile como en instancias internacionales. Así, acercamos la industria de los centros de datos a sus grupos de interés y visibilizamos su aporte al desarrollo tecnológico, la economía y la conectividad del país."
    ],
    "image": "/cases/ascenty.webp",
    "imageAlt": "Equipo de Ascenty en sus instalaciones en Chile"
  },
  {
    "slug": "scania",
    "client": "Scania",
    "area": "Posicionamiento B2B",
    "body": [
      "Como socio estratégico en comunicaciones de Scania Chile, acompañamos a la compañía en el fortalecimiento de su reputación corporativa y el posicionamiento de sus soluciones para el transporte y otras industrias. La asesoría abarca su oferta de camiones, buses y motores marinos, con foco en innovación, eficiencia y sustentabilidad.",
      "Desarrollamos una estrategia que integra la comunicación de hitos y lanzamientos, el relacionamiento con la prensa y la vinculación con actores de la industria, incluyendo experiencias internacionales para periodistas en Brasil y Suecia. También desarrollamos proyectos como el libro conmemorativo de los 30 años de Scania en Chile, que recoge su historia y contribución al transporte nacional, reforzando su trayectoria y relación con grupos de interés clave."
    ],
    "image": "/cases/scania.webp",
    "imageAlt": "Equipo de Scania Chile junto a un camión de la marca"
  },
  {
    "slug": "abbott",
    "client": "Abbott",
    "area": "Educación al paciente y relacionamiento",
    "body": [
      "Acompañamos a Abbott en su posicionamiento de marca y en sus planes estratégicos anuales, bajo el concepto One Abbott. Nuestro foco está en la presencia sostenida en medios de amplio alcance y el desarrollo de campañas educativas sobre influenza, test de antígenos de COVID-19, TDAH y menopausia, entre otros temas.",
      "Este trabajo integra el relacionamiento con médicos especialistas, pacientes y periodistas de salud y ciencia, junto con instancias de capacitación que conectan el conocimiento médico con la labor informativa de los medios y la educación de los pacientes."
    ],
    "image": "/cases/abbott.webp",
    "imageAlt": "Equipo de Abbott en una actividad corporativa"
  },
  {
    "slug": "csl-behring-aeh",
    "client": "CSL Behring",
    "area": "Asuntos públicos",
    "body": [
      "El desafío fue lograr financiamiento estatal para un tratamiento biológico de alto costo para el angioedema hereditario (AEH), una enfermedad rara.",
      "Diseñamos una estrategia orientada a favorecer el diagnóstico, visibilizar el impacto de la enfermedad y promover su cobertura ante las autoridades. El trabajo integró el relacionamiento con grupos de interés, la articulación de vocerías, el impulso de una asociación de pacientes y la difusión de sus experiencias. Estas acciones contribuyeron a la incorporación de Berinert en el segundo decreto de la Ley Ricarte Soto, permitiendo el acceso de los pacientes al tratamiento bajo esta cobertura."
    ],
    "image": "/cases/csl-behring.webp",
    "imageAlt": "Encuentro con la Fundación Angioedema Hereditario Chile"
  },
  {
    "slug": "henkel",
    "client": "Henkel",
    "area": "Posicionamiento de marca y unidades de negocio",
    "body": [
      "Desde hace varios años acompañamos a la marca en Chile en el fortalecimiento de su liderazgo en innovación y sustentabilidad, visibilizando su aporte al desarrollo de distintas industrias. Nuestra asesoría integra el posicionamiento de voceros y la comunicación de sus iniciativas corporativas, innovaciones y lanzamientos.",
      "También desarrollamos campañas para dar a conocer sus adhesivos industriales y de consumo masivo, combinando gestión de prensa, colaboración con influencers y actividades en terreno. Este trabajo se complementa con el monitoreo permanente del entorno para anticipar y alertar sobre situaciones que puedan afectar a la compañía."
    ],
    "image": "/cases/henkel.webp",
    "imageAlt": "Equipo de Henkel en sus oficinas en Chile"
  },
  {
    "slug": "gardilcic",
    "client": "Constructora Gardilcic",
    "area": "Comunicaciones estratégicas y gestión de riesgos",
    "body": [
      "Desde hace varios años asesoramos a la alta dirección en la protección y el fortalecimiento de su reputación ante sus grupos de interés, integrando las comunicaciones estratégicas en las distintas áreas de la organización y alineándolas con sus objetivos de negocio.",
      "Desarrollamos un plan anual que combina el análisis del contexto y la anticipación de riesgos con acciones de relacionamiento, comunicación interna y preparación de equipos. A través de capacitaciones en comunicación efectiva, gestión de crisis y simulacros, fortalecemos las capacidades de la organización para responder ante escenarios complejos y mantener una comunicación coherente con sus distintas audiencias."
    ],
    "image": "/cases/gardilcic.webp",
    "imageAlt": "Jornada de capacitación con el equipo de Constructora Gardilcic"
  },
  {
    "slug": "fundamenta",
    "client": "Inmobiliaria Fundamenta",
    "area": "Comunicación interna y alineamiento",
    "body": [
      "En 2014 iniciamos una asesoría comunicacional para fortalecer la alineación y motivación de los equipos en torno a una cultura compartida y con propósito. Durante varios años diseñamos e implementamos campañas de cultura, valores y marca, junto con un sistema de comunicación abierto y participativo, adaptando plataformas y contenidos al crecimiento de la empresa y a los cambios del entorno.",
      "Este trabajo contribuyó a consolidar el rol del área de Personas en el cumplimiento de los objetivos de la organización y a alcanzar sus mejores resultados en clima laboral, comunicación interna y engagement."
    ],
    "image": "/cases/fundamenta.webp",
    "imageAlt": "Publicación del boletín interno de Fundamenta",
    "imageFit": "contain"
  },
  {
    "slug": "puerto-caldera",
    "client": "Puerto Caldera",
    "area": "Sustentabilidad y vinculación",
    "body": [
      "Nuestra misión fue posicionar al puerto como la principal plataforma portuaria de Atacama para las empresas del norte de Chile y Argentina, destacando sus condiciones climáticas favorables para la continuidad operacional. La asesoría también contempló la gestión de cuestionamientos ambientales y riesgos que pudieran afectar su operación y sus objetivos de desarrollo.",
      "Trabajamos con líderes de opinión y autoridades locales en torno a un plan de crecimiento y mejoramiento del sector. Mantuvimos una comunicación permanente con la comunidad mediante medios locales y redes sociales, acercando a la empresa a sus inquietudes y prioridades."
    ],
    "image": "/cases/puerto-caldera.webp",
    "imageAlt": "Pieza de la iniciativa Arriba Caldera con la comunidad",
    "imageFit": "contain"
  },
  {
    "slug": "tecsa",
    "client": "Grupo Tecsa",
    "area": "Posicionamiento y gestión de riesgos",
    "body": [
      "Acompañamos al Grupo Tecsa en el fortalecimiento de su marca, la gestión oportuna de riesgos y la identificación de oportunidades del entorno. Apoyamos los planes estratégicos de la Dirección mediante el relacionamiento y la comunicación con grupos de interés vinculados a proyectos de infraestructura, energía, desarrollo inmobiliario e industria.",
      "Esta asesoría abarcó proyectos como el Aeropuerto Diego de Aracena, las centrales hidroeléctricas Chacayes y La Confluencia, la Central Bocamina, la Autopista Costanera Norte, el Casino Monticello, el Mall Paseo Estación Central y Clínica Alemana, entre otros."
    ],
    "image": "/cases/tecsa.webp",
    "imageAlt": "Inauguración de un proyecto del Grupo Tecsa"
  },
  {
    "slug": "india-itpo",
    "client": "Embajada de la India en Chile / ITPO",
    "area": "Promoción de negocios Chile - India",
    "body": [
      "Impulsamos un programa de relaciones públicas para facilitar la llegada de empresas de la India a Chile, principalmente en tecnología y manufactura, y promover el intercambio comercial entre ambos países junto al organismo de promoción comercial de la India (ITPO).",
      "Durante cuatro años desarrollamos ruedas de negocios, encuentros empresariales, presentaciones ante cámaras y gremios, y contenidos para medios de negocios. Entre las iniciativas de mayor visibilidad estuvo la realización de tres versiones de EXPOINDIA, una vitrina abierta al público para acercar la cultura, los productos y la gastronomía de la India a Chile."
    ],
    "image": "/cases/india-itpo.webp",
    "imageAlt": "Publicación en prensa sobre la relación Chile-India y Expo India",
    "imageFit": "contain"
  },
  {
    "slug": "congreso-nacional",
    "client": "Congreso Nacional / BCN",
    "area": "Articulación pública-privada",
    "title": "Modernización del Congreso Nacional y vinculación ciudadana",
    "body": [
      "Participamos en un proyecto país orientado a modernizar la gestión parlamentaria mediante tecnología y procedimientos que agilizaran el estudio de proyectos y la tramitación de leyes. La iniciativa también buscó fortalecer la vinculación con la ciudadanía y facilitar la comprensión de la labor legislativa.",
      "BCN INNOVA, eje de este proyecto del BID, facilita el acceso de la comunidad a las leyes y a los proyectos en tramitación, acercando la información legislativa a las personas."
    ],
    "image": "/cases/congreso-nacional.webp",
    "imageAlt": "Logo de la Biblioteca del Congreso Nacional de Chile",
    "imageFit": "contain"
  },
  {
    "slug": "brunapoli",
    "client": "Brunapoli",
    "area": "Creación de marca",
    "body": [
      "El desafío fue crear una marca distintiva inspirada en Bruna, abuela del fundador y oriunda de Nápoles, Italia. Así nació Brunapoli, nombre de la cadena de pizzerías que se instaló en Chile y la región. Desarrollamos su logotipo, identidad visual, manual de marca y la aplicación de esta identidad en los locales, incorporando el corno como elemento identificatorio.",
      "Organizamos el lanzamiento del primer local en Lo Barnechea y desarrollamos encuentros con periodistas gastronómicos para dar a conocer la marca y su propuesta de pizza italiana."
    ],
    "image": "/cases/brunapoli.webp",
    "imageAlt": "Logotipo de Brunapoli, Vivere la pizza",
    "imageFit": "contain"
  },
  {
    "slug": "proyecto-aula",
    "client": "Proyecto Aula",
    "area": "Vinculación ciudadana",
    "title": "Boehringer Ingelheim",
    "body": [
      "Apoyamos una iniciativa de educación en salud animal y humana dirigida a comunidades vulnerables. Durante el primer año, trabajamos en colegios de San Pedro de Melipilla junto a la comunidad, acercando estos contenidos al entorno escolar."
    ],
    "image": "/cases/proyecto-aula.webp",
    "imageAlt": "Lanzamiento del Proyecto Aula de Boehringer Ingelheim en San Pedro de Melipilla"
  },
  {
    "slug": "proyecto-angels",
    "client": "Proyecto ANGELS",
    "area": "Vinculación ciudadana",
    "title": "Acción ACV",
    "body": [
      "Desde 2016, apoyamos la articulación de un proyecto multisectorial para promover el reconocimiento oportuno de los síntomas del accidente cerebrovascular (ACV) y contribuir a reducir sus consecuencias. En conjunto con el sistema público de salud, médicos y pacientes, desarrollamos una campaña de educación y difusión que incluyó una aplicación de ayuda, capacitaciones online y actividades en terreno."
    ],
    "image": "/cases/proyecto-angels.webp",
    "imageAlt": "Equipo del Proyecto ANGELS en una actividad de educación sobre el ACV"
  },
  {
    "slug": "hidrogeno-verde",
    "client": "Hidrógeno verde y su poder",
    "area": "Vinculación ciudadana",
    "title": "Fundación Chile & DUE",
    "body": [
      "Junto a Fundación Chile y la Delegación de la Unión Europea (DUE), trabajamos en el posicionamiento del hidrógeno verde, acercando el tema a distintas audiencias mediante una estrategia de comunicación en diversos canales."
    ],
    "image": "/cases/hidrogeno-verde.webp",
    "imageAlt": "Firma de acuerdos de hidrógeno verde entre Chile y la Unión Europea"
  }
];

// Casos destacados del Home.
export const featuredCases = ["laboratorio-chile", "scania", "abbott", "ascenty"];

/* ------------------------------------------------------------------ */
/* Equipo y reconocimientos                                            */
/* ------------------------------------------------------------------ */

export type Person = {
  name: string;
  role: string;
  bio?: string[];
  /** Ruta en /public/team, p. ej. "/team/ana-maria-matulic.webp" (retrato vertical 3:4). */
  photo?: string;
  /** true = espacio reservado: falta confirmar nombre, cargo y foto. */
  pending?: boolean;
};

// Socias, destacadas en /nosotros con retrato grande y biografía.
export const leadership: Person[] = [
  {
    name: "Ana María Matulic",
    role: "Socia directora y fundadora",
    photo: "/team/ana-maria-matulic.webp",
    bio: [
      "Periodista de la PUC y Magíster en Gestión de Negocios de la UAI. Cuenta con más de 25 años de trayectoria liderando la consultoría en comunicación estratégica, reputación corporativa y gestión de crisis para grandes empresas y organizaciones de industrias reguladas. Con amplia experiencia en el sector salud, construcción y minería.",
      "Su nivel de relacionamiento abarca la alta dirección, líderes gremiales y tomadores de decisiones a nivel nacional e internacional. Es miembro activo de Focco (Gremio de Comunicadores de Chile), ha actuado como jurado internacional en los prestigiosos Stevie Awards de comunicación estratégica y formó parte del proyecto de modernización del Congreso Nacional (BCN Innova, proyecto BID).",
    ],
  },
  {
    name: "María Ignacia Vargas",
    role: "Directora ejecutiva",
    photo: "/team/maria-ignacia-vargas.webp",
    bio: [
      "Periodista con estudios en comunicación corporativa. Cuenta con más de 12 años de experiencia liderando el diseño y ejecución de estrategias comunicacionales, orientadas a fortalecer el posicionamiento y el relacionamiento de diversas organizaciones mediante propuestas multiplataforma, con foco en la creación de valor.",
      "Ha trabajado con compañías como Copec, Forestal Arauco, SOFOFA Hub y Roche Pharma, entre otras. Su experiencia incluye manejo de crisis, relacionamiento con stakeholders, gestión de reputación corporativa y posicionamiento estratégico de marca.",
    ],
  },
];

// Resto del equipo: foto, nombre y cargo (retratos 3:4 en /public/team). Las socias van aparte (leadership).
export const team: Person[] = [
  { name: "Paula Pérez", role: "Directora de Cuentas", photo: "/team/paula-perez.webp" },
  { name: "Claudia Caro", role: "Directora de Cuentas", photo: "/team/claudia-caro.webp" },
  { name: "Consuelo Mejías", role: "Directora de Cuentas", photo: "/team/consuelo-mejias.webp" },
  { name: "María Fernanda Gil", role: "Directora de Cuentas", photo: "/team/maria-fernanda-gil.webp" },
  { name: "Valentina Mardones", role: "Ejecutiva de Cuentas", photo: "/team/valentina-mardones.webp" },
  { name: "Nicolás Gamboa", role: "Ejecutivo de Cuentas", photo: "/team/nicolas-gamboa.webp" },
  { name: "Pía Bobadilla", role: "Ejecutiva de Cuentas", photo: "/team/pia-bobadilla.webp" },
  { name: "Maximiliano Araya", role: "Ejecutivo de Cuentas", photo: "/team/maximiliano-araya.webp" },
  { name: "Sergio Baquedano", role: "Ejecutivo de Cuentas", photo: "/team/sergio-baquedano.webp" },
  { name: "Guido Ferrari", role: "Diseñador Gráfico", photo: "/team/guido-ferrari.webp" },
  { name: "Yolanda Bahamondes", role: "Administración y Finanzas", photo: "/team/yolanda-bahamondes.webp" },
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
    period: "2024, 2025 y 2026",
    body: "Obtenido por nuestro compromiso con la inclusión laboral de jóvenes en riesgo social, otorgado por Fundación Proyecto B y Fundación MC.",
  },
];

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

export const contactServices = [
  "Posicionamiento y reputación corporativa",
  "Prevención y gestión de crisis",
  "Relaciones institucionales y vinculación con grupos de interés",
  "Comunicación interna",
  "Vocerías y habilidades comunicacionales",
  "Otro motivo",
] as const;
