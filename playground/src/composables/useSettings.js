import { ref, watch } from 'vue';

const dark = ref(localStorage.getItem('playground_dark') === 'true');

watch(
  dark,
  (value) => {
    localStorage.setItem('playground_dark', value);
    document.documentElement.classList.toggle('dark', value);
  },
  { immediate: true }
);

export function useSettings() {
  return { dark };
}
