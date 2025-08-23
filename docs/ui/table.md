# Table

Atlas DataTable component extends PrimeVue's DataTable with Atlas styling and utilities.

## Table of Contents
- [Basic Usage](#basic-usage)
- [Columns](#columns)
- [Pagination and Sorting](#pagination-and-sorting)
- [CSV Export](#csv-export)

## Basic Usage
```ts
import { DataTable } from '@atlas/ui';
import Column from 'primevue/column';
```

```vue
<DataTable :value="rows">
  <Column field="name" header="Name" />
  <Column field="email" header="Email" />
</DataTable>
```

## Columns
Define columns using PrimeVue's `<Column>` components. Slot templates may be used for custom cell content.

## Pagination and Sorting
Enable pagination and sorting via PrimeVue props such as `paginator`, `rows`, `sortField`, and `sortOrder`.

```vue
<DataTable :value="rows" paginator :rows="10" sortField="name" :sortOrder="1" />
```

## CSV Export
Call the `exportCSV` method on the component reference to download data.

```vue
<DataTable ref="dt" :value="rows" />
<Button @click="dt.exportCSV()" label="Export" />
```

Refer to the [PrimeVue DataTable API](https://primevue.org/datatable/#api) for all available options.
