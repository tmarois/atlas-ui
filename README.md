# Atlas

Atlas is designed for apps built with [Laravel](https://laravel.com), [Vue](https://vuejs.org), and [Inertia.js](https://inertiajs.com). It bundles a Laravel backend with a library of Vue components to help teams spin up dashboards quickly. Both sides can be used together or independently.

Atlas focuses on eliminating the repeated setup that comes with every new project. It delivers guidelines and battle-tested building blocks so you can ship web-based applications faster, whether you're working on a full-blown admin system or a small dashboard.

## Laravel

Our Laravel package handles the backend foundation and Inertia bridge. It includes tooling for:

- **DataTables** – build server-driven options for dynamic tables.
- **Enums** – export PHP enums for type-safe usage in Vue.
- **Model Service** – base model service providing CRUD scaffolding.

**Documentation**

- [Backend Guide](docs/backend-guide.md)
- [Inertia DataTable Options](docs/laravel/inertia-data-table-options.md)
- [Enum Exporter](docs/laravel/enum-exporter.md)
- [Model Service](docs/laravel/model-service.md)
- [Support](docs/laravel/support.md)

## Vue

The front end centers on a reusable UI library powered by **Vue 3**, **PrimeVue 4**, and **Tailwind CSS 4**. It pairs naturally with Laravel through Inertia but can also slot into any Vue 3 application.

**Documentation**

- [Frontend Guide](docs/frontend-guide.md)
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
