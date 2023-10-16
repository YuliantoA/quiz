<script setup>
import QuizzTopbar from '../components/quiz/QuizzTopbar.vue'
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <QuizzTopbar class="h-1/6"></QuizzTopbar>
    <div class="h-5/6">
      <router-view></router-view>
    </div>
  </div>
</template>
