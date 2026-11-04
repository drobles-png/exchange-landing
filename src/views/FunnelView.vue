<script setup lang="ts">
// Landing (/). Todo el texto sale de LANDING en src/content/copy.ts.
// Cada botón que abre el registro lleva data-cta="registro" (lo usa el e2e).
// Concepto visual: el viaje ("Travel to learn") — tarjetas de embarque, ruta punteada, sellos.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
import RegistrationModal from '@/components/RegistrationModal.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { IS_LOCAL, PERSON_NAME, STORAGE_PREFIX } from '@/config/funnel'
import { LANDING } from '@/content/copy'
import { captureFbParams } from '@/utils/fbclid'
import poster from '@/assets/video/vsl-poster.webp' // miniatura del video de Wistia
import imgUsa from '@/assets/destinos/usa.webp'
import imgInglaterra from '@/assets/destinos/inglaterra.webp'
import imgCanada from '@/assets/destinos/canada.webp'
import imgItalia from '@/assets/destinos/italia.webp'

const destImg: Record<string, string> = { usa: imgUsa, inglaterra: imgInglaterra, canada: imgCanada, italia: imgItalia }

const route = useRoute()
const router = useRouter()
const modalOpen = ref(false)
const showSticky = ref(false)

function openModal() {
  // Quien no calificó hace menos de 24 h vuelve a /sin-espacio
  if (!IS_LOCAL) {
    const disqAt = Number(localStorage.getItem(`${STORAGE_PREFIX}_disq_at`))
    if (disqAt && Date.now() - disqAt < 24 * 60 * 60 * 1000) {
      router.push('/sin-espacio')
      return
    }
  }
  modalOpen.value = true
}

const onScroll = () => (showSticky.value = window.scrollY > 700)

onMounted(() => {
  captureFbParams()
  window.addEventListener('scroll', onScroll, { passive: true })
  // /?editar=1 (desde "Corregir mis datos") reabre el registro con lo guardado
  if (route.query.editar) modalOpen.value = true
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const pad = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div class="landing">
    <p class="urgency"><span class="dot" aria-hidden="true"></span>{{ LANDING.urgency }}</p>

    <header class="topbar">
      <div class="wrap topbar__inner">
        <BrandLogo />
        <span class="topbar__tag">{{ LANDING.topbarTag }}</span>
      </div>
    </header>

    <!-- HERO -->
    <section class="hero" aria-labelledby="hero-title">
      <svg class="route-line" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 470 C 260 420, 340 120, 620 140 S 1040 60, 1220 20" />
      </svg>
      <div class="wrap hero__inner">
        <p class="stamp-chip"><i class="fa-solid fa-plane-departure" aria-hidden="true"></i>{{ LANDING.eyebrow }}</p>
        <h1 id="hero-title" class="hero__title">
          {{ LANDING.headline }} <span class="route-mark">{{ LANDING.headlineAccent }}</span>
        </h1>
        <p class="hero__sub">{{ LANDING.sub }}</p>
        <ul class="hero__checks" role="list">
          <li v-for="c in LANDING.checks" :key="c"><i class="fa-solid fa-check" aria-hidden="true"></i>{{ c }}</li>
        </ul>

        <div class="ticket">
          <div class="ticket__bar">
            <span><i class="fa-solid fa-plane" aria-hidden="true"></i> {{ LANDING.videoBar }}</span>
            <span class="ticket__vol"><i class="fa-solid fa-volume-high" aria-hidden="true"></i> Sube el volumen</span>
          </div>
          <button type="button" class="vsl" data-cta="registro" aria-label="Ver el video completo" @click="openModal">
            <img class="vsl__poster" :src="poster" alt="" width="1280" height="720" fetchpriority="high" />
            <span class="vsl__play" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
            <span class="vsl__hint">Haz clic para ver el video</span>
            <span class="vsl__caption">
              <strong>{{ PERSON_NAME }}</strong>
              <span>{{ LANDING.videoCaption }}</span>
            </span>
          </button>
        </div>

        <p class="cupos"><span class="dot" aria-hidden="true"></span>{{ LANDING.cupos }}</p>
        <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
          <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.cta }}
        </button>
        <p class="hero__note"><i class="fa-solid fa-lock" aria-hidden="true"></i> {{ LANDING.ctaNote }}</p>
      </div>
    </section>

    <!-- CIFRAS -->
    <section class="stats" aria-label="Exchange en cifras">
      <ul class="wrap stats__grid" role="list">
        <li v-for="s in LANDING.stats" :key="s.unit" class="stats__item">
          <span class="stats__value">{{ s.value }}<small>{{ s.unit }}</small></span>
          <span class="stats__text">{{ s.text }}</span>
        </li>
      </ul>
    </section>

    <!-- PREOCUPACIONES → RESPUESTAS (etiquetas de equipaje) -->
    <section class="section" aria-labelledby="pains-title">
      <div class="wrap">
        <p class="eyebrow">{{ LANDING.pains.eyebrow }}</p>
        <h2 id="pains-title" class="section__title">{{ LANDING.pains.title }}</h2>
        <p class="section__sub">{{ LANDING.pains.sub }}</p>
        <ul class="tags" role="list">
          <li v-for="(p, i) in LANDING.pains.items" :key="p.fear" class="tag">
            <span class="tag__num">{{ pad(i) }} / 04</span>
            <h3 class="tag__fear">“{{ p.fear }}”</h3>
            <p class="tag__answer">
              <span class="tag__label"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Lo que hacemos</span>
              {{ p.answer }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- FUNDADORAS -->
    <section class="founders" aria-labelledby="founders-title">
      <div class="wrap founders__inner">
        <div class="founders__quote">
          <p class="eyebrow">{{ LANDING.founders.eyebrow }}</p>
          <h2 id="founders-title">{{ LANDING.founders.quote }}</h2>
          <p class="founders__sign">{{ LANDING.founders.sign }}</p>
        </div>
        <div class="founders__story">
          <div class="passport-stamp" aria-hidden="true">
            <span>Primer destino</span>
            <strong>San Diego</strong>
            <span>13 años</span>
          </div>
          <p>{{ LANDING.founders.text }}</p>
          <p class="founders__people">{{ LANDING.founders.people }}</p>
        </div>
      </div>
    </section>

    <!-- DESTINOS (como "Destinos populares" de exchangeec.lat) -->
    <section class="destinos" aria-labelledby="dest-title">
      <div class="wrap">
        <div class="destinos__head">
          <p class="eyebrow eyebrow--light">{{ LANDING.destinations.eyebrow }}</p>
          <h2 id="dest-title" class="section__title">{{ LANDING.destinations.title }}</h2>
          <p class="destinos__sub">{{ LANDING.destinations.sub }}</p>
        </div>
        <ul class="dests" role="list">
          <li v-for="d in LANDING.destinations.items" :key="d.key" class="dest">
            <div class="dest__photo">
              <img :src="destImg[d.key]" :alt="d.alt" width="800" height="520" loading="lazy" decoding="async" />
              <span class="dest__code" aria-hidden="true"><i class="fa-solid fa-plane"></i> {{ d.code }}</span>
            </div>
            <div class="dest__body">
              <h3 class="dest__country">{{ d.country }}</h3>
              <p v-if="d.places" class="dest__places">{{ d.places }}</p>
              <p class="dest__text">{{ d.text }}</p>
              <p class="dest__cal"><small>Calendario</small>{{ d.calendar }}</p>
            </div>
          </li>
        </ul>
        <p class="destinos__note"><i class="fa-solid fa-calendar-days" aria-hidden="true"></i> {{ LANDING.destinations.note }}</p>
        <div class="destinos__cta">
          <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
            {{ LANDING.destinations.cta }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
          <p class="destinos__credit">{{ LANDING.destinations.credit }}</p>
        </div>
      </div>
    </section>

    <!-- ¿ES PARA TI? -->
    <section class="section" aria-labelledby="fit-title">
      <div class="wrap">
        <p class="eyebrow">{{ LANDING.fit.eyebrow }}</p>
        <h2 id="fit-title" class="section__title">{{ LANDING.fit.title }}</h2>
        <ul class="fit" role="list">
          <li v-for="(f, i) in LANDING.fit.items" :key="i" class="fit__item" :class="{ 'fit__item--no': !f.yes }">
            <i :class="['fa-solid', f.yes ? 'fa-circle-check' : 'fa-circle-xmark']" aria-hidden="true"></i>
            <p>
              <span class="sr-only">{{ f.yes ? 'Sí es para ti:' : 'No es para ti:' }}</span>
              {{ f.text }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- TRANSFORMACIÓN -->
    <section class="back-home" aria-labelledby="back-title">
      <div class="wrap">
        <p class="eyebrow eyebrow--light">{{ LANDING.transformation.eyebrow }}</p>
        <h2 id="back-title" class="section__title">{{ LANDING.transformation.title }}</h2>
        <ul class="back-home__grid" role="list">
          <li v-for="t in LANDING.transformation.items" :key="t.title">
            <i :class="['fa-solid', t.icon]" aria-hidden="true"></i>
            <h3>{{ t.title }}</h3>
            <p>{{ t.text }}</p>
          </li>
        </ul>
        <figure class="back-home__quote">
          <blockquote>{{ LANDING.transformation.quote }}</blockquote>
          <figcaption>{{ LANDING.transformation.quoteBy }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- CIERRE -->
    <section class="closing" aria-labelledby="closing-title">
      <svg class="route-line" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 60 C 300 40, 420 380, 700 360 S 1080 480, 1220 500" />
      </svg>
      <div class="wrap closing__inner">
        <p class="eyebrow eyebrow--light">{{ LANDING.closing.eyebrow }}</p>
        <h2 id="closing-title" class="closing__title">{{ LANDING.closing.title }}</h2>
        <p class="closing__sub">{{ LANDING.closing.sub }}</p>
        <p class="cupos"><span class="dot" aria-hidden="true"></span>{{ LANDING.cupos }}</p>
        <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
          <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.closing.cta }}
        </button>
      </div>
    </section>

    <SiteFooter :disclaimer="LANDING.disclaimer" />

    <!-- CTA fijo en celular -->
    <Transition name="sticky">
      <div v-if="showSticky && !modalOpen" class="sticky" role="region" aria-label="Ver el video">
        <div class="sticky__copy">
          <strong>{{ LANDING.sticky.title }}</strong>
          <span>{{ LANDING.sticky.sub }}</span>
        </div>
        <button type="button" class="btn" data-cta="registro" @click="openModal">
          {{ LANDING.sticky.cta }} <i class="fa-solid fa-play" aria-hidden="true"></i>
        </button>
      </div>
    </Transition>

    <RegistrationModal :open="modalOpen" @close="modalOpen = false" />
  </div>
</template>

<style scoped lang="scss">
@mixin mono-label {
  font-family: $font-mono;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.dot {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $cta-bright;
  box-shadow: 0 0 0 4px rgba($cta-bright, 0.25);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  50% {
    box-shadow: 0 0 0 7px rgba($cta-bright, 0);
  }
}

.urgency {
  @include mono-label;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0;
  padding: 9px 16px;
  background: $surface-dark;
  color: $ink-on-dark;
  font-size: 0.68rem;
  text-align: center;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid $line;
  background: rgba(#fff, 0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 64px;
  }

  &__tag {
    @include mono-label;
    color: $ink-muted;

    @media (max-width: 560px) {
      display: none;
    }
  }
}

// Ruta de vuelo punteada decorativa (hero y cierre)
.route-line {
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

// ── Hero ──────────────────────────────────────────────────────────────────────
.hero {
  position: relative;
  overflow: hidden;
  padding: 56px 0 72px;
  background:
    radial-gradient(60% 50% at 100% 100%, rgba($accent, 0.45), transparent 70%),
    $dots,
    $navy-grad;
  color: #fff;

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__title {
    max-width: 900px;
    margin-top: 22px;
    font-size: clamp(2.1rem, 6.6vw, 4rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.035em;
  }

  &__sub {
    max-width: 640px;
    margin: 20px 0 0;
    color: rgba(#fff, 0.88);
    font-size: 1.05rem;
  }

  &__checks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 22px;
    margin: 22px 0 36px;
    padding: 0;
    list-style: none;
    font-size: 0.9rem;
    font-weight: 500;

    i {
      margin-right: 6px;
      color: $accent-light;
    }
  }

  &__note {
    margin-top: 12px;
    color: rgba(#fff, 0.75);
    font-size: 0.82rem;
  }
}

.stamp-chip {
  @include mono-label;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 8px 14px;
  border: 1.5px dashed rgba($accent-light, 0.7);
  border-radius: 6px;
  color: $accent-light;
  font-size: 0.68rem;
}

// Tramo destacado del titular: subrayado punteado como ruta de vuelo
.route-mark {
  color: $accent-light;
  background: repeating-linear-gradient(90deg, $cta-bright 0 16px, transparent 16px 26px) left bottom / 100% 5px
    no-repeat;
  padding-bottom: 0.08em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

// Video con forma de tarjeta de embarque
.ticket {
  width: 100%;
  max-width: 820px;
  padding: 0 10px 10px;
  border-radius: $radius-lg;
  background: #fff;
  box-shadow: 0 30px 80px rgba($surface-dark, 0.45);

  &__bar {
    @include mono-label;
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 8px;
    color: $primary;
    font-size: 0.66rem;

    i {
      margin-right: 4px;
      color: $accent-dark;
    }

    // Perforación del ticket
    &::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 2px dashed $line;
    }
  }

  &__vol {
    color: $ink-muted;

    @media (max-width: 480px) {
      display: none;
    }
  }
}

.vsl {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 100%;
  margin-top: 10px;
  aspect-ratio: 16 / 9;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background:
    radial-gradient(50% 60% at 50% 45%, rgba($accent, 0.28), transparent 70%),
    $dots,
    $surface-dark;
  color: #fff;
  cursor: pointer;
  font: inherit;

  &__play {
    display: grid;
    place-items: center;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: $cta;
    font-size: 1.7rem;
    box-shadow:
      0 0 0 10px rgba($cta-bright, 0.22),
      0 12px 30px rgba(#000, 0.35);
    transition: transform 0.2s ease;
  }

  &:hover &__play {
    transform: scale(1.06);
  }

  &__poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }

  // Oscurece la miniatura para que se lean el play y la leyenda
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba($surface-dark, 0.15) 40%, rgba($surface-dark, 0.75) 100%);
  }

  &__play,
  &__hint,
  &__caption {
    z-index: 1;
  }

  &__hint {
    padding: 6px 12px;
    border-radius: 6px;
    background: rgba($surface-dark, 0.8);
    font-family: $font-head;
    font-size: 0.82rem;
    font-weight: 600;
  }

  &__caption {
    position: absolute;
    left: 16px;
    bottom: 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: rgba(#fff, 0.7);
    font-size: 0.78rem;

    strong {
      color: #fff;
      font-size: 0.92rem;
    }
  }
}

.cupos {
  @include mono-label;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 28px 0 14px;
  padding: 8px 14px;
  border: 1px solid rgba(#fff, 0.25);
  border-radius: 999px;
  background: rgba($surface-dark, 0.35);
  font-size: 0.66rem;
}

// ── Cifras ────────────────────────────────────────────────────────────────────
.stats {
  border-bottom: 1px solid $line;
  background: #fff;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-block: 0;
    padding: 0;
    list-style: none;

    @media (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 28px 24px;

    & + & {
      border-left: 2px dashed $line;

      @media (max-width: 720px) {
        border-top: 2px dashed $line;
        border-left: 0;
      }
    }
  }

  &__value {
    font-family: $font-head;
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
    color: $primary;

    small {
      @include mono-label;
      display: block;
      margin-top: 4px;
      color: $accent-dark;
      font-size: 0.68rem;
    }
  }

  &__text {
    color: $ink-muted;
    font-size: 0.92rem;
  }
}

// ── Secciones base ────────────────────────────────────────────────────────────
.section {
  padding: 88px 0;

  &__title {
    max-width: 760px;
    margin: 10px 0 0;
    font-size: clamp(1.75rem, 4.6vw, 2.6rem);
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  &__sub {
    max-width: 620px;
    margin-top: 14px;
    color: $ink-muted;
    font-size: 1.02rem;
  }
}

.eyebrow {
  @include mono-label;
  color: $accent-dark;

  &--light {
    color: $accent-light;
  }
}

// ── Preocupaciones: etiquetas de equipaje ─────────────────────────────────────
.tags {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin: 40px 0 0;
  padding: 0;
  list-style: none;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
}

.tag {
  position: relative;
  padding: 26px 26px 24px 64px;
  border: 1px solid $line;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 0 $line;

  // Ojal de la etiqueta
  &::before {
    content: '';
    position: absolute;
    top: 28px;
    left: 24px;
    width: 16px;
    height: 16px;
    border: 3px solid $primary-soft;
    border-radius: 50%;
    background: $surface;
  }

  &__num {
    @include mono-label;
    color: $ink-muted;
    font-size: 0.66rem;
  }

  &__fear {
    margin: 8px 0 16px;
    font-size: 1.3rem;
    font-weight: 700;
    color: $ink;
  }

  &__answer {
    padding-top: 14px;
    border-top: 2px dashed $line;
    color: $ink-muted;
    font-size: 0.95rem;
  }

  &__label {
    @include mono-label;
    display: block;
    margin-bottom: 6px;
    color: $accent-dark;
    font-size: 0.66rem;
  }
}

// ── Fundadoras ────────────────────────────────────────────────────────────────
.founders {
  padding: 88px 0;
  border-block: 1px solid $line;
  background: #fff;

  &__inner {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 56px;
    align-items: center;

    @media (max-width: 860px) {
      grid-template-columns: 1fr;
      gap: 72px;
    }
  }

  &__quote h2 {
    margin-top: 14px;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    color: $primary;

    &::before {
      content: '“';
      display: block;
      height: 0.55em;
      color: $accent;
      font-size: 2.2em;
      line-height: 1;
    }
  }

  &__sign {
    margin-top: 16px;
    color: $ink-muted;
  }

  &__story {
    position: relative;
    padding: 32px;
    border-radius: 16px;
    background: $surface;
    color: $ink-muted;
  }

  &__people {
    @include mono-label;
    margin-top: 18px;
    color: $primary;
  }
}

// Sello de pasaporte: flota para que el texto lo rodee
.passport-stamp {
  @include mono-label;
  float: right;
  shape-outside: circle(50%);
  margin: -64px -36px 8px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 118px;
  height: 118px;
  border: 2px solid $cta;
  border-radius: 50%;
  outline: 1.5px dashed rgba($cta, 0.6);
  outline-offset: -9px;
  background: rgba(#fff, 0.9);
  color: $cta;
  font-size: 0.56rem;
  text-align: center;
  transform: rotate(-12deg);

  strong {
    margin: 2px 0;
    font-family: $font-head;
    font-size: 0.95rem;
    letter-spacing: 0.02em;
  }

  @media (max-width: 860px) {
    margin-right: -12px;
  }
}

// ── Destinos ──────────────────────────────────────────────────────────────────
.destinos {
  padding: 96px 0;
  background: $primary;
  color: #fff;

  &__head {
    max-width: 720px;
    margin: 0 auto 48px;
    text-align: center;

    .section__title {
      margin-inline: auto;
    }
  }

  &__sub {
    margin-top: 14px;
    color: rgba(#fff, 0.85);
  }

  &__note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 32px;
    font-weight: 600;
    text-align: center;

    i {
      color: $accent-light;
    }
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin-top: 28px;
  }

  &__credit {
    color: rgba(#fff, 0.8);
    font-size: 0.72rem;
  }
}

.dests {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
}

.dest {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(#fff, 0.16);
  border-radius: 16px;
  background: rgba($surface-dark, 0.28); // más oscuro que la sección: contraste AA del texto
  transition: transform 0.25s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-4px);
    }
    &:hover img {
      transform: scale(1.05);
    }
  }

  &__photo {
    position: relative;
    overflow: hidden;
    aspect-ratio: 8 / 5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  &__code {
    @include mono-label;
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 6px 10px;
    border-radius: 6px;
    background: rgba($surface-dark, 0.78);
    color: #fff;
    font-size: 0.66rem;

    i {
      margin-right: 4px;
      color: $accent-light;
    }
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 20px 20px 22px;
  }

  &__country {
    font-size: 1.3rem;
    font-weight: 800;
  }

  &__places {
    margin-top: 4px;
    color: $accent-light;
    font-weight: 600;
    font-size: 0.9rem;
  }

  &__text {
    margin: 10px 0 18px;
    color: rgba(#fff, 0.82);
    font-size: 0.9rem;
  }

  &__cal {
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px dashed rgba(#fff, 0.25);
    font-family: $font-head;
    font-weight: 700;

    small {
      @include mono-label;
      display: block;
      margin-bottom: 2px;
      color: rgba(#fff, 0.82);
      font-size: 0.6rem;
    }
  }
}

// ── Transformación ────────────────────────────────────────────────────────────
.back-home {
  padding: 96px 0;
  background:
    radial-gradient(50% 60% at 0% 0%, rgba($surface-dark, 0.35), transparent 70%),
    $brand-gradient;
  color: #fff;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    margin: 40px 0 0;
    padding: 0;
    list-style: none;

    @media (max-width: 960px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 520px) {
      grid-template-columns: 1fr;
    }

    li {
      padding: 24px;
      border: 1px solid rgba(#fff, 0.22);
      border-radius: 14px;
      background: rgba($surface-dark, 0.18);
    }

    i {
      color: $accent-light;
      font-size: 1.5rem;
    }

    h3 {
      margin: 14px 0 6px;
      font-size: 1.08rem;
    }

    p {
      color: rgba(#fff, 0.88);
      font-size: 0.93rem;
    }
  }

  &__quote {
    max-width: 760px;
    margin: 56px auto 0;
    text-align: center;

    blockquote {
      margin: 0;
      font-family: $font-head;
      font-size: clamp(1.6rem, 4.4vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.15;
    }

    figcaption {
      @include mono-label;
      margin-top: 14px;
      color: #fff;
      opacity: 0.85;
    }
  }
}

// ── ¿Es para ti? ──────────────────────────────────────────────────────────────
.fit {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 36px 0 0;
  padding: 0;
  list-style: none;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }

  &__item {
    display: flex;
    gap: 14px;
    padding: 22px;
    border: 1px solid $line;
    border-left: 5px solid $accent;
    border-radius: 12px;
    background: #fff;

    i {
      margin-top: 3px;
      color: $accent-dark;
      font-size: 1.2rem;
    }

    &--no {
      border-left-color: $ink-muted;

      i {
        color: $ink-muted;
      }
    }
  }
}

// ── Cierre ────────────────────────────────────────────────────────────────────
.closing {
  position: relative;
  overflow: hidden;
  padding: 96px 0;
  background:
    radial-gradient(60% 60% at 50% 120%, rgba($accent, 0.4), transparent 70%),
    $dots,
    $surface-dark;
  color: #fff;

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__title {
    max-width: 820px;
    margin: 12px 0 16px;
    font-size: clamp(1.9rem, 5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.035em;
  }

  &__sub {
    max-width: 600px;
    color: rgba(#fff, 0.82);
  }

  .cupos {
    margin-top: 32px;
  }
}

// ── CTA fijo ──────────────────────────────────────────────────────────────────
.sticky {
  position: fixed;
  right: 12px;
  bottom: calc(12px + env(safe-area-inset-bottom));
  left: 12px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 8px 8px 20px;
  border: 1px solid $line;
  border-radius: 999px;
  background: #fff;
  box-shadow: $shadow-modal;

  &__copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
    font-size: 0.8rem;
    color: $ink-muted;

    strong {
      overflow: hidden;
      color: $ink;
      font-size: 0.9rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .btn {
    flex: none;
  }

  @media (min-width: 900px) {
    right: auto;
    left: 50%;
    width: 560px;
    transform: translateX(-50%);
  }
}

.sticky-enter-active,
.sticky-leave-active {
  transition:
    opacity 0.2s ease,
    translate 0.2s ease;
}
.sticky-enter-from,
.sticky-leave-to {
  opacity: 0;
  translate: 0 12px;
}

@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: none;
  }
}
</style>
