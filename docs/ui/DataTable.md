# DataTable

DataTable displays tabular data with optional pagination and sorting.

```ts
import { DataTable } from '@atlas/ui';
import Column from 'primevue/column';
```

## Usage

```vue
<DataTable :value="rows">
  <Column field="name" header="Name" />
  <Column field="email" header="Email" />
</DataTable>
```

## API

### Props

None.

### Slots

None.

### Events

None.

Refer to the [PrimeVue DataTable API](https://primevue.org/datatable/#api). See the [Table guide](../table.md) for column definitions, pagination, and CSV export.
