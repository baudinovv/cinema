import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './index.css'

import router from './router/router'
import App from './App.vue'

const pinia = createPinia();

const app = createApp(App);

// Register a global custom directive called `v-focus`
app.directive('focus', {
  // When the bound element is mounted into the DOM...
  mounted(el) {
    // Focus the element
    el.focus()
  }
})


app.use(pinia)
.use(router);

app.mount('#app')
