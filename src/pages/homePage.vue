<script lang="ts">

import { defineComponent } from "vue";

import cHeader from "../components/header/headliner.vue";
import cRating from "../components/header/rating.vue";
import cPopular from "../components/popular/popularSection.vue";
import cCard from "../components/popular/popularCard.vue";

import TV from '../interfaces/TV.ts';
import Movie from '../interfaces/Movie.ts';

export default defineComponent({
  name: "App",
  components: {
    cHeader,
    cRating,
    cPopular,
    cCard,
  },
  props: {
    star: String,
    color: String,
  },

  data() {
    return {
      popularMovies: null as Movie[] | null,
      popularTV: null as TV[] | null,
      headliner: null as Movie | null,
      apiKey: import.meta.env.VITE_APP_API_KEY,
      language: "ru-RU" as string,
      loading: this.popularMovies || this.popularTV || this.popularTV
    };
  },

  methods: {
    async getPopularMovies() {
      const url =
        `https://api.themoviedb.org/3/movie/now_playing?language=${this.language}&page=1`;
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
        this.headliner = res.results[0];
        this.popularMovies = res.results;
        console.log(res)
      }).catch((err: Error) => console.error(err));
    },

    async getTV() {
      const url = `https://api.themoviedb.org/3/tv/on_the_air?language=${this.language}&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjAyNWE1YTk0MjAzYjE3NDFmNjU4ZmJmZGJjYTBiZCIsIm5iZiI6MTcyNTYyNTQ0OS4yMjUsInN1YiI6IjY2ZGFmNDY5N2VjOTkzNWRhNzcwNDEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xI5ygeAzdXqKb0H__kau5a6xJNVtkdHC8axMm04ZMa4'
        }
      };

      let responseTV = await fetch(url, options);
      let result = responseTV.json();
      result.then((res: any) => {
        this.popularTV = res.results;
      }).catch((err: Error) => console.error(err));
    }
  },
  
  computed: {
  },
  
  created() {
    this.getPopularMovies();
    this.getTV();
  }
});
</script>

<template>
    <cHeader v-if="headliner" 
    :header-title="headliner.title"
    :header-reviews="(headliner.vote_count > 1000) ? `${headliner.vote_count / 1000}`.substring(0, 3) + 'K рецензий' : `${headliner.vote_count}`"
    :header-year="headliner.release_date.substring(0, 4)" header-duration="2ч 8м"
    :header-img="headliner.backdrop_path" 
    :header-desc="headliner.overview">
    <cRating 
      :star-rating="Number(headliner.vote_average.toPrecision(2))" />
  </cHeader>
  <cPopular v-if="popularMovies" popular-title="Популярные фильмы">
    <cCard v-for="item in popularMovies"
      @click="$router.push(`/movie/${item.id}/overview`)" 
      :key="item.id" 
      :card-rating="Number(item.vote_average.toPrecision(2))"
      :card-image="item.poster_path" 
      :card-title="item.title" />
  </cPopular>
  <cPopular v-if="popularTV" popular-title="Популярные сериалы">
    <cCard v-for="item in popularTV" 
      :key="item.id" 
      :card-rating="Number(item.vote_average.toPrecision(2))"
      :card-image="item.poster_path" 
      :card-title="item.name" />
  </cPopular>
</template>
