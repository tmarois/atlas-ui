# ButtonMenu
```ts
import { ButtonMenu } from '@atlas/ui';
```

```vue
<ButtonMenu :items="items" @action="onAction" />
```

##### Props

- `items` – array of menu item objects.
- `icon` – icon class for the default trigger. Defaults to `'pi pi-ellipsis-v'`.
- `ptData` – additional data passed with the `action` event.
- `onHover` – show menu on hover instead of click.

##### Slots

- `trigger` – custom trigger element. Receives `{ toggleMenu, triggerRef }`.

##### Events

- `action` – emitted when an item is selected. Arguments: `(action, ptData)`.

