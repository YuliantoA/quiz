<template>
  <div class="bg-kajian-gray w-full overflow-auto h-screen max-h-screen font-roboto">
    <KajianTopBar></KajianTopBar>
    <main class="flex justify-center h-fit w-full">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<script setup>
import KajianTopBar from '../components/kajian/KajianTopBar.vue'
import { RouterView } from 'vue-router'
</script>
