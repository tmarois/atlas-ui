import { describe, it, expect } from 'vitest';
import { formatYmdDate } from '../../../src/utils/format/formatYmdDate';

describe('formatYmdDate', () => {
    it('converts YYYY-MM-DD to MM/DD/YYYY', () => {
        expect(formatYmdDate('2023-12-05')).toBe('12/05/2023');
    });

    it('returns empty string for invalid format', () => {
        expect(formatYmdDate('12-05-2023')).toBe('');
    });

    it('returns empty string for empty input', () => {
        expect(formatYmdDate('')).toBe('');
    });
});
