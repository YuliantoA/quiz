<template>
  <div class="w-full h-full flex flex-col items-center py-28 px-10">
    <KajianLoginForm ref="form" @submit="login"></KajianLoginForm>
    <div class="w-full h-16 flex items-start justify-end px-10">
      <button
        @click="toRegis()"
        class="text-kajian-blue hover:text-kajian-darkBlue font-bold text-sm"
      >
        dont have account ?
      </button>
    </div>
    <div
      v-if="isErrorApi"
      class="flex justify-start items-center w-10/12 h-10 bg-kajian-red-transparent px-10"
      v-tooltip="messageError"
    >
      <font-awesome-icon class="mr-5 text-kajian-red" :icon="['fas', 'circle-exclamation']" />
      <span class="text-md overflow-hidden text-ellipsis leading-[1rem] max-h-8">{{
        messageError
      }}</span>
    </div>
    <div class="w-full flex items-center justify-center h-5 mt-10">
      <button
        :disabled="isLoading"
        @click="login"
        class="w-10/12 lg:py-3 py-6 lg:text-lg text-2xl lg:font-normal font-bold rounded-full bg-gradient-to-br from-kajian-lightBlue to-kajian-darkBlue uppercase text-kajian-white tracking-widest hover:shadow-xl flex justify-center items-center"
      >
        <div v-if="isLoading" class="Toastify__spinner"></div>
        <span v-else> Login </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import KajianLoginForm from '@/components/kajian/landing/KajianLoginForm.vue'
import { firebase } from '@/firebase/firebase.js'
import router from '../../../router'
import { ref } from 'vue'
import { toastStore, kajianStore } from '@/stores/counter'
import { normalizeMessageFirebase } from '@/helpers/StringHelper'

const form = ref(null)
const store = toastStore()
const userStore = kajianStore()
const isLoading = ref(false)
const isErrorApi = ref(false)
const messageError = ref('')

async function login() {
  isLoading.value = true
  isErrorApi.value = false
  const data = await form.value.validateAndGetData()
  if (data.valid) {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.formData.email, data.formData.password)
      .then((userCredential) => {
        userStore.login(userCredential.user)
        console.log(userCredential)
        router.replace({ name: 'kajianMain' })
        isLoading.value = false
      })
      .catch((error) => {
        isErrorApi.value = true
        messageError.value = normalizeMessageFirebase(error.message)
        store.toastOpen({ message: normalizeMessageFirebase(error.message), type: 'error' })
        isLoading.value = false
      })
  } else {
    isLoading.value = false
  }
}

function toRegis() {
  store.toastRemoveAll = true
  router.replace({ name: 'kajianRegis' })
}
</script>
