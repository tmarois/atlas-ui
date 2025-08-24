# NavTopbar

Global top navigation bar.

## Example
```ts
import { NavTopbar } from '@atlas/ui';
```

```vue
<NavTopbar :items="navItems" :linkComponent="Link" homeUrl="/">
  <template #logo>
    <img src="/logo.svg" alt="Logo" />
  </template>
  <template #actions>
    <Button label="Logout" />
  </template>
</NavTopbar>
```

## Props
- `items: NavItem[]` – navigation links, supports nested `children`.
- `linkComponent: string | object` – component used for links. Default `'a'`.
- `homeUrl: string` – root link. Default `'/'`.
- `widthClass: string` – max width container class. Default `'max-w-screen-2xl'`.

## Slots
- `logo` – brand image or text.
- `actions` – optional action buttons.

## Events
- None
