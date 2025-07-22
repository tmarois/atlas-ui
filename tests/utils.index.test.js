/**
 * Tests for isClient utility in index.js
 */

// Mock the vue and tailwind-merge dependencies to prevent loading issues
jest.mock('vue', () => ({}));
jest.mock('tailwind-merge', () => ({}));

describe('isClient', () => {
  // Reset modules before each test to ensure clean state
  beforeEach(() => {
    jest.resetModules();
  });

  it('provides a boolean value', () => {
    const { isClient } = require('@/utils');
    expect(typeof isClient).toBe('boolean');
  });

  it('is false in test environment', () => {
    const { isClient } = require('@/utils');
    // Since we're in Node.js test environment, isClient should be false
    expect(isClient).toBe(false);
  });

  it('returns false when window is undefined', () => {
    // Set up the test environment to simulate non-browser
    global.window = undefined;
    global.document = {};

    // Re-import to get updated value
    jest.resetModules();
    const { isClient } = require('@/utils');

    expect(isClient).toBe(false);
  });

  it('returns false when document is undefined', () => {
    // Set up the test environment to simulate non-browser
    global.window = {};
    global.document = undefined;

    // Re-import to get updated value
    jest.resetModules();
    const { isClient } = require('@/utils');

    expect(isClient).toBe(false);
  });
});
