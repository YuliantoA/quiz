<template>
  <div
    class="w-2/12 rounded-xl h-[12rem] bg-kajian-white flex flex-col justify-center items-center gap-5"
  >
    <div class="text-center px-10 mt-4">let's share your kajian with the world</div>
    <div
      @click="createPost"
      class="w-6/12 h-[3rem] bg-gradient-to-br from-kajian-lightBlue to-kajian-darkBlue flex justify-center items-center rounded-2xl cursor-pointer hover:shadow-xl hover:-translate-y-1"
    >
      <button class="text-kajian-white capitalize font-bold">create post</button>
    </div>
  </div>
</template>
<script setup>
import router from '../../../router'
function createPost() {
  router.push({ name: 'createPost' })
}
</script>
