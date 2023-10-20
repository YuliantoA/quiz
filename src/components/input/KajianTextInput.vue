<template>
  <div class="relative">
    <div class="h-full w-1 absolute bg-kajian-blue top-0 z-30"></div>
    <input
      class="w-full bg-kajian-gray px-4 py-2 text-lg z-20 focus-visible:outline-none"
      :class="[
        props.listError.length > 0
          ? 'border border-kajian-red'
          : 'focus-visible:border-kajian-darkGray border'
      ]"
      :="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="typeInput"
    />
    <div
      @click="revealPassword()"
      v-if="props.needEye"
      class="w-5 h-5 absolute top-3 right-2 cursor-pointer"
    >
      <font-awesome-icon v-if="!isEyeOpen" class="absolute" :icon="['far', 'eye-slash']" />
      <font-awesome-icon v-else class="absolute" :icon="['far', 'eye']" />
    </div>
  </div>
  <template v-for="(error, index) of props.listError" :key="error">
    <div class="input-errors" v-if="index < 1">
      <div class="error-msg text-red-500 lg:text-xs text-xs lg:p-0 pl-3">
        {{ error }}
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  inheritAttrs: false
})

defineEmits(['update:modelValue'])
const props = defineProps({
  typeInput: {
    type: String,
    default: 'String'
  },
  needEye: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    required: true
  },
  listError: {
    type: Array
  }
})
const typeInput = ref(props.typeInput)
let isEyeOpen = ref(false)

function revealPassword() {
  isEyeOpen.value = !isEyeOpen.value
  isEyeOpen.value ? (typeInput.value = 'text') : (typeInput.value = 'password')
}
</script>
