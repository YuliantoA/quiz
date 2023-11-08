<template>
  <h1 class="h-32 text-kajian-blue lg:text-3xl text-4xl lg:mb-0 mb-[8rem] font-bold">
    Login Account
  </h1>
  <div class="h-14 w-10/12 relative lg:mb-7 mb-[2rem]">
    <KajianTextInput
      :placeholder-text="'Email'"
      :type-input="'email'"
      :list-error="getErrorMessages(v$.email, 'Email')"
      v-model="state.email"
      @keyup.enter="submit"
    ></KajianTextInput>
  </div>
  <div class="h-14 w-10/12 relative mb-7">
    <KajianTextInput
      :placeholder-text="'Password'"
      :type-input="'password'"
      :list-error="getErrorMessages(v$.password, 'Password')"
      v-model="state.password"
      :need-eye="true"
      @keyup.enter="submit"
    ></KajianTextInput>
  </div>
</template>

<script setup>
import KajianTextInput from '@/components/input/KajianTextInput.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, unref } from 'vue'
import { getErrorMessages } from '@/helpers/vuelidateHelper'

const state = reactive({
  email: '',
  password: ''
})
const rules = {
  email: { email, required },
  password: { required }
}
const v$ = useVuelidate(rules, state)
const emit = defineEmits(['submit'])
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
function submit() {
  emit('submit')
}
</script>
