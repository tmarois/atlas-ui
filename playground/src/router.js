import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Users from './pages/Users.vue';
import ComponentsLayout from './pages/components/Index.vue';
import Buttons from './pages/components/Buttons.vue';
import Forms from './pages/components/Forms.vue';
import Tables from './pages/components/Tables.vue';

const routes = [
  { path: '/', component: Home, meta: { title: 'Dashboard' } },
  { path: '/users', component: Users, meta: { title: 'Users table' } },
  {
    path: '/components',
    component: ComponentsLayout,
    redirect: '/components/buttons',
    children: [
      { path: 'buttons', component: Buttons, meta: { title: 'Buttons' } },
      { path: 'forms', component: Forms, meta: { title: 'Forms' } },
      { path: 'tables', component: Tables, meta: { title: 'Tables' } },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
