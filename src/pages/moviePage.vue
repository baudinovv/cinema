<script lang="ts">

import cHeader from '../components/header/headliner.vue';
import cRating from '../components/header/rating.vue'
import cDetails from '../components/details/detailsMenu.vue'

import MovieDetails from '../interfaces/MovieDetails.ts';
import { useMovieDetails } from '../store/store.ts';

export default {
  components : {
    cHeader,
    cRating,
    cDetails
  },
  data() {
    return {
      headliner: null as MovieDetails | null,
      apiKey: import.meta.env.VITE_APP_API_KEY,
      language: "ru-RU" as string,
      details: useMovieDetails()
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
      }).catch((err: Error) => console.error(err));
    },

    fetchRating(arg: number) : number {
      return Number((arg / 2).toPrecision(2));
    },  
    
    setMovieDetailsStore(){
      if(this.headliner) this.details.setDetails(this.headliner);
    }
    
  },
  
  mounted() {
    this.getHeadliner();
    this.setMovieDetailsStore();
  },
};

</script>
<template>
  <cHeader v-if="headliner" 
    :header-title="headliner.title"
    :header-reviews="(headliner.vote_count > 1000) ? `${headliner.vote_count / 1000}`.substring(0, 3) + 'K рецензий' : `${headliner.vote_count} рецензий`"
    :header-year="headliner.release_date.substring(0, 4)" header-duration="2ч 8м"
    :header-img="headliner.backdrop_path" :header-desc="headliner.overview">
    <cRating :star-rating="fetchRating(headliner.vote_average)" />
  </cHeader>
  <cDetails 
    :movie-id="headliner?.id"
  />
    
  <RouterView></RouterView>
</template>
