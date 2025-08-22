<?php

namespace Atlas\Laravel\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Base service for Eloquent models providing simple CRUD methods.
 *
 * Extend this service and set the model class on the consumer side:
 *
 * ```php
 * class UserService extends ModelService
 * {
 *     protected string $model = User::class;
 * }
 * ```
 */
abstract class ModelService
{
    /**
     * The model class managed by the service.
     */
    protected string $model;

    /**
     * Get a new query builder for the model.
     */
    public function query(): Builder
    {
        return ($this->model)::query();
    }

    /**
     * Build a base query for the model. Override to apply filters.
     */
    public function buildQuery(array $options = []): Builder
    {
        return $this->query();
    }

    /**
     * Retrieve all models.
     */
    public function list(array $columns = ['*'], array $options = []): Collection
    {
        return $this->buildQuery($options)->get($columns);
    }

    /**
     * Retrieve a paginated list of models.
     */
    public function listPaginated(int $perPage = 15, array $options = []): LengthAwarePaginator
    {
        return $this->buildQuery($options)
            ->when($options['sortField'] ?? false, function ($q) use ($options) {
                $direction = ($options['sortOrder'] ?? 1) === 1 ? 'asc' : 'desc';
                return $q->orderBy($options['sortField'], $direction);
            })
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Find a model by primary key.
     */
    public function find(int|string $id): ?Model
    {
        return $this->query()->find($id);
    }

    /**
     * Create a new model instance.
     */
    public function create(array $data): Model
    {
        return $this->query()->create($data);
    }

    /**
     * Update the given model instance.
     */
    public function update(Model $model, array $data): Model
    {
        $model->update($data);

        return $model;
    }

    /**
     * Delete the given model instance.
     */
    public function delete(Model $model): bool
    {
        return (bool) $model->delete();
    }
}
