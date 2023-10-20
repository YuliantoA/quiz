<script setup>
import { defineExpose } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

function notify({ message, type = 'info' }) {
  // let content = {
  //   component: MsgToast,
  //   props: {
  //     title: 'test',
  //     message: 'testAja'
  //   }
  // }
  //type = error,success,warn,info,kosong = default
  toast[type](message, {
    closeOnClick: true,
    autoClose: 8000,
    position: toast.POSITION.TOP_RIGHT,
    clearOnUrlChange: false
  })
}
function removeAll() {
  toast.remove
}
defineExpose({
  notify,
  removeAll
})
</script>

<template>
  <template></template>
</template>
