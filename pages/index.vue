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
        <SongCard v-on:click="store.trackId == item.id ?  playOrPause() : setSong(item) " :item="item" />
      </template>

    </div>

  </div>
</template>
<script setup>
import { CapacitorHttp } from '@capacitor/core';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref, onMounted } from 'vue';

const { setSong, store, playOrPause } = usePlayer();
const playList = ref([]);
const trendingList = ref([]);

onMounted(fetchPlayList);

async function fetchPlayList() {
  const data = {
    url: 'https://jio-api-ten.vercel.app/api/search/playlists',
    params: { query: 'tamil', limit: 10, page: 0 }
  };

  const res = await fetchData(data);
  if (res) {
    playList.value = res.data.data.results;
    if (playList.value.length > 0) {
      await fetchTrending(playList.value[0].id);
    }
  }
}

async function fetchTrending(id) {
  const data = {
    url: 'https://jio-api-ten.vercel.app/api/playlists',
    params: { id, limit: 20, page: 0 }
  };

  await fetchData(data, trendingList);
}

async function fetchData(data, targetRef = null) {
  try {
    const res = await CapacitorHttp.get(data);
    if (targetRef) {
      targetRef.value = res.data.data.songs || [];
    }
    return res;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
</script>
