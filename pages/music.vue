<template>
    <!-- Trending Playlist -->
    <section class="w-full h-12">
        <audio ref="player" class="w-full h-full block"
            src="https://aac.saavncdn.com/744/732a00170deeea7605bff368ab0c9199_320.mp4" @timeupdate="timeupdate"
            @loadedmetadata="loadmetadata"></audio>

        <div class="w-full h-full flex items-center justify-between">
            <p class="text-sm text-slate-600">{{ ctimer }}</p>
            <div class="w-full h-2 bg-slate-600 relative border border-teal-400">
                <div class="h-full bg-white absolute top-0 left-0 transition-all ease-linear" :style="{ width: progress + '%' }"></div>
            </div>
            <p class="text-sm text-slate-600">{{ etimer }}</p>
        </div>
        <button @click="palyorpause" class="px-4 py-2 bg-slate-600 rounded-md text-white capitalize">pause</button>
    </section>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'

const player = ref(null)
const ctimer = ref('0:00')
const etimer = ref('0:00')
const progress = ref(0)

onMounted(() => {
    player.value.play()
})

const timeupdate = () => {
    var minutes = Math.floor(player.value.currentTime / 60)
    var seconds = Math.floor(player.value.currentTime - minutes * 60)
    ctimer.value = minutes + ':' + seconds.toString().padStart(2, '0')
    progress.value = (player.value.currentTime / player.value.duration) * 100

}

const loadmetadata = () => {
    const duration = player.value.duration
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)
    etimer.value = minutes + ':' + seconds.toString().padStart(2, '0')
}

watchEffect(() => {
    if (player.value) {
        player.value.addEventListener('timeupdate', timeupdate)
        player.value.addEventListener('loadedmetadata', loadmetadata)
    }

    return () => {
        if (player.value) {
            player.value.removeEventListener('timeupdate', timeupdate)
            player.value.removeEventListener('loadedmetadata', loadmetadata)
        }
    }
})

function palyorpause() {
    if (!player.value.paused) {
        player.value.pause()
    } else {
        player.value.play()
    }
}
</script>