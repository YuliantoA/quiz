<template>
  <div class="bg-kajian-gray w-full overflow-auto h-screen max-h-screen">
    <KajianTopBar></KajianTopBar>
    <main class="flex justify-center h-fit w-full mt-7">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<script setup>
import KajianTopBar from '../components/kajian/KajianTopBar.vue'
import { RouterView } from 'vue-router'
</script>
