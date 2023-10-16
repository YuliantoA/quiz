<script setup>
// onMounted(() => {
//   axios.get('https://opentdb.com/api.php?amount=10&category=27').then((response) => {
//     listQuestion.value = response.data
//   })
// })
</script>

<template>
  <div class="flex flex-col justify-center items-center bg-quiz-beige h-screen font-gardenia">
    <RouterView />
  </div>
</template>
