import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './index.css'

import router from './router/router'
import App from './App.vue'

const pinia = createPinia();

createApp(App)
.use(pinia)
.use(router)
.mount('#app')
