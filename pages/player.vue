<template>
  <div class="w-full h-[calc(100%-90px)] flex items-center justify-start flex-col">

    <div class="w-full flex items-center justify-between">

      <NuxtLink to="/" class="btn btn-square btn-neutral">
        <Icon class="text-xl" icon="solar:alt-arrow-left-line-duotone" />
      </NuxtLink>

      <h1 class="card-title">Now Playing</h1>

      <NuxtLink to="/" class="btn btn-square btn-neutral">
        <Icon class="text-xl" icon="solar:menu-dots-bold" />
      </NuxtLink>

    </div>

    <div class="w-full h-3/5 flex items-center flex-col mt-8">
      <img class="w-full h-full rounded-box object-center object-cover" :src="store.audio ? store.trackImage : player"
        alt="player">
      <h1 class="card-title mt-4">{{ store.audio ? store.currentTrack : 'Play something' }}</h1>
      <p>{{ store.audio ? `${store.currentArtist}` : 'Artists' }}</p>
    </div>
    <div class="w-full h-2/5 flex items-center justify-evenly flex-col mt-6 gap-y-3">
      <div class="w-full center flex-col gap-y-2">
        <div class="w-full">
          <input type="range" @click="handleTouch" @touchmove="handleDrag" :disabled="!store.audio" min="0" max="100"
            :value="progress" class="range" />
        </div>
        <div class="w-full flex items-center justify-between">
          <span>{{ ctimer }}</span>
          <span>{{ store.audio ? etimer : '0:00' }}</span>
        </div>
      </div>
      <div class="w-full flex items-center justify-between">
        <button :disabled="!store.audio" @click="switchLoop()">
          <Icon class="text-2xl" :class="loop ? 'text-primary' : 'text-neutral'" icon="solar:infinity-bold" />
        </button>
        <div class="w-full center gap-x-4">
          <button :disabled="!store.audio" @click="skipTrack('previous')">
            <Icon class="text-3xl" icon="solar:skip-previous-bold" />
          </button>
          <button :disabled="!store.audio" @click="playOrPause()">
            <Icon class="text-7xl text-primary" :icon="store.isPlaying ? 'solar:pause-bold' : 'solar:play-bold'" />
          </button>
          <button :disabled="!store.audio" @click="skipTrack('next')">
            <Icon class="text-3xl" icon="solar:skip-next-bold" />
          </button>
        </div>
        <button :disabled="!store.audio">
          <Icon class="text-2xl text-neutral" icon="solar:shuffle-broken" />
        </button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import player from '@/assets/images/player.jpg';
import { CapacitorHttp } from '@capacitor/core';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref, onMounted, watchEffect } from 'vue';

const { store, playOrPause } = usePlayer();
const loop = ref(false);
const ctimer = ref('0:00');
const etimer = ref('0:00');
const progress = ref(0);

onMounted(() => {
  if (store.value.audio) {
    loadMetadata();
  }
});

const switchLoop = () => {
  store.value.audio.loop = !store.value.audio.loop;
  loop.value = store.value.audio.loop;
};

const loadMetadata = () => {
  if (!store.value.audio) return; // Guard clause
  const duration = store.value.audio.duration;
  etimer.value = formatTime(duration);
};

const timeUpdate = () => {
  if (!store.value.audio) return; // Guard clause
  ctimer.value = formatTime(store.value.audio.currentTime);
  progress.value = (store.value.audio.currentTime / store.value.audio.duration) * 100;
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const handleDrag = (e) => {
  updateProgress(e.touches[0].clientX, e.target);
};

const handleTouch = (e) => {
  updateProgress(e.clientX, e.target);
};

const updateProgress = (clientX, rangeInput) => {
  const rect = rangeInput.getBoundingClientRect();
  const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
  const newValue = percentage * 100;
  progress.value = newValue;
  store.value.audio.currentTime = (newValue / 100) * store.value.audio.duration;
};

const skipTrack = (direction) => {
  // Implement skip logic here
};

watchEffect(() => {
  if (store.value.audio) {
    store.value.audio.addEventListener('timeupdate', timeUpdate);
    store.value.audio.addEventListener('loadedmetadata', loadMetadata);
  }
  return () => {
    if (store.value.audio) {
      store.value.audio.removeEventListener('timeupdate', timeUpdate);
      store.value.audio.removeEventListener('loadedmetadata', loadMetadata);
    }
  };
});
</script>
