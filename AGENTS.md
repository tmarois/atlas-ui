# Agent Instructions

Atlas UI is a collection of reusable Vue 3 UI components  
that consumers can drop into their own applications. This file summarizes the 
coding conventions, component documentation standards, and expectations for contributors.

## Where things live

- `src/`: reusable Vue 3 component library.
- `playground/`: Vite + Vue sandbox for manual UI testing.
- `docs/`: the documentation for the component library.

## Coding Guidelines

- Follow [docs/frontend-guide.md](docs/frontend-guide.md).
- Use the Composition API with `<script setup>` syntax.
- Order Vue SFC blocks as `<template>`, then `<script>`, then `<style>`.
- The `<template>` block is optional for script-only components but belongs at the top when present.
- Components are plain JavaScript by default; add `lang="ts"` only when TypeScript is required.
- Tailwind CSS classes handle most styling; place any additional rules in a `<style scoped>` block.
- Components are presentational; extract logic to composables or services.
- PascalCase components, camelCase composables and utils.

## Component Documentation Guidelines

Every UI component must have its own markdown file under `docs/ui/` using the following structure:

1. **Title & Description**
    - Start with `# ComponentName`
    - Add a one-sentence description of the component’s purpose. 
    - Include a minimal code snippet showing how to import this component.

2. **Usage**
    - Provide a `## Usage` section with the most common example of the component in action.

3. **API**
    - Create a `## API` section with these required subsections:
        - **### Props** — table listing each prop’s **Name**, **Type**, **Default**, and **Description**.
        - **### Slots** — table or list describing available slots and their purposes.
        - **### Events** — table describing emitted events and their payloads.
    - If none exist, explicitly state **“None.”**
    - End this section with a reference link to the corresponding **PrimeVue docs** if available.

4. **Consistency**
    - Always include **Props**, **Slots**, and **Events** subsections in that order.
    - Use consistent section names, formatting, and ordering across all component guides.

## Testing

- Run tests with `npm test`.
