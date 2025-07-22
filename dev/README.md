# Atlas UI Component Testing Environment

This directory contains a Vite-based testing environment for Atlas UI components. It's designed to help developers visually test components, especially for layout, dark mode, theming, and sizing.

## Purpose

The testing environment is separate from the main source code because it's only used for development and testing of Atlas UI components, not for distribution to third parties.

Key features:
- Visual testing of components with interactive controls
- Dark mode toggle to test appearance in both light and dark modes
- Component size testing
- Layout configuration testing
- Theming verification

## Getting Started

### Installation

The dependencies for the testing environment are included in the main project's package.json. Make sure you have installed all dependencies:

```bash
npm install
```

### Running the Testing Environment

To start the testing environment:

```bash
npm run dev
```

This will start a Vite development server and open the testing environment in your browser.

### Building the Testing Environment

If you need to build the testing environment for deployment:

```bash
npm run build:dev
```

## Adding New Test Components

To add a new test component:

1. Create a new Vue component in the `src/components/tests` directory
2. Import the component in `src/App.vue`
3. Add it to the `components` array in `src/App.vue`

Example:

```javascript
// In src/App.vue
import MyNewComponentTest from './components/tests/MyNewComponentTest.vue';

// Add to components array
const components = [
  {
    name: 'App Layout',
    component: AppLayoutTest,
    description: 'Test the App layout component with different configurations, dark mode, and sizing options.'
  },
  {
    name: 'My New Component',
    component: MyNewComponentTest,
    description: 'Description of what this test demonstrates.'
  }
];
```

## Best Practices for Test Components

When creating test components:

1. Include controls for all relevant props and configurations
2. Test both light and dark mode appearances
3. Test different sizes and responsive behaviors
4. Include examples of all slots and customization options
5. Provide clear descriptions of what's being tested

## Structure

- `index.html` - Entry point for the Vite application
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `src/main.js` - Main JavaScript file that initializes the Vue application
- `src/App.vue` - Main component that provides navigation between test components
- `src/style.css` - Global styles
- `src/components/tests/` - Directory containing test components

## Troubleshooting

If you encounter issues:

1. Make sure all dependencies are installed
2. Check for console errors in the browser
3. Verify that the component being tested is properly imported
4. Ensure the path aliases in vite.config.js are correct
