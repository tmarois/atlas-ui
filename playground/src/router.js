import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Users from './pages/Users.vue';
import Buttons from './pages/components/Buttons.vue';
import Forms from './pages/components/forms/Index.vue';
import FormsSizing from './pages/components/forms/Sizing.vue';
import FormsErrors from './pages/components/forms/Errors.vue';
import Tables from './pages/components/tables/Index.vue';
import TablesSorting from './pages/components/tables/Sorting.vue';
import Tabs from './pages/components/Tabs.vue';
import Overlays from './pages/components/Overlays.vue';
import Feedback from './pages/components/feedback/Index.vue';
import FeedbackErrors from './pages/components/feedback/Errors.vue';
import FeedbackToast from './pages/components/feedback/Toast.vue';
import FeedbackProgressBar from './pages/components/feedback/ProgressBar.vue';
import Editor from './pages/components/editor/Index.vue';
import EditorVariant from './pages/components/editor/Variant.vue';
import EditorText from './pages/components/editor/Text.vue';
import MainLayout from './layouts/MainLayout.vue';
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
    component: Users,
    meta: { title: 'Users table' },
  },
  {
    path: '/users/:id',
    component: UserLayout,
    meta: { title: 'User details' },
    props: route => ({
      item: {
        id: Number(route.params.id),
        name: `User ${route.params.id}`,
        email: `user${route.params.id}@example.com`,
      },
    }),
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
      { path: 'tables/sorting', component: TablesSorting, meta: { title: 'Tables' } },
      { path: 'tabs', component: Tabs, meta: { title: 'Tabs' } },
      { path: 'overlays', component: Overlays, meta: { title: 'Overlays' } },
      { path: 'feedback', component: Feedback, meta: { title: 'Feedback' } },
      { path: 'feedback/errors', component: FeedbackErrors, meta: { title: 'Feedback' } },
      { path: 'feedback/toast', component: FeedbackToast, meta: { title: 'Feedback' } },
      { path: 'feedback/progressbar', component: FeedbackProgressBar, meta: { title: 'Feedback' } },
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
