import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Button from '../../src/components/Button.vue';

const mountWithPrime = (props: any = {}) =>
    mount(Button, {
        global: { plugins: [PrimeVue] },
        props,
    });

describe('Button', () => {
    it('shows loading state', () => {
        const wrapper = mountWithPrime({ loading: true });
        const button = wrapper.find('button');
        expect(button.attributes('disabled')).not.toBeUndefined();
        expect(wrapper.find('.p-icon-spin').exists()).toBe(true);
    });

    it('applies small size padding', () => {
        const wrapper = mountWithPrime({ size: 'small' });
        const classes = wrapper.find('button').attributes('class');
        expect(classes).toContain('p-small:px-[0.625rem]');
        expect(classes).toContain('p-small:py-[0.375rem]');
    });

    it('uses 40px default height', () => {
        const wrapper = mountWithPrime({ label: 'Test' });
        const classes = wrapper.find('button').attributes('class');
        expect(classes).toContain('py-[9px]');
        const labelClasses = wrapper.find('span').attributes('class');
        expect(labelClasses).toContain('leading-5');
    });
});
