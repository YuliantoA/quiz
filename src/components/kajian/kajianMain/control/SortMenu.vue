<template>
  <div
    class="h-[1.8rem] flex items-center space-x-2 border border-kajian-darkGray bg-kajian-white rounded-tr-md rounded-bl-md"
    :class="[focused ? 'border-kajian-lightBlue' : '']"
  >
    <div
      class="border-r border-kajian-darkGray w-[2rem] flex justify-center items-center -mr-1"
      :class="[focused ? 'border-kajian-lightBlue' : '']"
    >
      <font-awesome-icon :icon="['fas', 'sort']" />
    </div>
    <div class="w-[10rem]">
      <Multiselect v-model="value" :options="options" />
    </div>
  </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import { useFocus } from '@vueuse/core'
import { ref } from 'vue'
const target = ref()
const { focused } = useFocus(target)

const value = ref()
const options = ref(['Batman', 'Robin', 'Joker'])
</script>

<style scoped>
@import '@vueform/multiselect/themes/tailwind.css';
</style>
