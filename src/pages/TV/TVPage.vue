<script lang="ts">

import cHeader from '../../components/header/headliner.vue';
import cRating from '../../components/header/rating.vue'
import cDetailsMenu from '../../components/details/detailsMenu.vue'
import cPopular from '../../components/popular/popularSection.vue';
import cCard from '../../components/popular/popularCard.vue'


import { useStoreDetails } from '../../store/details.ts';
import { TVDetails } from '../../interfaces/TV/TVDetails.ts';

export default {
  components : {
    cHeader,
    cRating,
    cDetailsMenu,
    cCard,
    cPopular
  },
  data() {
    return {
      headliner: null as TVDetails | null,
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
      await this.store.getHeadliner(Number(this.$route.params.id), 'tv');
      if(Object.keys(this.store.$state.recommendations).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.credits.id)){
        await this.store.getRecommendations(Number(this.$route.params.id), 'tv')
      }
      if(Object.keys(this.store.$state.credits).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.credits.id) || this.store.$state.prodCompanies.length == 0){
        await this.store.getCredits(Number(this.$route.params.id), 'tv').then(() => this.store.getProdCompanies());
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
        :headliner="store.$state.details"
        type="tv"
      >
        <cRating :star-rating="Number(store.$state.details.vote_average?.toPrecision(2))" />
    </cHeader>
    <cDetailsMenu type="tv" />
    <RouterView />
    <cPopular popular-title="Похожие">
      <cCard v-for="item in store.$state.recommendations.results" 
        @click="$router.push(`/`).then(() => $router.push(`/tv/${item.id}/overview`))" 
        :card-rating="Number(item.vote_average.toPrecision(2))"
        :card-image="item.poster_path?.toString()" 
        :card-title="item.title?.toString() || item.name?.toString()" />
    </cPopular>
  </div>

</template>
