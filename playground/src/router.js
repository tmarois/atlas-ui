import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Users from './pages/Users.vue';
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
import MainLayout from './layouts/MainLayout.vue';
import UsersLayout from './layouts/UsersLayout.vue';
import UserLayout from './layouts/UserLayout.vue';
import ComponentsLayout from './layouts/ComponentsLayout.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home, meta: { title: 'Dashboard' } },
    ],
  },
  {
    path: '/users',
    component: UsersLayout,
    children: [
      { path: '', component: Users, meta: { title: 'Users table' } },
    ],
  },
  {
    path: '/users/:id',
    component: UserLayout,
    meta: { title: 'User details' },
  },
  {
    path: '/components',
    component: ComponentsLayout,
    redirect: '/components/buttons',
    children: [
      { path: 'buttons', component: Buttons, meta: { title: 'Buttons' } },
      { path: 'forms', component: Forms, meta: { title: 'Forms' } },
      { path: 'forms/sizing', component: FormsSizing, meta: { title: 'Forms' } },
      { path: 'forms/errors', component: FormsErrors, meta: { title: 'Forms' } },
      { path: 'tables', component: Tables, meta: { title: 'Tables' } },
      { path: 'tabs', component: Tabs, meta: { title: 'Tabs' } },
      { path: 'overlays', component: Overlays, meta: { title: 'Overlays' } },
      { path: 'editor', component: Editor, meta: { title: 'Editor' } },
      { path: 'editor/variant', component: EditorVariant, meta: { title: 'Editor Variants' } },
      { path: 'editor/text', component: EditorText, meta: { title: 'Editor Text' } },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
