<template>
    <!-- Trending Playlist -->
    <div class="w-full h-[7%] flex justify-between items-center text-[#DBEDF3]">
        <div class="w-auto h-auto p-2 rounded-md bg-[#404B69] text-2xl">
            <NuxtLink to="/">
                <Icon icon="solar:arrow-left-linear" />
            </NuxtLink>
        </div>

        <h4 class="text-xl font-semibold">Now Playing</h4>

        <div class="w-auto h-auto p-2 rounded-md bg-[#404B69] text-2xl">
            <NuxtLink to="/search">
                <Icon icon="solar:rounded-magnifer-bold-duotone" />
            </NuxtLink>
        </div>
    </div>

    <div class="w-full h-[90%] center justify-normal flex-col gap-y-4">
        <div class="w-full h-1/2 center">
            <img class="w-3/4 h-3/4 object-center rounded-xl" :src="audio.trackImage" alt="trackImage">
        </div>

        <div class="w-full h-auto center flex-col truncate">
            <h4 class="font-semibold text-slate-300">{{ audio.tractName.split(" ").slice(0, 2).join(" ") }}</h4>
            <p class="text-sm text-slate-500">{{ audio.currentArtist }}</p>
        </div>

        <div class="w-full h-auto center gap-x-2">
            <p class="text-slate-300 text-sm">{{ ctimer }}</p>
            <div class="min-w-[80%] max-w-[80%] h-2 bg-slate-600 rounded-full relative">
                <input class="absolute top-0 left-0 h-full bg-white rounded-full w-full" type="range" v-model="progress" @click="HandleSeeker" min="0" max="100">
                <!-- <div class="absolute top-0 left-0 h-full bg-white rounded-full" :style="{ width: progress + '%' }"></div> -->
            </div>
            <p class="text-slate-300 text-sm">{{ etimer }}</p>
        </div>

        <div class="w-full h-auto center gap-x-6 text-[#DBEDF3]">
            <Icon class="text-2xl" icon="solar:skip-previous-bold" />
            <Icon @click="playorpause" class="text-6xl" :icon="audio.isPlaying ? 'solar:pause-circle-bold':'solar:play-circle-bold'" />
            <Icon class="text-2xl" icon="solar:skip-next-bold" />
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref, onMounted, watchEffect } from 'vue'

const player = ref(null)
const ctimer = ref('0:00')
const etimer = ref('0:00')
const progress = ref(0)
const { audio, playorpause } = usePlayer()

onMounted(() => {
    loadmetadata()
})

const timeupdate = () => {
    var minutes = Math.floor(audio.value.audio.currentTime / 60)
    var seconds = Math.floor(audio.value.audio.currentTime - minutes * 60)
    ctimer.value = minutes + ':' + seconds.toString().padStart(2, '0')
    progress.value = (audio.value.audio.currentTime / audio.value.audio.duration) * 100
}

const loadmetadata = () => {
    const duration = audio.value.audio.duration
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)
    etimer.value = minutes + ':' + seconds.toString().padStart(2, '0')
}

watchEffect(() => {
    if (audio.value.audio) {
        audio.value.audio.addEventListener('timeupdate', timeupdate)
        audio.value.audio.addEventListener('loadedmetadata', loadmetadata)
    }

    return () => {
        if (audio.value.audio) {
            audio.value.audio.removeEventListener('timeupdate', timeupdate)
            audio.value.audio.removeEventListener('loadedmetadata', loadmetadata)
        }
    }
})

function HandleSeeker() {
    var seekTime = (progress.value / 100) * audio.value.audio.duration;
    audio.value.audio.currentTime = seekTime
}
</script>