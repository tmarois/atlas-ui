import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import StyleClass from 'primevue/styleclass';
import Tooltip from 'primevue/tooltip';
import 'primevue/tooltip/style';
import ToastService from 'primevue/toastservice';
import App from './App.vue';
import router from './router';
import 'primeicons/primeicons.css';
import './style.css';

// Create and mount the Vue application
const app = createApp(App);
app.use(router);
app.use(ToastService);
app.use(PrimeVue, { unstyled: true });
app.directive('tooltip', Tooltip);
app.directive('styleclass', StyleClass);
app.mount('#app');

