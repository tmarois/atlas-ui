# Model Service

A base service class for Eloquent models that provides simple CRUD methods.
Consumers set the model class and may extend or override the methods as needed.
It also offers helpers for building filtered queries and returning paginated
results that play nicely with our [Inertia data table options](./inertia-data-table-options.md).

```php
use Atlas\Laravel\Services\ModelService;
use App\Models\User;

class UserService extends ModelService
{
    protected string $model = User::class;
}
```

```php
$service = new UserService();
$user = $service->create(['name' => 'Terry']);
$service->update($user, ['name' => 'Taylor']);
$service->listPaginated(15, [
    'search' => 'tay',
    'sortField' => 'name',
    'sortOrder' => -1,
]);
$service->delete($user);
```

## Available Methods

`ModelService` ships with a handful of helpers for common CRUD work:

- `query()` – get a new query builder for the model.
- `buildQuery(array $options = [])` – base query method you can extend.
- `list(array $columns = ['*'], array $options = [])` – retrieve all models.
- `listPaginated(int $perPage = 15, array $options = [])` – retrieve a paginated list.
- `find(int|string $id)` – locate a model by its primary key.
- `create(array $data)` – persist a new model.
- `update(Model $model, array $data)` – update an existing model.
- `delete(Model $model)` – remove a model from storage.

## Configuring the Service

You may override `configure` to prepare the service for different contexts.

### Static configuration

```php
class UserService extends ModelService
{
    protected function configure(): void
    {
        $this->model = User::class;
    }
}
```

### Contextual configuration

```php
use Illuminate\Database\Eloquent\Builder;

class TeamUserService extends ModelService
{
    public function __construct(protected int $teamId)
    {
        $this->configure();
    }

    protected function configure(): void
    {
        $this->model = User::class;
    }

    public function buildQuery(array $options = []): Builder
    {
        return parent::buildQuery($options)->where('team_id', $this->teamId);
    }
}
```

### Setting defaults

```php
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SortedUserService extends ModelService
{
    protected array $defaults = [
        'sortField' => 'name',
        'sortOrder' => 1,
    ];

    protected function configure(): void
    {
        $this->model = User::class;
    }

    public function listPaginated(int $perPage = 15, array $options = []): LengthAwarePaginator
    {
        $options = array_merge($this->defaults, $options);

        return parent::listPaginated($perPage, $options);
    }
}
```

## Customizing Queries

Override `buildQuery` in your service to push filter or search options into
the query builder. These options line up with the array returned from the
Inertia data table helpers, so the controller can simply forward them to the
service.

```php
use Illuminate\Database\Eloquent\Builder;

class UserService extends ModelService
{
    protected string $model = User::class;

    public function buildQuery(array $options = []): Builder
    {
        return parent::buildQuery($options)
            ->when($options['search'] ?? false, function ($q, $search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->when($options['filters']['user_id'] ?? null, function ($q, $userId) {
                $q->where('id', $userId);
            });
    }
}
```
