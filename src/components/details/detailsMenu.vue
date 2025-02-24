<script lang="ts">

export default{
  props: {
    type: {
      type: String,
      default: "movie"
    }
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
      <RouterLink 
        :to="`/${type}/${$route.params.id}/overview`" 
        :class="`transition uppercase text-xl tracking-widest font-light border-transparent border-b-2 hover:border-white ${$route.path.includes('overview') ? 'border-b-2 border-white' : ' text-neutral-500'}`">обзор</RouterLink>
      <RouterLink 
        :to="`/${type}/${$route.params.id}/video`" 
        :class="`transition uppercase text-xl tracking-widest font-light border-transparent border-b-2 hover:border-white ${$route.path.includes('video') ? 'border-b-2 border-white' : 'text-neutral-500'}`">видео</RouterLink>
      <RouterLink 
        :to="`/${type}/${$route.params.id}/image`" 
        :class="`transition uppercase text-xl tracking-widest font-light border-transparent border-b-2 hover:border-white ${$route.path.includes('image') ? 'border-b-2 border-white' : 'text-neutral-500'}`">изображения</RouterLink>
    </div>
  </div>
</template>

<style>
</style>