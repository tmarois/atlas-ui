# NavSidebar

Vertical navigation sidebar.

## Example
```ts
import { NavSidebar } from '@atlas/ui';
```

```vue
<NavSidebar :items="navItems" :linkComponent="Link" homeUrl="/">
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
- `homeUrl: string` – root link. Default `'/'`.
- `linkComponent: string | object` – component used for links. Default `'a'`.

## Slots
- `logo` – brand image or text.
- `actions` – footer actions.

## Events
- None
