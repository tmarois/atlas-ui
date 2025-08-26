# TableActions

Toolbar for batch table actions.

```ts
import { TableActions } from '@atlas/ui';
```

## Usage

```vue
<TableActions :selectedCount="selected.length" :menuItems="actions" @action="onAction" />
```

## API

### Props
| Prop | Type | Description |
| ---- | ---- | ----------- |
| `selectedCount` | `number` | Number of selected rows. Displayed next to actions. |
| `menuItems` | `MenuItem[]` | Action definitions. Each item supports `label`, `action`, optional `tooltip`, `disabled`, and nested `children` arrays for submenus. |

### Slots
- None.

### Events
- `action` – Emitted when an action is chosen. Arguments: `(action: string)`; `'clear'` is emitted when the clear button is pressed.

Refer to the [PrimeVue Menu API](https://primevue.org/menu/#api) for menu item options.
