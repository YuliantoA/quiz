<template>
  <div></div>
  <Fireworks
    ref="fw"
    class="z-10 absolute"
    :class="{ 'h-full w-full': props.fullscreen }"
  ></Fireworks>
</template>

<script setup>
import { Fireworks } from '@fireworks-js/vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  immediate: {
    type: Boolean,
    default: true
  },
  time: {
    type: Number,
    default: 5000
  },
  fullscreen: {
    type: Boolean,
    default: true
  }
})

onMounted(() => {
  props.immediate ? startFireworks() : ''
})

const fw = ref(Fireworks)

async function startFireworks() {
  if (!fw.value) return
  fw.value.start()
  await new Promise((resolve) => setTimeout(resolve, props.time))
  await fw.value.waitStop()
}
</script>
