<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';


export default{
  props: {
    movieId : Number
  },
  data() {
    return {
      activeBtn: String
    }
  },
  methods: {
    
  }
}

</script>
<template>
  <div class="">
    <div class="mt-12 pb-12 flex gap-6 justify-center">
      <RouterLink :to="`/movie/${movieId}/overview`" class="transition uppercase text-xl tracking-widest font-light border-transparent border-b-2 hover:border-white">обзор</RouterLink>
      <RouterLink :to="`/movie/${movieId}/image`" class="transition uppercase text-xl tracking-widest font-light border-transparent border-b-2 hover:border-white">видео</RouterLink>
      <RouterLink :to="`/movie/${movieId}/video`" class="transition uppercase text-xl tracking-widest font-light border-transparent border-b-2 hover:border-white">изображения</RouterLink>
    </div>
  </div>
</template>

<style>
</style>