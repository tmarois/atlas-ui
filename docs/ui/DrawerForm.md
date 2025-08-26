# DrawerForm
```ts
import { DrawerForm } from '@atlas/ui';
```

```vue
<DrawerForm v-model="open" title="Title" @submit="save">
  <!-- form fields -->
</DrawerForm>
```

##### Props

- `modelValue` – controls visibility.
- `title` – header text.
- `loading` – shows loading state on save.
- `width` – optional width of drawer.
- `errors` – form error object.
- `tabs` – array of tab definitions.
  - `title: string`
  - `disabled?: boolean`
  - `lockTooltipText?: string` – when `disabled`, display a lock icon with this tooltip.
- `modelActiveTab` – active tab index.

##### Events

- `update:modelValue` – emitted when visibility changes.
- `submit` – emitted on save.
- `update:modelActiveTab` – emitted when active tab changes.

