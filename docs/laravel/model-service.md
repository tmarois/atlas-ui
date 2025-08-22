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
