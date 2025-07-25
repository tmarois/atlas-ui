# Project Architecture

This document defines the structure, boundaries, and design rules for this application. It exists to ensure the codebase remains modular, scalable, testable, and maintainable as it evolves. All developers are expected to understand and follow this architecture without exception.

## Philosophy

The application follows a layered service-oriented architecture. Business logic is isolated in service classes. Controllers act only as request coordinators. Models are used for data mapping and persistence, not behavior. Jobs are queued tasks with minimal logic. Every part of the application must respect its own responsibility and never reach across layers inappropriately.

## Project Structure

### Directories

    App/
    ├── Console/
    │   └── Commands/
    ├── Contracts/ 
    ├── Enums/
    ├── Exceptions/
    ├── Http/
    │   ├── Controllers/
    │   ├── Middleware/
    │   ├── Requests/
    │   └── Resources/
    ├── Jobs/
    ├── Models/
    ├── Notifications/
    ├── Events/
    ├── Listeners/
    ├── Providers/
    └── Services/

### `App/Console`

This contains the console kernel and configuration for scheduled tasks. It does not contain any logic beyond what Laravel requires to register and schedule commands.

### `App/Console/Commands`

CLI command classes live here. They are responsible for input/output, triggering jobs, or delegating to service classes. No business logic or data access should be placed directly in these commands.

### `App/Contracts`

All interfaces used for binding services, repositories, or third-party API clients are placed here. These interfaces enable dependency inversion. No logic or implementation lives in this directory.

### `App/Enums`

This directory holds PHP enums that represent fixed domain values such as statuses, types, or roles. Enums must only be used for clearly bounded values and should not encapsulate workflow logic.

### `App/Exceptions`

Custom exception classes live here. These are used to represent meaningful, application-specific failure cases. They must not contain business logic or side effects.

### `App/Events`

Events represent that something has already happened in the application. They are strictly data objects and must not contain any logic, model interaction, or side effects. Events are dispatched by services to signal state transitions, such as `UserRegistered` or `InvoicePaid`.

### `App/Http/Controllers`

Controllers are the entry point for web and API requests. Their only job is to delegate work to service classes, form requests, or jobs. Controllers must never contain any business rules, database access, or conditional behavior beyond routing.

### `App/Http/Middleware`

Middleware operates at the request level to filter, modify, or authorize requests. It must not perform domain actions, business logic, or data access. Middleware is meant for request concerns like headers, auth, throttling, and content-type handling.

### `App/Http/Requests`

Form request classes centralize validation and authorization. All validation must be placed here — not in controllers or services. These classes are also the only place where validation rules, custom rule objects, and authorization checks should live.

### `App/Http/Resources`

This layer is responsible for transforming data for frontend or API consumers. Resources must not access the database or contain side effects. They are serialization-only and should never mutate state or trigger behavior.

### `App/Jobs`

Jobs encapsulate deferred tasks to be executed asynchronously. Jobs are expected to be small and focused. They are allowed to invoke service classes but must not contain business rules themselves.

### `App/Listeners`

Listeners handle passive side effects in response to events. They may send notifications, write to logs, or call external systems — but they must not mutate core application state, perform business decisions, or dispatch additional events. Complex side effects should be offloaded to jobs or services.

### `App/Models`

Eloquent models define the data schema, relationships, accessors, mutators, and scopes. They represent data structures only. Models must never contain behavior that spans domains, perform actions like sending notifications, or invoke services.

### `App/Notifications`

This directory contains notification classes responsible for formatting and delivering messages via email, Slack, or other channels. Notifications must be passive and never perform side effects or contain business rules. Triggering notifications must be handled in service classes.

### `App/Providers`

Service providers handle application bootstrapping, such as binding interfaces, loading routes, or registering observers. Providers must not contain domain logic or workflow behavior.

### `App/Services`

All business logic in the application must be placed in service classes. Services coordinate models, jobs, APIs, notifications, and business decisions. No other layer is allowed to contain this logic. Services must be small, composable, and testable. A service should represent a clear business use case or workflow, such as "register user", "send invoice", or "process webhook". Services may depend on other services, interfaces, or helpers, but must not access HTTP request data or render responses.

### `App/Support`

Support classes contain reusable, stateless utility logic such as formatters, string manipulation, or time calculations. Support classes may use static methods or act as injected helpers. They must not contain application state, service calls, or domain-specific behavior. Their only purpose is to assist other layers with general-purpose logic.

## Boundaries and Discipline

The success of this architecture depends on discipline. Controllers must not contain logic. Services must not contain view code. Models must not trigger workflows. Utilities must not evolve into service containers. The boundaries between layers must be clear and strictly enforced.

Every developer on the team is responsible for keeping these boundaries intact. This is not a guideline — it is the architecture.
