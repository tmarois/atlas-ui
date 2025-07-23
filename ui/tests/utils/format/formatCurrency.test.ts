import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../../../src/utils/format/formatCurrency';

describe('formatCurrency', () => {
  // Happy path tests
  it('should format number as USD by default', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  it('should format with custom decimals', () => {
    expect(formatCurrency(1000, 0)).toBe('$1,000');
  });

  it('should format with specified currency', () => {
    expect(formatCurrency(1000, 2, 'EUR')).toBe('€1,000.00');
  });

  it('should handle string numbers', () => {
    expect(formatCurrency('1234.56')).toBe('$1,234.56');
  });

  it('should handle negative values', () => {
    expect(formatCurrency(-1000)).toBe('-$1,000.00');
  });

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should handle custom currency with decimals', () => {
    expect(formatCurrency(1234.5678, 3, 'JPY')).toBe('¥1,234.568');
  });

  // Bad path tests
  it('should return "Invalid" for non-numeric string', () => {
    expect(formatCurrency('abc')).toBe('Invalid');
  });

  it('should return custom invalid text when specified', () => {
    expect(formatCurrency('abc', 2, 'USD', 'N/A')).toBe('N/A');
  });

  it('should handle NaN input', () => {
    expect(formatCurrency(NaN)).toBe('Invalid');
  });

  it('should handle very large numbers', () => {
    expect(formatCurrency(1000000000)).toBe('$1,000,000,000.00');
  });

  it('should handle very small decimal values', () => {
    expect(formatCurrency(0.00123, 5)).toBe('$0.00123');
  });
});
