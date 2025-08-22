# Inertia DataTable Options

The `InertiaDataTableOptions` trait helps controllers build datatable query options by combining defaults, request input, and optional session data. Filter values are type-cast using the `Caster` helper so they can be safely consumed by services and queries.

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

This pattern keeps controller methods lean while ensuring consistent datatable behavior across requests.

