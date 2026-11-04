<script setup lang="ts">
// /sin-espacio: no calificó. Cooldown de 24 h (QualificationModal guarda <prefijo>_disq_at).
import { onMounted, ref } from 'vue'
import StepShell from '@/components/StepShell.vue'
import { CLIENT, STORAGE_PREFIX } from '@/config/funnel'
import { NO_SPACE } from '@/content/copy'

const hoursLeft = ref(0)

onMounted(() => {
  const disqAt = Number(localStorage.getItem(`${STORAGE_PREFIX}_disq_at`))
  const remaining = disqAt ? 24 * 3_600_000 - (Date.now() - disqAt) : 0
  if (remaining > 0) hoursLeft.value = Math.ceil(remaining / 3_600_000)
})
</script>

<template>
  <StepShell>
    <template #hero>
      <p v-if="hoursLeft > 0" class="ns__cooldown" role="status">
        <i class="fa-regular fa-clock" aria-hidden="true"></i> {{ NO_SPACE.cooldown }} {{ hoursLeft }} h
      </p>
      <h1>{{ NO_SPACE.title }}</h1>
      <p class="hero-sub">{{ NO_SPACE.text }}</p>
    </template>

    <section class="ns">

      <div v-if="CLIENT.instagram || CLIENT.facebook" class="ns__card">
        <h2>{{ NO_SPACE.resourcesTitle }}</h2>
        <p>{{ NO_SPACE.resourcesText }}</p>
        <a v-if="CLIENT.instagram" :href="CLIENT.instagram" target="_blank" rel="noopener noreferrer" class="btn">
          <i class="fa-brands fa-instagram" aria-hidden="true"></i> Ver Instagram
        </a>
        <a v-else :href="CLIENT.facebook" target="_blank" rel="noopener noreferrer" class="btn">
          <i class="fa-brands fa-facebook" aria-hidden="true"></i> Ver Facebook
        </a>
      </div>

      <RouterLink to="/" class="btn btn--ghost">
        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Volver al inicio
      </RouterLink>
    </section>
  </StepShell>
</template>

<style scoped lang="scss">
.ns {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;

  &__cooldown {
    @include eyebrow;
    display: inline-flex;
    gap: 8px;
    margin-bottom: 16px;
    padding: 8px 14px;
    border: 1px solid rgba(#fff, 0.25);
    border-radius: 999px;
    color: $accent-light;
    font-size: 0.64rem;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 28px 24px;
    border: 1px solid $line;
    border-radius: $radius-lg;
    background: $raised;
    box-shadow: 0 30px 80px rgba($surface-dark, 0.2);

    h2 {
      font-size: 1.25rem;
      font-weight: 800;
    }
    p {
      color: $ink-muted;
    }
  }
}
</style>
