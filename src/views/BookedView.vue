<script setup lang="ts">
// /cita-confirmada: solo si agendó en las últimas 24 h (GhlCalendar guarda <prefijo>_booked_at).
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StepShell from '@/components/StepShell.vue'
import { IS_LOCAL, STORAGE_PREFIX } from '@/config/funnel'
import { BOOKED } from '@/content/copy'
import { useContactStore } from '@/stores/contact'

const router = useRouter()
const nombre = useContactStore().get().nombre

onMounted(() => {
  const bookedAt = Number(localStorage.getItem(`${STORAGE_PREFIX}_booked_at`))
  const recent = bookedAt > 0 && Date.now() - bookedAt < 24 * 60 * 60 * 1000
  if (!IS_LOCAL && !recent) router.replace('/')
})
</script>

<template>
  <StepShell>
    <template #hero>
      <span class="done__badge" aria-hidden="true"><i class="fa-solid fa-plane-arrival"></i></span>
      <h1>{{ nombre ? `¡Listo, ${nombre}!` : '¡Listo!' }} {{ BOOKED.title }}</h1>
      <p class="hero-sub">{{ BOOKED.sub }}</p>
    </template>

    <section class="done">

      <ol class="done__steps" role="list">
        <li v-for="s in BOOKED.steps" :key="s.title">
          <i :class="s.icon" aria-hidden="true"></i>
          <div>
            <strong>{{ s.title }}</strong>
            <p>{{ s.text }}</p>
          </div>
        </li>
      </ol>
    </section>
  </StepShell>
</template>

<style scoped lang="scss">
.done__badge {
  display: inline-grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-bottom: 18px;
  border-radius: 50%;
  background: $cta;
  box-shadow: 0 0 0 10px rgba($cta-bright, 0.2);
  color: #fff;
  font-size: 1.5rem;
}

.done__steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    gap: 16px;
    padding: 20px;
    border: 1px solid $line;
    border-left: 5px solid $accent;
    border-radius: $radius-md;
    background: $raised;
    box-shadow: 0 10px 30px rgba($surface-dark, 0.08);
  }

  i {
    margin-top: 3px;
    color: $accent-dark;
    font-size: 1.2rem;
  }

  strong {
    font-family: $font-head;
  }

  p {
    color: $ink-muted;
    font-size: 0.92rem;
  }
}
</style>
