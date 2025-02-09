<script lang="ts">

export default {
  name: "detailsVideoModal",
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    videoArrayPos: {
      type: Number,
      default: 0
    }
  },

};

</script>
<template>
  <div class="fixed w-full h-full flex top-0 right-0" v-if="showModal">
    <div 
      class="fixed w-full h-full bg-black top-0 right-0 opacity-80 z-40"
      @click="$emit('modalOff')" 
    >
      
    </div>
    <div 
      class="w-[90vw] h-[80vh] m-auto justify-center items-center bg-black justify-self-center relative z-50 px-9">
      <slot></slot>
    </div>
    <div class="fixed top-2 right-12 bg-white z-50 cursor-pointer">
      <div
        @click="$emit('modalOff')" 
        class="before:content-[''] transition before:hover:border-neutral-200 before:absolute before:-right-10  before:w-6 before:h-6 before:border-neutral-400 before:border-b-2 before:rotate-45 before:z-50 
            after:content-[''] after:hover:border-neutral-200  after:absolute after:w-6  after:h-6 after:border-neutral-400 after:border-b-2 after:z-50 after:-rotate-45"></div>
    </div>
  </div>
</template>
