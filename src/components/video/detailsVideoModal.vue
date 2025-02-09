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
  <div v-if="showModal">
    <div 
      class="fixed w-full h-full bg-black top-0 right-0 opacity-80 z-40"
      @click="$emit('modalOff')" 
    >
      
    </div>
    <div 
      class="fixed w-[90vw] h-[80vh] m-auto bg-black top-20 right-10 z-40 px-9">
      <slot></slot>
    </div>
    <div
      @click="$emit('modalOff')" 
      class="before:content-[''] before:fixed before:right-10 cursor-pointer before:top-10 before:w-6 before:h-[2px] before:bg-neutral-400 before:-rotate-45 before:z-50 
            after:content-[''] after:fixed after:right-10  after:top-10 after:w-6 after:h-[2px] after:bg-neutral-400 after:bg-white after:z-50 after:rotate-45"></div>
  </div>
</template>
