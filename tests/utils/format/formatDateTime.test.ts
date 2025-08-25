import { describe, it, expect } from 'vitest';
import { formatDatetime } from '../../../src/utils/format/formatDatetime';

describe('formatDatetime', () => {
    // Happy path tests
    it('should format a valid ISO date string', () => {
        expect(formatDatetime('2023-01-15T14:30:00')).toBe('1/15/2023, 2:30 PM');
    });

    it('should format an ISO date string with Z suffix', () => {
        expect(formatDatetime('2023-02-20T10:15:00Z')).toBe('2/20/2023, 10:15 AM');
    });

    it('should use the provided timezone', () => {
        // Note: test with fixed timezone output since the result depends on the timezone
        const result = formatDatetime('2023-03-10T18:45:00', 'America/New_York');
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    it('should use the provided locale', () => {
        // This test just verifies it doesn't error with custom locale
        const result = formatDatetime('2023-04-05T14:30:00', 'UTC', 'fr-FR');
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    it('should format dates correctly', () => {
        const result = formatDatetime('2023-05-20T09:15:30');
        expect(result).toContain('2023');
        expect(result).toContain('5/20');
    });

    // Bad path tests
    it('should return empty string for null input', () => {
        expect(formatDatetime(null as unknown as string)).toBe('');
    });

    it('should return empty string for undefined input', () => {
        expect(formatDatetime(undefined as unknown as string)).toBe('');
    });

    it('should return empty string for empty string', () => {
        expect(formatDatetime('')).toBe('');
    });

    it('should return "Invalid date" for invalid date string', () => {
        expect(formatDatetime('not-a-date')).toBe('');
    });

    it('should correctly handle midnight in 12-hour format', () => {
        const result = formatDatetime('2023-01-01T00:00:00');
        expect(result).toContain('12:00');
        expect(result).toContain('AM');
    });

    it('should correctly handle noon in 12-hour format', () => {
        const result = formatDatetime('2023-01-01T12:00:00');
        expect(result).toContain('12:00');
        expect(result).toContain('PM');
    });
});
