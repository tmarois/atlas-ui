# Inertia DataTable Options

The `InertiaDataTableOptions` trait helps controllers build datatable query options by combining defaults, request input, and optional session data. Filter values are type-cast using the `Caster` helper so they can be safely consumed by services and queries.

## Returned Options

`resolveIndexOptions` returns an array with these keys:

- `search` – free-text query used for filtering.
- `filters` – associative array of typed filters.
- `viewFields` – fields that should be visible in the table.
- `perPage` – number of results per page.
- `sortField` – column used to order results.
- `sortOrder` – `1` for ascending or `-1` for descending order.

## Usage

```php
use Atlas\Laravel\Http\Concerns\InertiaDataTableOptions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController
{
    use InertiaDataTableOptions;

    protected array $filterCasts = [
        'user_id' => 'int',
    ];

    protected array $indexDefaults = [
        'perPage' => 50,
        'sortField' => 'name',
        'sortOrder' => 1,
    ];

    public function index(Request $request)
    {
        $options = $this->resolveIndexOptions($request, true, 'users.index');

        return Inertia::render('Users/Index', [
            'users' => $this->userService->listPaginated($options['perPage'], $options),
            'options' => $options,
        ]);
    }
}
```

- `$filterCasts` defines expected types for filter values and leverages `Caster` for conversion.
- `$indexDefaults` provides fallback values for pagination and sorting.
- Calling `resolveIndexOptions($request, true, 'users.index')` merges defaults with request data, persists them to the session, and returns the combined options for rendering.

## Frontend Integration

Pass the resolved `$options` to your Inertia view. On the client side, the [`useDataTableOptions` composable](../ui/composables.md#usedatatableoptions) consumes the array and keeps query parameters synchronized with the server. Whenever a user searches, sorts, or filters, the composable issues an Inertia request with the updated options so both frontend and backend stay in sync.

```vue
<script setup>
import { useDataTableOptions } from '@tmarois/atlas';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const table = useDataTableOptions('users.index', props.options);
</script>
```

This pattern keeps controller methods lean while ensuring consistent datatable behavior across requests and a seamless experience between frontend and backend.

### Custom Filters

The composable returns a reactive `filters` object. Bind UI inputs to it or
update it programmatically and `useDataTableOptions` will automatically submit
new requests whenever a filter changes.

```vue
<template>
    <select v-model="table.form.filters.status">
        <option value="">Any status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
    </select>
</template>

<script setup>
import { useDataTableOptions } from '@tmarois/atlas';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const table = useDataTableOptions('users.index', props.options);

// Filters can also be set directly in script
table.form.filters.role = 'admin';
</script>
```

Any modification to `filters` triggers `fetchData` and resets row selection so
the server and client remain in sync. Call `table.fetchData()` manually if you
need to dispatch a request on demand (for example after clicking a submit
button).

