<script setup>
const listNav = [
  {
    name: 'Hotel'
  },
  {
    name: 'flight'
  },
  {
    name: 'car rental'
  },
  {
    name: 'tours'
  }
]
</script>

<template>
  <div class="flex w-2/12 bg-[#333] flex-col items-center justify-between text-white">
    <div class="w-full">
      <div
        v-for="index in listNav"
        :key="index"
        class="first:mt-10 mt-3 w-full p-5 relative cursor-pointer triggerHover"
      >
        <span class="relative uppercase z-30 ml-10"> {{ index.name }} </span>
        <div class="backgroundHover h-1 absolute w-1 top-7 z-0"></div>
      </div>
    </div>
    <div class="mb-8 text-center text-sm font-light w-9/12">
      © 2017 by trillo. All rights reserved.
    </div>
  </div>
</template>

<style scoped>
.triggerHover:hover .backgroundHover {
  /* transform: scaleY(16) scaleX(55.2); */
  /* transition: scaleY 1s ease-in;
  transition: scaleX 1s ease-in; */
  animation: toRight 700ms ease-out forwards;
  backface-visibility: hidden;
  background-color: #ff3366;
  z-index: 0;
  left: 0;
}

.backgroundHover {
  left: 0;
}

@keyframes toRight {
  0% {
    /* left: 0; */
  }
  60% {
    transform: scaleY(16);
    /* left: 1rem; */
    width: 0.5rem;
  }
  100% {
    transform: scaleY(16);
    width: 100%;
    /* left: 5.7rem; */
    transform-origin: left center;
    left: 0;
  }
}
</style>
