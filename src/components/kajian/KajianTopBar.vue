<template>
  <div
    class="flex justify-between items-center bg-kajian-white h-20 px-64 border border-kajian-darkGray"
  >
    <div class="w-1/12">
      <i>
        <logoIcon></logoIcon>
      </i>
    </div>
    <div>
      <i>
        <logoTextIcon></logoTextIcon>
      </i>
    </div>
    <div class="flex justify-between items-center w-1/12">
      <IconBorder>
        <font-awesome-icon :icon="['fas', 'house']" />
      </IconBorder>
      <IconBorder>
        <font-awesome-icon :icon="['fas', 'heart']" />
      </IconBorder>
      <VMenu>
        <IconBorder>
          <font-awesome-icon :icon="['fas', 'user']" />
        </IconBorder>

        <template #popper>
          <div class="h-20 w-24 flex flex-col justify-center items-center">
            <!-- <button class="w-full h-1/2 border border-kajian-gray">detail</button> -->
            <div>{{ userStore.displayName }}</div>
            <div
              @click="logout"
              class="flex items-center justify-center w-8/12 h-10 py-2 px-10 border border-kajian-gray hover:bg-kajian-darkGray cursor-pointer"
            >
              <font-awesome-icon class="mr-3" :icon="['fas', 'right-from-bracket']" />
              <button class="">logout</button>
            </div>
          </div>
        </template>
      </VMenu>
    </div>
  </div>
</template>

<script setup>
import logoIcon from './logo/LogoIcon.vue'
import logoTextIcon from './logo/LogoTextIcon.vue'
import IconBorder from './iconPersonal/IconBorder.vue'
import router from '../../router'
import firebase from '@/firebase/firebase.js'
import { kajianStore } from '../../stores/counter'

const userStore = kajianStore()
async function logout() {
  await firebase.auth().signOut()
  router.replace({ name: 'landing' })
}
</script>
