<template>
  <div class="w-full h-full flex flex-col items-center pt-24 pb-16 px-10">
    <KajianRegisFrom ref="form"></KajianRegisFrom>
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
        @click="regis"
        class="w-10/12 py-3 rounded-full bg-gradient-to-br from-kajian-lightBlue to-kajian-darkBlue uppercase text-kajian-white tracking-widest hover:shadow-xl flex items-center justify-center"
      >
        <div v-if="isLoading" class="Toastify__spinner"></div>
        <span v-else> Create Account </span>
      </button>
    </div>
    <div class="w-full flex items-center justify-center px-10 pt-5 mt-auto">
      <button
        @click="toLogin()"
        class="text-kajian-blue hover:text-kajian-darkBlue font-bold text-sm"
      >
        already have an account ?
      </button>
    </div>
  </div>
</template>

<script setup>
import KajianRegisFrom from '@/components/kajian/landing/KajianRegisForm.vue'
import { normalizeMessageFirebase } from '@/helpers/StringHelper'
import { firebase } from '@/firebase/firebase.js'
import { ref } from 'vue'
import router from '../../../router'
import { toastStore } from '@/stores/counter'

const form = ref(null)
const store = toastStore()

const isErrorApi = ref(false)
const messageError = ref('')
const isLoading = ref(false)
async function regis() {
  isLoading.value = true
  const data = await form.value.validateAndGetData()
  isErrorApi.value = false
  if (data.valid) {
    // try {
    //   const user = await firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(data.formData.email, data.formData.password)
    //     .catch((err) => console.log(err))
    //   console.log(user)
    //   const result = await user.user
    //     .updateProfile({ displayName: data.formData.name })
    //     .catch((err) => console.log(err))

    //   console.log(result)
    // } catch (err) {
    //   console.log(err)
    // }

    firebase
      .auth()
      .createUserWithEmailAndPassword(data.formData.email, data.formData.password)
      .then((result) => {
        result.user
          .updateProfile({
            displayName: data.formData.name
          })
          .then((resultUser) => {
            console.log('test1')
            store.toastOpen({
              message: 'Create account success, please try login',
              type: 'success'
            })
            toLogin(false)
            console.log(resultUser)
            isLoading.value = false
          })
          .catch((asdd) => {
            console.log(asdd)
          })
      })
      .then((asd) => {
        console.log('test2')
        console.log(asd)
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

function toLogin(removeToast = true) {
  if (removeToast) {
    store.toastRemoveAll = true
  }
  router.push({ name: 'kajianLogin' })
}
</script>
