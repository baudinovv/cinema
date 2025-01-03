<script lang="ts">
export default{
  name: "header",
  props: {
    headerTitle: String,
    headerReviews: String,
    headerYear: String,
    headerDuration: String,
    headerDesc: String,
    headerImg: String
  },
  data(){
    return {
      moviesLink: "https://movies-proxy.vercel.app/ipx/f_webp&s_1220x659/tmdb/"
    }
  }
}

</script>
<template>
  <header class="w-full relative overflow-hidden h-[40vw] flex flex-col justify-center">
    <img class="absolute top-0 right-0 h-full" :src="moviesLink + headerImg" alt="#">
    <div class="absolute z-10 w-full h-full bg-gradient-to-r from-black via-black via-20% top-0 left-0 "></div>
    <div class="px-[80px] relative z-20 flex flex-col gap-3 justify-between">
      <h1 class="text-4xl">{{ headerTitle }}</h1>
      <ol class="flex list-disc gap-6 text-gray-400">
        <li class="flex"> <slot></slot> </li>
        <li class="">{{ headerReviews }}</li>
        <li class="">{{ headerYear }}</li>
        <li class="">{{ headerDuration }}</li>
      </ol>
      <div class="">{{ headerDesc }}</div>
    </div>
  </header>
</template>
