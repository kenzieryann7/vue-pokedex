import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import PokemonRoster from '../views/PokemonRoster.vue';
import PokemonCompare from '../views/PokemonCompare.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/pokemon-roster',
    name: 'PokemonRoster',
    component: PokemonRoster
  },
  {
    path: '/compare-pokemon',
    name: 'PokemonCompare',
    component: PokemonCompare
  }
];

const router = createRouter({
  mode: 'history',
  linkExactActiveClass: 'fw-bold', // In the navbar, the active view appears bold
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
