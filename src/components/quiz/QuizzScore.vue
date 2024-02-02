<template>
  <div class="flex flex-col justify-around items-center w-full h-full z-20">
    <div class="h-2/6 flex flex-col justify-around items-center text-4xl mt-auto">
      <div>Congratulation</div>
      <div id="name" class="text-5xl">{{ store?.name }}</div>
      <div>Your Score</div>
    </div>
    <div id="score" class="h-2/6 text-9xl mt-14">
      {{ store?.score }}
    </div>
    <div class="h-1/6 w-full flex justify-center items-start">
      <button
        @click="toHome()"
        class="bg-gradient-to-br from-quiz-blue to-quiz-darkBlue rounded-full shadow-xl py-5 px-10 text-4xl text-white"
      >
        Home
      </button>
    </div>
  </div>
  <FireworkLayout ref="firework" :fullscreen="true" :time="5000" :immediate="true"></FireworkLayout>
</template>

<script setup>
import { useQuizStore } from '@/stores'
import FireworkLayout from '@/components/util/FireworkLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import router from '../../router'

const router = useRouter()
const store = useQuizStore()
const firework = ref(FireworkLayout)

function toHome() {
  store.clearAll()
  router.replace({ name: 'Home' })
}
</script>
