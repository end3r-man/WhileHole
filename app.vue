<template>
  <div>
    <NuxtPage />
  </div>
</template>


<script setup>
import { StatusBar } from '@capacitor/status-bar';
StatusBar.setOverlaysWebView({ overlay: true });
</script>