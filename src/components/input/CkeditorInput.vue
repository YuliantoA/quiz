<template>
  <div class="flex flex-col space-y-2 w-full mt-5 max-h-[5rem]">
    <div>{{ placeholder }}</div>
    <div class="w-full">
      <ckeditor :editor="editor" :="$attrs" :model-value="modelValue" @input="onChange"></ckeditor>
    </div>
    <div class="flex justify-end items-center">
      <template v-for="(error, index) of props.listError" :key="error">
        <div class="input-errors" v-if="index < 1">
          <div class="error-msg text-red-500 lg:text-xs text-xs lg:p-0 pl-3">
            {{ error }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
defineOptions({
  inheritAttrs: false
})
const emit = defineEmits(['updateValue'])
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Description'
  },
  listError: {
    type: Array,
    required: false
  }
})

const editor = ClassicEditor

function onChange(value) {
  emit('updateValue', value)
}
</script>
