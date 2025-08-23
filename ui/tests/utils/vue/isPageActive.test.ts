import { describe, it, expect, vi } from 'vitest';

let mockUrl = '/users/1';
vi.mock('@inertiajs/vue3', () => ({
    usePage: () => ({ url: mockUrl })
}));

import { isPageActive } from '../../../src/utils';

describe('isPageActive', () => {
    it('returns true when current path starts with route', () => {
        mockUrl = '/users/1';
        expect(isPageActive('/users')).toBe(true);
    });

    it('requires exact match when eq is true', () => {
        mockUrl = '/users';
        expect(isPageActive('/users', undefined, true)).toBe(true);
        mockUrl = '/users/1';
        expect(isPageActive('/users', undefined, true)).toBe(false);
    });

    it('uses parent path when provided', () => {
        mockUrl = '/users/1';
        expect(isPageActive('/child', '/users')).toBe(true);
    });

    it('returns false when paths do not match', () => {
        mockUrl = '/users';
        expect(isPageActive('/settings')).toBe(false);
    });
});
