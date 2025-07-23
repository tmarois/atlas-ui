import { describe, it, expect } from 'vitest';
import { isEmpty } from '../../../src/utils/validate/isEmpty';

describe('isEmpty', () => {
  // True cases - these should be considered empty
  it('should return true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  // False cases - these should not be considered empty
  it('should return false for non-empty string', () => {
    expect(isEmpty('text')).toBe(false);
  });

  it('should return false for whitespace string', () => {
    expect(isEmpty(' ')).toBe(false);
  });

  it('should return false for zero', () => {
    expect(isEmpty(0)).toBe(false);
  });

  it('should return false for false boolean', () => {
    expect(isEmpty(false)).toBe(false);
  });

  it('should return false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it('should return false for non-empty object', () => {
    expect(isEmpty({ key: 'value' })).toBe(false);
  });
});
