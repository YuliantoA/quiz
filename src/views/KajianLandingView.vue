<template>
  <div class="h-screen w-full bg-kajian-gray flex justify-center items-center font-roboto">
    <div class="w-8/12 h-3/5 flex shadow-xl">
      <div
        class="w-6/12 h-full flex justify-center items-center border-r border-kajian-gray relative bg-gradient-to-b from-kajian-lightBlue to-kajian-blue"
      >
        <div class="z-30 w-full h-full absolute">
          <KajianBeautify />
        </div>
        <div class="absolute top-10 left-10 z-50">
          <h1 class="text-xl text-kajian-white">KajianKuy</h1>
        </div>
        <div
          class="flex flex-col justify-center items-center w-full h-full space-y-2 z-10 text-kajian-white"
        >
          <h4 class="text-xl font-thin">Nice to see you again</h4>
          <h1 class="text-5xl uppercase">welcome back</h1>
        </div>
      </div>
      <div class="w-6/12 h-full bg-kajian-white">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import KajianBeautify from '@/components/kajian/landing/KajianBeautify.vue'
</script>
