<template>

    <template v-if="isPlaying">
        <NuxtLink to="/music">
            <div
                class="w-full h-20 absolute bottom-0 left-0 bg-[#404B69]/90 backdrop-blur-lg flex items-center justify-between gap-x-2 px-4 py-3">
                <div class="absolute top-0 left-0 h-[1px] bg-white" :style="{ width: progress + '%' }"></div>
                <img class="size-16 rounded-md" :src="audio.TrackImage" alt="song">

                <div class="h-full w-3/5 flex items-start justify-center flex-col truncate">
                    <h3 class="font-semibold text-slate-300">{{ audio.TractName }}</h3>
                    <p class="text-sm text-slate-500">{{ audio.CurrentArtist }}</p>
                </div>

                <Icon @click="playorpause" class="text-4xl text-slate-300"
                    :icon="isPaused ? 'solar:pause-circle-bold-duotone' : 'solar:play-circle-bold-duotone'" />
            </div>
        </NuxtLink>

    </template>

</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

const isPlaying = ref(false)
const isPaused = ref(false)
const progress = ref(0)
const { audio, playorpause } = usePlayer()

const timeupdate = () => {
    progress.value = (audio.value.audio.currentTime / audio.value.audio.duration) * 100
}

watchEffect(() => {
    if (audio.value.CurrentTrack !== null) {
        audio.value.audio.addEventListener('timeupdate', timeupdate)
        isPlaying.value = true
        isPaused.value = audio.value.isPlaying
    }

    return () => {
        if (audio.value.CurrentTrack !== null) {
            audio.value.audio.removeEventListener('timeupdate', timeupdate)
        }
    }
})

</script>