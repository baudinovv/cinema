<script lang="ts">

import cModal from '../../components/details/detailsModal.vue'

import { useStoreDetails } from '../../store/details';

export default {
  data(){
    return {
      store: useStoreDetails(),
      apiKey: import.meta.env.VITE_APP_API_KEY,
      videoLinkKey: "" as String,
      showModal: false
    }
  },

  components: {
    cModal
  },

    
  mounted() {
    if(Object.keys(this.store.$state.videos).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.videos.id)){
      this.store.getVideos(Number(this.$route.params.id), 'tv');
    }
  }
};

</script>
<template>
  <div class="px-12">
    <div class="text-xl text-neutral-500"> {{ store.$state.videos.results?.length}} видео</div>
    <div class="pt-3">
      <div class="flex justify-between flex-wrap">
        <div class="w-full max-w-[30%] h-full cursor-pointer pt-4 ml-6 "
          v-for="item in store.$state.videos.results" 
          @click="showModal = true; videoLinkKey = item.key"
        >
          <div 
            :style="`background-image: url('https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/youtube/vi/${item.key}/maxresdefault.jpg'); background-size: 100%; background-repeat: no-repeat; background-position: center;`"
            :class="`transition relative flex align-middle justify-center overflow-hidden h-[15vw] border-4 border-neutral-800 hover:scale-105`">
            <svg class="text-white max-w-16 m-auto hover:text-[#2cff8b]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 12.5L9 18.38L8 19V6zm-1.9 0L9 7.8v9.4z"/></svg>
          </div>
          <div class="mt-3 text-lg">{{ item.name }}</div>
          <div class="mt-1 text-neutral-500 text-sm">{{ item.type }}</div>
        </div>
      </div>
    </div>
  </div>
  <cModal 
    :show-modal="showModal"
    @modalOff="showModal = false"
   >
   <div class="w-[90vw] h-[80vh] m-auto justify-center items-center bg-black justify-self-center relative z-50 px-9">
      <iframe class="w-full h-full" allow="autoplay; encrypted-media" allowfullscreen 
      :src="`https://www.youtube.com/embed/${videoLinkKey}?rel=0&amp;showinfo=0&amp;autoplay=0`" 
      w-full m5 lg:m20 border-none></iframe>
    </div>
  </cModal>
</template>
