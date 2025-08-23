import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';

// Minimal stub of Inertia's usePage for the playground environment.
// Returns a reactive page object whose url updates with the current route.
export function usePage() {
  const route = useRoute();
  return reactive({
    url: computed(() => route.fullPath),
    component: '',
    props: {},
  });
}

export default { usePage };
