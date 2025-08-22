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

### Form Elements

#### InputText
```ts
import { InputText } from '@atlas/ui';
```

```vue
<InputText v-model="value" />
```

#### InputNumber
```ts
import { InputNumber } from '@atlas/ui';
```

```vue
<InputNumber v-model="value" />
```

#### InputMask
```ts
import { InputMask } from '@atlas/ui';
```

```vue
<InputMask mask="99/99/9999" v-model="value" />
```

#### Select
```ts
import { Select } from '@atlas/ui';
```

```vue
<Select :options="options" v-model="selected" />
```

#### Textarea
```ts
import { Textarea } from '@atlas/ui';
```

```vue
<Textarea v-model="value" />
```

#### Checkbox
```ts
import { Checkbox } from '@atlas/ui';
```

```vue
<Checkbox v-model="checked" />
```

### Layout

#### Card
```ts
import { Card } from '@atlas/ui';
```

```vue
<Card title="Title">Content</Card>
```
