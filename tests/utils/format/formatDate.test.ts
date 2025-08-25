import { describe, it, expect } from 'vitest';
import { formatDate } from '../../../src/utils/format/formatDate';

describe('formatDate', () => {
    // Happy path tests
    it('should format a valid ISO date string', () => {
        const result = formatDate('2023-01-15T14:30:00');
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    it('should format an ISO date string with Z suffix', () => {
        const result = formatDate('2023-02-20T10:15:00Z');
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    it('should use the provided timezone', () => {
        const result = formatDate('2023-03-10T18:45:00', 'America/New_York');
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    it('should use the provided locale', () => {
        const result = formatDate('2023-04-05T14:30:00', 'UTC', 'fr-FR');
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty string for empty string', () => {
        expect(formatDate('')).toBe('');
    });

    it('should return "Invalid date" for invalid date string', () => {
        expect(formatDate('not-a-date')).toBe('');
    });

    it('should return empty string for empty string', () => {
        expect(formatDate('')).toBe('');
    });

    it('should return empty string for invalid date string', () => {
        expect(formatDate('not-a-date')).toBe('');
    });

    it('should pad single-digit days and months with zeros', () => {
        const date = new Date(2023, 0, 5); // Jan 5, 2023
        expect(formatDate(date)).toBe('1/5/2023');
    });
});
