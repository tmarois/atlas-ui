<?php

namespace Atlas\Laravel\Tests\Services;

use Atlas\Laravel\Services\ModelService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Orchestra\Testbench\TestCase;

class ModelServiceTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Schema::create('widgets', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
    }

    protected function getEnvironmentSetUp($app): void
    {
        $app['config']->set('database.default', 'testing');
        $app['config']->set('database.connections.testing', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
        ]);
    }

    public function test_performs_basic_crud_operations(): void
    {
        $service = new class extends ModelService {
            protected string $model = Widget::class;
        };

        $widget = $service->create(['name' => 'Alpha']);
        $this->assertSame('Alpha', $widget->name);
        $this->assertCount(1, $service->list());

        $found = $service->find($widget->id);
        $this->assertSame('Alpha', $found?->name);

        $service->update($widget, ['name' => 'Beta']);
        $this->assertSame('Beta', $service->find($widget->id)?->name);

        $service->delete($widget);
        $this->assertNull($service->find($widget->id));
    }

    public function test_list_paginated_and_build_query(): void
    {
        $service = new class extends ModelService {
            protected string $model = Widget::class;

            public function buildQuery(array $options = []): Builder
            {
                return parent::buildQuery($options)
                    ->when($options['filters']['name'] ?? null, function ($q, $name) {
                        $q->where('name', $name);
                    })
                    ->when($options['search'] ?? false, function ($q, $search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            }
        };

        $service->create(['name' => 'Alpha']);
        $service->create(['name' => 'Beta']);
        $service->create(['name' => 'Gamma']);

        $page = $service->listPaginated(2, [
            'search' => 'a',
            'sortField' => 'name',
            'sortOrder' => -1,
        ]);

        $this->assertInstanceOf(LengthAwarePaginator::class, $page);
        $this->assertSame(3, $page->total());
        $this->assertSame(['Gamma', 'Beta'], $page->pluck('name')->all());

        $filtered = $service->listPaginated(15, [
            'filters' => ['name' => 'Alpha'],
        ]);

        $this->assertSame(1, $filtered->total());
        $this->assertSame('Alpha', $filtered->first()->name);
    }
}

class Widget extends Model
{
    protected $guarded = [];

    protected $table = 'widgets';
}
