# Atlas Composables Documentation

This document provides detailed documentation for the composables available in the Atlas UI toolkit.

## Table of Contents

- [General Composables](#general-composables)
  - [useModal](#usemodal)
  - [useScroll](#usescroll)
  - [useTheme](#usetheme)

## General Composables

These composables can be used in any Vue 3 application, regardless of whether it uses Inertia.js.

### useModal

A reactive global modal manager that provides a centralized way to control modals across your application.

```js
import { useModal } from '@atlas/composables';

// In your setup function
const { open, close, activeState, data, isOpen } = useModal();

// Open a modal with optional data
open('confirmationModal', { message: 'Are you sure?' });

// Close a specific modal
close('confirmationModal');

// Get a reactive state for a specific modal
const isModalActive = activeState('confirmationModal');

// Access data passed to the modal
const modalData = data('confirmationModal');

// Check if any modal is currently open
console.log(isOpen.value);
```

**Available Methods and Properties:**

- `open(name, data = null)`: Opens a modal with the specified name and optional data
- `close(name)`: Closes the modal with the specified name
- `closeAll()`: Closes all open modals
- `activeState(name)`: Returns a computed ref that can be used to get/set the open state
- `data(name)`: Returns a computed ref with the data passed to the modal
- `isOpen`: Computed ref that returns true if any modal is open
- `onOpen(name, callback)`: Register a callback to be called when a modal opens
- `onClose(name, callback)`: Register a callback to be called when a modal closes

### useScroll

Manages scroll-related functionality, such as detecting scroll position and locking/unlocking scroll behavior.

```js
import { useScroll } from '@atlas/composables';

// In your setup function with a unique ID
const { isTop, bindScrollHandler, lockScroll, unlockScroll } = useScroll('myComponent');

// In onMounted
onMounted(() => {
  const handler = bindScrollHandler(elementRef);
  handler.add();

  // Don't forget to remove on unmount
  onUnmounted(() => handler.remove());
});

// Lock scrolling (for modals, etc.)
lockScroll();

// Unlock scrolling
unlockScroll();

// Check if at the top of the scrollable area
console.log(isTop.value);
```

**Available Methods and Properties:**

- `isTop`: Computed ref that returns true if the scroll position is at the top
- `setTop(value)`: Sets the isTop state manually
- `bindScrollHandler(elementRef)`: Binds scroll events to the provided element reference
  - Returns `{ add, remove }` methods to start and stop listening
- `lockScroll()`: Prevents scrolling on the document
- `unlockScroll()`: Re-enables scrolling on the document

### useTheme

Detects and manages light/dark mode preference with system theme detection.

```js
import { useTheme } from '@atlas/composables';

// In your setup function
const { isDark, toggleDark, setDark, auto, initTheme } = useTheme();

// Toggle between light and dark mode
toggleDark();

// Explicitly set to dark mode
setDark(true);

// Explicitly set to light mode
setDark(false);

// Check if dark mode is active
console.log(isDark.value);

// Check if theme matches system preference
console.log(auto.value);
```

**Available Methods and Properties:**

- `isDark`: Computed ref that returns true if dark mode is active
- `dark`: Reactive ref holding the current dark mode state
- `auto`: Reactive ref indicating if the theme matches system preference
- `setDark(value)`: Sets dark mode on/off
- `toggleDark()`: Toggles between light and dark mode
- `initTheme()`: Initializes the theme based on current settings or system preference
