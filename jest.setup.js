// Mock browser globals for node environment tests
global.window = global.window || undefined;
global.document = global.document || undefined;

// Mock dependencies that might cause issues
jest.mock('vue', () => ({
  mergeProps: (...args) => Object.assign({}, ...args)
}), { virtual: true });

jest.mock('tailwind-merge', () => ({
  twMerge: (a, b) => {
    if (!a && !b) return undefined;
    return [a, b].filter(Boolean).join(' ');
  }
}), { virtual: true });
