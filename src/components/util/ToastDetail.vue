<script>
import { ToastProps } from 'vue3-toastify'
import { PropType } from 'vue'

export default {
  name: 'MsgToast',
  props: {
    closeToast: Function,
    toastProps: Object,
    title: String,
    message: String
    // for ts
    // closeToast: Function as PropType<(e?: MouseEvent) => void>,
    // toastProps: Object as PropType<ToastProps>,
  }
}
</script>

<template>
  <div>
    {{ props }}
  </div>
</template>
