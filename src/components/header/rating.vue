<script lang="ts">
import headerStars from './star.vue'
export default{
  name: "rating",
  props: {
    starRating: {
      type: Number,
      default: 5
    }
  },
  components:{
    headerStars
  },

  data(){
    return {
      starsArr: [] as string[]
    };
  },

  methods : {
    getStars(){
      if(this.starRating){
        for(let i = 0; i < Number((this.starRating).toPrecision(2)[0]); i++){
          this.starsArr.push('full');
        }
        (this.starRating) ? (Number(this.starRating.toPrecision(2)) * 10 % 10 != 0) ? this.starsArr.push('half') : 0 : 0;
        for(let i = this.starsArr.length; i < 5; i++){
          this.starsArr.push('empty');
        }
      }
    } 
  },
  mounted(){
    this.getStars();
  }
}
</script>
<template>
  <div class="flex text-gray-400">
    <div class="flex mr-2 w-full">
      <headerStars
        v-for="(item, index) in starsArr" 
        color="#2cff8b"
        :star="item"
        :key="index" 
      />
    </div>
    <div class="">{{ starRating }}</div>
  </div>
</template>
