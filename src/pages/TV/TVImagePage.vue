<script lang="ts">
import { useStoreDetails } from '../../store/details';
import cModal from '../../components/details/detailsModal.vue';

export default {
  name: "detailsImagePage",
  components: {
    cModal
  },
  data(){
    return {
      store: useStoreDetails(),
      imageName: "",
      imageIndex: 0 as number,
      imageSrc: `https://movies-proxy.vercel.app/ipx/f_webp/tmdb`,
      showModal: false
    }
  },

  methods: {
    nextImage(){
      (this.imageIndex == this.store.$state.images.backdrops.length) ? this.imageIndex : this.imageIndex++;
    },
    prevImage(){
      (this.imageIndex == 1) ? this.imageIndex : this.imageIndex--;
    }
  },

  async created(){
    if(Object.keys(this.store.$state.images).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.images.id)){
      await this.store.getImages(Number(this.$route.params.id), 'tv');
    }
  }

};

</script>
<template>
  <div class="px-12">
    <div class="text-xl text-neutral-500"> {{ store.$state.images.backdrops?.length}} изображений</div>
    <div class="pt-3">
      <div class="flex justify-between flex-wrap">
        <div class="w-full max-w-[30%] h-full cursor-pointer pt-4 ml-6 "
          v-for="(item,idx) in store.$state.images.backdrops"
          @click="showModal = true;imageIndex = idx;"
        >
          <div 
            :style="`background-image: url('https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/tmdb/${item.file_path}'); background-size: 100%; background-repeat: no-repeat; background-position: center;`"
            :class="`transition relative flex align-middle justify-center overflow-hidden h-[15vw] border-4 border-neutral-800 hover:scale-105`">
          </div>
        </div>
      </div>
    </div>
  </div>
  <cModal 
    :show-modal="showModal"
    @modalOff="showModal = false"
   >
    <img 
      v-focus
      class="z-50 max-w-full max-h-[90%] m-auto focus:outline-none" 
      tabindex="0" 
      @keyup.left="prevImage"
      @keyup.right="nextImage" 
      :src="store.$state.images.backdrops[imageIndex] + imageSrc + store.$state.images.backdrops[imageIndex].file_path" alt=""
    >
    <div class="fixed bottom-5 left-5 z-50"><span class="bold"> {{ imageIndex }} </span> / {{ store.$state.images.backdrops.length }}</div>
  </cModal> 
</template>
