# Select

Select is a dropdown input for selecting a single option.

```ts
import { Select } from '@atlas/ui';
```

## Usage

```vue
<Select :options="options" v-model="selected" />
```

## API

### Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `modelValue` | `any` | — | Selected option value. |
| `options` | `any[]` | `[]` | List of available options. |
| `optionLabel` | `string` | — | Property name to use as the displayed label. |
| `filter` | `boolean` | `false` | Enables client-side filtering. |
| `pt` | `SelectPassThroughOptions` | — | Pass-through options to customize internal elements. |

### Slots
- `value` – Template for the selected value display.
- `option` – Template for an option in the panel.
- `header` – Custom content above the options.
- `footer` – Custom content below the options.
- `empty` – Content shown when no options are available.

### Events
| Name | Payload | Description |
| ---- | ------- | ----------- |
| `change` | `{ originalEvent: Event, value: any }` | Emitted when the value changes. |
| `focus` | `{ originalEvent: FocusEvent }` | Fired when the input receives focus. |
| `blur` | `{ originalEvent: FocusEvent }` | Fired when the input loses focus. |

Refer to the [PrimeVue Select API](https://primevue.org/select/#api).

