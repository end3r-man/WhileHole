<template>
    <div class="w-full h-12 bg-[#404B69] rounded-md overflow-hidden flex items-center justify-start px-2 relative">
        <div class="w-auto h-auto p-2 text-[#DBEDF3]">
            <Icon class="text-xl" icon="solar:rounded-magnifer-bold-duotone" />
        </div>
        <input v-model="search" @input="HandleSearch()"
            class="w-full h-full absolute top-0 left-0 pl-12 px-4 bg-transparent text-[#DBEDF3] outline-none" placeholder="Search..."
            type="text" name="search">
    </div>

    <div class="w-full h-[90%] mt-4 center justify-start no-scroll flex-col gap-y-5 overflow-y-scroll px-2">
        <template v-for="song in Songs">
            <div @click="handleAudioClick(song)" class="w-full h-16 flex items-center gap-x-2">
                <img class="size-16 rounded-md" :src="song.image[2].url" alt="song">

                <div class="h-full w-3/5 flex items-start justify-center flex-col truncate pr-4">
                    <h3 class="font-semibold text-slate-300">{{ song.name }}</h3>
                    <p class="text-sm text-slate-500">{{ song.artists.all[0].name }}</p>
                </div>

                <Icon class="text-4xl text-slate-300" icon="solar:play-circle-bold-duotone" />
            </div>
        </template>
    </div>
</template>

<script setup>
import { CapacitorHttp } from '@capacitor/core';
import { Icon } from '@iconify/vue/dist/iconify.js';

const { loadSong } = usePlayer()
const Songs = ref(Object)
const search = ref('')

const handleAudioClick = (song) => {
    loadSong(song);
}

async function HandleSearch() {
    if (search.value !== '') {
        const options = {
            url: 'https://saavn.dev/api/search/songs',
            params: { query: search.value, page: 0, limit: 10 }
        };

        try {
            const response = await CapacitorHttp.get(options);
            Songs.value = response.data.data.results
        } catch (error) {
            console.log(error);
        }
    }
}
</script>