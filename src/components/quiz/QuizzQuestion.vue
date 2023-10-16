<script setup>
import QuizzDetailQuestion from './QuizzDetailQuestion.vue'
import QuizzAnswer from './QuizzAnswer.vue'
import ApiLoader from '../util/ApiLoader.vue'
import LoaderSpinner from '@/components/util/LoaderSpinner.vue'
import { ref, watch } from 'vue'
import router from '../../router'
import { useQuizStore } from '@/stores/counter'
import client from '../../helpers/ApiClient'

let userAnswer = []
let activeQuestion = ref(0)
let responseQuestion = ref({})
let loading = ref(true)
let isChangeQuestion = ref(false)
const store = useQuizStore()
watch(
  () => store.activeQuestion,
  (newValue, oldValue) => {
    if (newValue < oldValue && newValue > -1) {
      activeQuestion.value = newValue
      updateStore(activeQuestion.value)
    }
  }
)

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function updateStore(activeQuestion) {
  activeQuestion == 0 ? (store.totalQuestion = responseQuestion.value.results.length) : ''
  store.activeQuestion = activeQuestion
  store.themeQuestion = responseQuestion.value.results[activeQuestion].category
}
async function addAnswer(answer) {
  isChangeQuestion.value = true
  await timeout(200)
  userAnswer[activeQuestion.value] = answer
  if (activeQuestion.value + 1 < responseQuestion.value.results.length) {
    activeQuestion.value++
    updateStore(activeQuestion.value)
  } else {
    store.calculateScore(
      responseQuestion.value.results.map((a) => a.correct_answer),
      userAnswer
    )
    router.replace({ name: 'Score' })
  }
  isChangeQuestion.value = false
  await timeout(200)
}
function saveQuiz(quiz) {
  responseQuestion.value.results[activeQuestion.value].randomAnswer = quiz
}

function getQuestion() {
  return client
    .getQuestion({
      data: `amount=${store.formTotalQuestion}${
        store.formThemeQuestion == 'any' ? '' : '&category=' + store.formThemeQuestion
      }`
    })
    .then((response) => {
      loading.value = false
      responseQuestion.value = response.data
      updateStore(0)
      return responseQuestion
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
    <template v-slot:default>
      <div class="flex flex-col justify-between items-center h-full w-full">
        <QuizzDetailQuestion
          :question-Text="responseQuestion.results[activeQuestion].question"
          :change-question="isChangeQuestion"
        ></QuizzDetailQuestion>
        <QuizzAnswer
          :user-answer="userAnswer[activeQuestion]"
          :detail-answer="responseQuestion.results[activeQuestion]"
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
