<script setup>
import LogoNavigation from '../LogoNavigation.vue'
</script>

<template>
  <nav class="flex justify-between border p-2">
    <LogoNavigation class="flex justify-start w-2/12"></LogoNavigation>
    <div class="flex w-8/12 justify-center items-center m-auto">
      <input
        type="text"
        class="py-1 px-5 w-3/4 rounded-xl bg-gray-100 border-none focus-visible:outline-none focus:scale-x-125 textInput duration-100 transition-all text-gray-500"
        placeholder="Search"
      />
    </div>
    <div id="iconGroup" class="flex justify-end items-center w-2/12">
      <div class="flex flex-initial hover:bg-gray-100">
        <div class="relative icon px-3 py-2">
          <font-awesome-icon class="z-0" icon="fa-regular fa-comment" size="2xl" />
          <div
            class="absolute top-2 right-3 z-10 rounded-full bg-rose-500 w-3 h-3 text-center"
          ></div>
        </div>
      </div>
      <div class="flex flex-initial hover:bg-gray-100">
        <div class="icon px-3 py-2">
          <font-awesome-icon icon="fa-regular fa-bookmark" size="2xl" />
        </div>
      </div>
      <div class="personalInfo flex justify-end hover:bg-gray-100">
        <div class="mr-1">
          <img src="../../assets/user.jpg" class="rounded-full h-10" />
        </div>
        <div class="flex items-center">
          <span class="font-light">Ujank</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.textInput {
  transition: all 300ms ease-out;
  transform: scale;
}
</style>
