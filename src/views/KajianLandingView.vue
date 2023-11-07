<template>
  <div class="h-screen w-full bg-kajian-gray flex justify-center items-center font-roboto">
    <div class="lg:w-8/12 w-full lg:h-3/5 h-full flex shadow-xl md:w-full">
      <div
        class="lg:w-6/12 w-0 h-full flex justify-center items-center border-r border-kajian-gray relative bg-gradient-to-b from-kajian-lightBlue to-kajian-blue lg:visible invisible"
      >
        <div class="z-30 w-full h-full absolute">
          <KajianBeautify />
        </div>
        <div class="absolute top-10 left-10 z-50">
          <h1 class="xl:text-xl lg:text-lg text-kajian-white">KajianKuy</h1>
        </div>
        <div
          class="flex flex-col justify-center items-center w-full h-full space-y-2 z-10 text-kajian-white"
        >
          <h4 class="xl:text-xl lg:text-lg font-thin">Nice to see you again</h4>
          <h1 class="xl:text-5xl lg:text-4xl uppercase">welcome back</h1>
        </div>
      </div>
      <div class="lg:w-6/12 w-full h-full bg-kajian-white">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import KajianBeautify from '@/components/kajian/landing/KajianBeautify.vue'
</script>
