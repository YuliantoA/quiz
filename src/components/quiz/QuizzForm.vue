<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <div
      class="w-full h-5/6 lg:w-7/12 lg:h-4/6 bg-white rounded-xl shadow-xl lg:p-14 p-5 flex flex-col"
    >
      <QuizzFormStart ref="formInput"></QuizzFormStart>
      <div class="w-full h-1/6 flex justify-center items-center">
        <button
          id="submit-form"
          @click="validate()"
          class="bg-gradient-to-br from-quiz-blue to-quiz-darkBlue rounded-full shadow-xl text-white px-8 py-4 uppercase tracking-widest"
        >
          submit
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import QuizzFormStart from './QuizzFormStart.vue'
import { ref } from 'vue'
import { useQuizStore } from '../../stores'
import { useRouter } from 'vue-router'
const router = useRouter()
const formInput = ref(null)
const store = useQuizStore()
async function validate() {
  const data = await formInput.value.validateAndGetData()
  if (data.valid) {
    store.setNewQuestion(data.formData)
    router.replace({
      name: 'Detail'
    })
  }
}
</script>
