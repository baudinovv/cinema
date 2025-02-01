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
  methods: {
    async getVideos() {
      const url =
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?language=${this.store.$state.language}`
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: MovieVideo) => {
        this.store.setVideos(res);
        console.log("video: ",res);
      }).catch((err: Error) => console.error(err));
    }
  },
  mounted() {
    if(Object.keys(this.store.$state.videos).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.videos.id)){
      this.getVideos();
    }
  }
};

</script>
<template>
  <div class="pl-12">
    <div class="text-xl text-neutral-500"> {{ store.$state.videos.results?.length}} видео</div>
    <div class="pt-3">
      <div class="">
        <div class="relative overflow-hidden h-48">
          <img
            class="max-h-[412px] absolute -bottom-2/3 max-w-80 w-full"
            :src="`https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/youtube/vi/${store.$state.videos.results?.at(0)?.key}/maxresdefault.jpg`" 
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>
