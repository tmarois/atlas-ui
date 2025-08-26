# DialogConfirmation
```ts
import { DialogConfirmation } from '@atlas/ui';
```

```vue
<DialogConfirmation v-model="open" title="Delete item" @confirm="remove" />
```

##### Props

- `modelValue: boolean` – controls visibility.
- `title: string` – header text. Default `'Delete Item'`.
- `icon: string` – icon class for the dialog. Default `'pi pi-trash'`.
- `message: string` – confirmation message.
- `loading: boolean` – disable buttons and show loading state.
- `pt: object` – passthrough options for internal elements.

##### Events

- `update:modelValue` – emitted when visibility changes.
- `confirm` – emitted when the confirm button is clicked.

