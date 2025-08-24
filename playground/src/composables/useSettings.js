import { ref, watch } from 'vue';

const dark = ref(localStorage.getItem('playground_dark') === 'true');
const topNav = ref(localStorage.getItem('playground_top_nav') === 'true');
const primary = ref(localStorage.getItem('playground_primary') || 'blue');
const surface = ref(localStorage.getItem('playground_surface') || 'blue');
const rounded = ref(localStorage.getItem('playground_rounded') || '1');
const primaryThemes = ['blue', 'purple', 'indigo', 'teal', 'pink', 'gray', 'green', 'orange'];
const surfaceThemes = ['blue', 'gray', 'purple', 'pink', 'slate', 'zinc'];
const roundedOptions = ['0', '1', '2', '3'];

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

watch(
  rounded,
  (value) => {
    localStorage.setItem('playground_rounded', value);
    document.documentElement.classList.remove(
      ...roundedOptions.map((r) => `theme-rounded-${r}`)
    );
    document.documentElement.classList.add(`theme-rounded-${value}`);
  },
  { immediate: true }
);

export function useSettings() {
  return { dark, topNav, primary, surface, rounded };
}
