# Atlas

Atlas is designed for apps built with [Laravel](https://laravel.com), [Vue](https://vuejs.org), and [Inertia.js](https://inertiajs.com). It bundles a Laravel backend with a library of Vue 3 components optimized for Inertia-driven dashboards. Those Vue components can also be used in standalone Vue applications without Laravel or Inertia.

This package bridges common pain points when maintaining projects and helps you avoid reinventing the wheel. It strives to provide guidelines and the basic essentials for building web-based applications—mostly around dashboards or admin systems—but it can be used for any web-based project.

## Laravel Vue Inertia Bridge

Atlas ships with tooling to bridge Laravel and Vue through Inertia, solving three common pain points:

- **DataTables** – build server-driven options for dynamic tables.
- **Enums** – export PHP enums for type-safe usage in Vue.
- **Model Service** – base model service providing CRUD scaffolding.

## Documentation

- [Backend Guide](docs/backend-guide.md)
- [Frontend Guide](docs/frontend-guide.md)
- Laravel
  - [Inertia DataTable Options](docs/laravel/inertia-data-table-options.md)
  - [Enum Exporter](docs/laravel/enum-exporter.md)
  - [Model Service](docs/laravel/model-service.md)
  - [Support](docs/laravel/support.md)
- UI
  - [Components](docs/ui.md)
  - [Composables](docs/ui/composables.md)
  - [Utils](docs/ui/utils.md)

## Contributing

See [AGENTS.md](AGENTS.md) for repository conventions, testing instructions, and pull request guidelines.

### Installing

- Install backend dependencies with `composer install` inside `laravel/`
- Install UI dependencies with `npm install` inside `ui/`

### Testing

- Run backend tests with `composer test` inside `laravel/`
- Run UI tests with `npm test` inside `ui/`

### Playground

A local Vite + Vue 3 sandbox lives in `playground/` for manually testing Atlas UI components during development. It's not part of the production packages. See [playground/README.md](playground/README.md) for setup and usage.
