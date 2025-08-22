<?php

namespace Atlas\Laravel\Tests\Support;

use Atlas\Laravel\Support\Caster;
use PHPUnit\Framework\TestCase;

class CasterTest extends TestCase
{
    public function test_casts_values_to_defined_types(): void
    {
        $data = [
            'age' => '30',
            'price' => '9.99',
            'name' => 123,
            'active' => '1',
            'options' => '{"foo":"bar"}',
            'birthday' => '2024-01-01',
            'meta' => ['foo' => 'bar'],
            'invalidDate' => 'not-a-date',
            'invalidJson' => '{bad json',
        ];

        $casts = [
            'age' => 'int',
            'price' => 'float',
            'name' => 'string',
            'active' => 'bool',
            'options' => 'json',
            'birthday' => 'datetime',
            'meta' => 'json',
            'invalidDate' => 'datetime',
            'invalidJson' => 'json',
        ];

        $result = Caster::cast($data, $casts);

        $this->assertSame(30, $result['age']);
        $this->assertSame(9.99, $result['price']);
        $this->assertSame('123', $result['name']);
        $this->assertTrue($result['active']);
        $this->assertSame(['foo' => 'bar'], $result['options']);
        $this->assertInstanceOf(\DateTime::class, $result['birthday']);
        $this->assertSame(json_encode(['foo' => 'bar']), $result['meta']);
        $this->assertNull($result['invalidDate']);
        $this->assertNull($result['invalidJson']);
    }
}
