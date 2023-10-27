<template>
  <div class="w-full h-[2rem] flex justify-end items-center space-x-5">
    <SortMenu></SortMenu>
    <!-- <Multiselect v-model="value" :options="options" />s -->
    <div>filter by</div>
    <div>search</div>
  </div>
  <hr class="border border-kajian-darkGray my-3" />
</template>

<script setup>
import SortMenu from '@/components/kajian/kajianMain/control/SortMenu.vue'

// import Multiselect from '@vueform/multiselect'
import { ref } from 'vue'
// const value = ref()
// const options = ref(['Batman', 'Robin', 'Joker'])
</script>

<!-- <style scoped>
@import '@vueform/multiselect/themes/tailwind.css';
</style> -->
