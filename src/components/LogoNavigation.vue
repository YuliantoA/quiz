<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const count = ref(0)
let menuShow = ref(false)
function increment() {
  count.value++
}
function closeMenu() {
  menuShow.value = false
}
const listMenu = [{ name: 'pilihan 1' }, { name: 'pilihan 2' }, { name: 'pilihan 3' }]
onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
})

onMounted(() => {
  document.addEventListener('click', closeMenu)
})
</script>

<template>
  <div class="relative">
    <div @click.stop="menuShow = !menuShow" class="p-2 relative cursor-pointer">
      <img alt="Vue logo" class="" src="@/assets/logo.svg" width="35" height="35" />
    </div>
    <transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-300 ease-out "
      leave-to-class="opacity-0"
      leave-active-class="transition-opacity duration-300 ease-out "
    >
      <div @click.stop v-if="menuShow" class="border-2 rounded-b-lg bg-gray-100 fixed">
        <a
          v-for="menu in listMenu"
          :key="menu.name"
          class="block text-center text-black uppercase py-2 px-4 cursor-pointer hover:bg-gray-300"
        >
          {{ menu.name }}</a
        >
      </div>
    </transition>
  </div>
</template>
