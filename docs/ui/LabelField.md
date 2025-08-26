# LabelField
```ts
import { LabelField, InputText } from '@atlas/ui';
```

```vue
<LabelField label="Name" name="name" required tooltip="Enter full name">
  <InputText v-model="name" />
</LabelField>
```

##### Props

- `label` – text for the label.
- `tooltip` – help text shown in a tooltip.
- `name` – associates the label with an input.
- `required` – display an asterisk when true.
- `error` – validation message displayed below the field.

