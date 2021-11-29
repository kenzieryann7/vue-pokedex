import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  }
];

const router = createRouter({
  mode: 'history',
  linkExactActiveClass: 'fw-bold', // In the navbar, the active view appears bold
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
