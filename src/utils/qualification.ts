// Modelo de cualificación del funnel: UNA sola fuente de verdad.
// Para un cliente nuevo solo se editan QUESTIONS, OBJETIVO y la regla de qualifies().
// Salen del cierre del VSL / de lo que el cliente define como "sí es cliente" (no inventar).
//
// Cada respuesta viaja a GHL como `<key>` (valor interno) y `<key>_label` (texto legible:
// es el que se mapea en los campos personalizados). Ver references/contrato-ghl.md de la skill.
// Los `value` son estables: si GHL ya está mapeado, NO renombrarlos (solo agregar).

export interface QuestionOption {
  value: string
  label: string
}

export interface Question {
  key: string
  title: string
  /** Etiqueta corta para la nota del CRM */
  noteLabel: string
  options: readonly QuestionOption[]
}

export const QUESTIONS = [
  {
    key: 'quien',
    title: '¿Quién está llenando este formulario?',
    noteLabel: 'Quién llena',
    options: [
      { value: 'padre_madre', label: 'Papá o mamá' },
      { value: 'familiar', label: 'Otro familiar a cargo' },
      { value: 'estudiante', label: 'Soy el estudiante' },
    ],
  },
  {
    key: 'edad',
    title: '¿Qué edad tiene tu hijo o hija?',
    noteLabel: 'Edad',
    options: [
      { value: 'menor_13', label: 'Menos de 13 años' },
      { value: '13_15', label: 'Entre 13 y 15 años' },
      { value: '16_17', label: 'Entre 16 y 17 años' },
      { value: 'mayor_18', label: '18 años o más' },
    ],
  },
  {
    key: 'viaje',
    title: '¿Cuándo les gustaría que viaje?',
    noteLabel: 'Cuándo viaja',
    options: [
      { value: 'costa', label: 'Vacaciones escolares ciclo Costa (marzo 2027)' },
      { value: 'sierra', label: 'Vacaciones escolares ciclo Sierra (julio 2027)' },
      { value: 'siguiente_ciclo', label: 'En un siguiente ciclo escolar' },
      { value: 'no_sabe', label: 'Todavía no sabemos' },
    ],
  },
  {
    key: 'inversion',
    title:
      'Los programas tienen una inversión aproximada de $4.000 a $7.000, según el destino y la duración, con facilidades de pago. ¿Es algo que pueden considerar?',
    noteLabel: 'Inversión',
    options: [
      { value: 'si', label: 'Sí' },
      { value: 'facilidades', label: 'Sí, con facilidades de pago (depósitos o tarjeta de crédito)' },
      { value: 'no', label: 'Por ahora no' },
    ],
  },
] as const satisfies readonly Question[]

/** Último paso: pregunta abierta (va a GHL como `objetivo`). */
export const OBJETIVO = {
  title: '¿Qué esperan de este viaje?',
  placeholder: 'Ej.: que mejore su inglés, gane independencia y viva algo distinto en un grupo cuidado',
  minWords: 5,
}

export type QuestionKey = (typeof QUESTIONS)[number]['key']
export type Answers = Record<QuestionKey, string>

export const emptyAnswers = (): Answers =>
  Object.fromEntries(QUESTIONS.map((q) => [q.key, ''])) as Answers

export function labelFor(key: QuestionKey, value: string): string {
  const q = QUESTIONS.find((x) => x.key === key)
  return q?.options.find((o) => o.value === value)?.label ?? value
}

// ── Regla de cualificación ────────────────────────────────────────────────────
// Aprobada con el usuario (4-nov-2026): no califica quien llena siendo el estudiante (no decide),
// fuera del rango de edad, o sin posibilidad de inversión. "Cuándo viaja" no descalifica.
const DISQUALIFY: Partial<Record<QuestionKey, readonly string[]>> = {
  quien: ['estudiante'],
  edad: ['menor_13', 'mayor_18'],
  inversion: ['no'],
}

export function qualifies(a: Answers): boolean {
  return (Object.keys(DISQUALIFY) as QuestionKey[]).every(
    (k) => !(DISQUALIFY[k] ?? []).includes(a[k]),
  )
}
