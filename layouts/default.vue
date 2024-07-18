<template>
    <div class="w-screen h-dvh px-4 pt-10 bg-[#283149]">
        <slot />

        <template v-if="$route.fullPath !== '/music'">
            <Player />
        </template>
    </div>
</template>

<script setup>
import { StatusBar } from '@capacitor/status-bar';
StatusBar.setOverlaysWebView({ overlay: true })
</script>