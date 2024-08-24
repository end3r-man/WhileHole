<template>
    <div class="w-full h-full center justify-start flex-col gap-y-2 overflow-hidden"
        :class="loader ? '' : 'justify-center text-[#404B69]'">
        <template v-if="!loader">
            <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24">
                <rect width="7.33" height="7.33" x="1" y="1" fill="currentColor">
                    <animate id="svgSpinnersBlocksWave0" attributeName="x" begin="0;svgSpinnersBlocksWave1.end+0.2s"
                        dur="0.6s" values="1;4;1" />
                    <animate attributeName="y" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s" values="1;4;1" />
                    <animate attributeName="width" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                    <animate attributeName="height" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                </rect>
                <rect width="7.33" height="7.33" x="8.33" y="1" fill="currentColor">
                    <animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s"
                        values="8.33;11.33;8.33" />
                    <animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="1;4;1" />
                    <animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                    <animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                </rect>
                <rect width="7.33" height="7.33" x="1" y="8.33" fill="currentColor">
                    <animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="1;4;1" />
                    <animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s"
                        values="8.33;11.33;8.33" />
                    <animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                    <animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                </rect>
                <rect width="7.33" height="7.33" x="15.66" y="1" fill="currentColor">
                    <animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s"
                        values="15.66;18.66;15.66" />
                    <animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="1;4;1" />
                    <animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                    <animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                </rect>
                <rect width="7.33" height="7.33" x="8.33" y="8.33" fill="currentColor">
                    <animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s"
                        values="8.33;11.33;8.33" />
                    <animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s"
                        values="8.33;11.33;8.33" />
                    <animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                    <animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                </rect>
                <rect width="7.33" height="7.33" x="1" y="15.66" fill="currentColor">
                    <animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="1;4;1" />
                    <animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s"
                        values="15.66;18.66;15.66" />
                    <animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                    <animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                </rect>
                <rect width="7.33" height="7.33" x="15.66" y="8.33" fill="currentColor">
                    <animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s"
                        values="15.66;18.66;15.66" />
                    <animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s"
                        values="8.33;11.33;8.33" />
                    <animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                    <animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                </rect>
                <rect width="7.33" height="7.33" x="8.33" y="15.66" fill="currentColor">
                    <animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s"
                        values="8.33;11.33;8.33" />
                    <animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s"
                        values="15.66;18.66;15.66" />
                    <animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                    <animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                </rect>
                <rect width="7.33" height="7.33" x="15.66" y="15.66" fill="currentColor">
                    <animate id="svgSpinnersBlocksWave1" attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.4s"
                        dur="0.6s" values="15.66;18.66;15.66" />
                    <animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s"
                        values="15.66;18.66;15.66" />
                    <animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                    <animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s"
                        values="7.33;1.33;7.33" />
                </rect>
            </svg>
        </template>
        <template v-else>

            <Navbar />

            <h3 class="text-left w-full text-2xl font-semibold text-[#DBEDF3]">Trending Playlist</h3>

            <section class="w-full h-auto flex justify-start gap-x-4 overflow-x-scroll no-scroll mt-2">
                <template v-for="song in Trending">
                    <div @click="FetchPlaylist(song.id)"
                        class="h-full min-w-[60%] w-3/5 rounded-xl flex items-center justify-start flex-col gap-y-2">
                        <img class="w-full h-full rounded-md object-fill object-center" :src="song.image[2].url"
                            alt="playlist">
                    </div>
                </template>
            </section>

            <h3 class="text-left w-full text-2xl font-semibold text-[#DBEDF3] mt-5">Top Songs</h3>

            <section class="w-full h-1/2 flex justify-start flex-col gap-y-4 overflow-y-scroll no-scroll mt-2 pb-24">
                <template v-for="(list, index) in Playlist">
                    <div @click="handleAudioClick(index, Playlist)"
                        class="w-full min-h-20 flex items-center justify-between gap-x-2">
                        <img class="size-20 rounded-md" :src="list.image[2].url" alt="song">
                        <div class="h-full w-1/2 flex flex-col justify-center">
                            <h3 class="font-semibold text-slate-300 truncate">{{ list.name }}</h3>
                            <p class="text-sm text-slate-500">{{ list.artists.all[0].name ?? null }}</p>
                        </div>

                        <div class="h-full w-[20%] center">
                            <Icon class="text-4xl text-slate-400" icon="solar:play-circle-bold-duotone" />
                        </div>
                    </div>
                </template>
                <h1>asldh</h1>
            </section>
        </template>
    </div>
</template>

<script setup>
import { CapacitorHttp } from '@capacitor/core';
import { Icon } from '@iconify/vue';
import { MediaSession } from '@jofr/capacitor-media-session';

const Trending = ref(null)
const Playlist = ref(null)
const loader = ref(false)
const { loadSong, audio } = usePlayer()

const handleAudioClick = (index, playlist) => {
    loadSong(index, playlist)
}

onMounted(() => {
    FetchTrending()
})

async function FetchTrending() {
    const options = {
        url: 'https://saavn.dev/api/search/playlists',
        params: { query: 'tamil', page: 0, limit: 10 }
    };

    try {
        const response = await CapacitorHttp.get(options);
        Trending.value = response.data.data.results
        await FetchPlaylist(Trending.value[0].id)
    } catch (error) {
        console.log(error);
    }
}

async function FetchPlaylist(id) {
    const options = {
        url: 'https://saavn.dev/api/playlists',
        params: { id: id, page: 0, limit: 10 }
    };

    try {
        const response = await CapacitorHttp.get(options);
        Playlist.value = response.data.data.songs
        loader.value = true
    } catch (error) {
        console.log(error);
    }
}
</script>