<template>
  <div
    ref="focus"
    class="h-[2rem] flex items-center border border-kajian-darkGray bg-kajian-white rounded-tr-md rounded-bl-md transition-all ease-out duration-200"
    :class="[active ? 'w-[15rem]' : 'w-[3rem]']"
  >
    <div
      @click="active = !active"
      ref="target"
      class="w-[3rem] h-[2rem] flex justify-center items-center hover:text-xl cursor-pointer"
      :class="[value && !active ? 'ring ring-kajian-lightBlue' : '']"
    >
      <font-awesome-icon :icon="['fas', 'filter']" />
    </div>
    <div v-show="active" class="w-8/12 h-[2rem] flex-auto">
      <Multiselect
        class="h-[2rem]"
        v-model="value"
        label="name"
        value-prop="value"
        :options="options"
        :close-on-select="false"
        :close-on-deselect="false"
        :can-deselect="false"
        @change="changeValue"
      >
      </Multiselect>
    </div>
  </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import { ref } from 'vue'
import { kajianFeedStore } from '@/stores/counter.js'
import { watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const focus = ref()
onClickOutside(focus, () => (active.value = false))

const feedStore = kajianFeedStore()
const value = ref()
const isChange = ref(false)
const options = ref([
  { name: 'Created Post', value: 'createdPost' },
  { name: 'Kajian Time', value: 'kajianTime' },
  { name: 'Ustad', value: 'ustad' },
  { name: 'Judul', value: 'judul' }
])
const active = ref(false)
const asc = ref(true)

watch(value, () => {
  feedStore.sortComponent = value.value
  feedStore.sortAsc = true
})
watch(asc, () => (feedStore.sortAsc = asc.value))

function changeValue() {
  isChange.value = true
  asc.value = true
}
function changeSortOrientation() {
  isChange.value ? (isChange.value = false) : (asc.value = !asc.value)
}
</script>

<style scoped></style>
