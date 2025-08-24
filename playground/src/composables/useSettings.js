import { ref, watch } from 'vue';

const dark = ref(localStorage.getItem('playground_dark') === 'true');
const topNav = ref(localStorage.getItem('playground_top_nav') === 'true');

watch(
  dark,
  (value) => {
    localStorage.setItem('playground_dark', value);
    document.documentElement.classList.toggle('dark', value);
  },
  { immediate: true }
);

watch(
  topNav,
  (value) => {
    localStorage.setItem('playground_top_nav', value);
  },
  { immediate: true }
);

export function useSettings() {
  return { dark, topNav };
}
