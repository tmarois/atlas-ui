# Table
```ts
import { Table } from '@atlas/ui';
```

```vue
<Table
  :items="rows"
  :columns="columns"
  :activeColumnList="activeColumns"
  @sort="onSort"
/>
```

##### Props

- `items: any[]` – table data rows.
- `itemTotal: number` – total item count.
- `selected: any[]` – selected rows.
- `selectAll: boolean` – select all across pages.
- `columns: any[]` – column definitions.
- `activeColumnList: any[]` – ordered list of visible column keys.
- `defaultColumnList: any[]` – default column keys.
- `size: string` – table size, default `'small'`.
- `tableStyle: string` – inline style for table width.
- `dataKey: string` – unique key field, default `'id'`.
- `emptyLabel: string` – message when no data, default `'No results'`.
- `hasSelectAll: boolean` – show select-all menu.
- `hasSelection: boolean` – enable row selection.
- `hasCustomizeColumns: boolean` – enable column customization UI.
- `scrollOffset: number` – additional offset for the scroll frame.
- `scrollable: boolean` – enable DataTable scrolling.

##### Events

- `sort` – emitted with `{ field, order }` when sorting changes.
- `update:selected` – emitted with selected rows.
- `update:selectAll` – emitted when the select-all state changes.
- `update:activeColumnList` – emitted with new active column keys.

##### Slots

- `columnKey` – named slots for custom cell templates using the column key.
- `empty` – content shown when no rows exist.

Built on PrimeVue's DataTable. See the [DataTable API](https://primevue.org/datatable/#api) for additional options.

