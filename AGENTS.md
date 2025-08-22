# Agent Instructions

Welcome to the **Atlas** monorepo. This file provides high-level guidance for contributors.
It will grow as the project evolves.

## Where things live
- `laravel/`: base Laravel framework package.
- `ui/`: reusable Vue 3 UI components.
- `docs/`: architecture and convention references.

## Conventions
- Follow the naming, structure, and formatting rules in [docs/conventions.md](docs/conventions.md).
- Review overall application structure in [docs/architecture.md](docs/architecture.md).
- Front-end specific patterns are described in [docs/frontend-architecture.md](docs/frontend-architecture.md) and the UI notes
  in [docs/ui/](docs/ui).

## Testing
- Run front-end tests with `npm test` inside `ui/`.
- The Laravel package currently has no automated tests; manually verify changes.

## Pull requests
- Keep commits focused and reference relevant documentation when introducing new patterns.
- Update this file and other docs as conventions evolve.

