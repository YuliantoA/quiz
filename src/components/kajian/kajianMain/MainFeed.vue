<template>
  <div class="bg-kajian-white h-fit w-full border border-kajian-darkGray rounded-xl mb-5">
    <div class="flex justify-center w-full h-full">
      <div class="flex flex-col items-center justify-between w-full">
        <div class="h-16 py-5 flex justify-start items-center w-full">
          <div
            class="mx-3 rounded-full bg-kajian-darkGray w-10 h-10 flex justify-center items-center"
          >
            <font-awesome-icon :icon="['fas', 'user']" />
          </div>
          <div v-if="props.postDetail.creatorFetch">{{ props.postDetail.creatorFetch?.name }}</div>
        </div>
        <div class="h-[40rem] w-full mb-auto bg-black">
          <img :src="props.postDetail.image" class="object-contain h-full w-full" />
        </div>
        <div class="h-fit flex flex-col w-full items-center px-5 mt-2">
          <div class="h-10 text-xs flex justify-between items-center w-full mb-2">
            <div class="w-6/12 flex items-center">
              <template v-for="index in 3" :key="index">
                <IconLike class="first:ml-0 -ml-2">
                  <font-awesome-icon :icon="['fas', 'hippo']" />
                </IconLike>
              </template>
              <span class="ml-1 text-kajian-darkGray">{{ likeCount }}</span>
            </div>
            <div class="w-6/12 flex justify-end items-center">
              <div class="mr-2 cursor-pointer hover:text-kajian-darkBlue text-kajian-darkGray">
                {{ `${commentCount} Comment` }}
              </div>
            </div>
          </div>
          <hr class="border-kajian-gray border w-full" />
          <div class="w-full text-xs my-5 h-fit">
            <div class="flex flex-wrap h-[5rem]">
              <div class="w-2/4 font-light">
                <span class="">Judul : </span>
                <span class="uppercase font-bold">{{ props.postDetail.judul }}</span>
              </div>
              <div class="w-2/4 font-light">
                <span>Lokasi : </span>
                <span class="capitalize">{{
                  `${props.postDetail.tempat.provinsi}, ${props.postDetail.tempat.kota}, ${props.postDetail.tempat.kecamatan}`
                }}</span>
              </div>
              <hr class="w-full border-none h-0" />
              <div class="w-2/4 font-light">
                <span>Ustad : </span>
                <span v-if="props.postDetail.ustadFetch" class="capitalize">{{
                  props.postDetail.ustadFetch?.name
                }}</span>
              </div>
              <div class="w-2/4 font-light">
                <span>Jadwal : </span>
                <span class="capitalize text-xs">{{ `${date} ${time}` }}</span>
              </div>
            </div>
            <div
              v-if="!isDetailOpen"
              @click="isDetailOpen = !isDetailOpen"
              class="flex items-center justify-center w-full hover:text-kajian-darkBlue cursor-pointer capita"
            >
              see more >>
            </div>
            <div v-else class="w-full h-fit">
              <hr class="border-t border-kajian-gray" />
              <div v-html="props.postDetail.detail" class="my-5 h-fit"></div>
              <div
                @click="isDetailOpen = !isDetailOpen"
                class="flex items-center justify-center w-full hover:text-kajian-darkBlue cursor-pointer capita"
              >
                see less >>
              </div>
            </div>
          </div>
          <hr class="border-kajian-gray border w-full" />
          <div class="flex justify-around w-full items-center text-sm h-12">
            <div class="w-1/3 text-center flex justify-center items-center">
              <div
                v-if="!isLikeLoading"
                @click="likeClick"
                class="cursor-pointer hover:text-kajian-darkBlue w-fit"
              >
                <font-awesome-icon
                  :class="[isLiked ? 'text-kajian-red' : '']"
                  class="mr-1"
                  :icon="['fas', 'thumbs-up']"
                />
                <span>like</span>
              </div>
              <div v-else class="cursor-default w-full flex justify-center items-center">
                <div class="h-[1rem] rounded-lg bg-kajian-gray animate-pulse w-2/3"></div>
              </div>
            </div>
            <div class="w-1/3 text-center flex justify-center items-center">
              <div @click="commentClick" class="cursor-pointer hover:text-kajian-darkBlue w-fit">
                <font-awesome-icon :icon="['fas', 'comment']" /> <span>comment</span>
              </div>
            </div>
            <div class="w-1/3 text-center flex justify-center items-center">
              <div class="cursor-pointer hover:text-kajian-darkBlue w-fit">
                <font-awesome-icon :icon="['fas', 'share']" /> <span>share</span>
              </div>
            </div>
          </div>
          <hr v-if="isComment" class="border-kajian-gray border w-full" />
          <div
            v-show="isComment"
            class="w-full transition-all ease-out duration-400 overflow-y-auto scrollbar pr-3"
            :class="[isComment ? 'max-h-[20rem]' : 'h-0']"
          >
            <div
              v-if="!isCommentLoading"
              class="mt-3 w-full flex justify-start relative transition-all duration-500 ease-out"
              :class="[postShow ? 'h-[5rem]' : 'h-[3rem]']"
            >
              <div class="w-full h-[2rem] flex items-center rounded-xl">
                <div class="rounded-full w-1/6 h-full flex items-center justify-center">
                  <img
                    class="object-cover rounded-full w-10 h-10"
                    src="https://firebasestorage.googleapis.com/v0/b/mynotification-b74ab.appspot.com/o/kajian%2Fpost%2F-NhpVrxSMln6-GKlabat.jpeg?alt=media&token=196442cb-2d20-4b0b-ab1a-c5ea521966e9"
                  />
                </div>
                <div class="w-5/6 h-full">
                  <input
                    v-model="commentInput"
                    type="text"
                    class="justify-evenly outline-kajian-darkGray outline p-3 rounded-lg w-full shadow-md h-5/6 text-sm"
                  />
                  <div
                    @click="sendComment"
                    v-if="postShow"
                    class="w-[4rem] h-[2rem] my-3 flex items-center justify-center rounded-lg text-kajian-white bg-gradient-to-bl from-kajian-blue to-kajian-darkBlue shadow-xl cursor-pointer hover:ring-2"
                  >
                    post
                  </div>
                </div>
              </div>
              <div class="absolute right-0 text-xs top-8">
                {{ `${commentInput.length}/${maxComment}` }}
              </div>
            </div>
            <div class="pt-5 w-full h-5/6">
              <template v-if="isCommentLoading">
                <FeedCommentSkeleton v-for="index in 1" :key="index" />
              </template>
              <template v-else>
                <FeedComment
                  v-for="(comment, index) in listComment"
                  :key="index"
                  :detail-comment="comment"
                />
              </template>
            </div>
          </div>
          <div class="h-5"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FeedComment from '@/components/kajian/kajianMain/FeedComment.vue'
import FeedCommentSkeleton from '@/components/kajian/kajianMain/FeedCommentSkeleton.vue'
import IconLike from '@/components/kajian/iconPersonal/IconLike.vue'
import { onMounted, ref, watch } from 'vue'
import { serializeDateTime } from '@/helpers/StringHelper.js'
import {
  getCommentPost,
  postComment,
  getLikedCounterPost,
  getDetailLikedPost,
  getCommentCounterPost,
  updateLikeContent
} from '@/firebase/kajianDataService.js'
import { kajianStore } from '@/stores/counter'
const props = defineProps({
  postDetail: {
    required: true,
    type: Object
  },
  index: {
    type: Number
  }
})
const userStore = kajianStore()
const isCommentLoading = ref(true)
const isDetailOpen = ref(false)
const isLiked = ref(false)
const isComment = ref(false)
const postShow = ref(false)
let isCommentFetched = false
const listComment = ref([])
const commentInput = ref('')
const maxComment = 40
const likeCount = ref(0)
const isLikeLoading = ref(true)
const detailLike = ref([])
const commentCount = ref(0)
const { date, time } = serializeDateTime(props.postDetail.waktu)
watch(commentInput, (newValue) => {
  newValue.length <= maxComment
    ? newValue.length > 0
      ? (postShow.value = true)
      : (postShow.value = false)
    : (commentInput.value = commentInput.value.substring(0, 40))
})

onMounted(() => {
  getLike()
  getCommentCounter()
})

async function likeClick() {
  isLiked.value = !isLiked.value
  const data = {
    count: isLiked.value ? likeCount.value + 1 : likeCount.value - 1,
    user: {
      [userStore.uid]: true
    }
  }
  await updateLikeContent({
    data: data,
    id: props.postDetail.postId,
    index: props.index,
    statusLike: isLiked.value
  })
}
async function commentClick() {
  isComment.value = !isComment.value
  !isCommentFetched
    ? await getCommentPost({
        data: props.postDetail.postId,
        func: (data) => {
          listComment.value = []
          for (let i in data) {
            listComment.value.push({ ...data[i], commentId: i })
          }
          isCommentLoading.value = false
          isCommentFetched = true
        },
        emptyFunc: () => {
          isCommentLoading.value = false
          isCommentFetched = true
        }
      })
    : ''
}
async function sendComment() {
  const data = {
    comment: commentInput.value,
    user: userStore.uid
  }
  await postComment({ data, id: props.postDetail.postId })
  commentInput.value = ''
}

async function getLike() {
  await getLikedCounterPost({
    id: props.postDetail.postId,
    func: (data) => {
      likeCount.value = data
    }
  })
  detailLike.value = await getDetailLikedPost({ id: props.postDetail.postId })
  for (let i in detailLike.value) {
    if (i === userStore.uid) {
      isLiked.value = true
      break
    }
  }
  isLikeLoading.value = false
}
async function getCommentCounter() {
  await getCommentCounterPost({
    id: props.postDetail.postId,
    func: (data) => {
      commentCount.value = data
    }
  })
}
</script>
