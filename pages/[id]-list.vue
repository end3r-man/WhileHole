<template>
  <div class="size-full center gap-y-4 flex-col">

    <template v-if="songList">
      <div class="w-full h-2/5 center flex-col">
        <img class="h-3/4 object-center object-scale-down rounded-box" :src="songList.image[2].url"
          alt="playlist-image">

        <h1 class="card-title mt-4">{{ songList.name }}</h1>
        <p class="w-full text-center line-clamp-1 px-8">{{ songList.description }}</p>


      </div>

      <div class="w-full h-3/5 flex items-center justify-start flex-col gap-y-4 pb-20 overflow-y-scroll no-scroll">
        <template v-for="(item, index) in songList.songs" :key="item.id">
          <SongCard @click="playSong(item, index)" :item="item" />
        </template>
      </div>
    </template>


  </div>
</template>

<script setup>
import { CapacitorHttp } from '@capacitor/core';

const {setSong, setPlayList, store} = usePlayer()
const route = useRoute()
const songList = ref(null)

onMounted(() => {
  fetchPlayList(route.params.id)
})

function playSong(params, index) {
  setSong(params)
  setPlayList(songList.value, index)
}

async function fetchPlayList(id) {

  const data = {
    url: 'https://jio-api-ten.vercel.app/api/playlists',
    params: { id: id, page: 0 }
  }

  try {
    const res = await CapacitorHttp.get(data)
    songList.value = res.data.data
  } catch (error) {
    console.log('unable to get playlist');
  }
}
</script>