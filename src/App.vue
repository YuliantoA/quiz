<template>
  <ToastMessage ref="toast"></ToastMessage>
  <div
    v-if="isLoading"
    class="absolute h-screen w-screen flex justify-center items-center bg-white opacity-80"
  >
    <LoaderSpinner class=""></LoaderSpinner>
  </div>
  <div v-if="!isLoading" class="w-screen">
    <RouterView />
  </div>
</template>

<script setup>
import LoaderSpinner from '@/components/util/LoaderSpinner.vue'
import { RouterView } from 'vue-router'
import ToastMessage from '@/components/util/ToastMessage.vue'
import { toastStore } from '@/stores/counter'
import { ref, watch } from 'vue'

const store = toastStore()
const toast = ref(null)
const isLoading = ref(false)

watch(
  () => store.toastActive,
  () => {
    if (store.toastMessage != '') {
      toast.value.notify({
        message: store.toastMessage,
        type: store.toastType,
        promFunc: store.toastFunc
      })
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
</script>

<style scoped></style>
