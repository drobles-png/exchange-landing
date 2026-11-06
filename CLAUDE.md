# Exchange Ecuador — funnel VSL (Bakano)

Landing de pauta en Meta para **Exchange Ecuador** (programas de intercambio para adolescentes).
Hecha con la skill `funnel-vsl-bakano` sobre `drobles-png/funnel-vsl-base`. Quien habla en el VSL:
**Karla Molina**, cofundadora (fundó la empresa con Majo hace 13 años). Público: papás y mamás.

Cliente activo en Bakano, **sin estrategia definida** en la ficha técnica: Dirección/PM deben
definirla (`estrategia_cliente`) antes de pautar.

## Stack
Vue 3 + Vite 7 + TypeScript · SCSS · Pinia · vue-router · pnpm · libphonenumber-js ·
Font Awesome 6 por CDN · Poppins + Montserrat + IBM Plex Mono (Google Fonts) · función de Vercel `api/capi.ts`.

## Comandos
`pnpm install` · `pnpm dev` (solo esta compu) · `pnpm dev:host` (también el celular, misma wifi) ·
`pnpm dev:api` (vercel dev, front + /api; requiere vincular el proyecto) · `pnpm type-check` · `pnpm build`

**Ojo en local:** los webhooks de GHL son reales y no tienen bloqueo en localhost → registrarse crea
un contacto real (usar `@bakano-test.com`). El pixel no carga en `localhost`, pero sí al entrar por la
IP de red (celular) → esas visitas ensucian el pixel del cliente. CAPI no corre con `pnpm dev`.

## Flujo
```
/ landing (VSL con miniatura) → RegistrationModal ── webhook contacto (registro) · CompleteRegistration
/ver-video  VSL Wistia, CTA bloqueado 100 s → QualificationModal ── webhook cualificación · Lead (si califica)
   ├─ califica    → /agendar (GhlCalendar) → /cita-confirmada   webhook contacto (cita_agendada) · Schedule
   └─ no califica → /sin-espacio (cooldown 24 h)
```
Sin flujo de pago (`PAYMENT_ENABLED = false`).

## Marca y diseño
- Marca del cliente (no el sistema de diseño personal): colores y tipografía de exchangeec.lat.
  Azul `#1d519d`, turquesa `#29b7b8`, navy `#0e182c`, degradado del logo; CTA naranja `#c94f00`
  (el `#ff6a00` de su web no da contraste AA con texto blanco; se usa solo decorativo como `$cta-bright`).
- Concepto visual: **el viaje** ("Travel to learn"): ruta de vuelo punteada, etiquetas mono tipo
  tarjeta de embarque, sello de pasaporte, video con
  forma de ticket. Tokens compartidos en `src/styles/tokens.scss` (`$navy-grad`, `$dots`, `eyebrow`).
- Pasos internos usan `StepShell.vue`: cabecera azul con slot `hero` (título) y el contenido se monta
  sobre su borde inferior.
- Logos: `src/assets/logos/exchange-logo{,-white}.png`. Miniatura del VSL: `src/assets/video/vsl-poster.webp`.
- Fotos de destinos `src/assets/destinos/*.webp`: San Diego, Vancouver y Florencia de la landing
  anterior del cliente; Oxford de Wikimedia (Julian Herzog, **CC BY 4.0**: el crédito al pie es obligatorio).
  No usar fotos de Londres: el VSL dice que no van a Londres, Nueva York ni Toronto.
- Revisión de accesibilidad (axe: contraste, tamaño táctil, labels) limpia en 390 px en todas las
  rutas y en los dos modales; sin scroll horizontal a 360/390 px.

## Landing (orden de secciones)
Barra de urgencia → hero (video) → cifras (13 años · 4 países · 2 salidas) → fundadoras → destinos con fotos → ¿es para tu familia? → cuando vuelve → cierre.
Todo el texto en `src/content/copy.ts` y sale del guion del VSL o de exchangeec.lat (calendario por destino).

## Config (`src/config/funnel.ts`)
| Qué | Valor |
|---|---|
| Pixel | `1686452036265578` |
| Webhook contacto | `…/hooks/87BqVzDuO6O9K9zBBmao/webhook-trigger/5KPtu4CkzPqkntDCREWI` |
| Webhook cualificación | `…/hooks/87BqVzDuO6O9K9zBBmao/webhook-trigger/CD2YQrdBrLDjCbgFTrG1` |
| Calendario GHL | `widget/booking/HHPFhOGb0YyPs2R4lULU` · frame `HHPFhOGb0YyPs2R4lULU_1793826720768` |
| Wistia | `kt29jg68bp` (1:55, "VSL Exchange") — **pendiente confirmar que es el VSL correcto** |
| CTA de /ver-video | se desbloquea a los 100 s |
| Storage / tag | prefijo `ex` · `funnel-exchange` |

Secretos solo en `.env.local` (ignorado por git) y en env vars de Vercel (Production y Preview):
`META_PIXEL_ID`, `META_CAPI_TOKEN`. `META_CAPI_TEST_EVENT_CODE` solo mientras se prueba en el Probador
de eventos; luego `vercel env rm … production --yes` y redeploy (ya quitado el 4-nov-2026).

## Producción
- https://exchange-ecuador.vercel.app (alias; `exchange-landing.vercel.app` era de otro proyecto)
- Repo https://github.com/drobles-png/exchange-landing (público) · Vercel `bakano-proyects/exchange-landing`,
  git conectado: cada push a `main` despliega.

## Cualificación (`src/utils/qualification.ts`) — aprobada con el usuario (4-nov-2026)
Preguntas: quién llena (`padre_madre`, `familiar`, `estudiante`) · edad del hijo (`menor_13`, `13_15`,
`16_17`, `mayor_18`) · cuándo viaja (`costa` = vacaciones ciclo Costa marzo 2027, `sierra` = ciclo Sierra
julio 2027, `siguiente_ciclo`, `no_sabe`) · inversión $4.000–$7.000 con facilidades de pago (`si`,
`facilidades`, `no`) · abierta "¿Qué esperan de este viaje?" (`objetivo`, mín. 5 palabras).
**No califica:** `estudiante`, edad `menor_13`/`mayor_18`, o inversión `no`. Los `value` son estables:
si GHL ya está mapeado, solo agregar, nunca renombrar. Al cambiar de año escolar, actualizar los años
de las opciones de `viaje` (solo el `label`).

## Envíos
| Momento | GHL (webhook · etapa) | Meta (Pixel + CAPI, mismo event_id) |
|---|---|---|
| Registro | contacto · `registro` (abandono con email/tel: `registro_parcial`) | CompleteRegistration |
| /ver-video | — | ViewContent |
| Cualificación | cualificación · `cualificacion` (+ `califica`, `resultado`, `*_label`, `objetivo`) | Lead (solo si califica) |
| Cita | contacto · `cita_agendada` | Schedule |

### Mapeo en GHL (lo configura el equipo; Claude no puede editar workflows)
Antes: desduplicación por **Email** y luego Phone. Campos personalizados "Una sola línea", objeto Contacto.
- **Flujo "obtener contacto"**: nombre/apellido/email/telefono/pais → campos estándar; fbclid, fbc,
  fbp, utm_* → personalizados con el mismo nombre; `nota` → Añadir nota; Si/si no por `etapa`
  (`registro`, `registro_parcial`, `cita_agendada`) → etiqueta fija por rama + mover oportunidad.
- **Flujo "obtener cualificación"**: `quien_label`, `edad_label`, `viaje_label`, `inversion_label`,
  `objetivo` → personalizados; `nota` → Añadir nota; Si/si no por `resultado` = `CALIFICA` →
  etiqueta fija `califica` / `no-califica` + notificación interna.
Nunca usar la variable `tags` como valor de etiqueta.

## Pruebas
- `e2e/agenda.json` (califica). Para no califica: misma secuencia con `quien=estudiante` y `wait_url` `/sin-espacio`.
- Selectores de opciones con comillas: `input[value='13_15']` (un valor que empieza con número rompe el CSS sin comillas).
- Estado (4-nov-2026): stub local OK. Producción modo `full`: Meta OK, los 4 eventos de Servidor
  "Deduplicado" en el Probador (mismo event_id que el Pixel, user_data completo). GHL (modo `ghl`, flujos
  publicados): los dos webhooks responden `request sent to trigger execution server` en registro,
  cualificación (CALIFICA y NO_CALIFICA) y cita. Contactos de prueba: prueba.califica@ y
  prueba.nocalifica@bakano-test.com (borrarlos en GHL).
- En producción el CTA se bloquea 100 s: para el e2e real agregar `{"wait": 102000}` después de /ver-video.
- El pixel trae el plugin `botblocking`: con HeadlessChrome NO envía eventos (no es un bug). Para ver el
  Pixel en modo `full`, correr el e2e con user-agent de celular real (monkeypatch de `Browser.new_context`).

## Pendientes del cliente (bloquean pauta)
- Confirmar el video (`kt29jg68bp` dura 1:55 y es el de Vancouver de su web; el guion dura ~6-7 min).
  Si cambia: actualizar `WISTIA_MEDIA_ID`, `CTA_UNLOCK_SECONDS` y la miniatura `vsl-poster.webp`.
- Legales: razón social, RUC, correo, ciudad (`LEGAL` en la config).
- Facebook de Exchange (`CLIENT.facebook`).
- Opcional: foto de Karla/Majo y permiso para usar los videos de estudiantes/padres de su web como testimonios.
- Definir estrategia en la ficha técnica de Bakano.

## Convenciones (el e2e depende de ellas)
- `data-field` en cada input: `nombre`, `apellido`, `email`, `phone`, `pais`, `objetivo`, `consent`.
- `data-cta="registro"` en cada botón que abre el registro; `data-cta="calificar"` en el CTA de /ver-video.
- Opciones de cualificación: `<label>` que envuelve `<input type="radio" value="…">`.
- Rutas privadas con `noindex` (y `Disallow` en `public/robots.txt`).
- Guards: `/agendar` exige contacto y haber calificado (en localhost no); `/cita-confirmada` exige cita < 24 h.

## localStorage / sessionStorage (`ex_…`)
`_contact` · `_qualification` · `_disq_at` · `_booked_at` · `_fb` (sessionStorage)
