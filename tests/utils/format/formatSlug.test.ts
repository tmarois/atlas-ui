import { describe, it, expect } from 'vitest';
import { formatSlug } from '../../../src/utils/format/formatSlug';

describe('formatSlug', () => {
    // Happy path tests
    it('should convert a string to lowercase', () => {
        expect(formatSlug('Hello')).toBe('hello');
    });

    it('should replace spaces with hyphens', () => {
        expect(formatSlug('hello world')).toBe('hello-world');
    });

    it('should replace multiple spaces with a single hyphen', () => {
        expect(formatSlug('hello  world')).toBe('hello-world');
    });

    it('should remove special characters', () => {
        expect(formatSlug('hello@world!')).toBe('hello-world');
    });

    it('should keep alphanumeric characters', () => {
        expect(formatSlug('hello123')).toBe('hello123');
    });

    it('should combine multiple modifications', () => {
        expect(formatSlug('Hello World! This is a Test')).toBe('hello-world-this-is-a-test');
    });

    it('should trim hyphens from beginning and end', () => {
        expect(formatSlug('-hello world-')).toBe('hello-world');
    });

    it('should handle URLs', () => {
        expect(formatSlug('https://example.com/path')).toBe('https-example-com-path');
    });

    // Bad path tests
    it('should return empty string for empty input', () => {
        expect(formatSlug('')).toBe('');
    });

    it('should return empty string for input with only special characters', () => {
        expect(formatSlug('@#$%^')).toBe('');
    });

    it('should handle null input by converting to string', () => {
        expect(formatSlug(null as unknown as string)).toBe('null');
    });

    it('should handle undefined input by converting to string', () => {
        expect(formatSlug(undefined as unknown as string)).toBe('undefined');
    });

    it('should handle numbers', () => {
        expect(formatSlug('123')).toBe('123');
    });

    it('should convert accented characters', () => {
        expect(formatSlug('café')).toBe('cafe');
    });
});
