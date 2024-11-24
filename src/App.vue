<script setup lang="ts">
import cMenu from './components/menu/menu.vue'
import cMain from './components/main.vue'; 
import cHeader from './components/header/header.vue';
import cRating from './components/header/rating.vue';
import cPopular from './components/popular/popularSection.vue'
import cCard from './components/popular/popularCard.vue'
</script>

<template>
  <cMenu/>
  <cMain class="text-white h-full">
    <cHeader 
      header-title="Дэдпул и Росомаха" 
      header-reviews="2.7K рецензий"
      header-year="2024"
      header-duration="2ч 8м"
      header-desc="Уэйд Уилсон попадает в организацию «Управление временными изменениями», что вынуждает его вернуться к своему альтер-эго Дэдпулу и изменить историю с помощью Росомахи."
    >
      <cRating :star-rating="4"/>
    </cHeader>
    <cPopular popular-title="Популярные фильмы">
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
    </cPopular>
    <cPopular popular-title="Популярные сериалы">
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
      <cCard :card-rating="4" card-title="Ужасающий"/>
    </cPopular>
  </cMain>
</template>
