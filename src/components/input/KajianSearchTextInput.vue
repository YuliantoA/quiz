<template>
  <div class="relative">
    <div
      class="h-full w-1 absolute top-0 z-10"
      :class="[props.listError.length > 0 ? ' bg-kajian-red' : 'bg-kajian-blue']"
    ></div>
    <div
      @click="focused = true"
      class="absolute left-4 text-kajian-darkGray transition-all ease-out duration-300 select-none cursor-text"
      :class="[
        focused || modelValue.length > 0 || modelValue[label] ? 'top-1 text-sm ' : '  top-4 text-lg'
      ]"
    >
      {{ props.placeholderText }}
    </div>
    <input
      ref="target"
      class="w-full bg-kajian-gray px-4 pb-2 pt-6 text-lg z-0 focus-visible:outline-none"
      :class="[
        props.listError.length > 0
          ? 'border border-kajian-red'
          : 'focus-visible:border-kajian-darkGray border'
      ]"
      :="$attrs"
      :value="props.code ? modelValue[label] : modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="typeInput"
    />
    <div
      v-show="showDropdown"
      class="w-full max-h-[10rem] absolute bg-kajian-darkestGray border border-kajian-darkestGray flex flex-col overflow-auto scrollbar z-30"
    >
      <div
        @click="setValue(item)"
        v-for="(item, index) in listOption"
        :key="props.code ? item[code] : item"
        class="py-3 px-4 cursor-pointer text-kajian-white hover:bg-kajian-darkGray"
      >
        <!-- {{ label }} -->
        {{ props.code ? item[label] : item }}
      </div>
    </div>
    <div
      @click="revealPassword()"
      v-if="props.needEye"
      class="w-5 h-5 absolute top-6 right-2 cursor-pointer"
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
import { ref, watch } from 'vue'
import { useFocus } from '@vueuse/core'
import { delay } from '@/helpers/util'

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  typeInput: {
    type: String,
    default: 'String'
  },
  placeholderText: {
    type: String,
    default: 'String'
  },
  code: {
    type: String
  },
  label: {
    type: String
  },
  needEye: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isAsync: {
    type: Boolean,
    default: false
  },
  AsyncFunc: {
    type: Function
  },
  modelValue: {
    required: true
  },
  listError: {
    type: Array
  },
  listOption: {
    type: Array
  }
})
const target = ref()
const { focused } = useFocus(target)

watch(
  () => focused.value,
  (newValue) => {
    changeDropdown(newValue)
  }
)
if (props.isAsync) {
  watch(
    () => props.modelValue,
    async (newValue) => {
      await delay(500)
      if (newValue == props.modelValue) {
        props.AsyncFunc(props.modelValue)
      }
    }
  )
}

const showDropdown = ref(false)
const typeInput = ref(props.typeInput)
let isEyeOpen = ref(false)

function revealPassword() {
  isEyeOpen.value = !isEyeOpen.value
  isEyeOpen.value ? (typeInput.value = 'text') : (typeInput.value = 'password')
}

function setValue(value) {
  //   focused.value = true
  //   console.log('trigger')

  emit('update:modelValue', props.code ? value : value.toString())
}

async function changeDropdown(value) {
  !value ? await delay(100) : ''
  showDropdown.value = !showDropdown.value
}
</script>
