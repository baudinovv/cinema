import { createWebHistory, createRouter } from 'vue-router'

import home from '../pages/homePage.vue';
import movie from '../pages/Movie/moviePage.vue';
import detailsOverviewPage from '../pages/Movie/detailsOverviewPage.vue';
import detailsImagePage from '../pages/Movie/detailsImagePage.vue';
import detailsVideoPage from '../pages/Movie/detailsVideoPage.vue';
import TVImagePage from '../pages/TV/TVImagePage.vue';
import TVOverviewPage from '../pages/TV/TVOverviewPage.vue';
import TVPage from '../pages/TV/TVPage.vue';

const routes = [
  { path: '/', component: home },
  { path: '/movie/:id/', component: movie, children: [
    { path: 'overview', component: detailsOverviewPage },
    { path: 'image', component: detailsImagePage },
    { path: 'video', component: detailsVideoPage }
  ] },
  { path: '/tv/:id/', component: TVPage, children: [
    { path: 'overview', component: TVOverviewPage },
    { path: 'image', component: TVImagePage },
    { path: 'video', component: detailsVideoPage }
  ] },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router