import { describe, it, expect } from 'vitest';
import { roundTo } from '../../src/utils';

describe('roundTo', () => {
    it('rounds to the specified number of decimals', () => {
        expect(roundTo(1.005, 2)).toBe(1.01);
        expect(roundTo(1.2345, 3)).toBe(1.235);
    });

    it('defaults to two decimals', () => {
        expect(roundTo(1.2345)).toBe(1.23);
    });

    it('handles zero decimals', () => {
        expect(roundTo(10.49, 0)).toBe(10);
    });
});
