<template>
  <div class="w-full pt-14">
    <label class="input input-bordered flex items-center justify-between gap-2">
      <input @input="handleSearch()" v-model="search" type="text" class="grow" placeholder="Search" />
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="9" />
          <path stroke-linecap="round"
            d="M21.812 20.975c-.063.095-.176.208-.403.434c-.226.227-.34.34-.434.403a1.13 1.13 0 0 1-1.62-.408c-.053-.1-.099-.254-.19-.561c-.101-.335-.151-.503-.161-.621a1.13 1.13 0 0 1 1.218-1.218c.118.01.285.06.621.16c.307.092.46.138.56.192a1.13 1.13 0 0 1 .409 1.619Z" />
        </g>
      </svg>
    </label>
  </div>

  <div class="w-full h-3/4 mt-8 flex items-center justify-start gap-y-4 flex-col overflow-y-scroll scrollbar-hide pb-20"
    v-if="showList">
    <template v-for="value in songList">
      <SongListCard :item="value" />
    </template>
  </div>
</template>

<script setup>
import { CapacitorHttp } from '@capacitor/core';

const search = ref(null);
const songList = ref([]);
const isLoading = ref(false)

async function handleSearch() {
  if (search.value.trim()) {
    isLoading.value = true
    try {
      const options = {
        url: 'https://jio-api-ten.vercel.app/api/search/songs',
        params: { query: search.value, page: 0, limit: 10 },
      }

      const response = await CapacitorHttp.get(options)
      songList.value = response.data.data.results
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      isLoading.value = false
    }
  } else {
    songList.value = []
  }
}

watch(search, handleSearch)

const showList = computed(() => !isLoading.value && songList.value.length > 0)
</script>