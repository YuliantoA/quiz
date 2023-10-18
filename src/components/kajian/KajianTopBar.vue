<template>
  <div
    class="flex justify-between items-center bg-kajian-white h-20 px-52 border border-kajian-darkGray"
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
      <IconBorder>
        <font-awesome-icon :icon="['fas', 'user']" />
      </IconBorder>
    </div>
  </div>
</template>

<script setup>
import logoIcon from './LogoIcon.vue'
import logoTextIcon from './LogoTextIcon.vue'
import IconBorder from './iconPersonal/IconBorder.vue'
</script>
