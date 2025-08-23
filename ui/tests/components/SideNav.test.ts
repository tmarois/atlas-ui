import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PageSideNav from '../../src/components/App/Page/SideNav.vue';

vi.mock('@inertiajs/vue3', () => ({
    usePage: () => ({ url: '/' })
}));

describe('PageSideNav', () => {
    it('renders disabled items', () => {
        const wrapper = mount(PageSideNav, {
            props: {
                items: [
                    { label: 'Billing', href: '/billing', disabled: true }
                ]
            }
        });
        const link = wrapper.find('a');
        expect(link.classes()).toContain('opacity-50');
        expect(link.classes()).toContain('cursor-not-allowed');
    });
});
