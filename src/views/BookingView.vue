<script setup lang="ts">
// /agendar: calendario de GHL (GhlCalendar: alto automático, prefill y Schedule + etapa
// cita_agendada). Solo para quien calificó (en localhost se puede abrir directo para diseñar).
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GhlCalendar from '@/components/GhlCalendar.vue'
import StepShell from '@/components/StepShell.vue'
import { GHL_BOOKING_CALENDAR, IS_LOCAL, STORAGE_PREFIX, whatsappLink } from '@/config/funnel'
import { BOOKING, bookingWhatsappMsg } from '@/content/copy'
import { useContactStore } from '@/stores/contact'

const router = useRouter()
const contact = useContactStore().get()

function storedViaje(): string {
  try {
    return JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}_qualification`) ?? '{}').viaje ?? ''
  } catch {
    return ''
  }
}
const whatsappHref = whatsappLink(bookingWhatsappMsg(contact.nombre ?? '', storedViaje()))

onMounted(() => {
  if (IS_LOCAL) return
  try {
    const q = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}_qualification`) ?? '{}')
    if (!q.califica) router.replace('/')
  } catch {
    router.replace('/')
  }
})
</script>

<template>
  <StepShell :step="BOOKING.step" wide>
    <template #hero>
      <p class="hero-eyebrow">Último paso</p>
      <h1>{{ BOOKING.title }}</h1>
      <p class="hero-sub">{{ BOOKING.sub }}</p>
    </template>

    <section class="booking">

      <GhlCalendar
        v-if="GHL_BOOKING_CALENDAR"
        :contacto="contact"
        @booked="router.push('/cita-confirmada')"
      />
      <div v-else class="booking__pending" role="status">
        <i class="fa-regular fa-calendar" aria-hidden="true"></i>
        <strong>Calendario en configuración</strong>
        <p>{{ BOOKING.pending }}</p>
      </div>

      <div v-if="whatsappHref" class="booking__wa">
        <p>{{ BOOKING.whatsappLead }}</p>
        <a :href="whatsappHref" target="_blank" rel="noopener noreferrer" class="btn btn--ghost booking__wa-btn" data-cta="whatsapp">
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> {{ BOOKING.whatsappButton }}
        </a>
      </div>
    </section>
  </StepShell>
</template>

<style scoped lang="scss">
.booking {
  padding: 10px;
  border-radius: $radius-lg;
  background: #fff;
  box-shadow: 0 30px 80px rgba($surface-dark, 0.25);
  text-align: center;

  &__wa {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin: 8px 0 0;
    padding: 24px 16px 18px;
    border-top: 1px dashed rgba($surface-dark, 0.15);

    p {
      color: $ink-muted;
      font-weight: 500;
    }
  }

  &__wa-btn i {
    color: #1a9e55; // verde WhatsApp (solo el ícono; el texto queda en $ink)
    font-size: 1.25rem;
  }

  &__pending {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 40px 24px;

    i {
      color: $primary;
      font-size: 2rem;
    }

    p {
      max-width: 440px;
      color: $ink-muted;
    }
  }
}
</style>
