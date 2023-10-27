<template>
  <div
    ref="dropZone"
    class="border border-kajian-blue border-dashed flex flex-col justify-center items-center relative"
    :class="[isOverDropZone ? 'bg-kajian-lightGray shadow-xl' : 'bg-kajian-gray']"
  >
    <div v-if="poster.length" @click="deleteFile" class="absolute top-3 right-5 cursor-pointer">
      <img src="@/assets/kajian/cancel.png" />
    </div>
    <template v-if="poster.length == 0">
      <div class="mb-10 text-2xl text-kajian-darkGray capitalize">{{ props.placeholderText }}</div>
      <div>
        Drop file here or
        <button class="font-bold hover:underline" @click="chooseFiles()">Browse File</button>
      </div>
      <input @change="onBrowse" ref="fileUpload" type="file" :accept="ext" hidden />
    </template>
    <template v-else>
      <div class="flex flex-col justify-center items-center">
        <div class="mb-5">
          <img src="@/assets/kajian/iconOther.png" />
        </div>
        <div>
          {{ poster[0].name }}
        </div>
      </div>
    </template>
    <template v-for="(error, index) of props.listError" :key="error">
      <div class="input-errors absolute bottom-0 right-0" v-if="index < 1">
        <div class="error-msg text-red-500 lg:text-xs text-xs lg:p-0 pl-3">
          {{ error }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useDropZone } from '@vueuse/core'
import { ref, watch } from 'vue'
const fileUpload = ref()
const dropZone = ref()
const emit = defineEmits(['updatePoster'])
const props = defineProps({
  placeholderText: {
    type: String,
    default: 'Upload File'
  },
  listError: {
    type: Array
  },
  modelValue: {
    type: Array
  },
  ext: {
    type: String,
    default: ''
  }
})
const { isOverDropZone } = useDropZone(dropZone, onDrop)
let poster = ref([])

watch(
  () => props.modelValue,
  (newValue) => {
    poster.value = newValue
  }
)

function onDrop(files) {
  poster.value.pop()
  poster.value.push(files[0])
  emit('updatePoster', poster.value)
}
function onBrowse(e) {
  poster.value.push(e.target.files[0])
  emit('updatePoster', poster.value)
}

function chooseFiles() {
  fileUpload.value.click()
}
function deleteFile() {
  poster.value.pop()
  emit('updatePoster', poster.value)
}
</script>
