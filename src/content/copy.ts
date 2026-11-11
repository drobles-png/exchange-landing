// Textos de la página. Un cliente nuevo edita SOLO este archivo (y config/funnel.ts).
// Todo lo que está entre [corchetes] es un marcador: reemplazar con lo que dice el VSL del cliente.
// No inventar cifras, testimonios, garantías ni bonos.
import { BRAND_NAME, PERSON_NAME } from '@/config/funnel'

export const SEO = {
  landing: {
    title: `${BRAND_NAME} | Intercambio para tu hijo, en buenas manos`,
    description: 'Programas de intercambio para adolescentes en Estados Unidos, Inglaterra, Canadá e Italia, en grupos pequeños y acompañados por educadores.',
  },
  video: { title: `Mira el video | ${BRAND_NAME}`, description: 'Karla Molina te cuenta cómo cuidamos a cada estudiante que viaja con Exchange Ecuador.' },
  booking: { title: `Agenda tu reunión | ${BRAND_NAME}`, description: 'Elige el día y la hora.' },
  booked: { title: `Reunión confirmada | ${BRAND_NAME}`, description: 'Tu reunión está confirmada.' },
  noSpace: { title: `Todavía no es el momento | ${BRAND_NAME}`, description: 'Gracias por tu interés.' },
  pago: { title: `Confirma tu lugar | ${BRAND_NAME}`, description: 'Completa tu inscripción.' },
  confirmada: { title: `Inscripción confirmada | ${BRAND_NAME}`, description: 'Tu lugar está confirmado.' },
  privacy: { title: `Política de privacidad | ${BRAND_NAME}`, description: `Política de privacidad de ${BRAND_NAME}.` },
  legal: { title: `Aviso legal | ${BRAND_NAME}`, description: `Aviso legal de ${BRAND_NAME}.` },
}

// ── Landing (/) ───────────────────────────────────────────────────────────────
export const LANDING = {
  urgency: 'Programas de marzo (colegios de la Costa): varios grupos ya se están llenando',
  topbarTag: 'Intercambios para adolescentes · 13 años',
  eyebrow: 'Para papás y mamás que piensan en un intercambio',
  headline: 'Cuando tu hijo esté lejos de ti,',
  headlineAccent: '¿quién lo va a cuidar?',
  sub: `Es exactamente la pregunta correcta. ${PERSON_NAME}, cofundadora de ${BRAND_NAME}, te cuenta cómo cuidamos a cada estudiante: desde que deciden hasta que lo vuelves a abrazar en el aeropuerto.`,
  checks: ['Viaja con educadores', 'Grupos pequeños', 'Destinos visitados en persona', 'Te asesoramos con la visa'],
  videoBar: `Video de ${PERSON_NAME}`,
  videoCaption: `Cofundadora · ${BRAND_NAME}`,
  cupos: 'Cupos limitados por grupo',
  cta: 'Ver el video completo',
  ctaNote: 'Sin costo · Te pedimos tus datos para mostrarte el video',

  stats: [
    { value: '13', unit: 'años', text: 'llevando estudiantes al extranjero' },
    { value: '4', unit: 'países', text: 'Estados Unidos, Inglaterra, Canadá e Italia' },
    { value: '2', unit: 'salidas', text: 'Marzo para la Costa, julio para la Sierra' },
  ],

  founders: {
    eyebrow: 'Quiénes somos',
    quote: '¿Enviaríamos aquí a nuestros propios hijos?',
    sign: 'La pregunta que nos hacemos antes de cada viaje, igual que el primer día.',
    text: 'Hace 13 años, Karla y Majo fundaron Exchange Ecuador para que los chicos vivan una experiencia en el extranjero que les cambie la vida, con la tranquilidad que solo puede dar alguien que entiende de educación y de adolescentes. Empezaron con un solo destino, San Diego: lo conocieron, lo cuidaron y lo hicieron bien antes de pensar en el siguiente. Hoy crecen solo cuando están seguras de poder cuidar igual de bien a cada chico.',
    people: 'Karla Molina y Majo · Fundadoras',
  },



  destinations: {
    eyebrow: 'Destinos',
    title: 'Dónde estamos hoy',
    sub: 'Cada destino tiene su propia personalidad. En la reunión te ayudamos a elegir el que va mejor con tu hijo.',
    items: [
      { key: 'usa', code: 'USA', country: 'Estados Unidos', places: 'San Diego · Madison · Boston', text: 'Vive el estilo de vida americano y perfecciona tu inglés.', calendar: 'Costa · Sierra', alt: 'Puente de Coronado en la bahía de San Diego' },
      { key: 'inglaterra', code: 'ENG', country: 'Inglaterra', places: '', text: 'Inglés con la cultura británica de cerca, viviendo en residencia.', calendar: 'Costa · Sierra', alt: 'Radcliffe Camera en Oxford, Inglaterra' },
      { key: 'canada', code: 'CAN', country: 'Canadá', places: 'Vancouver', text: 'Vive la diversidad cultural canadiense y mejora tu inglés en Vancouver.', calendar: 'Costa', alt: 'Vista aérea de Vancouver' },
      { key: 'italia', code: 'ITA', country: 'Italia', places: '', text: 'Descubre el arte, la historia y la gastronomía italiana mientras aprendes el idioma.', calendar: 'Costa · Sierra', alt: 'Catedral de Santa María del Fiore en Florencia' },
    ],
    note: 'Colegios de la Costa: salidas en marzo · Colegios de la Sierra: salidas en julio',
    credit: 'Fotos referenciales · Oxford: Julian Herzog, CC BY 4.0',
    cta: 'Quiero saber cuál le va mejor',
  },

  transformation: {
    eyebrow: 'La parte más bonita',
    title: 'Cuando vuelve, no vuelve igual',
    items: [
      { icon: 'fa-comments', title: 'Con un idioma que usa con confianza', text: 'No lo aprendió solo en un aula: lo vivió todos los días.' },
      { icon: 'fa-compass', title: 'Más independiente', text: 'El chico que antes te pedía todo ahora sabe organizarse, decidir y resolver.' },
      { icon: 'fa-person-hiking', title: 'Más seguro de sí mismo', text: 'Se demostró que puede estar lejos de casa y salir adelante.' },
      { icon: 'fa-earth-americas', title: 'Con otra mirada del mundo', text: 'Amigos de otros países y recuerdos que se le quedan para siempre.' },
    ],
    quote: '“No sé qué pasó allá, pero volvió otro.”',
    quoteBy: 'Lo que más nos dicen las familias cuando sus hijos regresan',
  },

  fit: {
    eyebrow: 'Antes de seguir',
    title: '¿Es para tu familia?',
    items: [
      { yes: true, text: 'Estás pensando en enviar a tu hijo o hija de intercambio y quieres saber quién lo cuida allá.' },
      { yes: true, text: 'Su colegio es de la Costa (programas en marzo) o de la Sierra (programas en julio).' },
      { yes: false, text: 'Buscas un programa en Nueva York, Londres o Toronto, o que viaje solo y sin acompañamiento.' },
    ],
  },

  closing: {
    eyebrow: 'Siguiente paso',
    title: 'Tu hijo merece vivir el mundo. Tú mereces la tranquilidad de saber que está en buenas manos.',
    sub: 'Mira el video y agenda una reunión: conocemos a tu familia, resolvemos tus dudas y te mostramos el programa que mejor se ajusta a ustedes. No tienes que decidir nada ese día.',
    cta: 'Ver el video completo',
  },

  sticky: { title: 'Cómo cuidamos a tu hijo', sub: `Video de ${PERSON_NAME}`, cta: 'Ver video' },
  disclaimer: 'Este sitio no está respaldado por Meta Platforms, Inc. ni forma parte de Facebook.',
}

// ── Modal de registro ─────────────────────────────────────────────────────────
export const REGISTRO = {
  eyebrow: 'Video de Karla Molina',
  title: 'Mira el video completo',
  sub: 'Déjanos tus datos y te mostramos cómo cuidamos a cada estudiante. Al final puedes agendar una reunión con nosotras.',
  submit: 'Ver el video completo',
  submitPago: 'Continuar',
  legal: 'Tus datos están seguros · No spam',
}

// ── /ver-video ────────────────────────────────────────────────────────────────
export const VIDEO = {
  step: 'Paso 1 de 2',
  eyebrow: `${PERSON_NAME} · ${BRAND_NAME}`,
  bar: `Video de ${PERSON_NAME}`,
  title: 'Cómo cuidamos a cada estudiante, desde que deciden hasta que vuelve a casa',
  sub: 'Quédate conmigo estos minutos. Al final puedes agendar una reunión con nosotras.',
  lockText: 'El botón se habilita en',
  cta: 'Agendar mi reunión',
  trust: 'Reunión sin costo · No tienes que decidir nada ese día',
}

// ── Cualificación (las preguntas están en utils/qualification.ts) ─────────────
export const CUALIFICACION = {
  eyebrow: 'Último paso',
  title: 'Cuéntanos de tu familia',
  sub: 'Una pregunta a la vez. Te toma un minuto.',
  consent: `Acepto que ${BRAND_NAME} me contacte por WhatsApp y correo, y acepto su`,
  submit: 'Ver horarios disponibles',
}

// ── /agendar ──────────────────────────────────────────────────────────────────
export const BOOKING = {
  step: 'Paso 2 de 2',
  title: 'Elige tu horario',
  sub: 'Conocemos a tu familia, resolvemos tus dudas y te mostramos el programa que mejor se ajusta a ustedes. Sin costo.',
  pending:
    'Estamos terminando de configurar el calendario. Te escribiremos por WhatsApp para coordinar tu reunión.',
}

// ── /cita-confirmada ──────────────────────────────────────────────────────────
export const BOOKED = {
  title: 'Tu reunión está confirmada',
  sub: 'Te enviamos los detalles a tu correo.',
  steps: [
    { icon: 'fa-solid fa-envelope', title: 'Revisa tu correo', text: 'Ahí tienes la fecha, la hora y el enlace.' },
    { icon: 'fa-brands fa-whatsapp', title: 'Te escribimos por WhatsApp', text: 'Para confirmar y resolver dudas antes.' },
    { icon: 'fa-solid fa-list-check', title: 'Piensen en el destino', text: 'Qué edad tiene tu hijo, qué destino le interesa y qué esperan de este viaje.' },
  ],
}

// ── /sin-espacio ──────────────────────────────────────────────────────────────
export const NO_SPACE = {
  title: 'Todavía no es el momento, y está bien',
  text: 'Por ahora nuestros programas no se ajustan a lo que nos contaste. Cuando sea el momento para tu familia, aquí estamos.',
  cooldown: 'Ya enviaste una solicitud. Podrás intentarlo de nuevo en',
  resourcesTitle: `Sigue aprendiendo con ${BRAND_NAME}`,
  resourcesText: 'Mira en Instagram cómo viven la experiencia nuestros estudiantes.',
}

// ── Pago (opcional) ───────────────────────────────────────────────────────────
export const PAGO = {
  step: 'Paso 2 de 2 · Confirma tu lugar',
  title: 'falta un paso para confirmar tu lugar',
  sub: 'Tu lugar queda reservado cuando completas el pago.',
  bullets: [] as string[], // Sin flujo de pago (PAYMENT_ENABLED = false)
  noLink: 'Recibimos tus datos. Te enviaremos el enlace de pago a tu WhatsApp y a tu correo.',
  whatsappMsg: (nombre: string) => `Hola, soy ${nombre}. Me registré y quiero completar mi pago.`,
}

export const CONFIRMADA = {
  title: 'Tu lugar está confirmado',
  steps: [
    { icon: 'fa-solid fa-envelope-open-text', text: 'Revisa tu correo: ahí te llega la confirmación y el acceso.' },
    { icon: 'fa-brands fa-whatsapp', text: 'Te escribiremos por WhatsApp antes de empezar.' },
  ],
  calendarTitle: '¿Prefieres que veamos tu caso? Agenda una reunión',
  calendarButton: 'Agendar una reunión',
}
