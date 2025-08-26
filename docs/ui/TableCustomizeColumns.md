# TableCustomizeColumns
```ts
import { TableCustomizeColumns } from '@atlas/ui';
```

```vue
<TableCustomizeColumns
  :columns="columns"
  :activeColumnList="active"
  :defaultColumnList="defaults"
  @update="val => active = val"
>
  <template #trigger="{ toggle }">
    <button @click="toggle">Columns</button>
  </template>
</TableCustomizeColumns>
```

##### Props

- `columns: any[]` – column definitions.
- `activeColumnList: any[]` – visible column keys.
- `defaultColumnList: any[]` – default visible column keys.

##### Events

- `update` – emitted with new array of active column keys.

##### Slots

- `trigger` – custom element that toggles the popover.

