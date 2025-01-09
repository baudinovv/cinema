import { createWebHistory, createRouter } from 'vue-router'

import home from '../pages/homePage.vue';
import movie from '../pages/moviePage.vue';
import detailsOverviewPage from '../pages/detailsOverviewPage.vue';
import detailsImagePage from '../pages/detailsImagePage.vue';
import detailsVideoPage from '../pages/detailsVideoPage.vue';

const routes = [
  { path: '/', component: home },
  { path: '/movie/:id/', component: movie, children: [
    { path: 'overview', component: detailsOverviewPage },
    { path: 'image', component: detailsImagePage },
    { path: 'video', component: detailsVideoPage }
  ] }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router