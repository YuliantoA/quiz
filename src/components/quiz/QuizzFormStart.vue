<template>
  <div class="flex flex-col w-full h-full justify-center items-center">
    <div class="w-full lg:h-1/4 h-1/3 flex justify-between items-start">
      <TextInput
        id="name"
        key-name="Name"
        :list-error="getErrorMessages(v$.name, 'Name')"
        v-model="state.name"
        placeholder="input"
      ></TextInput>
    </div>
    <div class="w-full lg:h-1/4 h-1/3 flex justify-between items-start">
      <TextInput
        id="totalQuestion"
        type-input="number"
        key-name="Total Question"
        :list-error="getErrorMessages(v$.totalQuestion, 'Total Question')"
        v-model="state.totalQuestion"
        placeholder="input"
        customText="(max 10)"
      ></TextInput>
    </div>
    <div class="w-full lg:h-1/4 h-1/3 flex justify-between items-start">
      <SelectInput
        id="theme"
        key-name="Theme"
        :list-error="getErrorMessages(v$.theme, 'Theme Question')"
        :list-option="listTheme"
        v-model="state.theme"
        placeholder="input"
      ></SelectInput>
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive, unref } from 'vue'
import {
  getErrorMessages,
  letterAndNumberOnly,
  numberOnly,
  maxValue
} from '../../helpers/vuelidateHelper'
import TextInput from '@/components/input/TextInput.vue'
import SelectInput from '@/components/input/SelectInput.vue'
const listTheme = [
  { id: 'any', value: 'Any Category' },
  { id: 9, value: 'General Knowledge' },
  { id: 10, value: 'Entertainment: Books' },
  { id: 11, value: 'Entertainment: Film' },
  { id: 12, value: 'Entertainment: Music' },
  { id: 13, value: 'Entertainment: Musicals &amp; Theatres' },
  { id: 14, value: 'Entertainment: Television' },
  { id: 15, value: 'Entertainment: Video Games' },
  { id: 16, value: 'Entertainment: Board Games' },
  { id: 17, value: 'Science &amp; Nature' },
  { id: 18, value: 'Science: Computers' },
  { id: 19, value: 'Science: Mathematics' },
  { id: 20, value: 'Mythology' },
  { id: 21, value: 'Sports' },
  { id: 22, value: 'Geography' },
  { id: 23, value: 'History' },
  { id: 24, value: 'Politics' },
  { id: 25, value: 'Art' },
  { id: 26, value: 'Celebrities' },
  { id: 27, value: 'Animals' },
  { id: 28, value: 'Vehicles' },
  { id: 29, value: 'Entertainment: Comics' },
  { id: 30, value: 'Science: Gadgets' },
  { id: 31, value: 'Entertainment: Japanese Anime &amp; Manga' },
  { id: 32, value: 'Entertainment: Cartoon &amp; Animations' }
]

const state = reactive({
  name: '',
  totalQuestion: '',
  theme: ''
})
const rules = {
  name: { required, letterAndNumberOnly },
  totalQuestion: {
    required,
    numberOnly,
    maxValue: (param) => maxValue(param, 10)
  },
  theme: { required }
}
const v$ = useVuelidate(rules, state)

defineExpose({
  validateAndGetData
})
async function validateAndGetData() {
  unref(v$).$validate()
  return {
    valid: !v$.value.$invalid,
    formData: {
      ...state
    }
  }
}
</script>
