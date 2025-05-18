# 🪐 Atlas

Atlas UI is a flexible, component-driven UI toolkit for Vue 3 projects, designed for clean integration with PrimeVue (Unstyled), TailwindCSS, Inertia.js, and composable architecture.

## 📚 Composables

### 👉 Composables

These composables can be used within any Vue3 / PrimeVue / Tailwindcss project.

| Composable             | Link                                                 | Description                                              |
|------------------------|------------------------------------------------------|----------------------------------------------------------|
| `useModal`             | [🔗](./src/composables/useModal.js)                                     | Reactive global modal manager                            |
| `useScroll`            | [🔗](./src/composables/useScroll.js)                                    | Reactive scroll tracking utility                         |
| `useTheme`             | [🔗](./src/composables/useTheme.js)                                     | Detects and manages light/dark mode                      |

### 👉 Composable (Inertia-only)

These composables require InertiaJs.

| Composable             | Link                                                 | Description                                              |
|------------------------|------------------------------------------------------|----------------------------------------------------------|
| `useDataTableOptions`  | [🔗](./src/composables/inertia/useDataTableOptions.js)                         | Reactive filters for server-driven pagination/sorting    |
| `useFormSubmit`        | [🔗](./src/composables/inertia/useFormSubmit.js)                                | Submits Inertia forms with hooks and toast support       |
| `usePageProp`          | [🔗](./src/composables/inertia/usePageProp.js)                                  | Extracts a single Inertia prop with reactivity           |

## 📚 Utilities

### 👉 Utils (Format)

Reusable format utilities available for any project.

| Utility Function       | Link                                                 | Description                                              |
|------------------------|------------------------------------------------------|----------------------------------------------------------|
| `formatNumber`         | [🔗](./src/utils/format.js)                                  | Format a number with commas and optional decimals        |
| `formatToCurrency`     | [🔗](./src/utils/format.js)                                    | Format number to currency (e.g. `$1,000`)                |
| `formatPercentage`     | [🔗](./src/utils/format.js)                                  | Convert a decimal to a percentage string                 |
| `formatBytes`          | [🔗](./src/utils/format.js)                                         | Convert byte count to KB/MB/GB string                    |
| `formatToDate`         | [🔗](./src/utils/format.js)                                       | Format UTC to local date string                          |
| `formatToDatetime`     | [🔗](./src/utils/format.js)                                    | Format UTC to local date + time string                   |
| `formatToSlug`         | [🔗](./src/utils/format.js)                                       | Slugify a string for use in URLs                         |
| `formatToValidURL`     | [🔗](./src/utils/format.js)                                 | Ensure a URL has http/https protocol                     |

### 👉 Utils (Validate)

Reusable validator utilities available for any project.

| Utility Function       | Link                                                 | Description                                              |
|------------------------|------------------------------------------------------|----------------------------------------------------------|
| `isValidURL`           | [🔗](./src/utils/validate.js)                                   | Validate a string as a valid HTTP/HTTPS URL              |
| `isValidEmail`         | [🔗](./src/utils/validate.js)                                  | Check if a string is a valid email                       |
| `isNumeric`            | [🔗](./src/utils/validate.js)                                     | Returns true if the value is a valid number              |
| `isEmpty`              | [🔗](./src/utils/validate.js)                                      | Checks if a value is empty (string, array, object)       |


---

## Install

```bash
npm install github:tmarois/atlas-ui#semver:^1.1
```

Peer dependencies:

```
"@tabler/icons-vue": "^3.31.0",
"primeicons": "^7.0.0",
"primevue": "^4.0.0",
"tailwind-merge": "^3.2.0",
"tailwindcss": "^4.1.4",
"tailwindcss-primeui": "^0.6.1",
"vue": "^3.4.0"
```

If using tiptap editor, install these:

```
"@tiptap/extension-bold": "^2.11.7",
"@tiptap/extension-bullet-list": "^2.11.7",
"@tiptap/extension-hard-break": "^2.11.7",
"@tiptap/extension-link": "^2.11.7",
"@tiptap/extension-list-item": "^2.11.7",
"@tiptap/extension-ordered-list": "^2.11.7",
"@tiptap/starter-kit": "^2.11.7",
"@tiptap/vue-3": "^2.11.7",
```

If using inertia composables make sure `@inertiajs/vue3` is installed.
