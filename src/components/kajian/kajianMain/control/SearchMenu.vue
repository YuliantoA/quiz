<template>
  <div
    ref="focus"
    @click="onFocus"
    class="relative cursor-pointer transition-all ease-out duration-200"
    :class="[active || value ? 'w-[10rem]' : 'w-[2rem]']"
  >
    <input
      @keyup.enter="onFocus"
      v-model="value"
      type="text"
      class="w-full px-4 rounded-xl border-kajian-darkGray focus-visible:outline-none focus-visible:ring-4"
      placeholder="Search Judul"
    />
    <font-awesome-icon
      class="absolute top-1 right-2 hover:text-lg"
      :icon="['fas', 'magnifying-glass']"
    />
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import { kajianFeedStore } from '@/stores/counter.js'

const feedStore = kajianFeedStore()
const value = ref('')
const focus = ref()
const active = ref(false)
onClickOutside(focus, () => (active.value = false))
function onFocus() {
  focus.value ? (active.value = true) : ''
  feedStore.search = value.value
}
</script>
