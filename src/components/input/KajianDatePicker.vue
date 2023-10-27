<template>
  <VueDatePicker v-model="date" :min-date="new Date()">
    <template #dp-input>
      <div class="w-full h-[4rem]">
        <KajianTextInput
          class="cursor-pointer"
          :readonly="true"
          :placeholder-text="'Jadwal'"
          :type-input="'text'"
          :list-error="props.listError"
          v-model="stringDate"
        >
          <template v-slot:icon><font-awesome-icon :icon="['far', 'calendar']" /></template>
        </KajianTextInput>
      </div>
    </template>
    <template #clear-icon="{ clear }"> </template>
  </VueDatePicker>
</template>

<script setup>
import KajianTextInput from '@/components/input/KajianTextInput.vue'
import { computed, onMounted, ref, watch } from 'vue'

const emit = defineEmits(['dateUpdated'])
const date = ref(new Date())
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}

const props = defineProps({
  listError: {
    type: Array
  }
})
onMounted(() => {
  emit('dateUpdated', date.value)
})

watch(date, () => {
  emit('dateUpdated', date.value)
})

const stringDate = computed(() => {
  return date?.value.toLocaleDateString('id-ID', options)
})
</script>
