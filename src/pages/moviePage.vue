<script lang="ts">

import cHeader from '../components/header/headliner.vue';
import cRating from '../components/header/rating.vue'
import cDetails from '../components/details/detailsMenu.vue'
import cPopular from '../components/popular/popularSection.vue';
import cCard from '../components/popular/popularCard.vue'


import MovieDetails from '../interfaces/MovieDetails.ts';
import Credits from '../interfaces/Credits.ts';
import Recommendations from '../interfaces/Recommendations.ts';
import { useStoreDetails } from '../store/details.ts';


export default {
  components : {
    cHeader,
    cRating,
    cDetails,
    cCard,
    cPopular
  },
  data() {
    return {
      headliner: null as MovieDetails | null,
      apiKey: import.meta.env.VITE_APP_API_KEY,
      store: useStoreDetails(),
      loading: true
    };
  },
  methods: {

    parseRuntime(arg: number){
      return arg > 60 ? `${Math.floor(arg/60)}ч ${arg - (Math.floor(arg/60) * 60)}м` : '';
    }
  },
  
  async created() {
    try {
      await this.store.getHeadliner(Number(this.$route.params.id));
      if(Object.keys(this.store.$state.recommendations).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.credits.id)){
        await this.store.getRecommendations(Number(this.$route.params.id))
      }
      if(Object.keys(this.store.$state.credits).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.credits.id) || this.store.$state.prodCompanies.length == 0){
        await this.store.getCredits(Number(this.$route.params.id)).then(() => this.store.getProdCompanies());
      } 
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false;
    }
  },
};

</script>
<template>
  <div v-if="loading" > Загрузка... </div>
  <div v-else>
    <cHeader v-if="store.$state.details"
        :header-title="store.$state.details.title"
        :header-reviews="(store.$state.details.vote_count > 1000) ? `${store.$state.details.vote_count / 1000}`.substring(0, 3) + 'K рецензий' : `${store.$state.details.vote_count}`"
        :header-year="store.$state.details.release_date?.substring(0, 4)"
        header-duration="2ч 8м"
        :header-img="store.$state.details.backdrop_path"
        :header-desc="store.$state.details.overview">
        <cRating :star-rating="Number(store.$state.details.vote_average?.toPrecision(2))" />
      </cHeader>
    <cDetails />
    <RouterView />
    <cPopular popular-title="Похожие">
      <cCard v-for="item in store.$state.recommendations.results" 
        @click="$router.push(`/`).then(() => $router.push(`/movie/${item.id}/overview`))" 
        :card-rating="Number(item.vote_average.toPrecision(2))"
        :card-image="item.poster_path?.toString()" 
        :card-title="item.title?.toString()" />
    </cPopular>
  </div>

</template>
