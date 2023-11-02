<template>
  <div class="h-screen w-full bg-kajian-gray flex justify-center items-center font-roboto">
    <div class="w-8/12 h-4/6 flex shadow-xl">
      <div
        class="w-6/12 h-full bg-kajian-blue flex justify-center items-center border-r border-kajian-gray"
      >
        <i>
          <LogoFull></LogoFull>
        </i>
      </div>
      <div class="w-6/12 h-full bg-kajian-white">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import LogoFull from '@/components/kajian/logo/LogoFull.vue'
</script>
