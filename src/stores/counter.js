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

export const toastStore = defineStore('toast', () => {
  const toastMessage = ref('')
  const toastType = ref('')
  const toastFunc = ref(Function)
  const toastActive = ref(false)
  const toastRemoveAll = ref(false)
  function toastOpen({message,type,promFunc}) {
    toastMessage.value = message
    toastType.value = type
    toastActive.value = true
    toastFunc.value = promFunc
  }
  function resetToast() {
    toastMessage.value = ''
    toastType.value = ''
    toastActive.value = false
    toastFunc.value = null
  }
  return {toastActive,toastOpen,toastMessage,toastType,resetToast,toastRemoveAll,toastFunc}
})



