<template>
  <div class="w-full h-full flex justify-center gap-x-3">
    <KajianUser></KajianUser>
    <div class="flex flex-col w-4/12 h-full">
      <KajianFeed></KajianFeed>
      <KajianFeed></KajianFeed>
      <KajianFeed></KajianFeed>
      <div class="h-full w-full">
        <div class="w-full h-36 flex justify-center items-baseline mt-7">
          <button
            class="border-2 border-kajian-darkBlue py-1 px-5 rounded-2xl text-kajian-darkBlue font-bold hover:bg-kajian-white hover:border-4 hover:shadow-xl"
          >
            See more post
          </button>
        </div>
      </div>
    </div>
    <KajianRecommend></KajianRecommend>
  </div>
</template>

<script setup>
import KajianFeed from './kajianMain/MainFeed.vue'
import KajianUser from './kajianMain/MainUser.vue'
import KajianRecommend from './kajianMain/MainRecommend.vue'
</script>
