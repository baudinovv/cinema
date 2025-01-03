<script lang="ts">

import { defineComponent } from "vue";

import cMenu from "./components/menu/menu.vue";
import cMain from "./components/main.vue";
import cHeader from "./components/header/headliner.vue";
import cRating from "./components/header/rating.vue";
import cPopular from "./components/popular/popularSection.vue";
import cCard from "./components/popular/popularCard.vue";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

interface TV {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string,
  genre_ids: number[];
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export default defineComponent({
  name: "App",
  components: {
    cMenu,
    cMain,
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
      language: "en-US" as string
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
        console.log(res.results);
      }).catch((err: Error) => console.error(err));
    },

    fetchRating(arg: number): number {
      return Number((arg / 2).toPrecision(2));
    }

  },


  mounted() {
    this.getPopularMovies();
    this.getTV();
  },
});
</script>

<template>
  <cMenu />
  <cMain v-if="headliner" class="text-white h-full">
    <cHeader :header-title="headliner.title"
      :header-reviews="(headliner.vote_count > 1000) ? `${headliner.vote_count / 1000}`.substring(0, 3) + 'K рецензий' : `${headliner.vote_count}`"
      :header-year="headliner.release_date.substring(0, 4)" header-duration="2ч 8м"
      :header-img="headliner.backdrop_path" :header-desc="headliner.overview">
      <cRating :star-rating="fetchRating(headliner.vote_average)" />
    </cHeader>
    <cPopular v-if="popularMovies" popular-title="Популярные фильмы">
      <cCard v-for="item in popularMovies" :key="item.id" :card-rating="fetchRating(item.vote_average)"
      :card-image="item.backdrop_path" :card-title="item.title" />
    </cPopular>
    <div v-else class="text-5xl">YA HUESOS</div>
    <cPopular v-if="popularTV" popular-title="Популярные сериалы">
      <cCard v-for="item in popularTV" 
        :key="item.id" 
        :card-rating="fetchRating(item.vote_average)"
        :card-image="item.poster_path" 
        :card-title="item.name" />
    </cPopular>
    <div v-else class="text-5xl">YA HUESOS</div>
  </cMain>
  <div v-else class="ml-36 text-white text-6xl">Loading...</div>
</template>
