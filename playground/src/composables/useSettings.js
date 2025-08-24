import { ref, watch } from 'vue';

const dark = ref(localStorage.getItem('playground_dark') === 'true');
const topNav = ref(localStorage.getItem('playground_top_nav') === 'true');
const primary = ref(localStorage.getItem('playground_primary') || 'blue');
const surface = ref(localStorage.getItem('playground_surface') || 'blue');
const primaryThemes = ['blue', 'purple', 'indigo', 'teal', 'pink', 'gray', 'green', 'orange'];
const surfaceThemes = ['blue', 'gray', 'purple', 'pink', 'slate', 'zinc'];

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
  primary,
  (value) => {
    localStorage.setItem('playground_primary', value);
    document.documentElement.classList.remove(
      ...primaryThemes.map((t) => `theme-primary-${t}`)
    );
    document.documentElement.classList.add(`theme-primary-${value}`);
  },
  { immediate: true }
);

watch(
  surface,
  (value) => {
    localStorage.setItem('playground_surface', value);
    document.documentElement.classList.remove(
      ...surfaceThemes.map((t) => `theme-surface-${t}`)
    );
    document.documentElement.classList.add(`theme-surface-${value}`);
  },
  { immediate: true }
);

export function useSettings() {
  return { dark, topNav, primary, surface };
}
