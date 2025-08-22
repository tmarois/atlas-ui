import { describe, it, expect } from 'vitest';
import { getRandomItem } from '../../src/utils';

describe('getRandomItem', () => {
    it('returns an item from the array', () => {
        const items = [1, 2, 3, 4, 5];
        const result = getRandomItem(items);
        expect(items).toContain(result);
    });

    it('returns undefined for an empty array', () => {
        expect(getRandomItem([])).toBeUndefined();
    });
});
