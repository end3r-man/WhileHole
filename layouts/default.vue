<template>
    <div class="w-screen h-dvh px-4 ">
        <slot />
        <Navbar />
    </div>
</template>

<script setup>
import { StatusBar } from '@capacitor/status-bar';
StatusBar.setOverlaysWebView({ overlay: true })
</script>