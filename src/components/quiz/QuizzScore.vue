<template>
  <div class="flex flex-col justify-around items-center w-full h-full z-20">
    <div class="h-2/6 flex flex-col justify-around items-center text-4xl mt-auto">
      <div>Congratulation</div>
      <div class="text-5xl">{{ store.name }}</div>
      <div>Your Score</div>
    </div>
    <div class="h-2/6 text-9xl mt-14">
      {{ store.score }}
    </div>
    <div class="h-1/6 w-full flex justify-center items-start">
      <button
        @click="router.replace({ name: 'home' })"
        class="bg-gradient-to-br from-quiz-blue to-quiz-darkBlue rounded-full shadow-xl py-5 px-10 text-4xl text-white"
      >
        Home
      </button>
    </div>
  </div>
  <Fireworks ref="fw" class="z-10 h-full w-full absolute"></Fireworks>
</template>

<script setup>
import { useQuizStore } from '@/stores/counter'
import { Fireworks } from '@fireworks-js/vue'
import { onMounted, ref } from 'vue'
import router from '../../router'

const store = useQuizStore()
const fw = ref(Fireworks)
// const highScore = [
//   { name: 'ujank', score: 15 },
//   { name: 'asep', score: 5 },
//   { name: 'didi', score: 2 },
//   { name: 'lala', score: 7 }
// ]

onMounted(() => {
  startFireworks()

  // localStorage.setItem('asd', JSON.stringify(highScore))
  // const x = JSON.parse(localStorage.getItem('asd'))
})
async function startFireworks() {
  if (!fw.value) return
  fw.value.start()
  await new Promise((resolve) => setTimeout(resolve, 5000))
  await fw.value.waitStop()
}
</script>
