import { describe, it, expect } from 'vitest';
import { formatUSPhoneNumber } from '../../../src/utils/format/formatUSPhoneNumber';

describe('formatUSPhoneNumber', () => {
    // Happy path tests
    it('should format numeric phone number', () => {
        expect(formatUSPhoneNumber(1234567890)).toBe('(123) 456-7890');
    });

    it('should format string phone number', () => {
        expect(formatUSPhoneNumber('9876543210')).toBe('(987) 654-3210');
    });

    it('should include country code when requested', () => {
        expect(formatUSPhoneNumber('1234567890', true)).toBe('+1 (123) 456-7890');
    });

    it('should handle leading country code in input', () => {
        expect(formatUSPhoneNumber('19998887777')).toBe('(999) 888-7777');
    });

    it('should handle leading country code in input and output', () => {
        expect(formatUSPhoneNumber('19998887777', true)).toBe('+1 (999) 888-7777');
    });

    // Bad path tests
    it('should return empty string for invalid length', () => {
        expect(formatUSPhoneNumber('123')).toBe('');
    });

    it('should return empty string for empty input', () => {
        expect(formatUSPhoneNumber('')).toBe('');
    });
});
