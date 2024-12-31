<script lang="ts">
import cMenu from "./components/menu/menu.vue";
import cMain from "./components/main.vue";
import cHeader from "./components/header/header.vue";
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
}

export default {
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
         popularMovies: [] as Movie[],
         popularTV: [] as Movie[],
         headliner: {} as Movie,
         apiKey: import.meta.env.VITE_APP_API_KEY,
         language: "en-US" as string
      };
   },

   methods: {
      getData() {
        const url =
           `https://api.themoviedb.org/3/movie/now_playing?language=${this.language}&page=1`;
        const options = {
           method: "GET",
           headers: {
              accept: "application/json",
              Authorization:
                 "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjAyNWE1YTk0MjAzYjE3NDFmNjU4ZmJmZGJjYTBiZCIsIm5iZiI6MTcyNTYyNTQ0OS4yMjUsInN1YiI6IjY2ZGFmNDY5N2VjOTkzNWRhNzcwNDEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xI5ygeAzdXqKb0H__kau5a6xJNVtkdHC8axMm04ZMa4",
           },
        };
        let pathImg = "";
        fetch(url, options)
           .then((res) => res.json())
           .then((json) => {
              console.log(json);
              return json;
           })
           .then((res) => {
              console.log(res.results[0]);
              this.headliner = res.results[0];
           })
           .catch((err) => console.error(err));
        return pathImg;
      },
   },

   mounted() {
      this.getData();
   },
};
</script>

<template>
   <cMenu />
   <cMain class="text-white h-full">
      <cHeader
         :header-title="headliner.title"
         :header-reviews="headliner.vote_count + ' рецензий'"
         :header-year="headliner.release_date.substring(0,4)"
         header-duration="2ч 8м"
         :header-img="headliner.backdrop_path"
         :header-desc="headliner.overview"
      >
         <cRating :star-rating="`${headliner.vote_average.toPrecision(2)}`" />
      </cHeader>
      <cPopular popular-title="Популярные фильмы">
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
      </cPopular>
      <cPopular popular-title="Популярные сериалы">
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
         <cCard :card-rating="4" card-title="Ужасающий" />
      </cPopular>
   </cMain>
</template>
