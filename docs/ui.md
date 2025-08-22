# Atlas UI

Reusable Vue 3 components styled with Tailwind CSS and built on top of PrimeVue.

## Overriding Themes with Passthrough

PrimeVue components support a [passthrough (pt) API](https://primevue.org/passthrough/) that lets you customize internal elements and classes. Atlas forwards this API so you can tweak component styles or structure when needed.

### Example: Button

```vue
<Button
  label="Submit"
  :pt="{
    root: { class: 'bg-emerald-600 hover:bg-emerald-700 border-none' },
    label: { class: 'text-white font-medium' }
  }"
/>
```

## Components

### Table of Contents
- [Actions](#actions)
  - [Button](#button)
- [Form Elements](#form-elements)
  - [InputText](#inputtext)
  - [InputNumber](#inputnumber)
  - [InputMask](#inputmask)
  - [Select](#select)
  - [Textarea](#textarea)
  - [Checkbox](#checkbox)
- [Layout](#layout)
  - [ScrollFrame](#scrollframe)
  - [Card](#card)
  - [Divider](#divider)
- [Data Display](#data-display)
  - [Chip](#chip)
- [Feedback](#feedback)
  - [Alert](#alert)

### Actions

#### Button
```ts
import { Button } from '@atlas/ui';
```

```vue
<Button>Click me</Button>
```

##### API

Refer to the [PrimeVue Button API](https://primevue.org/button/#api) for available props and events.

### Form Elements

#### InputText
```ts
import { InputText } from '@atlas/ui';
```

```vue
<InputText v-model="value" />
```

##### API

See the [PrimeVue InputText API](https://primevue.org/inputtext/#api).

#### InputNumber
```ts
import { InputNumber } from '@atlas/ui';
```

```vue
<InputNumber v-model="value" />
```

##### API

See the [PrimeVue InputNumber API](https://primevue.org/inputnumber/#api).

#### InputMask
```ts
import { InputMask } from '@atlas/ui';
```

```vue
<InputMask mask="99/99/9999" v-model="value" />
```

##### API

Refer to the [PrimeVue InputMask API](https://primevue.org/inputmask/#api).

#### Select
```ts
import { Select } from '@atlas/ui';
```

```vue
<Select :options="options" v-model="selected" />
```

##### API

See the [PrimeVue Select API](https://primevue.org/select/#api).

#### Textarea
```ts
import { Textarea } from '@atlas/ui';
```

```vue
<Textarea v-model="value" />
```

##### API

Refer to the [PrimeVue Textarea API](https://primevue.org/textarea/#api).

#### Checkbox
```ts
import { Checkbox } from '@atlas/ui';
```

```vue
<Checkbox v-model="checked" />
```

##### API

See the [PrimeVue Checkbox API](https://primevue.org/checkbox/#api).

### Layout

#### ScrollFrame
```ts
import { ScrollFrame } from '@atlas/ui';
```

```vue
<ScrollFrame
  page
  scroll-key="settings"
  :add-offset="16"
  class="p-4"
>
  <!-- scrollable content -->
</ScrollFrame>
```

Provides a scrollable container sized to the viewport. When `page` is set it locks body scrolling and uses `scroll-key` to preserve position.

##### Props

- `scrollKey` (string | null) – identifier used by the scroll composable to persist position. Defaults to `null`.
- `page` (boolean) – lock body scroll and treat the frame as a full page. Defaults to `false`.
- `allowBodyScroll` (boolean) – allow body scroll even when `page` is `true`. Defaults to `false`.
- `offset` (number | null) – explicit pixel offset for height calculation. Defaults to element top position.
- `addOffset` (number) – extra pixels subtracted from height. Defaults to `0`.
- `rootClass` (string) – additional classes for the frame element. Defaults to `overflow-y-auto`.

#### Card
```ts
import { Card } from '@atlas/ui';
```

```vue
<Card title="Title">Content</Card>
```

##### API

Refer to the [PrimeVue Card API](https://primevue.org/card/#api).

#### Divider
```ts
import { Divider } from '@atlas/ui';
```

```vue
<Divider />
```

##### API

Refer to the [PrimeVue Divider API](https://primevue.org/divider/#api).

### Data Display

#### Chip
```ts
import { Chip } from '@atlas/ui';
```

```vue
<Chip label="Label" />
```

##### API

Refer to the [PrimeVue Chip API](https://primevue.org/chip/#api).

### Feedback

#### Alert
```ts
import { Alert } from '@atlas/ui';
```

```vue
<Alert>Default message</Alert>
```

##### Props

- `warning` – use warning styling.
- `hideIcon` – hide the default icon.
