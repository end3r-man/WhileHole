<template>
  <div @click="loadSong(value)" class="card card-side w-full border border-base-300 h-24 bg-base-100 shadow-md">
    <figure class="min-w-[25%] w-1/4">
      <img class="object-center object-scale-down w-full h-full" :src="value.image[2].url" alt="songs" />
    </figure>
    <div class="card-body p-0 flex items-center justify-between flex-row px-3">
      <div class="w-auto flex items-center justify-center flex-col gap-y-1">
        <h2 class="card-title w-full text-start line-clamp-1">{{ splitAndJoin(value.name) }}</h2>
        <p class="w-full flex items-center gap-x-1 justify-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <circle cx="12" cy="6" r="4" fill="currentColor" />
            <path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
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

<script setup>
const props = defineProps(['item'])
const {source, loadSong} = usePlayer()
const value = props.item


const splitAndJoin = (str) => {
    const words = str.split(' ');
    return words.slice(0, 2).join(' ');
}
</script>