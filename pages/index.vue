<template>

    <div class="w-full h-2/5 pt-14">

        <div class="carousel carousel-start h-full w-full rounded-box gap-x-4">

            <template v-for="(value, index) in ListItem">
                <RouterLink :to="value.id + '-playlist'" class="carousel-item w-3/4">
                    <img class="rounded-lg object-contain" :src="value.image[2].url" alt="Pizza" />
                </RouterLink>
            </template>
        </div>

    </div>

    <div class="w-full flex h-[10%] items-center justify-evenly gap-x-2">
        <button class="btn">Trending</button>
        <button class="btn">Romance</button>
        <button class="btn">Rock</button>
        <button class="btn">Hip Hop</button>
    </div>

    <div class="w-full h-2/5 flex items-center justify-start flex-col overflow-y-scroll scrollbar-hide gap-y-4">
        <template v-for="(value, index) in ListAudio">
            <div @click="loadSong(value)" class="card card-side border border-base-300 h-24 bg-base-100 shadow-md">
                <figure class="min-w-[25%] w-1/4">
                    <img class="object-center object-scale-down min-w-full w-full h-full" :src="value.image[2].url"
                        alt="songs" />
                </figure>
                <div class="card-body p-0 flex items-center justify-between flex-row px-3">
                    <div class="w-auto flex items-center justify-center flex-col gap-y-1">
                        <h2 class="card-title w-full text-start line-clamp-1">{{ splitAndJoin(value.name) }}</h2>
                        <p class="w-full flex items-center gap-x-1 justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <circle cx="12" cy="6" r="4" fill="currentColor" />
                                <path fill="currentColor"
                                    d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                                    opacity="0.5" />
                            </svg>
                            <span class="line-clamp-1 whitespace-nowrap">{{ value.artists.all[0].name }}</span>
                            
                        </p>
                    </div>

                    <div class="card-actions justify-end">
                        <button class="btn btn-square btn-neutral">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-width="1.5"
                                    d="M20.409 9.353a2.998 2.998 0 0 1 0 5.294L7.597 21.614C5.534 22.737 3 21.277 3 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </template>

    </div>

    <!-- 
    <div class="p-4 mt-20">
        <input @touchmove="HandleDrag" type="range" min="0" max="100" v-model="current" class="range" />
    </div> -->

    <div class="btm-nav h-[7%]">
        <button class="active">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        </button>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        </button>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        </button>
    </div>

</template>

<script setup>
const {source, loadSong} = usePlayer()
const current = ref(40)
const ListItem = ref(null)
const ListAudio = ref(null)

onMounted(() => {
    ListItem.value = fetchPlaylist()
})

const splitAndJoin = (str) => {
    const words = str.split(' ');
    return words.slice(0, 2).join(' ');
}

function HandleDrag(params) {
    params.preventDefault();

    const touch = params.touches[0];
    const input = params.target;

    const rect = input.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newValue = Math.round(percentage * (input.max - input.min) + Number(input.min));

    current.value = newValue
}

async function fetchPlaylist() {

    let playlist = null

    try {
        const response = await fetch('https://jio-api-ten.vercel.app/api/search/playlists?query=tamil?limit=10')
        const value = await response.json();
        playlist = value.data.results;

        await fetchSongs(playlist)
    } catch (error) {
        console.log(error);
    }

    ListItem.value = playlist
    
}

async function fetchSongs(item) {
    let list = null

    try {
        const res = await fetch('https://jio-api-ten.vercel.app/api/playlists?id=' + item[0].id)
        const value = await res.json()
        list = value.data.songs
    } catch (error) {
        console.log(error);
    }

    ListAudio.value = list
}
</script>