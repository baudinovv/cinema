<script lang="ts">
import headerStars from './star.vue'
export default{
  name: "rating",
  props: {
    starLimit: Number
  },
  components:{
    headerStars
  },

  data(){
    return {
      starsArr: ["full", "full", "full", "half"]
    };
  }
}
</script>
<template>
	<headerStars 
    v-for="item in starsArr" 
    color="#2cff8b"
    :half="item == 'half'"
    :key="item" 
  />
</template>
