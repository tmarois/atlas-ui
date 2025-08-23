import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Buttons from './pages/Buttons.vue';
import Form from './pages/Form.vue';
import Data from './pages/Data.vue';

const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/buttons', component: Buttons, meta: { title: 'Buttons' } },
  { path: '/form', component: Form, meta: { title: 'Form Inputs' } },
  { path: '/data', component: Data, meta: { title: 'Data Table' } },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
