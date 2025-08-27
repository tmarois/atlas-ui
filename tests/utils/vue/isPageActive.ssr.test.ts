import { describe, it, expect, vi } from 'vitest';

vi.mock('@inertiajs/vue3', () => ({
    usePage: () => ({ url: '/users' }),
}));

vi.mock('../../../src/utils/browser', () => ({ isClient: false }));

import { isPageActive } from '../../../src/utils';

describe('isPageActive - SSR', () => {
    it('returns false when not running on the client', () => {
        expect(isPageActive('/users')).toBe(false);
    });
});
