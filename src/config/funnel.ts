// Configuración del funnel. TODO lo que cambia entre clientes vive aquí.
// Regla: un valor vacío = esa integración se omite (nunca cae en la cuenta de otro cliente).
// Los textos de la página están en src/content/copy.ts; los colores en src/styles/tokens.scss.

// ── Cliente ───────────────────────────────────────────────────────────────────
export const CLIENT = {
  name: 'Exchange Ecuador',
  person: 'Karla Molina',
  instagram: 'https://www.instagram.com/exchange.ecuador/',
  facebook: '',
}

/** Nombre que se muestra en la página (wordmark, títulos, legales). */
export const BRAND_NAME = CLIENT.name || '[Marca]'
/** Quien habla en el VSL. */
export const PERSON_NAME = CLIENT.person || '[Nombre de quien habla]'

// Dominio público (canonical, og:url). Vacío = window.location.origin
export const SITE_URL = ''

// ── Meta ──────────────────────────────────────────────────────────────────────
// vite.config.ts inyecta el snippet del pixel en index.html con este id (vacío = sin pixel).
// CAPI lee el id y el token desde env vars de Vercel (META_PIXEL_ID, META_CAPI_TOKEN), nunca de aquí.
export const META_PIXEL_ID = '1686452036265578'

// ── GoHighLevel (subcuenta DEL CLIENTE) ───────────────────────────────────────
export const GHL_CONTACT_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/87BqVzDuO6O9K9zBBmao/webhook-trigger/5KPtu4CkzPqkntDCREWI' // "obtener contacto"
export const GHL_QUALIFICATION_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/87BqVzDuO6O9K9zBBmao/webhook-trigger/CD2YQrdBrLDjCbgFTrG1' // "obtener cualificación"
export const GHL_BOOKING_CALENDAR = 'https://api.leadconnectorhq.com/widget/booking/HHPFhOGb0YyPs2R4lULU' // URL del src del iframe del código de inserción
// Id del iframe en formato del código de inserción de GHL (<calendarId>_<timestamp>);
// form_embed.js lo usa para el alto automático. Cópialo del embed que manda el cliente.
export const GHL_BOOKING_FRAME_ID = 'HHPFhOGb0YyPs2R4lULU_1793826720768'

// ── Video ─────────────────────────────────────────────────────────────────────
export const WISTIA_MEDIA_ID = 'kyu7ho16w9'
// Segundos que el CTA de /ver-video queda bloqueado (0 = sin bloqueo). En localhost son 3 s.
export const CTA_UNLOCK_SECONDS = 90 // 1:30 del VSL (EXCHANGE_VSL_1, dura 8:02)

// ── Registro ──────────────────────────────────────────────────────────────────
// true = el formulario de registro pide ciudad (va a GHL como `ciudad`)
export const ASK_CITY = false
// País preseleccionado del teléfono (ISO 3166 alfa-2)
export const DEFAULT_COUNTRY = 'EC'

// ── Pago (OPCIONAL: solo funnels que cobran, ej. masterclass) ─────────────────
// false = las rutas /pago e /inscripcion-confirmada ni siquiera se registran.
export const PAYMENT_ENABLED = false
export const PRICE = 0
export const CURRENCY = 'USD'
export const PRODUCT_NAME = ''
// Link de la pasarela; debe redirigir al terminar a <dominio>/inscripcion-confirmada
export const PAYMENT_URL = ''
// WhatsApp de Exchange (formato 593987654321): botón de /agendar y respaldo de pago
export const WHATSAPP_NUMBER = '593967242424'

// ── Evento en vivo (OPCIONAL) ─────────────────────────────────────────────────
// ISO con zona: '2026-11-20T19:00:00-05:00'. Vacío = "Te avisamos la fecha por WhatsApp y correo"
export const EVENT_DATE = ''
export const EVENT_DURATION_MIN = 90

// ── Legal (páginas de privacidad y aviso legal) ───────────────────────────────
export const LEGAL = {
  razonSocial: '',
  ruc: '',
  ciudad: '',
  email: '',
}

// Prefijo de las claves de localStorage/sessionStorage (2-3 letras del cliente)
export const STORAGE_PREFIX = 'ex'

// Nombre del funnel para tags y notas de GHL ("funnel-micliente")
export const FUNNEL_TAG = 'funnel-exchange'

export const IS_LOCAL = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)

export function whatsappLink(text: string): string {
  if (!WHATSAPP_NUMBER) return ''
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export function priceLabel(): string {
  return `$${PRICE.toFixed(2)} ${CURRENCY}`
}

/** "jueves, 20 de noviembre, 19:00 (hora de Ecuador)" o el aviso si aún no hay fecha. */
export function eventDateLabel(): string {
  if (!EVENT_DATE) return 'Te avisamos la fecha por WhatsApp y correo'
  const d = new Date(EVENT_DATE)
  const tz = { timeZone: 'America/Guayaquil' } as const
  const fecha = d.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long', ...tz })
  const hora = d.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', ...tz })
  return `${fecha}, ${hora} (hora de Ecuador)`
}
