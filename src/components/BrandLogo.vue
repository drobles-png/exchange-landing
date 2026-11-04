<script setup lang="ts">
import { BRAND_NAME } from '@/config/funnel'
import logo from '@/assets/logos/exchange-logo.png'
import logoWhite from '@/assets/logos/exchange-logo-white.png'

defineProps<{ light?: boolean }>()
</script>

<template>
  <img class="logo" :src="light ? logoWhite : logo" :alt="BRAND_NAME" height="34" />
</template>

<style scoped lang="scss">
.logo {
  display: block;
  width: auto;
  height: 34px;

  @media (max-width: 420px) {
    height: 28px;
  }
}
</style>
