<script setup>
import QuizzDetailQuestion from './QuizzDetailQuestion.vue'
import QuizzAnswer from './QuizzAnswer.vue'
import ApiLoader from '../util/ApiLoader.vue'
import LoaderSpinner from '@/components/util/LoaderSpinner.vue'
import { ref } from 'vue'
import router from '../../router'
import { useQuizStore } from '@/stores'
import { storeToRefs } from 'pinia'

let userAnswer = []
let loading = ref(true)
let isChangeQuestion = ref(false)
const store = useQuizStore()
const { activeQuestion } = storeToRefs(store)

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
async function addAnswer(answer) {
  isChangeQuestion.value = true
  await timeout(200)
  userAnswer[activeQuestion.value] = answer
  if (activeQuestion.value + 1 < store.getLengthQuestion) {
    activeQuestion.value++
  } else {
    store.calculateScore(userAnswer)
    router.replace({ name: 'Score' })
  }
  isChangeQuestion.value = false
  await timeout(200)
}
function saveQuiz(quiz) {
  store.setRandomAnswer({ listAnswer: quiz, index: activeQuestion.value })
}

async function getQuestion() {
  return store.fetchQuestion().then((response) => {
    loading.value = false
    return response.data.results
  })
}
</script>

<template>
  <api-loader :apiMethod="getQuestion" loadingMessage="fetching question..." :hasOverlay="true">
    <template v-slot:loadingOverlay>
      <div class="h-full w-full flex justify-center items-center">
        <LoaderSpinner :color="'green-1200'"></LoaderSpinner>
      </div>
    </template>
    <template v-slot:default="props">
      <div
        v-if="activeQuestion >= 0"
        class="flex flex-col justify-between items-center h-full w-full"
      >
        <QuizzDetailQuestion
          :question-Text="props.response[activeQuestion].question"
          :change-question="isChangeQuestion"
        ></QuizzDetailQuestion>
        <QuizzAnswer
          :key="activeQuestion"
          :user-answer="userAnswer[activeQuestion]"
          :detail-answer="props.response[activeQuestion]"
          @answer-picked="addAnswer"
          @random-quiz="saveQuiz"
        ></QuizzAnswer>
      </div>
    </template>
  </api-loader>
</template>

<style scoped>
.btn-back:hover .faIcon {
  transform: scale(1.4);
}
</style>
