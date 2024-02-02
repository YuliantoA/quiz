<script setup>
const props = defineProps({
  questionText: {
    type: String,
    default: ''
  },
  changeQuestion: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <transition name="fade">
    <div
      v-show="!props.changeQuestion"
      id="questionDetail"
      class="text-center text-3xl lg:text-5xl lg:w-6/12 w-10/12 h-2/6 flex justify-center items-center leading-relaxed mt-10"
      v-html="questionText"
    ></div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
