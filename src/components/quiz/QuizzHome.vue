<script setup>
import logoIcon from '@/components/quiz/LogoIcon.vue'
// import router from '../../router'
// import routesNa  me from '../../router'
import { useWindowSize } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()

const { width } = useWindowSize()
function startGame() {
  router.push({ name: 'Form' })
}
</script>

<template>
  <div class="flex items-start justify-center w-full h-1/2">
    <div class="p-12">
      <i>
        <logoIcon :width="width < 768 ? '300' : '500'" height="300"> </logoIcon>
      </i>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center w-full">
    <button
      id="start-button"
      @click="startGame"
      class="px-2 py-10 md:px-10 bg-gradient-to-br from-quiz-blue to-quiz-darkBlue rounded-full shadow-xl mb-10 md:w-5/12 w-6/12 hover:-translate-y-1 transition-transform duration-100 ease-out"
    >
      <div
        class="uppercase md:text-4xl lg:text-5xl text-2xl text-white tracking-widest align-middle w-full h-full"
      >
        start
      </div>
    </button>
  </div>
</template>
