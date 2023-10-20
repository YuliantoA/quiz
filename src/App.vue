<template>
  <ToastMessage ref="toast"></ToastMessage>
  <div
    v-if="isLoading"
    class="absolute h-screen w-screen flex justify-center items-center bg-white opacity-80"
  >
    <LoaderSpinner class=""></LoaderSpinner>
  </div>
  <div class="w-screen">
    <RouterView />
  </div>
</template>

<script setup>
import LoaderSpinner from '@/components/util/LoaderSpinner.vue'
import { RouterView } from 'vue-router'
import ToastMessage from '@/components/util/ToastMessage.vue'
import { toastStore, kajianStore } from '@/stores/counter'
import { onMounted, ref, watch } from 'vue'
import firebase from '@/firebase/firebase.js'
import router from './router'

const store = toastStore()
const userStore = kajianStore()
const toast = ref(null)
const isLoading = ref(true)
onMounted(() => {
  checkLoginStatus()
})
watch(
  () => store.toastActive,
  () => {
    if (store.toastMessage != '') {
      toast.value.notify({ message: store.toastMessage, type: store.toastType })
      store.resetToast()
    }
  }
)
watch(
  () => store.toastRemoveAll,
  () => {
    if (store.toastRemoveAll === true) {
      toast.value.removeAll
      store.toastRemoveAll = false
    }
  }
)

async function checkLoginStatus() {
  await firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      userStore.login(user)
      router.replace({ name: 'kajianMain' })

      // User is signed in.
    } else {
      console.log('belum')
      router.replace({ name: 'landing' })
      // No user is signed in.
    }
    isLoading.value = false
  })
}
</script>

<style scoped></style>
