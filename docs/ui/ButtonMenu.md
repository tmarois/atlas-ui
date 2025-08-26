# ButtonMenu

Dropdown menu activated from a button.

```ts
import { ButtonMenu } from '@atlas/ui';
```

## Usage

```vue
<ButtonMenu :items="items" @action="onAction" />
```

## API

### Props
| Prop | Type | Description |
| ---- | ---- | ----------- |
| `items` | `MenuItem[]` | Menu items with `label`, `icon`, `action`, `disabled`, optional `children` for submenus, and `tooltip`. |
| `icon` | `string` | Icon class for the default trigger. Defaults to `'pi pi-ellipsis-v'`. |
| `ptData` | `Record<string, any>` | Additional data forwarded with the `action` event. |
| `onHover` | `boolean` | Show menu on hover instead of click. Defaults to `false`. |
| `pt` | `ButtonMenuPassThroughOptions` | Pass-through styling options. |
 
### Slots
- `trigger` – Custom trigger element. Slot props: `{ toggleMenu, triggerRef }`.

### Events
- `action` – Emitted when an item is selected. Arguments: `(action: any, ptData: Record<string, any>)`.

Refer to the [PrimeVue Menu API](https://primevue.org/menu/#api) for menu item options.
