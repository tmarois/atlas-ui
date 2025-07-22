/**
 * Tests to verify that all utility functions are properly exported
 */

// Mock dependencies for Vue utilities
jest.mock('tailwind-merge', () => ({
  twMerge: jest.fn((a, b) => [a, b].filter(Boolean).join(' '))
}));

jest.mock('vue', () => ({
  mergeProps: jest.fn((...args) => Object.assign({}, ...args))
}));

// Need to reset modules to pick up the mocks
jest.resetModules();

describe('Utility exports', () => {
  it('exports format utilities', () => {
    const utils = require('@/utils');

    // Format utilities
    expect(typeof utils.formatNumber).toBe('function');
    expect(typeof utils.formatToCurrency).toBe('function');
    expect(typeof utils.formatToDate).toBe('function');
    expect(typeof utils.formatToDatetime).toBe('function');
    expect(typeof utils.formatToSlug).toBe('function');
    expect(typeof utils.formatToValidURL).toBe('function');
    expect(typeof utils.formatPercentage).toBe('function');
    expect(typeof utils.formatBytes).toBe('function');
  });

  it('exports validation utilities', () => {
    const utils = require('@/utils');

    // Validation utilities
    expect(typeof utils.isValidURL).toBe('function');
    expect(typeof utils.isValidEmail).toBe('function');
    expect(typeof utils.isNumeric).toBe('function');
    expect(typeof utils.isEmpty).toBe('function');
  });

  it('exports environment utilities', () => {
    const utils = require('@/utils');

    // Environment utilities
    expect(typeof utils.isClient).toBe('boolean');
  });

  it('exports Vue utilities', () => {
    const utils = require('@/utils');

    // Vue utilities
    expect(typeof utils.ptViewMerge).toBe('function');
    expect(typeof utils.hasSlotContent).toBe('function');

    // Test basic functionality
    const emptyResult = utils.ptViewMerge();
    expect(emptyResult).toEqual({ class: undefined });

    const mergedResult = utils.ptViewMerge({ class: 'test' });
    expect(mergedResult.class).toBe('test');
  });
});
