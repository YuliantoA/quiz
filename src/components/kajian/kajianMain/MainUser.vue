<template>
  <div class="w-2/12 rounded-xl h-[20rem] bg-kajian-white flex flex-col items-center px-5 pt-10">
    <input @change="onBrowse" ref="fileUpload" type="file" accept=".jpg,.jpeg,.png" hidden />
    <div class="w-full h-[8rem] flex justify-center items-center">
      <div
        @click="chooseFiles"
        class="w-[6rem] h-[6rem] bg-kajian-darkGray rounded-full outline-dashed hover:outline-double cursor-pointer hover:bg-kajian-darkGray/50 relative hover:text-3xl text-xl transition-all duration-300 ease-out"
        :class="[
          userPhoto && !isLoading ? 'outline-kajian-lightBlue' : 'outline-kajian-darkestGray',
          isLoading ? 'animate-pulse' : 'animate-none'
        ]"
      >
        <template v-if="!isLoading">
          <div v-if="!userPhoto" class="absolute bottom-3 right-9">
            <font-awesome-icon :icon="['fas', 'camera']" style="color: #ffffff" />
          </div>
          <img
            v-if="userPhoto"
            class="object-cover rounded-full w-[6rem] h-[6rem]"
            :src="userPhoto"
          />
        </template>
      </div>
    </div>
    <h5 class="font-bold text-lg py-2">
      {{ userStore.displayName ? userStore.displayName : 'default' }}
    </h5>
    <hr class="bg-kajian-blue h-[.1rem] w-full" />
    <div class="flex flex-col mt-5 w-full h-[10rem] space-y-4">
      <div
        class="w-full flex space-x-3 items-center justify-center cursor-default hover:shadow-sm hover:text-kajian-red"
      >
        <font-awesome-icon class="" :icon="['far', 'thumbs-up']" />
        <p class="text-black">{{ `${countLike} Liked Post` }}</p>
      </div>
      <div
        class="w-full flex space-x-3 items-center justify-center cursor-default hover:shadow-sm hover:text-kajian-red"
      >
        <font-awesome-icon :icon="['far', 'paper-plane']" />
        <p class="text-black">{{ `${countPost} created Post` }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import {
  insertImageUser,
  getUserPhoto,
  getCountPost,
  getCountLikedPost,
  getUser
} from '@/firebase/kajianDataService.js'
import { kajianStore, toastStore, kajianFeedStore } from '@/stores/counter'
import { compressImage } from '@/helpers/ImageHelper.js'

const controlFeedStore = kajianFeedStore()
const fileUpload = ref()
const userStore = kajianStore()
const toast = toastStore()
const isLoading = ref(true)
const userPhoto = ref('')
const countPost = ref(0)
const countLike = ref(0)
async function onBrowse(e) {
  isLoading.value = true
  toast.toastOpen({
    message: {
      pending: 'Uploading your photo',
      success: 'Photo uploaded',
      error: 'Photo Fail to upload'
    },
    type: 'promise',
    promFunc: uploadImage(e)
  })
}

onMounted(() => {
  getPhoto()
  getAllPostCount()
  getAllLikedPostCount()
})

async function uploadImage(e) {
  const image = await compressImage([...e.target.files])

  const uploadImage = await insertImageUser({
    data: image,
    filename: `${userStore.uid}.${e.target.files[0].name.split('.')[1]}`,
    isUpdate: userPhoto.value.length > 0
  })
  if (uploadImage) {
    getPhoto()
    controlFeedStore.refetchPost = true
    return Promise.resolve('success')
  } else {
    isLoading.value = false
    return Promise.reject('error')
  }
}

async function getPhoto() {
  const isUserUploadPhoto = await getUser(userStore.getUid().value)
  isUserUploadPhoto.imageExt
    ? (userPhoto.value = await getUserPhoto(
        (await userStore.getUid().value) + '.' + isUserUploadPhoto.imageExt
      ))
    : ''
  isLoading.value = false
}

function chooseFiles() {
  fileUpload.value.click()
}

async function getAllPostCount() {
  countPost.value = await getCountPost(userStore.getUid().value)
}

async function getAllLikedPostCount() {
  countLike.value = await getCountLikedPost(userStore.uid)
}
</script>
