<script lang="ts">

import { useStoreDetails } from '../store/details.ts';

import Credits from '../interfaces/Credits.ts';
import cPopular from '../components/popular/popularSection.vue';
import cCard from '../components/popular/popularCard.vue'
import Recommendations from '../interfaces/Recommendations.ts';

export default {
  components: {
    cPopular,
    cCard
  },
  data() {
    return {
      imageLink: "https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/tmdb/",
      store: useStoreDetails(),
      apiKey: import.meta.env.VITE_APP_API_KEY,
    }
  },
  methods: {
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
    
    parseRuntime(arg: number){
      return arg > 60 ? `${Math.floor(arg/60)}ч ${arg - (Math.floor(arg/60) * 60)}м` : '' 
    }

  },
  
  mounted(){
    if(Object.keys(this.store.$state.credits).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.credits.id) || this.store.$state.prodCompanies.length == 0){
      this.getCredits()
    }
    if(Object.keys(this.store.$state.recommendations).length == 0 ||  Number(this.$route.params.id) !==  Number(this.store.credits.id)){
      this.getRecommendations()
    } 
  }

};

</script>
<template>
  <div class="flex mx-auto px-12 gap-12">
    <img :src="imageLink + store.$state.details.poster_path" class="max-w-xs border-4 border-neutral-800 h-full" alt="">
    <div class="">
      <div class="text-3xl">Описание</div>
      <div class="mt-6 text-base">
        {{ store.$state.details?.overview }}
      </div>
      <div class="mt-6 grid grid-cols-2 gap-6 max-w-[85%] justify-between">
        <div class="grid grid-cols-2 items-center">
          <div class="pt-3 text-sm">Дата выхода</div>
          <div class="pt-3 text-sm">{{ store.$state.details?.release_date }}</div>
          <div class="pt-3 text-sm">Режиссёр</div>
          <div class="pt-3 text-xs flex gap-3">
            <div class="px-2 py-2 bg-neutral-700 rounded-lg box-content">
              {{ store.$state.director }}
            </div>
          </div>
          <div class="pt-3 text-sm">Сборы</div>
          <div class="pt-3 text-sm">${{ store.$state.details?.revenue }}</div>
          <div class="pt-3 text-sm">Статус</div>
          <div class="pt-3 text-sm">{{ store.$state.details?.status }}</div>
          <div class="pt-3 text-sm">Кинокомпания</div>
          <div class="pt-3 text-sm">
            <div class=""
              v-for="(item,idx) in store.$state.details.production_companies"
            >
              {{ ((idx + 1) == store.$state.details.production_companies.length) ? item.name : item.name + ","}}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 items-center">
          <div class="pt-3 text-sm">Продолжительность</div>
          <div class="pt-3 text-sm">
            {{ parseRuntime(store.$state.details.runtime) }}
          </div>
          <div class="pt-3 text-sm">Бюджет</div>
          <div class="pt-3 text-sm">
            ${{ store.$state.details.budget }}
          </div>
          <div class="pt-3 text-sm">Жанр</div>
          <div class="mt-3 text-xs flex gap-3 flex-wrap">
            <div 
              v-for="item in store.$state.details.genres"
              class="px-2 py-1 bg-neutral-700 rounded-lg box-content "
            >
              {{ item.name }}
            </div>
          </div>
          <div class="pt-3 text-sm">Язык</div>
          <div 
            v-for="item in store.$state.details.spoken_languages"
            class="pt-3 text-sm">
            {{ item.english_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <cPopular popular-title="Актерский состав">
    <cCard v-for="item in store.$state.credits.cast" 
      :card-rating="0"
      :card-image="item.profile_path?.toString()" 
      :card-title="item.name?.toString()" />
  </cPopular>
  <cPopular popular-title="Похожие">
    <cCard v-for="item in store.$state.recommendations.results" 
      :card-rating="Number(item.vote_average.toPrecision(2))"
      :card-image="item.poster_path?.toString()" 
      :card-title="item.title?.toString()" />
  </cPopular>
</template>
