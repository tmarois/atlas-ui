import { describe, it, expect } from 'vitest';
import { formatPercentage } from '../../../src/utils/format/formatPercentage';

describe('formatPercentage', () => {
  // Happy path tests
  it('should format decimal to percentage with no decimal places by default', () => {
    expect(formatPercentage(0.25)).toBe('25%');
  });

  it('should format decimal to percentage with specified decimal places', () => {
    expect(formatPercentage(0.2568, 2)).toBe('25.68%');
  });

  it('should handle 0 correctly', () => {
    expect(formatPercentage(0)).toBe('0%');
  });

  it('should handle 1 (100%) correctly', () => {
    expect(formatPercentage(1)).toBe('100%');
  });

  it('should handle values greater than 1', () => {
    expect(formatPercentage(1.5, 1)).toBe('150.0%');
  });

  it('should handle negative percentages', () => {
    expect(formatPercentage(-0.25, 1)).toBe('-25.0%');
  });

  // Bad path tests
  it('should return empty string for null input', () => {
    expect(formatPercentage(null as unknown as number)).toBe('');
  });

  it('should return empty string for undefined input', () => {
    expect(formatPercentage(undefined as unknown as number)).toBe('');
  });

  it('should return empty string for NaN input', () => {
    expect(formatPercentage(NaN)).toBe('');
  });

  it('should handle very small numbers correctly', () => {
    expect(formatPercentage(0.000001, 6)).toBe('0.000100%');
  });

  it('should handle very large numbers correctly', () => {
    expect(formatPercentage(1000, 0)).toBe('100000%');
  });
});
