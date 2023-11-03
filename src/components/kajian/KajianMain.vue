<template>
  <div class="w-full h-full flex justify-center gap-x-3">
    <KajianUser></KajianUser>
    <div class="flex flex-col w-4/12 h-full">
      <FeedControl></FeedControl>
      <template v-if="isLoading">
        <KajianFeedSkeleton v-for="post in 3" :key="post" />
      </template>
      <template v-else>
        <KajianFeed
          :post-detail="post"
          v-for="(post, index, key) in showPost"
          :key="key"
          :index="index"
          @liked-click="likedClicked"
        ></KajianFeed>
      </template>

      <div v-show="false" class="h-full w-full">
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
import KajianFeedSkeleton from '@/components/kajian/kajianMain/MainFeedSkeleton.vue'
import { updateLikeContent, getPostAllOnce } from '@/firebase/kajianDataService.js'
import { computed, onMounted, ref } from 'vue'
import { kajianFeedStore } from '../../stores/counter'
import { watch } from 'vue'
import { getUser, getUstad, getImage } from '@/firebase/kajianDataService.js'

onMounted(() => {
  getPost()
})
const feedStore = kajianFeedStore()
const allPost = ref({})

const sortComponent = ref('')
const sortAsc = ref('')
const search = ref('')
const isLoading = ref(true)
watch(
  () => feedStore.sortComponent,
  (newValue) => {
    if (newValue) {
      sortComponent.value = feedStore.sortComponent
    }
  }
)
watch(
  () => feedStore.sortAsc,
  (newValue) => {
    sortAsc.value = newValue
  }
)
watch(
  () => feedStore.search,
  (newValue) => {
    search.value = newValue
  }
)

const showPost = computed(() => {
  let arrTemp = []
  for (let i in allPost.value) {
    arrTemp.push({ ...allPost.value[i], postId: i })
  }
  search.value
    ? (arrTemp = arrTemp.filter((value) => {
        return value.judul.toLowerCase().includes(search.value.toLowerCase())
      }))
    : ''
  switch (sortComponent.value) {
    case 'createdPost':
      arrTemp.sort(compareCreateTime)
      break
    case 'kajianTime':
      arrTemp.sort(compareKajianTime)
      break
    case 'judul':
      arrTemp.sort(compareJudul)
      break
    default: {
      arrTemp.sort(compareCreateTime)
    }
  }
  sortAsc.value ? arrTemp : arrTemp.reverse()
  return arrTemp
})

function compareCreateTime(a, b) {
  return new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1
}
function compareKajianTime(a, b) {
  return new Date(a.waktu) < new Date(b.waktu) ? 1 : -1
}
function compareJudul(a, b) {
  {
    if (a.judul === b.judul) return 0
    if (a.judul === '') return -1
    if (b.judul === '') return +1
    return a.judul[0] < b.judul[0] ? -1 : a.judul[0] > b.judul[0] ? +1 : 0
  }
}
async function getPost() {
  const data = await getPostAllOnce()
  processData(data)
}

async function processData(data) {
  for (let i in data) {
    data[i].image = await getImage(i + '.' + data[i].posterExt)
    data[i].ustadFetch = await getUstad(Object.keys(data[i].ustad)[0])
    data[i].creatorFetch = await getUser(Object.keys(data[i].creator)[0])
  }
  allPost.value = data
  isLoading.value = false
}
async function likedClicked(param) {
  allPost.value[param.id].like.count = param.data.like.count
  await updateLikeContent({ ...param })
  // console.log(param.data.like.count)
}
</script>
