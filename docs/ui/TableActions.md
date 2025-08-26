# TableActions
```ts
import { TableActions } from '@atlas/ui';
```

```vue
<TableActions :selectedCount="selected.length" :menuItems="actions" @action="onAction" />
```

##### Props

- `selectedCount: number` – number of selected rows.
- `menuItems: any[]` – action definitions. Child items may provide nested menus.

##### Events

- `action` – emitted with the action identifier. `'clear'` is emitted when the clear button is pressed.

