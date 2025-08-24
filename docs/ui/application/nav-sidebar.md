# NavSidebar

Vertical navigation sidebar.

## Example
```ts
import { NavSidebar } from '@atlas/ui';
const navItems = [
  {
    children: [
      { label: 'Home', href: '/' },
      { label: 'Users', href: '/users' }
    ]
  },
  {
    children: [
      { label: 'Settings', href: '/settings' }
    ]
  }
];
```

```vue
<NavSidebar :items="navItems" :linkComponent="Link" logoLinkPath="/">
  <template #logo>
    <img src="/logo.svg" alt="Logo" />
  </template>
  <template #actions>
    <Button label="Settings" />
  </template>
</NavSidebar>
```

## Props
- `items: NavItem[]` – sections and links displayed in the sidebar.
- `logoLinkPath: string` – root link. Default `'/'`.
- `linkComponent: string | object` – component used for links. Default `'a'`.

## Slots
- `logo` – brand image or text.
- `actions` – footer actions.

## Events
- None
