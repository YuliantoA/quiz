<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['answerPicked', 'randomQuiz'])
const props = defineProps({
  detailAnswer: Object,
  userAnswer: String
})
onMounted(() => {
  checkRandomAnswer()
})

function checkRandomAnswer() {
  !props.detailAnswer.randomAnswer ? emit('randomQuiz', shuffle(props.detailAnswer)) : ''
}

function shuffle(detailAnswer) {
  let array = [detailAnswer.correct_answer, ...detailAnswer.incorrect_answers]
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

function checkUserAnswer(answer) {
  if (props.userAnswer && answer == props.userAnswer) {
    return ref(true)
  }
}
</script>

<template>
  <div
    v-if="props.detailAnswer.randomAnswer"
    class="flex flex-wrap w-full h-2/5 justify-center items-center lg:mb-20 mb-auto lg:mt-0 mt-20"
  >
    <template v-for="(answer, index) in props.detailAnswer.randomAnswer" :key="answer">
      <div
        @click="$emit('answerPicked', answer)"
        :id="[checkUserAnswer(answer) ? 'user-answer' : 'answer' + index]"
        class="lg:w-1/5 lg:h-1/5 w-4/12 h-1/4 lg:py-14 lg:px-4 text-center flex justify-center items-center border border-red-300 lg:mx-32 lg:mb-10 mx-3 rounded-full shadow-xl hover:-translate-y-1 transition-transform duration-100 ease-out cursor-pointer"
        :class="[
          checkUserAnswer(answer)
            ? 'bg-gradient-to-br from-orange-500 to-orange-700'
            : 'bg-gradient-to-br from-quiz-blue to-quiz-darkBlue'
        ]"
      >
        <span class="lg:text-2xl text-lg text-white" v-html="answer"> </span>
      </div>
      <hr v-if="index % 2 == 1" class="w-full border-none" />
    </template>
  </div>
</template>
