<template>
  <input @change="onBrowse" ref="fileUpload" type="file" accept=".jpg,.jpeg,.png" hidden />
  <div class="w-2/12 rounded-xl h-[20rem] bg-kajian-white flex flex-col items-center px-5">
    <div class="w-full h-[8rem] flex justify-center items-center">
      <div
        @click="chooseFiles"
        class="w-[6rem] h-[6rem] bg-kajian-darkGray rounded-full outline-dashed hover:outline-double cursor-pointer hover:bg-kajian-darkGray/50 relative hover:text-3xl text-xl transition-all duration-300 ease-out"
        :class="[userPhoto ? 'outline-kajian-lightBlue' : 'outline-kajian-darkestGray']"
      >
        <div v-if="!userPhoto" class="absolute bottom-3 right-9">
          <font-awesome-icon :icon="['fas', 'camera']" style="color: #ffffff" />
        </div>
        <img
          v-if="userPhoto"
          class="object-cover rounded-full w-[6rem] h-[6rem]"
          :src="userPhoto"
        />
      </div>
    </div>
    <hr class="bg-kajian-blue h-[.1rem] w-full" />
    <div class="flex flex-col mt-5 w-full h-[10rem] space-y-4">
      <div
        class="w-full flex space-x-3 items-center justify-center cursor-default hover:shadow-sm hover:text-kajian-red"
      >
        <font-awesome-icon class="" :icon="['far', 'thumbs-up']" />
        <p class="text-black">9 Liked Post</p>
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
import { kajianStore, toastStore } from '@/stores/counter'
import { compressImage } from '@/helpers/ImageHelper.js'

const fileUpload = ref()
const userStore = kajianStore()
const toast = toastStore()
const isLoading = ref(false)
const userPhoto = ref('')
const countPost = ref(0)
async function onBrowse(e) {
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
})

async function uploadImage(e) {
  const image = await compressImage([...e.target.files])

  const uploadImage = await insertImageUser({
    data: image,
    filename: `${userStore.uid}.${e.target.files[0].name.split('.')[1]}`,
    isUpdate: userPhoto.value.length > 0
  })
  if (uploadImage) {
    isLoading.value = false
    getPhoto()
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
}

function chooseFiles() {
  fileUpload.value.click()
}

async function getAllPostCount() {
  countPost.value = await getCountPost(userStore.getUid().value)
}
</script>
