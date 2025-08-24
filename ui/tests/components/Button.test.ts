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

    it('ensures icon-only buttons are square across sizes', () => {
        const cases = [
            {
                props: { icon: 'pi pi-check' },
                classes: ['p-icon-only:w-10', 'p-icon-only:h-10', 'p-icon-only:p-0'],
            },
            {
                props: { size: 'small', icon: 'pi pi-check' },
                classes: ['p-small:p-icon-only:w-[34px]', 'p-small:p-icon-only:h-[34px]', 'p-icon-only:p-0'],
            },
            {
                props: { size: 'large', icon: 'pi pi-check' },
                classes: ['p-large:p-icon-only:w-12', 'p-large:p-icon-only:h-12', 'p-icon-only:p-0'],
            },
        ];

        cases.forEach(({ props, classes: expected }) => {
            const wrapper = mountWithPrime(props);
            const classes = wrapper.find('button').attributes('class');
            expected.forEach((c) => expect(classes).toContain(c));
        });
    });

    it('uses 40px default height', () => {
        const wrapper = mountWithPrime({ label: 'Test' });
        const classes = wrapper.find('button').attributes('class');
        expect(classes).toContain('py-[9px]');
        const labelClasses = wrapper.find('span').attributes('class');
        expect(labelClasses).toContain('leading-5');
    });
});
