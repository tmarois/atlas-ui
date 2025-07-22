# 🪐 Atlas

Atlas UI is a flexible, component-driven UI toolkit for Vue 3 projects, designed for clean integration with PrimeVue (Unstyled), TailwindCSS, Inertia.js, and composable architecture.

## 📚 Documentation

### Composables

- [General Composables](./docs/composables.md) - Vue 3 composables for any project
  - `useModal` - Reactive global modal manager
  - `useScroll` - Reactive scroll tracking utility
  - `useTheme` - Detects and manages light/dark mode

- [Inertia Composables](./docs/inertia-composables.md) - Inertia.js-specific composables
  - `useDataTableOptions` - Server-driven pagination/sorting
  - `useFormSubmit` - Form submission with hooks
  - `usePageProp` - Access Inertia page props

### Utilities

- [Format Utilities](./docs/utils.md#format-utilities) - Format data for display
- [Validation Utilities](./docs/utils.md#validation-utilities) - Validate inputs
- [Environment Utilities](./docs/utils.md#environment-utilities) - Environment detection


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
"vue": "^3.4.0",
"vuedraggable": "^4.1.0"
```

If using tiptap editor, install these:

```
"@tiptap/extension-placeholder": "^2.12.0",
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

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run eslint
```
