/**
 * @jest-environment jsdom
 */

// Mock the dependencies first
jest.mock('tailwind-merge', () => ({
  // Return undefined when both inputs are undefined/null
  twMerge: jest.fn((a, b) => {
    if (!a && !b) return undefined;
    return [a, b].filter(Boolean).join(' ');
  })
}));

jest.mock('vue', () => ({
  mergeProps: jest.fn((...args) => Object.assign({}, ...args))
}));

// Import Vue utilities directly from the module
const vueUtils = require('../src/utils/vue.js');
const { ptViewMerge, hasSlotContent } = vueUtils;

describe('ptViewMerge', () => {
  it('merges global and self PT props correctly', () => {
    const result = ptViewMerge(
      { class: 'global-class', globalProp: 'value' },
      { class: 'self-class', selfProp: 'value' },
      { dataAttr: 'value' }
    );

    expect(result).toEqual({
      class: 'global-class self-class',
      globalProp: 'value',
      selfProp: 'value',
      dataAttr: 'value'
    });
  });

  it('handles empty props', () => {
    const result = ptViewMerge();
    expect(result).toEqual({ class: undefined });
  });

  it('handles missing classes', () => {
    const result = ptViewMerge({ prop: 'value' }, { anotherProp: 'value' }, {});
    expect(result).toEqual({
      class: undefined,
      prop: 'value',
      anotherProp: 'value'
    });
  });
});

describe('hasSlotContent', () => {
  it('returns false for undefined slot', () => {
    expect(hasSlotContent(undefined)).toBe(false);
  });

  it('returns false for empty slot content', () => {
    const mockSlot = jest.fn(() => []);
    expect(hasSlotContent(mockSlot)).toBe(false);
  });

  it('returns false if slot content has no valid nodes', () => {
    const mockSlot = jest.fn(() => [{ type: 'string', children: '' }]);
    expect(hasSlotContent(mockSlot)).toBe(false);
  });

  it('returns true if slot has object type nodes', () => {
    const mockSlot = jest.fn(() => [
      { type: {}, children: '' }
    ]);
    expect(hasSlotContent(mockSlot)).toBe(true);
  });

  it('returns true if slot has nodes with non-empty children', () => {
    const mockSlot = jest.fn(() => [
      { type: 'string', children: 'content' }
    ]);
    expect(hasSlotContent(mockSlot)).toBe(true);
  });
});
