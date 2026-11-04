<script setup lang="ts">
// VSL de Wistia. Sin WISTIA_MEDIA_ID muestra un marcador (la página sigue funcionando).
import { onMounted } from 'vue'
import { WISTIA_MEDIA_ID } from '@/config/funnel'

onMounted(() => {
  if (!WISTIA_MEDIA_ID) return
  const add = (src: string, module = false) => {
    if (document.querySelector(`script[src="${src}"]`)) return
    const s = document.createElement('script')
    s.src = src
    s.async = true
    if (module) s.type = 'module'
    document.head.appendChild(s)
  }
  add('https://fast.wistia.com/player.js')
  add(`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`, true)
})

// Miniatura borrosa mientras carga el reproductor (igual que el código de inserción de Wistia)
const swatch = `url('https://fast.wistia.com/embed/medias/${WISTIA_MEDIA_ID}/swatch')`
</script>

<template>
  <div class="video">
    <wistia-player v-if="WISTIA_MEDIA_ID" :media-id="WISTIA_MEDIA_ID" aspect="1.7777777777777777" player-color="c94f00"></wistia-player>
    <div v-else class="video__pending">
      <i class="fa-solid fa-circle-play" aria-hidden="true"></i>
      <span>[Video del VSL: falta WISTIA_MEDIA_ID]</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
wistia-player:not(:defined) {
  display: block;
  padding-top: 56.25%;
  background: center / contain no-repeat v-bind(swatch);
  filter: blur(5px);
}

.video {
  overflow: hidden;
  border-radius: $radius-md;
  background: $surface-dark;
  aspect-ratio: 16 / 9;

  &__pending {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    height: 100%;
    padding: 16px;
    color: $ink-on-dark-muted;
    font-size: 0.9rem;
    text-align: center;

    i {
      font-size: 2.5rem;
      color: $ink-on-dark;
    }
  }
}
</style>
