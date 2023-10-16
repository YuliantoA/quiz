<template>
  <div class="flex justify-between w-full flex-col lg:flex-row">
    <div class="lg:w-1/6 w-full p-3 lg:text-xl text-sm uppercase lg:block flex">
      <div class="">
        {{ props.keyName }}
      </div>
      <div v-if="customText" class="text-xs normal-case lg:m-0 ml-1 lg:block flex items-center">
        {{ customText }}
      </div>
    </div>
    <div class="flex-auto">
      <input
        :="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="props.typeInput"
        class="lg:text-xl text-md w-full border p-3 rounded-xl border-gray-400"
      />
      <template v-for="(error, index) of props.listError" :key="error">
        <div class="input-errors" v-if="index < 2">
          <div class="error-msg text-red-500 lg:text-sm text-xs lg:p-0 pl-3">
            {{ error }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
})

defineEmits(['update:modelValue'])
const props = defineProps({
  typeInput: {
    type: String,
    default: 'String'
  },
  modelValue: {
    type: String,
    required: true
  },
  keyName: {
    type: String,
    required: true
  },
  customText: {
    type: String
  },
  listError: {
    type: Array
  }
})
</script>
