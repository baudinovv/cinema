<script lang="ts">

import cRating from '../header/rating.vue';

export default{
  components: {
    cRating
  },
  props: {
    cardTitle: String,
    cardRating: Number,
    cardImage : String
  }
}

</script>
<template>
  <div class="h-full w-full max-w-60 cursor-pointer">
    <img src="../../assets/5jbCnDREJeciL3KR7ZWdSotEgzG.webp" alt="#" class="border-4 border-neutral-800 min-w-[230px]">
    <div class="mt-2 text-xl"> {{ cardTitle }}</div>
    <cRating :star-rating="cardRating" class="w-[80px] text-sm items-center" />
  </div>
</template>

<style>
</style>