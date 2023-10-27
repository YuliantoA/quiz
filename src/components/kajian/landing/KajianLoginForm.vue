<template>
  <h1 class="h-32 text-kajian-blue text-3xl font-bold">Login Account</h1>
  <div class="h-14 w-10/12 relative mb-7">
    <KajianTextInput
      :placeholder-text="'Email'"
      :type-input="'email'"
      :list-error="getErrorMessages(v$.email, 'Email')"
      v-model="state.email"
    ></KajianTextInput>
  </div>
  <div class="h-14 w-10/12 relative mb-7">
    <KajianTextInput
      :placeholder-text="'Password'"
      :type-input="'password'"
      :list-error="getErrorMessages(v$.password, 'Password')"
      v-model="state.password"
      :need-eye="true"
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

defineExpose({
  validateAndGetData
})
async function validateAndGetData() {
  // const isFormCorrect = await unref(v$).$validate()
  unref(v$).$validate()
  return {
    valid: !v$.value.$invalid,
    formData: {
      ...state
    }
  }
  // console.log(v$)
}
</script>
