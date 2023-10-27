<template>
  <div class="w-full h-full flex justify-center gap-x-3">
    <KajianUser></KajianUser>
    <div class="flex flex-col w-4/12 h-full">
      <!-- <FeedControl></FeedControl> -->
      <KajianFeed
        :post-detail="post"
        v-for="(post, index, key) in showPost"
        :key="key"
      ></KajianFeed>

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
import KajianFeed from '@/components/kajian/kajianMain/MainFeed.vue'
import KajianUser from '@/components/kajian/kajianMain/MainUser.vue'
import KajianRecommend from '@/components/kajian/kajianMain/MainRecommend.vue'
import FeedControl from '@/components/kajian/kajianMain/control/FeedControl.vue'
import { getPostAllTest } from '@/firebase/kajianDataService.js'
import { computed, onMounted, ref } from 'vue'

onMounted(() => {
  getPost()
})

const allPost = ref({})
const showPost = computed(() => {
  let arrTemp = []
  for (let i in allPost.value) {
    arrTemp.push({ ...allPost.value[i], postId: i })
  }
  arrTemp.sort(compareCreateTime)
  return arrTemp
})

function compareCreateTime(a, b) {
  return new Date(a.createdDate) < new Date(b.createdDate)
}
async function getPost() {
  allPost.value = await getPostAllTest()
}
</script>
