import { defineStore } from 'pinia'
import { ref } from 'vue'
import { META_PIXEL_ID, STORAGE_PREFIX } from '@/config/funnel'

export interface Contact {
  nombre: string
  apellido: string
  email: string
  /** E.164: +593991112233 */
  telefono: string
  pais: string
  ciudad: string
  timestamp?: number
}

/**
 * Coincidencias avanzadas manuales del Pixel: re-inicia el pixel con los datos del contacto
 * (el Pixel los normaliza y cifra con SHA-256 antes de enviarlos). Llamar ANTES del fbq('track').
 */
export function pixelUserData(c: Partial<Pick<Contact, 'email' | 'telefono' | 'nombre' | 'apellido' | 'ciudad'>>) {
  const w = window as unknown as { fbq?: (...a: unknown[]) => void }
  if (!META_PIXEL_ID || !w.fbq || !c.email) return
  const data: Record<string, string> = { em: c.email.trim().toLowerCase() }
  const ph = (c.telefono ?? '').replace(/\D/g, '')
  if (ph) data.ph = ph
  if (c.nombre) data.fn = c.nombre.trim().toLowerCase()
  if (c.apellido) data.ln = c.apellido.trim().toLowerCase()
  if (c.ciudad) data.ct = c.ciudad.trim().toLowerCase()
  w.fbq('init', META_PIXEL_ID, data)
}

const STORAGE_KEY = `${STORAGE_PREFIX}_contact`
const empty = (): Contact => ({ nombre: '', apellido: '', email: '', telefono: '', pais: '', ciudad: '' })

export const useContactStore = defineStore('contact', () => {
  const contact = ref<Contact>(empty())

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) Object.assign(contact.value, JSON.parse(stored))
    pixelUserData(contact.value)
  } catch {
    /* ignorar */
  }

  function save(data: Partial<Contact>) {
    Object.assign(contact.value, data, { timestamp: Date.now() })
    pixelUserData(contact.value)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contact.value))
    } catch {
      /* ignorar */
    }
  }

  const get = (): Contact => ({ ...contact.value })
  const has = () => !!contact.value.email && !!contact.value.nombre

  return { contact, save, get, has }
})
