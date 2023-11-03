<template>
  <div class="w-full h-[55rem] flex justify-center items-center">
    <div
      class="w-8/12 h-full flex flex-col justify-center items-center bg-kajian-white rounded-xl p-10 pt-8"
    >
      <div class="relative w-full">
        <div
          @click="router.replace({ name: 'kajianMain' })"
          class="absolute top-0 right-0 cursor-pointer"
        >
          <img src="@/assets/kajian/cancel.png" />
        </div>
        <div class="text-2xl mb-10 text-center">Create Post</div>
      </div>
      <createPostForm ref="form" class=""></createPostForm>
      <div class="w-full my-5 flex justify-end">
        <button
          v-if="!isLoading"
          @click="submit"
          class="px-10 py-3 w-[10rem] bg-gradient-to-br from-kajian-lightBlue to-kajian-darkBlue rounded-xl text-kajian-white font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1"
        >
          Submit
        </button>
        <button
          v-else
          type="button"
          class="px-10 py-3 w-[10rem] flex justify-center items-center bg-gradient-to-br from-kajian-lightBlue to-kajian-darkBlue hover:shadow-2xl focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            class="mr-2 animate-spin"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
            ></path>
          </svg>
          loading
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import createPostForm from '@/components/kajian/createPost/CreatePostForm.vue'
import { insertPost, insertImagePost } from '@/firebase/kajianDataService.js'
import { kajianStore, toastStore } from '@/stores/counter.js'
import router from '@/router'

const toast = toastStore()
const userStore = kajianStore()
const form = ref()
const isLoading = ref(false)
async function submit() {
  const formValue = await form.value.validateAndGetData()
  if (formValue.valid) {
    isLoading.value = true
    toast.toastOpen({
      message: {
        pending: 'Creating your post',
        success: 'Post Created',
        error: 'Failed to create post'
      },
      type: 'promise',
      promFunc: uploadPost(formValue)
    })
  }
}

async function uploadPost(formValue) {
  const formData = formValue.formData
  const date = new Date() // Or the date you'd like converted.
  const creatingTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
  const ext = formData.poster[0].name.split('.')[1]
  const result = await insertPost({
    data: {
      active: true,
      creator: { [userStore.uid]: true },
      detail: formData.description,
      judul: formData.judul,
      like: {
        count: 0,
        user: {}
      },
      tempat: {
        provinsi: formData.province,
        kota: formData.kota,
        kecamatan: formData.kecamatan
      },
      ustad: {
        [formData.ustad]: true
      },
      waktu: new Date(
        formData.date.getTime() - formData.date.getTimezoneOffset() * 60000
      ).toISOString(),

      posterExt: ext,
      createdDate: creatingTime
    }
  })
  if (result.key) {
    const uploadImage = await insertImagePost({
      data: formData.poster[0],
      filename: `${result.key}.${ext}`
    })
    if (uploadImage) {
      isLoading.value = false
      Promise.resolve('success')
      router.replace({ name: 'kajianMain' })
    } else {
      isLoading.value = false
      Promise.reject('fail')
      router.replace({ name: 'kajianMain' })
    }
  } else {
    isLoading.value = false
    Promise.reject('fail')
    router.replace({ name: 'kajianMain' })
  }
}
</script>
