<template>
  <div
    class="flex lg:justify-between justify-around items-center bg-kajian-white lg:h-20 h-12 lg:px-64 border border-kajian-darkGray"
  >
    <div class="w-1/12">
      <i @click="controlFeedStore.showSideBar = true">
        <IconBorder v-if="isMobile(width)">
          <font-awesome-icon :icon="['fas', 'user']" />
        </IconBorder>
        <logoIcon v-else></logoIcon>
      </i>
    </div>
    <div>
      <i>
        <logoTextIcon :width="isMobile(width) ? '100' : '200'"></logoTextIcon>
      </i>
    </div>
    <div class="flex justify-between items-center w-1/12">
      <VTooltip v-if="isMobile(width)">
        <IconBorder @click="logout">
          <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
        </IconBorder>

        <template #popper> Logout </template>
      </VTooltip>
      <VDropdown v-else>
        <IconBorder>
          <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
        </IconBorder>

        <template #popper>
          <div class="popper">
            <div
              class="flex items-center justify-center h-[20rem] w-[20rem] py-2 px-10 border border-kajian-gray hover:bg-kajian-darkGray cursor-pointer"
            >
              <button @click="logout" class="p-10">logout</button>
            </div>
          </div>
        </template>
      </VDropdown>
    </div>
  </div>
</template>

<script setup>
import logoIcon from './logo/LogoIcon.vue'
import logoTextIcon from './logo/LogoTextIcon.vue'
import IconBorder from './iconPersonal/IconBorder.vue'
import router from '../../router'
import { firebase } from '@/firebase/firebase.js'
import { kajianStore, kajianFeedStore } from '../../stores/counter'
import { useWindowSize } from '@vueuse/core'
import { isMobile } from '@/helpers/constantValue.js'

const { width } = useWindowSize()
const controlFeedStore = kajianFeedStore()
const userStore = kajianStore()
async function logout() {
  await firebase.auth().signOut()
  userStore.logout()
  router.replace({ name: 'kajianLogin' })
}
</script>

<style scoped>
.popper {
  padding: 20px;
}
</style>
