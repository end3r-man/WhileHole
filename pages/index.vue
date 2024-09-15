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
            <SongListCard :item="value" />
        </template>
    </div>

    <!-- 
    <div class="p-4 mt-20">
        <input @touchmove="HandleDrag" type="range" min="0" max="100" v-model="current" class="range" />
    </div> -->

</template>

<script setup>
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