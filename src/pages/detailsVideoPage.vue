<script lang="ts">

import MovieVideo from '../interfaces/MovieVideo';

import { useStoreDetails } from '../store/details';

export default {
  data(){
    return {
      store: useStoreDetails(),
      apiKey: import.meta.env.VITE_APP_API_KEY,
    }
  },
    
  mounted() {
    if(Object.keys(this.store.$state.videos).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.videos.id)){
      this.store.getVideos(Number(this.$route.params.id));
    }
  }
};

</script>
<template>
  <div class="px-12">
    <div class="text-xl text-neutral-500"> {{ store.$state.videos.results?.length}} видео</div>
    <div class="pt-3">
      <div class="flex justify-between flex-wrap">
        <div class="w-full max-w-72 cursor-pointer"
          v-for="item in store.$state.videos.results" >
          <div class="transition relative w-full overflow-hidden h-48 border-4 border-neutral-800 hover:scale-105">
            <img
              class="max-h-[412px] absolute -bottom-2/3 w-full"
              :src="`https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/youtube/vi/${item.key}/maxresdefault.jpg`" 
              alt=""
            >
          </div>
          <div class="mt-3 text-lg">{{ item.name }}</div>
          <div class="mt-1 text-neutral-500 text-sm">{{ item.type }}</div>
        </div>
        
      </div>
    </div>
  </div>
</template>
