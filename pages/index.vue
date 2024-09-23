<template>
  <div class="size-full center gap-y-4 flex-col">

    <div class="carousel carousel-start h-[35%] space-x-4">

      <template v-for="item in playList">
        <NuxtLink :to="item.id+'-list'" class="carousel-item w-3/4">
          <img :src="item.image[2].url" class="h-full w-full rounded-box" />
        </NuxtLink>
      </template>

    </div>

    <div class="w-full h-[60%] flex items-center justify-start flex-col gap-y-4 pb-16 overflow-y-scroll no-scroll">

      <template v-for="item in trendingList">
        <SongCard @click="setSong(item)" :item="item" />
      </template>

    </div>

  </div>
</template>

<script setup>
import { CapacitorHttp } from '@capacitor/core';

const {setSong, store} = usePlayer()
const playList = ref(null)
const trendingList = ref(null)
onMounted(() => {
  fetchPlayList()
})


async function fetchPlayList() {

  const data = {
    url: 'https://jio-api-ten.vercel.app/api/search/playlists',
    params: { query: 'tamil', limit: 10, page: 0 }
  }

  try {
    const res = await CapacitorHttp.get(data)
    playList.value = res.data.data.results
  } catch (error) {
    console.log('unable to get playlist');
  }

  await fetchTrending(playList.value[0].id)
}

async function fetchTrending(params) {
  const data = {
    url: 'https://jio-api-ten.vercel.app/api/playlists',
    params: { id: params, limit: 20, page: 0 }
  }

  try {
    const res = await CapacitorHttp.get(data)
    trendingList.value = res.data.data.songs
  } catch (error) {
    console.log('unable to get playlist');
  }
}
</script>