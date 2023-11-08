<template>
  <div class="w-full h-[4rem] flex rounded-2xl first:mt-0 mt-5">
    <div class="rounded-full w-1/6 h-full flex items-center justify-center">
      <img
        class="object-cover rounded-full w-10 h-10"
        src="https://firebasestorage.googleapis.com/v0/b/mynotification-b74ab.appspot.com/o/kajian%2Fpost%2F-NhpVrxSMln6-GKlabat.jpeg?alt=media&token=196442cb-2d20-4b0b-ab1a-c5ea521966e9"
      />
    </div>
    <div
      class="flex flex-col justify-evenly bg-kajian-lightBlue/20 p-3 rounded-tr-xl rounded-bl-xl w-5/6 shadow-md relative"
    >
      <div class="text-sm font-semibold">{{ detailComment.name }}</div>
      <div class="text-xs break-words">{{ detailComment.comment }}</div>
      <div class="absolute bottom-1 right-1 text-xs text-kajian-darkGray">{{ normalizeTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { reformatDate, reformatTime } from '@/helpers/DateHelper.js'

const props = defineProps({
  detailComment: {
    type: Object,
    required: true
  }
})

const normalizeTime = computed(() => {
  const today = new Date()
  const commentTime = new Date(props.detailComment.created)
  if (today.toDateString() === commentTime.toDateString()) {
    return `${reformatTime(commentTime)}`
  } else if (
    today.getDate() - 1 === commentTime.getDate() &&
    today.getMonth() === commentTime.getMonth() &&
    today.getFullYear() === commentTime.getFullYear()
  ) {
    return 'yesterday'
  }
  return reformatDate(commentTime)
})
</script>
