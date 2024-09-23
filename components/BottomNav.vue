<template>
  <div class="btm-nav">
    <NuxtLink to="/" :class="(route.name == 'index') ? 'active text-primary' : ''">
      <Icon class="text-4xl" icon="solar:home-smile-bold" />
    </NuxtLink>
    <NuxtLink to="/search" :class="(route.name == 'search') ? 'active text-primary' : ''">
      <Icon class="text-4xl" icon="solar:rounded-magnifer-bold" />
    </NuxtLink>
    <NuxtLink to="/player" :class="(route.name == 'player') ? 'active text-primary' : ''">
      <Icon class="text-4xl" icon="solar:music-note-bold" />
    </NuxtLink>
    <NuxtLink to="/settings" :class="(route.name == 'settings') ? 'active text-primary' : ''">
      <Icon class="text-4xl" icon="solar:settings-bold" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
const route = useRoute()
</script>