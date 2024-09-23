<template>
  <div class="w-screen h-dvh px-4 pt-10 bg-base-300">
    <NuxtPage />

    <BottomNav />
  </div>
</template>

<script setup>
import { Device } from '@capacitor/device';
import { StatusBar } from '@capacitor/status-bar';

onMounted(() => {
  device()
})

async function device() {

  let device = await Device.getInfo()

  if (device.platform == "android") {
    StatusBar.setOverlaysWebView({ overlay: true });
  }

}
</script>