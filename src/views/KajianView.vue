<template>
  <div class="bg-kajian-gray w-full h-full">
    <KajianTopBar></KajianTopBar>
    <main class="flex justify-center h-[54rem] w-full mt-7">
      <div class="bg-kajian-white h-full w-4/12 border border-kajian-darkGray rounded-xl">
        <RouterView></RouterView>
      </div>
    </main>
  </div>
</template>

<script setup>
import KajianTopBar from '../components/kajian/KajianTopBar.vue'
import { RouterView } from 'vue-router'
</script>
