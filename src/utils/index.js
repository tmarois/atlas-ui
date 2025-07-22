/**
 * Determines if the current execution context is running in the browser (client-side).
 *
 * This is useful to safely access DOM-related APIs like `window` or `document` in
 * environments that support Server-Side Rendering (SSR), such as Nuxt or Laravel Inertia.
 *
 * @constant {boolean} isClient - `true` if running in the browser, otherwise `false`.
 */
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

// Import format and validation utilities
export * from './format.js';
export * from './validate.js';

// Import Vue utilities
const vueUtils = require('./vue.js');

// Export Vue utilities
export const ptViewMerge = vueUtils.ptViewMerge;
export const hasSlotContent = vueUtils.hasSlotContent;
