# DialogConfirmation

Preconfigured dialog for confirming destructive actions.

```ts
import { DialogConfirmation } from '@atlas/ui';
```

## Usage

```vue
<DialogConfirmation v-model="open" title="Delete item" @confirm="remove" />
```

## API

### Props
| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `modelValue` | `boolean` | `false` | Controls visibility. |
| `title` | `string` | `'Delete Item'` | Header text. |
| `icon` | `string` | `'pi pi-trash'` | Icon class for the dialog. |
| `message` | `string` | `'Are you sure you want to delete this item?'` | Confirmation message. |
| `loading` | `boolean` | `false` | Disables buttons and shows loading state. |
| `pt` | `DialogConfirmationPassThroughOptions` | `undefined` | Passthrough options for internal elements. |

### Slots
- `message` – custom confirmation message and icon.
- `actions` – replace the default action buttons.

### Events
- `update:modelValue` – emitted when visibility changes.
- `confirm` – emitted when the confirm action is triggered.
