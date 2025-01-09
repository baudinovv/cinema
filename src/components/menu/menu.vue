<script lang="ts">

import { RouterLink } from 'vue-router';
import homeIcon from  './homeIcon.vue'
import moviesIcon from './moviesIcon.vue'
import searchIcon from './searchIcon.vue'

export default{
  components: {
    homeIcon,
    moviesIcon,
    searchIcon,
  }
}

</script>
<template>
  <aside class="bg-black w-[5%] h-lvh flex flex-col items-center justify-center fixed transition border-r-[1px] border-gray-800">
    <RouterLink to="/" class="mt-12 w-full">
      <homeIcon class="size-[60%] text-[#ffffff] hover:text-[#2cff8b] transition" />
    </RouterLink>
    <RouterLink to="/test" class="mt-12 w-full">
      <moviesIcon class="size-[60%] text-[#ffffff] hover:text-[#2cff8b] transition"/>
    </RouterLink>
    <RouterLink to="/" class="mt-12 w-full">
      <searchIcon class="size-[60%] text-[#ffffff] hover:text-[#2cff8b] transition"/>
    </RouterLink>
  </aside>
</template>
