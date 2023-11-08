<template>
  <div
    class="flex lg:justify-between justify-around items-center bg-kajian-white h-20 lg:px-64 border border-kajian-darkGray"
  >
    <div class="w-1/12">
      <i>
        <IconBorder v-if="isMobile(width)">
          <font-awesome-icon :icon="['fas', 'user']" />
        </IconBorder>
        <logoIcon v-else></logoIcon>
      </i>
    </div>
    <div>
      <i>
        <logoTextIcon></logoTextIcon>
      </i>
    </div>
    <div class="flex justify-between items-center w-1/12">
      <!-- <IconBorder>
        <font-awesome-icon :icon="['fas', 'house']" />
      </IconBorder>
      <IconBorder>
        <font-awesome-icon :icon="['fas', 'heart']" />
      </IconBorder> -->
      <VTooltip v-if="isMobile(width)">
        <IconBorder>
          <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
        </IconBorder>

        <template #popper>
          Logout
          <!-- <div class="h-20 w-24 flex flex-col justify-center items-center">
            
            <div
              @click="logout"
              class="flex items-center justify-center w-8/12 h-10 py-2 px-10 border border-kajian-gray hover:bg-kajian-darkGray cursor-pointer"
            >
              <font-awesome-icon class="mr-3" :icon="['fas', 'right-from-bracket']" />
              <button class="">logout</button>
            </div>
          </div> -->
        </template>
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
import { useWindowSize } from '@vueuse/core'
import logoTextIcon from './logo/LogoTextIcon.vue'
import IconBorder from './iconPersonal/IconBorder.vue'
import router from '../../router'
import { firebase } from '@/firebase/firebase.js'
import { kajianStore } from '../../stores/counter'
import { isMobile } from '@/helpers/constantValue.js'

// const width = computed(() => {
//   const isMobileView = isMobile
//   return isMobileView
// })
// onMounted(isMobile())
const { width } = useWindowSize()
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
