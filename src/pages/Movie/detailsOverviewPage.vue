<script lang="ts">

import { useStoreDetails } from '../../store/details.ts';


import cDetailsInfo from '../../components/details/detailsInfo.vue'

export default {
  components: {
    cDetailsInfo
  },
  data() {
    return {
      imageLink: "https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/tmdb/",
      store: useStoreDetails(),
      apiKey: import.meta.env.VITE_APP_API_KEY,
    }
  },
  methods: {
    parseRuntime(arg: number){
      return arg > 60 ? `${Math.floor(arg/60)}ч ${arg - (Math.floor(arg/60) * 60)}м` : '';
    }
  },
  

};

</script>
<template>
  <cDetailsInfo 
    :details="store.$state.details" 
    :director="store.$state.director" 
    :credits="store.$state.credits" 
  />  
</template>
