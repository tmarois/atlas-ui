import { ref, computed } from 'vue';

const user = ref({
  id: 1,
  name: 'Jane Doe',
  email: 'jane@example.com',
});

const profileMenuItems = computed(() => [
  { separator: true },
  { label: 'Company Name', icon: 'pi pi-building-columns', href: '/' },
  { separator: true },
  { label: 'Billing & Plan', icon: 'pi pi-credit-card', href: '/' },
  { label: 'Manage Access', icon: 'pi pi-users', href: '/' },
  { label: 'Integrations', icon: 'pi pi-objects-column', href: '/' },
  { label: 'Settings', icon: 'pi pi-cog', href: '/' },
  { label: 'Status page', icon: 'pi pi-cog', href: 'https://google.com', external: true },
  { separator: true },
  { label: 'Logout', icon: 'pi pi-sign-out', href: '/logout' },
]);

export function useProfileMenu() {
  return { user, profileMenuItems };
}

