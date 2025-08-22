# Atlas UI

Reusable Vue 3 components styled with Tailwind CSS and built on top of PrimeVue.

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
  - [Card](#card)

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

#### Card
```ts
import { Card } from '@atlas/ui';
```

```vue
<Card title="Title">Content</Card>
```

##### API

Refer to the [PrimeVue Card API](https://primevue.org/card/#api).
