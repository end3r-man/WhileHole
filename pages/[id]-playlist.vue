<template>
  <template v-if="ListAudio != null">
    <div class="w-auto flex items-center justify-center flex-col pt-14">
      <img class="size-[250px] object-center object-scale-down rounded-lg" :src="(ListAudio.image.length > 0) ? ListAudio.image[0].url : playListImage"
        alt="playlist-cover">

      <h1 class="card-title mt-4">{{ ListAudio.name }}</h1>
      <p class="line-clamp-1 px-8 w-full text-center">{{ ListAudio.description }}</p>
    </div>

    <div class="w-full h-1/2 flex items-center justify-start flex-col overflow-y-scroll scrollbar-hide mt-6 gap-y-4 pb-20">
        <template v-for="(value, index) in ListAudio.songs">
            <SongListCard :item="value" />
        </template>
    </div>
  </template>

</template>

<script setup>
import playListImage from "@/assets/images/default-playlist-500x500.jpg"

const route = useRoute()
const id = route.params.id
const ListAudio = ref(null)
const {source, loadSong} = usePlayer()

onMounted(() => {
  fetchSongs()
})

const splitAndJoin = (str) => {
    const words = str.split(' ');
    return words.slice(0, 2).join(' ');
}

function HandlePlayer(params) {
  console.log(params);
}

async function fetchSongs(item) {
  let list = null

  try {
    const res = await fetch('https://jio-api-ten.vercel.app/api/playlists?id=' + id)
    const value = await res.json()
    list = value.data
  } catch (error) {
    console.log(error);
  }

  ListAudio.value = list

}
</script>