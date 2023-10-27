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
          @click="submit"
          class="px-10 py-3 bg-gradient-to-br from-kajian-lightBlue to-kajian-darkBlue rounded-xl text-kajian-white font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import createPostForm from './createPostForm.vue'
import { insertPost, insertImagePost } from '@/firebase/kajianDataService.js'
import { kajianStore, toastStore } from '@/stores/counter.js'
import router from '@/router'

const toast = toastStore()
const userStore = kajianStore()
const form = ref()
async function submit() {
  const formValue = await form.value.validateAndGetData()
  if (formValue.valid)
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

async function uploadPost(formValue) {
  const formData = formValue.formData
  const date = new Date() // Or the date you'd like converted.
  const creatingTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
  const ext = formData.poster[0].name.split('.')[1]
  const result = await insertPost({
    data: {
      active: true,
      creator: { [userStore.uid]: true },
      detail: 'oh iya ini lupa',
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
      waktu: {
        jam: formData.date.toLocaleTimeString('id-ID', { hour: 'numeric', minute: 'numeric' }),
        tanggal: formData.date.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      },
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
      Promise.resolve('success')
      router.replace({ name: 'kajianMain' })
    } else {
      Promise.reject('fail')
      router.replace({ name: 'kajianMain' })
    }
  } else {
    Promise.reject('fail')
    router.replace({ name: 'kajianMain' })
  }
}
</script>
