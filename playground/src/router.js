import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Users from './pages/Users.vue';
import User from './pages/User.vue';
import Buttons from './pages/components/Buttons.vue';
import Forms from './pages/components/forms/Index.vue';
import FormsSizing from './pages/components/forms/Sizing.vue';
import FormsErrors from './pages/components/forms/Errors.vue';
import Tables from './pages/components/Tables.vue';
import Tabs from './pages/components/Tabs.vue';
import Overlays from './pages/components/Overlays.vue';
import Editor from './pages/components/editor/Index.vue';
import EditorVariant from './pages/components/editor/Variant.vue';
import EditorText from './pages/components/editor/Text.vue';

const routes = [
  { path: '/', component: Home, meta: { title: 'Dashboard' } },
  { path: '/users', component: Users, meta: { title: 'Users table' } },
  {
    path: '/users/:id',
    component: User,
    meta: { title: 'User details' },
    props: route => ({
      item: {
        id: Number(route.params.id),
        name: `User ${route.params.id}`,
        email: `user${route.params.id}@example.com`,
      },
    }),
  },
  { path: '/components', redirect: '/components/buttons' },
  { path: '/components/buttons', component: Buttons, meta: { title: 'Buttons' } },
  { path: '/components/forms', component: Forms, meta: { title: 'Forms' } },
  { path: '/components/forms/sizing', component: FormsSizing, meta: { title: 'Forms' } },
  { path: '/components/forms/errors', component: FormsErrors, meta: { title: 'Forms' } },
  { path: '/components/tables', component: Tables, meta: { title: 'Tables' } },
  { path: '/components/tabs', component: Tabs, meta: { title: 'Tabs' } },
  { path: '/components/overlays', component: Overlays, meta: { title: 'Overlays' } },
  { path: '/components/editor', component: Editor, meta: { title: 'Editor' } },
  { path: '/components/editor/variant', component: EditorVariant, meta: { title: 'Editor Variants' } },
  { path: '/components/editor/text', component: EditorText, meta: { title: 'Editor Text' } },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
