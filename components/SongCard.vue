<template>
  <div class="card card-side w-full h-24 bg-base-100 shadow-sm">
    <figure class="w-[25%]">
      <img class="h-full w-full object-center object-cover" :src="item.image[2].url" alt="Movie" />
    </figure>
    <div class="px-3 w-[75%] center justify-between flex-row">
      <div class="flex flex-col gap-y-1">
        <h2 class="card-title line-clamp-1 truncate">{{ item.name.split(' ', 2).join(' ') }}</h2>
        <p class="line-clamp-1 truncate flex gap-x-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
            <g fill="currentColor">
              <path d="M192 96a64 64 0 1 1-64-64a64 64 0 0 1 64 64" opacity="0.2" />
              <path
                d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56" />
            </g>
          </svg>

          {{ item.artists.all[0].name }}
        </p>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-square btn-neutral">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['item'])
const item = props.item
</script>