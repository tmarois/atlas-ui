import { ref, watch } from 'vue';

const dark = ref(localStorage.getItem('playground_dark') === 'true');
const topNav = ref(localStorage.getItem('playground_top_nav') === 'true');
const theme = ref(localStorage.getItem('playground_theme') || 'blue');
const themes = ['blue', 'purple', 'teal', 'pink', 'gray', 'green', 'orange'];

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

watch(
  theme,
  (value) => {
    localStorage.setItem('playground_theme', value);
    document.documentElement.classList.remove(
      ...themes.map((t) => `theme-${t}`)
    );
    document.documentElement.classList.add(`theme-${value}`);
  },
  { immediate: true }
);

export function useSettings() {
  return { dark, topNav, theme };
}
