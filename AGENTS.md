# Agent Instructions

Welcome to the **Atlas** monorepo. This file provides high-level guidance for contributors.
It will grow as the project evolves.

All contributions must follow the architecture and coding conventions outlined in the guides below.

## Where things live
- `laravel/`: base Laravel framework package.
- `ui/`: reusable Vue 3 UI components.
- `docs/`: architecture and convention references.

## Conventions
- Adhere to the architecture and coding standards in [docs/backend-guide.md](docs/backend-guide.md).
- Front-end architecture and patterns are covered in [docs/frontend-guide.md](docs/frontend-guide.md).
- UI docs:
  - [Composables](docs/ui/composables.md)
  - [Utils](docs/ui/utils.md)

## Testing
- Run front-end tests with `npm test` inside `ui/`.
- Run Laravel package tests with `composer test` inside `laravel/`.

## Pull requests
- Keep commits focused and reference relevant documentation when introducing new patterns.
- Update this file and other docs as conventions evolve.
