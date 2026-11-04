<script setup lang="ts">
// Marco común de los pasos privados del funnel (/ver-video, /agendar, /cita-confirmada, …)
// Cabecera azul con la ruta punteada de la landing; el slot `hero` va dentro de ella
// y el contenido principal se monta encima del borde inferior (como el video del hero).
import BrandLogo from '@/components/BrandLogo.vue'
import SiteFooter from '@/components/SiteFooter.vue'

withDefaults(defineProps<{ step?: string; wide?: boolean }>(), { step: '', wide: false })
</script>

<template>
  <div class="shell">
    <header class="shell__band">
      <svg class="shell__route" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 360 C 260 330, 380 80, 640 110 S 1060 40, 1220 10" />
      </svg>
      <div class="shell__top">
        <RouterLink to="/" class="shell__home" aria-label="Volver al inicio">
          <BrandLogo light />
        </RouterLink>
        <p v-if="step" class="shell__step"><i class="fa-solid fa-plane" aria-hidden="true"></i> {{ step }}</p>
      </div>
      <div class="shell__hero" :class="{ 'shell__hero--wide': wide }">
        <slot name="hero" />
      </div>
    </header>
    <main class="shell__main" :class="{ 'shell__main--wide': wide }">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  &__band {
    position: relative;
    overflow: hidden;
    padding: 0 16px 104px;
    background:
      radial-gradient(60% 60% at 100% 100%, rgba($accent, 0.4), transparent 70%),
      $dots,
      $navy-grad;
    color: #fff;
  }

  &__route {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    path {
      fill: none;
      stroke: rgba($accent-light, 0.35);
      stroke-width: 2;
      stroke-dasharray: 2 10;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
  }

  &__top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    max-width: $content-width;
    margin: 0 auto;
    padding: 18px 0;
    border-bottom: 1px solid rgba(#fff, 0.12);
  }

  &__home {
    text-decoration: none;
  }

  &__step {
    @include eyebrow;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border: 1.5px dashed rgba($accent-light, 0.7);
    border-radius: 6px;
    color: $accent-light;
    font-size: 0.66rem;
  }

  &__hero {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
    padding-top: 40px;
    text-align: center;

    &--wide {
      max-width: 880px;
    }

    &:empty {
      display: none;
    }
  }

  &__main {
    position: relative;
    flex: 1;
    width: 100%;
    max-width: 600px;
    margin: -72px auto 0;
    padding: 0 16px 56px;

    &--wide {
      max-width: 880px;
    }
  }
}

// Títulos del slot hero (contenido del padre: se estilan con :slotted)
:slotted(h1) {
  font-size: clamp(1.7rem, 5.4vw, 2.6rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.035em;
}

:slotted(.hero-eyebrow) {
  @include eyebrow;
  margin-bottom: 12px;
  color: $accent-light;
}

:slotted(.hero-sub) {
  max-width: 560px;
  margin: 14px auto 0;
  color: rgba(#fff, 0.85);
}
</style>
