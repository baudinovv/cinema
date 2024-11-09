<script setup lang="ts">
import cMenu from './components/menu/menu.vue'
import cMain from './components/main.vue'; 
import cHeader from './components/header/header.vue';
import cRating from './components/header/rating.vue'
</script>

<template>
  <cMenu/>
  <cMain class="text-white">
    <cHeader 
      header-title="Дэдпул и Росомаха" 
      header-rating="4"
      header-reviews="2.7K рецензий"
      header-year="2024"
      header-duration="2ч 8м"
      header-desc="Уэйд Уилсон попадает в организацию «Управление временными изменениями», что вынуждает его вернуться к своему альтер-эго Дэдпулу и изменить историю с помощью Росомахи."
    >
      <cRating color="red" :star-limit="4"/>
    </cHeader>
  </cMain>
</template>
