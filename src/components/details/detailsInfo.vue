<script lang="ts">

import { useStoreDetails } from '../../store/details';


import cPopular from '../popular/popularSection.vue';
import cCard from '../popular/popularCard.vue'
import MovieDetails from '../../interfaces/Movie/MovieDetails';
import Credits from '../../interfaces/Movie/Credits';
import { TVDetails } from '../../interfaces/TV/TVDetails';

export default {
  components: {
    cPopular,
    cCard
  },
  props: {
    details: {} as MovieDetails | TVDetails,
    director: {} as String,
    credits: {} as Credits
  },
  data() {
    return {
      imageLink: "https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/tmdb/",
    }
  },
  methods: {
    parseRuntime(arg: number){
      return arg > 60 ? `${Math.floor(arg/60)}ч ${arg - (Math.floor(arg/60) * 60)}м` : '';
    }
  },
  

};

</script>
<template>
  <div class="flex mx-auto px-12 gap-12 max-w-[85%]">
    <img :src="imageLink + details.poster_path" class="max-w-xs border-4 border-neutral-800 h-full" alt="">
    <div class="">
      <div class="text-3xl">Описание</div>
      <div class="mt-6 text-base">
        {{ details?.overview }}
      </div>
      <div class="mt-6 grid grid-cols-2 gap-6  justify-between">
        <div class="grid grid-cols-2 items-center">
          <div class="pt-3 text-sm">Дата выхода</div>
          <div class="pt-3 text-sm">{{ details.release_date || details.first_air_date }}</div>
          <div v-if="director" class="pt-3 text-sm">Режиссёр</div>
          <div v-if="director" class="pt-3 text-xs flex gap-3">
            <div class="px-2 py-2 bg-neutral-700 rounded-lg box-content">
              {{ director }}
            </div>
          </div>
          <div v-if="details?.revenue" class="pt-3 text-sm">Сборы</div>
          <div v-if="details?.revenue" class="pt-3 text-sm">${{ details?.revenue }}</div>
          <div class="pt-3 text-sm">Статус</div>
          <div class="pt-3 text-sm">{{ details?.status }}</div>
          <div class="pt-3 text-sm">Кинокомпания</div>
          <div class="pt-3 text-sm">
            <div class=""
              v-for="(item,idx) in details.production_companies"
            >
              {{ ((idx + 1) == details.production_companies.length) ? item.name : item.name + ","}}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 items-center">
          <div v-if="details.runtime" class="pt-3 text-sm">Продолжительность</div>
          <div v-if="details.runtime" class="pt-3 text-sm">
            {{ parseRuntime(details.runtime) }}
          </div>
          <div v-if="details.budget" class="pt-3 text-sm">Бюджет</div>
          <div v-if="details.budget" class="pt-3 text-sm">
            ${{ details.budget }}
          </div>
          <div class="pt-3 text-sm">Жанр</div>
          <div class="mt-3 text-xs flex gap-3 flex-wrap">
            <div 
              v-for="item in details.genres"
              class="px-2 py-1 bg-neutral-700 rounded-lg box-content "
            >
              {{ item.name }}
            </div>
          </div>
          <div class="pt-3 text-sm">Язык</div>
          <div class="pt-3 text-sm">
            <span 
              v-for="(item,idx) in details.spoken_languages"
              >
              {{ ((idx + 1) == details.spoken_languages.length) ? item.english_name : item.english_name + ", "}}
          </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <cPopular popular-title="Актерский состав">
    <cCard v-for="item in credits.cast" 
      :card-rating="0"
      :card-image="item.profile_path?.toString()" 
      :card-title="item.name?.toString()" />
  </cPopular>
</template>
