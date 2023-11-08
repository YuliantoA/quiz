<template>
  <h1 class="h-16 text-kajian-blue lg:text-2xl text-3xl font-bold lg:my-1 my-20">Create Account</h1>
  <div class="h-14 w-10/12 relative mb-7">
    <KajianTextInput
      :placeholder-text="'Display Name'"
      :type-input="'text'"
      :list-error="getErrorMessages(v$.name, 'Display Name')"
      v-model="state.name"
      @keyup.enter="$emit('submit')"
    ></KajianTextInput>
  </div>
  <div class="h-14 w-10/12 relative mb-7">
    <KajianTextInput
      :placeholder-text="'Email'"
      :type-input="'email'"
      :list-error="getErrorMessages(v$.email, 'Email')"
      v-model="state.email"
      @keyup.enter="$emit('submit')"
    ></KajianTextInput>
  </div>
  <div class="h-14 w-10/12 relative mb-7">
    <KajianTextInput
      :placeholder-text="'Password'"
      :type-input="'password'"
      :list-error="getErrorMessages(v$.password, 'Password')"
      v-model="state.password"
      :need-eye="true"
      @keyup.enter="$emit('submit')"
    ></KajianTextInput>
  </div>
  <div class="h-14 w-10/12 relative mb-7">
    <KajianTextInput
      :placeholder-text="'Re-Password'"
      :type-input="'password'"
      :list-error="getErrorMessages(v$.rePassword, 'Password')"
      v-model="state.rePassword"
      :need-eye="true"
      @keyup.enter="$emit('submit')"
    ></KajianTextInput>
  </div>
</template>

<script setup>
import KajianTextInput from '@/components/input/KajianTextInput.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'
import { reactive, toRef, unref } from 'vue'
import { getErrorMessages, letterAndNumberOnly } from '@/helpers/vuelidateHelper'

defineEmits(['submit'])

const state = reactive({
  email: '',
  password: '',
  name: '',
  rePassword: ''
})
const rules = {
  name: { required, letterAndNumberOnly },
  email: { email, required },
  password: { required },
  rePassword: { required, sameAsPassword: sameAs(toRef(() => state.password)) }
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
