<script setup>
import Navigation from '../components/trillio/TopNavigation.vue'
import SideNav from '../components/trillio/SideNavigation.vue'
import MainPage from '../components/trillio/MainPage.vue'
import axios from 'axios'

axios.get('https://opentdb.com/api.php?amount=10&category=27')
</script>

<template>
  <div
    class="bg-gradient-to-br from-[#FF3366] to-[#BA265D] w-screen flex justify-center items-center h-[140vh] fullpage"
  >
    <div class="bg-white w-10/12 h-[120vh] flex flex-col">
      <navigation class="flex"></navigation>
      <div class="flex flex-1">
        <SideNav></SideNav>
        <MainPage></MainPage>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
