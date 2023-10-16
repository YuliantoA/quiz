import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useQuizStore = defineStore('scorer', () => {
  let score = ref(0)
  let activeQuestion = ref(-1)
  let themeQuestion = ref('')
  let totalQuestion = ref('')
  let formTotalQuestion = ref(0)
  let formThemeQuestion =ref('')
  function calculateScore(answer, userAnswer) {
    answer.forEach((value, index) => {
      value === userAnswer[index] ? score.value++ :''
    })
    console.log(score)
  }
  return {score,calculateScore,totalQuestion,themeQuestion,activeQuestion,formTotalQuestion,formThemeQuestion}
})
