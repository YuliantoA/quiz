<template>
  <div class="flex justify-between items-center h-20 w-full sm:px-8 px-3 capitalize">
    <div @click="backClick()" class="cursor-pointer btn-back">
      <span class="">
        <font-awesome-icon
          class="faIcon transition-all duration-200 ease-out"
          icon="fa-solid fa-arrow-left"
          size="sm"
        />
      </span>
      <span id="change-menu" class="md:ml-5 ml-3 text-lg md:text-2xl lg:text-4xl">{{
        activeQuestion == 0 ? 'Home' : 'Back'
      }}</span>
    </div>
    <div
      v-if="activeQuestion > -1 && themeQuestion && totalQuestion"
      class="lg:text-xl text-sm flex flex-col justify-end items-end w-5/12"
    >
      <div class="lg:text-xl text-sm text-end">{{ themeQuestion }}</div>
      <div>{{ activeQuestion + 1 }} of {{ totalQuestion }}</div>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from '@/stores'
import { computed } from 'vue'
import router from '../../router'
import { storeToRefs } from 'pinia'

const store = useQuizStore()
const { activeQuestion, question } = storeToRefs(store)

let totalQuestion = question.value.length
let themeQuestion = computed(() => {
  return question.value[activeQuestion.value].category
})

function backClick() {
  if (activeQuestion.value > -2) {
    activeQuestion.value <= 0 ? router.replace({ name: 'home' }) : ''
    activeQuestion.value--
  } else {
    router.replace({ name: 'home' })
  }
}
</script>

<style scoped>
.btn-back:hover .faIcon {
  transform: scale(1.4);
}
</style>
