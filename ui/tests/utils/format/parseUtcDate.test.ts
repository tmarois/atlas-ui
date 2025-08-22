import { describe, it, expect } from 'vitest';
import { parseUtcDate } from '../../../src/utils/format/parseUtcDate';

describe('parseUtcDate', () => {
    it('should parse an ISO string without Z suffix', () => {
        const date = parseUtcDate('2023-01-15T14:30:00');
        expect(date).toBeInstanceOf(Date);
        expect(date?.toISOString()).toBe('2023-01-15T14:30:00.000Z');
    });

    it('should parse an ISO string with Z suffix', () => {
        const date = parseUtcDate('2023-02-20T10:15:00Z');
        expect(date).toBeInstanceOf(Date);
        expect(date?.toISOString()).toBe('2023-02-20T10:15:00.000Z');
    });

    it('should return the same Date instance', () => {
        const original = new Date('2023-03-10T18:45:00Z');
        const parsed = parseUtcDate(original);
        expect(parsed).toBe(original);
    });

    it('should return null for invalid input', () => {
        expect(parseUtcDate('not-a-date')).toBeNull();
    });

    it('should return null for nullish input', () => {
        expect(parseUtcDate(null as unknown as string)).toBeNull();
        expect(parseUtcDate(undefined as unknown as string)).toBeNull();
    });
});

