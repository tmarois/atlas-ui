import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../../src/components/App/Index.vue';

vi.mock('@inertiajs/vue3', () => ({
    usePage: () => ({ url: '/' })
}));

describe('App navigation classes', () => {
    it('passes side nav class props', () => {
        const wrapper = mount(App, {
            props: {
                pageUrl: '/',
                sideBarItems: [{ children: [{ label: 'Home', href: '/' }] }],
                hasToast: false,
                sideBarBackgroundClass: 'bg-red-500',
                sideBarActiveClass: 'text-blue-500'
            },
            global: {
                directives: { tooltip: vi.fn() }
            }
        });
        expect(wrapper.find('div.bg-red-500').exists()).toBe(true);
        const link = wrapper.findAll('a')[1];
        expect(link.classes()).toContain('text-blue-500');
    });

    it('passes top nav class props', () => {
        const wrapper = mount(App, {
            props: {
                pageUrl: '/',
                isSideNav: false,
                topBarItems: [{ label: 'Home', href: '/' }],
                hasToast: false,
                topBarBackgroundClass: 'bg-green-500',
                topBarActiveClass: 'text-orange-500'
            }
        });
        expect(wrapper.find('nav.bg-green-500').exists()).toBe(true);
        const link = wrapper.findAll('a')[1];
        expect(link.classes()).toContain('text-orange-500');
    });
});
