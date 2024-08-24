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
        <template v-if="audio.audio != null">
            <div class="w-full h-[55%] center p-4">
                <img class="size-auto object-center object-contain rounded-xl" :src="audio.TrackImage" alt="trackImage">
            </div>

            <div class="w-full h-auto center flex-col truncate">
                <h4 class="font-semibold text-slate-300 text-xl">{{ audio.TractName }}</h4>
                <p class="text-sm text-slate-500">{{ audio.CurrentArtist }}</p>
            </div>

            <div class="w-full h-auto center gap-x-2">
                <p class="text-slate-300 text-sm">{{ ctimer }}</p>
                <div class="min-w-[80%] max-w-[80%] h-2 bg-slate-600 rounded-full relative">
                    <input class="absolute top-0 left-0 h-full bg-white rounded-full w-full" type="range"
                        v-model="progress" @click="HandleSeeker" @touchmove="HandleSeeker" @touchend="HandleSeeker" @touchstart="HandleSeeker"
                        min="0" max="100">
                </div>
                <p class="text-slate-300 text-sm">{{ etimer }}</p>
            </div>

            <div class="w-full h-auto flex items-center gap-x-2">
                <h1 class="w-full text-center text-white">Next: <span class="text-emerald-500">{{ audio.Playlist[audio.nextSong].name }}</span></h1>
            </div>

            <div class="w-full h-auto center gap-x-6 text-[#DBEDF3]">
                <Icon @click="audio.audio.loop" class="text-2xl mr-6" icon="solar:infinity-linear" />
                <Icon class="text-2xl" icon="solar:skip-previous-bold" />
                <Icon @click="playorpause" class="text-6xl"
                    :icon="audio.isPlaying ? 'solar:pause-circle-bold' : 'solar:play-circle-bold'" />
                <Icon @click="nextSong(audio.CurrentTrack)" class="text-2xl" icon="solar:skip-next-bold" />

                <Icon @click="audio.shuffle = !audio.shuffle, NextTrack()" class="text-2xl ml-6" icon="solar:shuffle-linear" />

            </div>
        </template>
        <template v-else>
            <div class="w-full h-1/2 center">
                <div class="size-[300px] center bg-slate-300/20 rounded-md">
                    <Icon class="text-9xl text-slate-800" icon="solar:music-note-bold-duotone"></Icon>
                </div>
            </div>

            <div class="w-full h-auto center flex-col truncate">
                <h4 class="font-semibold text-slate-300">Not Playing</h4>
            </div>

            <div class="w-full h-auto center gap-x-2">
                <p class="text-slate-300 text-sm">0:00</p>
                <div class="min-w-[80%] max-w-[80%] h-2 bg-slate-600 rounded-full relative">
                    <input class="absolute top-0 left-0 h-full bg-white rounded-full w-full" type="range" value="0"
                        min="0" max="100">
                </div>
                <p class="text-slate-300 text-sm">0:00</p>
            </div>

            <div class="w-full h-auto center gap-x-6 text-[#DBEDF3]">
                <Icon class="text-2xl" icon="solar:skip-previous-bold" />
                <Icon class="text-2xl" icon="solar:skip-previous-bold" />
                <Icon class="text-6xl" :icon="audio.isPlaying ? 'solar:pause-circle-bold' : 'solar:play-circle-bold'" />
                <Icon class="text-2xl" icon="solar:skip-next-bold" />
            </div>
        </template>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref, onMounted, watchEffect } from 'vue'

const player = ref(null)
const ctimer = ref('0:00')
const etimer = ref('0:00')
const progress = ref(0)

const { audio, playorpause, nextSong, NextTrack } = usePlayer()

onMounted(() => {
    if (audio.value.isPlaying) {
        loadmetadata()
    }
})

const timeupdate = () => {
    var minutes = Math.floor(audio.value.audio.currentTime / 60)
    var seconds = Math.floor(audio.value.audio.currentTime - minutes * 60)
    ctimer.value = minutes + ':' + seconds.toString().padStart(2, '0')
    progress.value = (audio.value.audio.currentTime / audio.value.audio.duration) * 100

    // let mediaState = ({
    //     duration: audio.value.audio.duration,
    //     rate: 1,
    //     postion: audio.value.audio.currentTime
    // })

    // UpdateMediaSession(mediaState)
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

watch(() => ctimer.value, (time) => {
    if (time && time == etimer.value) {
        nextSong(audio.value.CurrentTrack)
    }
})

function HandleSeeker() {
    var seekTime = audio.value.audio.duration * (progress.value / 100)
    audio.value.audio.currentTime = seekTime
}
</script>