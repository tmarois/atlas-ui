import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import { Button } from '../../src/components';

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
        expect(wrapper.find('.pi-spinner').exists()).toBe(true);
    });
});
