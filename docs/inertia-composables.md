# Atlas Inertia Composables Documentation

This document provides detailed documentation for the Inertia.js-specific composables available in the Atlas UI toolkit.

> **Important:** These composables require Inertia.js and cannot be used in projects that don't use Inertia.js.

## Table of Contents

- [Inertia Composables](#inertia-composables)
  - [useDataTableOptions](#usedatatableoptions)
  - [useFormSubmit](#useformsubmit)
  - [usePageProp](#usepageprop)

## Inertia Composables

These composables are designed specifically for use with Inertia.js applications.

### useDataTableOptions

A powerful composable for managing server-side data tables with sorting, filtering, and pagination.

```js
import { useDataTableOptions } from '@atlas/composables/inertia';

// In your setup function
const {
  search,
  perPage,
  sortField,
  sortOrder,
  filters,
  viewFields,
  selected,
  selectAll,
  fetchData,
  resetSelection,
  form
} = useDataTableOptions('users.index', {
  // Initial values
  search: '',
  perPage: 25,
  sortField: 'created_at',
  sortOrder: -1, // descending
  filters: { status: 'active' },
  viewFields: ['id', 'name', 'email']
}, {
  // Configuration options
  debounceMs: 350,
  preserveState: true,
  preserveScroll: true
});

// Manually trigger a data fetch
fetchData();

// Reset selected items
resetSelection();
```

**Parameters:**

- `routeConfig`: The route to fetch data from (string, route name, or object with name/params)
- `options`: Initial values for search, perPage, sortField, sortOrder, filters, and viewFields
- `config`: Configuration options for the data fetching behavior

**Configuration Options:**

- `only`: Array of Inertia partial reload keys (default: `[]`)
- `preserveState`: Preserve component state during navigation (default: `true`)
- `preserveScroll`: Maintain scroll position during navigation (default: `false`)
- `replace`: Replace current history entry instead of adding new one (default: `false`)
- `debounceMs`: Milliseconds to debounce search input (default: `250`)
- `formOptions`: Additional options to pass to the form/router (default: `{}`)
- `method`: HTTP method to use ('get' or 'post') (default: `'get'`)

**Available Methods and Properties:**

- `search`: Reactive ref for search term with debounced updates
- `perPage`: Reactive ref for items per page
- `sortField`: Reactive ref for the field to sort by
- `sortOrder`: Reactive ref for sort direction (1 for ascending, -1 for descending)
- `filters`: Reactive ref for filter criteria
- `viewFields`: Reactive ref for visible columns
- `selected`: Reactive ref for selected item IDs
- `selectAll`: Reactive ref for "select all" state
- `fetchData()`: Manually trigger a data fetch
- `resetSelection()`: Clear all selections
- `form`: Access to the underlying Inertia form object

**Selection Behavior:**

- Selected items are automatically reset when navigating to a different page
- Selected items are also reset when filters change

### useFormSubmit

A composable for submitting Inertia forms with enhanced functionality such as success/error handling and toast notifications.

```js
import { useFormSubmit } from '@atlas/composables/inertia';

// In your setup function
const form = useForm({
  name: '',
  email: '',
  password: ''
});

const { submit, isSubmitting, wasSuccessful } = useFormSubmit(form, {
  action: 'users.store',
  method: 'post',
  toasts: {
    success: 'User created successfully!',
    error: 'Failed to create user.'
  },
  onSuccess: (response) => {
    console.log('Form submitted successfully', response);
    // Additional success handling
  },
  onError: (errors) => {
    console.error('Form submission failed', errors);
    // Additional error handling
  }
});

// Submit the form
submit();
```

**Parameters:**

- `form`: An Inertia form object created with `useForm`
- `options`: Configuration options for the submission behavior

**Configuration Options:**

- `action`: Route to submit the form to (string, route name, or object with name/params)
- `method`: HTTP method to use ('post', 'put', 'patch', 'delete')
- `toasts`: Toast notification messages for success/error states
- `onSuccess`: Callback function to run on successful submission
- `onError`: Callback function to run when submission has errors
- `formOptions`: Additional options to pass to the form submission

**Available Methods and Properties:**

- `submit()`: Submit the form according to the configuration
- `isSubmitting`: Reactive ref indicating if the form is currently submitting
- `wasSuccessful`: Reactive ref indicating if the last submission was successful
- `reset()`: Reset the form to its initial state
- `setData(key, value)`: Set form data for a specific field

### usePageProp

A utility composable for easily accessing and tracking changes to specific Inertia page props.

```js
import { usePageProp } from '@atlas/composables/inertia';

// In your setup function
const user = usePageProp('user');
const settings = usePageProp('settings');
const count = usePageProp('stats.visitor_count');

// Access the values reactively
console.log(user.value.name);
console.log(settings.value.theme);
console.log(count.value);
```

**Parameters:**

- `prop`: The name of the page prop to access (supports dot notation for nested props)

**Returns:**

- A computed ref containing the requested page prop

**Features:**

- Automatically maintains reactivity when Inertia page props change
- Supports dot notation for accessing nested properties
- Returns `undefined` if the property doesn't exist
