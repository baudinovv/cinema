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
      language: "ru-RU" as string,
      store: useStoreDetails()
    };
  },
  methods: {
    async getHeadliner() {
      const url =
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}?language=${this.language}`;
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
      result.then((res: any) => {
        this.headliner = res;
        console.log(res); //чdebug
        this.store.setDetails(res); // set into pinia's store
      }).catch((err: Error) => console.error(err));
    },
    async getRecommendations() {
      const url =
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}/recommendations?language=${this.store.$state.language}&page=1`;
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
      result.then((res: Recommendations) => {
        this.store.setRecommendations(res);
        console.log(res);
      }).catch((err: Error) => console.error(err));
    },
    async getCredits() {
      const url =
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits?language=${this.store.$state.language}`;
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
      result.then((res: Credits) => {
        this.store.setCredits(res);
        console.log(res);
        for(let item of res.crew){
          if(item.job == "Director"){
            this.store.setDirector(item.name);
          }
        }
        setTimeout(() => {
          if(this.store.$state.details.production_companies){
            this.store.setProdCompanies([]);
            for(let item of this.store.$state.details.production_companies){
              this.store.$state.prodCompanies.push(item.name);
            }
          } 
        },100);
      }).catch((err: Error) => console.error(err));
    },

    parseRuntime(arg: number){
      return arg > 60 ? `${Math.floor(arg/60)}ч ${arg - (Math.floor(arg/60) * 60)}м` : '';
    }
  },
  
  mounted() {
    this.getHeadliner();
    if(Object.keys(this.store.$state.recommendations).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.credits.id)){
      this.getRecommendations()
    }
    if(Object.keys(this.store.$state.credits).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.credits.id) || this.store.$state.prodCompanies.length == 0){
      this.getCredits()
    } 
  },
};

</script>
<template>
  <cHeader v-if="headliner"
    :header-title="headliner.title"
    :header-reviews="(headliner.vote_count > 1000) ? `${headliner.vote_count / 1000}`.substring(0, 3) + 'K рецензий' : `${headliner.vote_count} рецензий`"
    :header-year="headliner.release_date.substring(0, 4)" header-duration="2ч 8м"
    :header-img="headliner.backdrop_path" :header-desc="headliner.overview">

    <cRating 
      :star-rating="Number(headliner.vote_average.toPrecision(2))" 
    />
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
</template>
