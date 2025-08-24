import { IconHome, IconUsers, IconBox } from '@tabler/icons-vue';

export const sideBarItems = [
  {
    children: [
      { label: 'Home', href: '/', icon: IconHome, activeIcon: IconHome },
      { label: 'Users', href: '/users', parent: '/users', icon: IconUsers, activeIcon: IconUsers },
      {
        label: 'Components',
        href: '/components/buttons',
        parent: '/components',
        icon: IconBox,
        activeIcon: IconBox,
      },
    ],
  },
];
