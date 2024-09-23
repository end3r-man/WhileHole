<template>
  <div class="size-full flex items-center justify-start gap-y-4 flex-col">

    <div class="w-full h-14 center">
      <label class="input input-bordered w-full flex items-center gap-2">
        <input v-model="search" @input="fetchSong" type="text" class="grow" placeholder="Search" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
          <path fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd" />
        </svg>
      </label>
    </div>


    <div class="w-full h-[calc(100%-56px)] flex items-center justify-start flex-col gap-y-4 pb-20 overflow-y-scroll no-scroll">
      <template v-for="item in songList" :key="item.id">
        <SongCard @click="setSong(item)" :item="item" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { CapacitorHttp } from '@capacitor/core';

const {setSong} = usePlayer()
const search = ref('')
const songList = ref([])

const fetchSong = async () => {

  if (!search.value) {
    songList.value = []; // Clear the list if search is empty
    return;
  }
  
  const data = {
    url: 'https://jio-api-ten.vercel.app/api/search/songs',
    params: { query: search.value, limit: 30, page: 0 }
  }

  try {
    const res = await CapacitorHttp.get(data)
    songList.value = res.data.data.results
  } catch (error) {
    console.log('unable to get playlist');
  }
}
</script>