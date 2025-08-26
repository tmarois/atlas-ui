# DrawerForm

Form container presented inside a sliding drawer.

```ts
import { DrawerForm } from '@atlas/ui';
```

## Usage

```vue
<DrawerForm v-model="open" title="Title" @submit="save">
  <!-- form fields -->
</DrawerForm>
```

## API

### Props
| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `modelValue` | `boolean` | `false` | Controls visibility. |
| `title` | `string` | `''` | Drawer title text. |
| `loading` | `boolean` | `false` | Shows loading state on save. |
| `width` | `string` | `undefined` | Optional width of the drawer. |
| `errors` | `Record<string, any>` | `undefined` | Form error object. |
| `tabs` | `Tab[]` | `[]` | Array of tab definitions `{ title, disabled?, lockTooltipText? }`. |
| `modelActiveTab` | `number` | `0` | Index of the active tab. |

### Slots
- `header` – custom header content.
- `default` – form content or first tab panel.
- `tab-{index}` – content for the tab at the specified index.
- `footer` – custom footer content.
- `message` – message above footer actions.
- `actions` – replace default footer actions.

### Events
- `update:modelValue` – emitted when visibility changes.
- `submit` – emitted when the save action is triggered.
- `update:modelActiveTab` – emitted when active tab changes.
