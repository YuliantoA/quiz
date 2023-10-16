<template>
  <div class="flex justify-between w-full lg:flex-row flex-col">
    <div class="w-1/6 p-3 lg:text-xl text-sm uppercase">{{ props.keyName }}</div>
    <div class="flex-auto">
      <select
        :="$attrs"
        :value="modelValue"
        placeholder="please select one"
        @input="$emit('update:modelValue', $event.target.value)"
        class="lg:text-xl text-md w-full border p-3 rounded-xl border-gray-400"
        :class="[props.modelValue == '' ? 'text-gray-300' : 'text-black']"
      >
        <option disabled value="">Please select one</option>
        <option v-for="{ id, value } in listOption" :key="id" :value="id" class="text-black">
          {{ normalizeString(value) }}
        </option>
      </select>
      <div class="input-errors" v-for="error of props.listError" :key="error">
        <div class="error-msg text-red-500 lg:text-sm text-xs lg:p-0 pl-3">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { normalizeString } from '../../helpers/StringHelper'
defineOptions({
  inheritAttrs: false
})
defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  keyName: {
    type: String,
    required: true
  },
  listError: {
    type: Array
  },
  listOption: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
select option[value=''][disabled] {
  color: gray;
}
</style>
