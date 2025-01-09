<script lang="ts">

import { defineComponent } from "vue";

import cMenu from './components/menu/menu.vue';
import cMain from './components/main/main.vue';

export default defineComponent({
  name: "App",
  components: {
    cMenu,
    cMain
  }
});
</script>

<template>
  <cMenu />
  <cMain >
    <RouterView/>
  </cMain>
</template>
