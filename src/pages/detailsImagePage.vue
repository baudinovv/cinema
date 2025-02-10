<script lang="ts">
import { useStoreDetails } from '../store/details';
import cModal from '../components/details/detailsModal.vue';

export default {
  name: "detailsImagePage",
  components: {
    cModal
  },
  data(){
    return {
      store: useStoreDetails(),
      imageName: "",
      showModal: false
    }
  },

  methods: {
    nextImage(){
      console.log("1");
    }
  },

  async created(){
    if(Object.keys(this.store.$state.images).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.images.id)){
      await this.store.getImages(Number(this.$route.params.id));
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
          v-for="item in store.$state.images.backdrops"
          @click="showModal = true;imageName = String(item.file_path)"
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
    v-focus
    :show-modal="showModal"
    @modalOff="showModal = false"
    @keyup.left="nextImage"
   >
    <img v-focus @keyup.left="nextImage" class="z-50 max-w-full max-h-[90%] m-auto" :src="`https://movies-proxy.vercel.app/ipx/f_webp/tmdb${imageName}`" alt="">
  </cModal> 
</template>
