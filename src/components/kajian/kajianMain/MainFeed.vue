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
          <div>{{ creator.name }}</div>
        </div>
        <div class="h-[40rem] w-full mb-auto bg-black">
          <img :src="mainImage" class="object-contain h-full w-full" />
        </div>
        <div class="h-fit flex flex-col w-full items-center px-5 mt-2">
          <div class="h-10 text-xs flex justify-between items-center w-full mb-2">
            <div class="w-6/12 flex items-center">
              <template v-for="index in 3" :key="index">
                <IconLike class="first:ml-0 -ml-2">
                  <font-awesome-icon :icon="['fas', 'hippo']" />
                </IconLike>
              </template>
              <span class="ml-1 text-kajian-darkGray">{{ props.postDetail.like.count }}</span>
            </div>
            <div class="w-6/12 flex justify-end items-center">
              <div class="mr-2 cursor-pointer hover:text-kajian-darkBlue text-kajian-darkGray">
                10 Comment
              </div>
              <div class="mr-2">-</div>
              <div class="mr-2 cursor-pointer hover:text-kajian-darkBlue text-kajian-darkGray">
                25 Reposts
              </div>
            </div>
          </div>
          <hr class="border-kajian-gray border w-full" />
          <div class="w-full text-sm my-5 h-fit">
            <div class="flex flex-wrap h-[5rem]">
              <div class="w-2/4 font-light">
                <span>Judul : </span>
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
                <span class="capitalize">{{ ustad.name }}</span>
              </div>
              <div class="w-2/4 font-light">
                <span>Jadwal : </span>
                <span class="capitalize text-xs">{{ props.postDetail.waktu.tanggal }}</span>
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
              <div class="my-5 h-fit">
                {{ props.postDetail.detail }}
              </div>
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
            <div class="cursor-pointer hover:text-kajian-darkBlue">
              <font-awesome-icon :icon="['fas', 'thumbs-up']" /> <span>like</span>
            </div>
            <div class="cursor-pointer hover:text-kajian-darkBlue">
              <font-awesome-icon :icon="['fas', 'comment']" /> <span>comment</span>
            </div>
            <div class="cursor-pointer hover:text-kajian-darkBlue">
              <font-awesome-icon :icon="['fas', 'repeat']" /> <span>repost</span>
            </div>
            <div class="cursor-pointer hover:text-kajian-darkBlue">
              <font-awesome-icon :icon="['fas', 'share']" /> <span>share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconLike from '@/components/kajian/iconPersonal/IconLike.vue'
import { onMounted, ref } from 'vue'
import { getUser, getUstad, getImage } from '@/firebase/kajianDataService.js'

const props = defineProps({
  postDetail: {
    required: true,
    type: Object
  }
})
const creator = ref({})
const ustad = ref({})
const isDetailOpen = ref(false)
const mainImage = ref('')

onMounted(() => {
  getCreatorUser()
  getPostUstad()
  getImagePost()
})

async function getPostUstad() {
  ustad.value = await getUstad(Object.keys(props.postDetail.ustad)[0])
}
async function getCreatorUser() {
  creator.value = await getUser(Object.keys(props.postDetail.creator)[0])
}
async function getImagePost() {
  mainImage.value = await getImage(props.postDetail.postId + '.' + props.postDetail.posterExt)
}
</script>
