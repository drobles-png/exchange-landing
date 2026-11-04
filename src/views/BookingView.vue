<script setup lang="ts">
// /agendar: calendario de GHL (GhlCalendar: alto automático, prefill y Schedule + etapa
// cita_agendada). Solo para quien calificó (en localhost se puede abrir directo para diseñar).
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GhlCalendar from '@/components/GhlCalendar.vue'
import StepShell from '@/components/StepShell.vue'
import { GHL_BOOKING_CALENDAR, IS_LOCAL, STORAGE_PREFIX } from '@/config/funnel'
import { BOOKING } from '@/content/copy'
import { useContactStore } from '@/stores/contact'

const router = useRouter()
const contact = useContactStore().get()

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
