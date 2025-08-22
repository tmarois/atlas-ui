# Support Helpers

Atlas Laravel ships with small utility classes under the `Atlas\Laravel\Support` namespace.

## PhoneNumber

Format and normalize US phone numbers.

```php
use Atlas\Laravel\Support\PhoneNumber;

PhoneNumber::format('1234567890'); // (123) 456-7890
PhoneNumber::normalize('+1 (123) 456-7890'); // 1234567890
```

## Caster

Cast simple data arrays using type definitions.

```php
use Atlas\Laravel\Support\Caster;

$data = ['count' => '1', 'active' => '1'];
$casts = ['count' => 'int', 'active' => 'bool'];

$cast = Caster::cast($data, $casts);
// ['count' => 1, 'active' => true]
```

These helpers are designed to be lightweight and framework agnostic, making them easy to reuse across projects.
