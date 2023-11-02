<template>
  <div class="w-full h-[2rem] flex justify-end items-center space-x-5">
    <SortMenu />
    <SearchMenu />
  </div>
  <hr class="border border-kajian-darkGray my-3" />
</template>

<script setup>
import SortMenu from '@/components/kajian/kajianMain/control/SortMenu.vue'
import SearchMenu from '@/components/kajian/kajianMain/control/SearchMenu.vue'
</script>

<style>
@import '@vueform/multiselect/themes/tailwind.css';
</style>
