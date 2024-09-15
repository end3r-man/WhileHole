<template>
  <template v-if="ListAudio != null">
    <div class="w-auto flex items-center justify-center flex-col pt-14">
      <img class="size-[250px] object-center object-scale-down rounded-lg" :src="ListAudio.image[2].url"
        alt="playlist-cover">

      <h1 class="card-title mt-4">{{ ListAudio.name }}</h1>
      <p class="line-clamp-1 px-8 w-full text-center">{{ ListAudio.description }}</p>
    </div>

    <div class="w-full h-1/2 flex items-center justify-start flex-col overflow-y-scroll scrollbar-hide mt-6 gap-y-4">
        <template v-for="(value, index) in ListAudio.songs">
            <div class="card card-side border border-base-300 h-24 bg-base-100 shadow-md">
                <figure class="w-1/4">
                    <img class="object-center object-scale-down w-full h-full" :src="value.image[2].url" alt="songs" />
                </figure>
                <div class="card-body p-0 flex items-center justify-between flex-row px-4">
                    <div class="w-auto flex items-center justify-center flex-col gap-y-1">
                        <h2 class="card-title line-clamp-1">{{splitAndJoin(value.name)}}</h2>
                        <p class="w-full flex items-center gap-x-1 justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <circle cx="12" cy="6" r="4" fill="currentColor" />
                                <path fill="currentColor"
                                    d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                                    opacity="0.5" />
                            </svg>
                            {{ value.artists.all[0].name }}
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
  </template>

</template>

<script setup>
const route = useRoute()
const id = route.params.id
const ListAudio = ref(null)

onMounted(() => {
  fetchSongs()
})

const splitAndJoin = (str) => {
    const words = str.split(' ');
    return words.slice(0, 2).join(' ');
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
  console.log(ListAudio.value.songs[0].artists.primary[0].name);

}
</script>