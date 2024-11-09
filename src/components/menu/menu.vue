<script lang="ts">

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
  <aside class="bg-black w-[5%] h-lvh flex flex-col items-center justify-center fixed transition">
    <a href="" class="mt-12 w-full">
      <homeIcon class="size-[60%] text-[#ffffff] hover:text-[#2cff8b] transition" />
    </a>
    <a href="" class="mt-12 w-full">
      <moviesIcon class="size-[60%] text-[#ffffff] hover:text-[#2cff8b] transition"/>
    </a>
    <a href="" class="mt-12 w-full">
      <searchIcon class="size-[60%] text-[#ffffff] hover:text-[#2cff8b] transition"/>
    </a>
  </aside>
</template>
