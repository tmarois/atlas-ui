# Enum Exporter

Export Laravel PHP enums to your Vue application so both back and front end share the same enum definitions.

## Setup

Publish the config and review the export paths and format:

```bash
php artisan vendor:publish --tag=atlas-config
```

`config/atlas_enums.php` example:

```php
return [
    'enum_paths' => [
        base_path('app/Enums'),
    ],
    'output_path' => resource_path('js/enums'),
    'format' => 'ts', // or 'js'
    'banner' => '// AUTO-GENERATED FILE. Do not edit by hand.',
];
```

## Example

Define a PHP enum:

```php
namespace App\Enums;

enum UserStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
}
```

Run the exporter:

```bash
php artisan atlas:export-enums
```

The command generates files in `resources/js/enums` (configurable). For TypeScript the result looks like:

`resources/js/enums/UserStatus.ts`

```ts
export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}
```

An `index.ts` file is created to re-export all enums:

```ts
export { UserStatus } from './UserStatus';
```

## Vue Usage

Import the enums in your components:

```vue
<script setup lang="ts">
import { UserStatus } from '@/enums';

const status = ref(UserStatus.ACTIVE);
</script>
```

Now enum values stay in sync across Laravel and Vue with full IDE support.
