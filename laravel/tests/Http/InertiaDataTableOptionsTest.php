<?php

namespace Atlas\Laravel\Tests\Http;

use Atlas\Laravel\Http\Concerns\InertiaDataTableOptions;
use Illuminate\Http\Request;
use Orchestra\Testbench\TestCase;

class InertiaDataTableOptionsTest extends TestCase
{
    public function test_resolves_options_with_session_and_casts(): void
    {
        session()->put('options.users.index', [
            'search' => 'bar',
            'filters' => ['count' => '2'],
            'perPage' => '10',
            'sortField' => 'email',
            'sortOrder' => '-1',
        ]);

        $request = Request::create('/users', 'GET', [
            'filters' => ['count' => '5', 'active' => '1'],
        ]);

        $controller = new class {
            use InertiaDataTableOptions;

            protected array $indexDefaults = [
                'filters' => ['active' => false],
            ];

            public array $filterCasts = [
                'count' => 'int',
                'active' => 'bool',
            ];
        };

        $options = $controller->resolveIndexOptions($request, true, 'users.index');

        $this->assertSame('bar', $options['search']);
        $this->assertSame(['count' => 5, 'active' => true], $options['filters']);
        $this->assertSame(10, $options['perPage']);
        $this->assertSame('email', $options['sortField']);
        $this->assertSame(-1, $options['sortOrder']);
    }

    public function test_stores_session_data_on_post(): void
    {
        $request = Request::create('/users', 'POST', [
            'search' => 'foo',
            'filters' => ['count' => '3'],
            'perPage' => '25',
            'sortField' => 'name',
            'sortOrder' => '1',
        ]);

        $controller = new class {
            use InertiaDataTableOptions;
        };

        $payload = $controller->resolveIndexOptions($request, true, 'users.index');

        $this->assertSame('foo', $payload['search']);
        $this->assertSame(['count' => '3'], $payload['filters']);
        $this->assertSame('25', $payload['perPage']);
        $this->assertSame('name', $payload['sortField']);
        $this->assertSame('1', $payload['sortOrder']);

        $this->assertSame($payload, session('options.users.index'));
    }
}

