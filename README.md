# 🪐 Atlas

Atlas UI is a flexible, component-driven UI toolkit for Vue 3 projects, designed for clean integration with PrimeVue (Unstyled), TailwindCSS, Inertia.js, and composable architecture.

## 📚 Composable Index (Inertia)

These composables require InertiaJs.

| Composable             | Link                                                 | Description                                              |
|------------------------|------------------------------------------------------|----------------------------------------------------------|
| `useDataTableOptions`  | [🔗](#-usedatatableoptions)                          | Reactive filters for server-driven pagination/sorting    |
| `useFormSubmit`        | [🔗](#-useformsubmit)                                | Submits Inertia forms with hooks and toast support       |
| `usePageProp`          | [🔗](#-usepageprop)                                  | Extracts a single Inertia prop with reactivity           |

## 📚 Composable Index (Framework Agnostic)

THese composables can be used within any Vue3 / PrimeVue / Tailwindcss project.

| Composable             | Link                                                 | Description                                              |
|------------------------|------------------------------------------------------|----------------------------------------------------------|
| `useModal`             | [🔗](#-usemodal)                                     | Reactive global modal manager                            |
| `useScroll`            | [🔗](#-usescroll)                                    | Reactive scroll tracking utility                         |
| `useTheme`             | [🔗](#-usetheme)                                     | Detects and manages light/dark mode                      |

## 📚 Utils Index – `format.js`

Reusable format utilities available for any project.

| Utility Function       | Link                                                 | Description                                              |
|------------------------|------------------------------------------------------|----------------------------------------------------------|
| `formatNumber`         | [🔗](#formatnumber)                                  | Format a number with commas and optional decimals        |
| `formatToCurrency`     | [🔗](#formattocurrency)                              | Format number to currency (e.g. `$1,000`)                |
| `formatPercentage`     | [🔗](#formatpercentage)                              | Convert a decimal to a percentage string                 |
| `formatBytes`          | [🔗](#formatbytes)                                   | Convert byte count to KB/MB/GB string                    |
| `formatToDate`         | [🔗](#formattodate)                                  | Format UTC to local date string                          |
| `formatToDatetime`     | [🔗](#formattodatetime)                              | Format UTC to local date + time string                   |
| `formatToSlug`         | [🔗](#formattoslug)                                  | Slugify a string for use in URLs                         |
| `formatToValidURL`     | [🔗](#formattovalidurl)                              | Ensure a URL has http/https protocol                     |

## 📚 Utils Index – `validate.js`

Reusable validator utilities available for any project.

| Utility Function       | Link                                                 | Description                                              |
|------------------------|------------------------------------------------------|----------------------------------------------------------|
| `isValidURL`           | [🔗](#isvalidurl)                                    | Validate a string as a valid HTTP/HTTPS URL              |
| `isValidEmail`         | [🔗](#isvalidemail)                                  | Check if a string is a valid email                       |
| `isNumeric`            | [🔗](#isnumeric)                                     | Returns true if the value is a valid number              |
| `isEmpty`              | [🔗](#isempty)                                       | Checks if a value is empty (string, array, object)       |


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
