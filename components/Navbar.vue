<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
</script>

<template>
    <div class="w-full h-[7%] flex items-center justify-between text-2xl text-[#DBEDF3]">
        <div class="p-2 bg-[#404B69] rounded-md">
            <NuxtLink to="/search">
                <Icon icon="solar:rounded-magnifer-bold-duotone" />
            </NuxtLink>
        </div>

        <div class="h-full w-auto flex items-center gap-x-2">
            <div class="p-2 bg-[#404B69] rounded-md">
                <NuxtLink to="/music">
                    <Icon icon="solar:music-note-bold-duotone" />
                </NuxtLink>
            </div>
            <div class="p-2 bg-[#404B69] rounded-md">
                <Icon icon="solar:settings-bold-duotone" />
            </div>
        </div>
    </div>
</template>