# Project Conventions

This document defines the naming, structure, and formatting conventions that all developers must follow. These standards exist to ensure the codebase is readable, predictable, and easy to navigate across the entire team.

Conventions are not suggestions. They are enforced during code review and must be followed in all feature and bugfix work.

---

## Class Naming

### Models
- Singular, PascalCase.
- Must match the corresponding table name convention (snake_case, plural).
- Example: `User`, `InvoiceItem`, `ContactLead`.

### Controllers
- PascalCase with suffix `Controller`.
- Example: `UserController`, `AuthController`.

### Services
- PascalCase with suffix `Service`.
- Example: `SubscriptionService`, `ImportService`.

### Jobs
- PascalCase with verb/action suffix like `Job`.
- Example: `SendEmailJob`, `ImportCsvJob`.

### Form Requests
- PascalCase with `Request` suffix.
- Example: `StoreUserRequest`, `UpdateLeadRequest`.

### Resources
- PascalCase with `Resource` suffix.
- Example: `UserResource`, `ThreadMessageResource`.

### Enums
- PascalCase and clearly scoped.
- Example: `UserStatus`, `PaymentMethod`.

### Events
- PascalCase, past-tense, describes something that **has happened**.
- Example: `UserRegistered`, `InvoicePaid`.

### Listeners
- PascalCase, imperative, describes what the listener **does**.
- Example: `SendWelcomeEmail`, `SyncContactToCrm`.

### Notifications & Mailables
- PascalCase, descriptive. Suffixes like `Notification`, `Mail` only when necessary.
- Example: `PasswordResetNotification`, `WelcomeMail`.

---

## File & Folder Structure

- Every file must live in the correct folder as defined in [architecture.md](architecture.md).
- Services must be grouped by domain if needed (e.g. `Services/Users/UserService.php`).
- No flat "god folders" (e.g., `Services/`, `Jobs/`) if domain contexts exist.

### Events & Listeners

- Events must live in `App/Events/{Domain}/`.
- Listeners must live in `App/Listeners/{Domain}/`.
- Both must be grouped by domain or feature (e.g., `User/`, `Billing/`, `Auth/`).
- Events must contain no logic — only data.
- Listeners must only handle **side effects** (emails, logs, notifications). They must not trigger other workflows or mutate domain state directly.

---

## Variable Naming

### General Rules
- Use `camelCase` for all variables, parameters, and method names.
- Use descriptive, intention-revealing names — no abbreviations unless industry-standard.

### Booleans
- Prefix with `is`, `has`, `can`, `should`, or `needs`.
- Example: `isAdmin`, `hasAccess`, `canEdit`, `shouldQueue`.

### Collections
- Use plural nouns for arrays and collections.
- Example: `$users`, `$invoices`, `$notifications`.

### Constants
- UPPER_SNAKE_CASE.
- Example: `MAX_RETRIES`, `DEFAULT_TIMEOUT`.

---

## Database Naming

- Tables: `snake_case`, plural.
    - Example: `users`, `invoice_items`, `password_resets`.
- Columns: `snake_case`, singular.
    - Use `*_id` for foreign keys (no constraints unless explicitly defined).
    - Use `created_at`, `updated_at` for timestamps.
- Enum values: `snake_case` strings or native enums if supported.
- Boolean columns: prefixed with `is_`, `has_`, `can_`.
    - Example: `is_active`, `has_error`, `can_login`.

---

## Method Naming

- Method names must be action-oriented and intention-revealing.
- Example: `sendInvoice()`, `updateSubscription()`, `syncContacts()`.

### CRUD naming for services:
- `create`, `update`, `delete`, `restore`, `list`, `find`, `sync`, `validate`, `resolve`, `dispatch`.

### Events/State/Status methods:
- `markAsPaid()`, `setActive()`, `deactivate()`, `archive()`.

---

## Configuration & Environment

- All API keys and tokens must be stored in `.env` and accessed via `config/services.php`.
- Never use `env()` outside of `config/` files.
- All third-party service credentials should be namespaced under their own config key.

---

## Exception & Error Handling

- Always throw custom exceptions when representing a domain error.
- Never use `abort()` in services.
- All exceptions must be type-safe and traceable through the stack.

---

## Formatting

- PSR-12 formatting is enforced via Laravel Pint.
- Imports must be ordered: classes, then functions, then constants.
- No trailing commas on single-line arrays or function calls.
- Always use short array syntax: `[]`, not `array()`.

---

## Language & Terminology

- Use consistent domain language throughout the app.
- Prefer real-world nouns/verbs over technical or implementation-based names.
- Example: use `lead`, `contact`, `campaign` — not `userTag`, `dataBlob`, `genericObject`.
