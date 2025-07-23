import { describe, it, expect } from 'vitest';
import { formatValidURL } from '../../../src/utils/format/formatValidURL';

describe('formatValidURL', () => {
    // Happy path tests
    it('should add http:// to a domain', () => {
        expect(formatValidURL('example.com')).toBe('http://example.com');
    });

    it('should add https:// when https flag is true', () => {
        expect(formatValidURL('example.com', true)).toBe('https://example.com');
    });

    it('should leave valid http URLs unchanged when https is false', () => {
        expect(formatValidURL('http://example.com')).toBe('http://example.com');
    });

    it('should leave valid https URLs unchanged', () => {
        expect(formatValidURL('https://example.com', false)).toBe('https://example.com');
    });

    it('should convert http to https when https flag is true', () => {
        expect(formatValidURL('http://example.com', true)).toBe('https://example.com');
    });

    it('should trim whitespace', () => {
        expect(formatValidURL('  example.com  ')).toBe('http://example.com');
    });

    it('should convert to lowercase', () => {
        expect(formatValidURL('EXAMPLE.COM')).toBe('http://example.com');
    });

    it('should handle URLs with paths', () => {
        expect(formatValidURL('example.com/path/to/resource')).toBe('http://example.com/path/to/resource');
    });

    it('should handle URLs with query parameters', () => {
        expect(formatValidURL('example.com/search?q=test')).toBe('http://example.com/search?q=test');
    });

    // Bad path tests
    it('should return empty string for empty input', () => {
        expect(formatValidURL('')).toBe('');
    });

    it('should return empty string for null input', () => {
        expect(formatValidURL(null as unknown as string)).toBe('');
    });

    it('should return empty string for undefined input', () => {
        expect(formatValidURL(undefined as unknown as string)).toBe('');
    });

    it('should handle malformed URLs (without ensuring validity)', () => {
        expect(formatValidURL('example.')).toBe('http://example.');
    });
});
