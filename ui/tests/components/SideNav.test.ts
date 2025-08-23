import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PageSideNav from '../../src/components/App/Page/SideNav.vue';
import { IconLock } from '@tabler/icons-vue';

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
            },
            global: {
                directives: { tooltip: vi.fn() }
            }
        });
        const link = wrapper.find('a');
        expect(link.classes()).toContain('opacity-50');
        expect(link.classes()).toContain('cursor-not-allowed');
    });

    it('shows lock icon when lockTooltipText provided', () => {
        const wrapper = mount(PageSideNav, {
            props: {
                items: [
                    { label: 'Billing', href: '/billing', disabled: true, lockTooltipText: 'Locked' }
                ]
            },
            global: {
                directives: { tooltip: vi.fn() }
            }
        });
        expect(wrapper.findComponent(IconLock).exists()).toBe(true);
    });
});
