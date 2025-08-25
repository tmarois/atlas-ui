import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import InputText from '../../src/components/InputText.vue';

const mountWithPrime = (props: any = {}) =>
    mount(InputText, {
        global: { plugins: [PrimeVue] },
        props,
    });

describe('InputText', () => {
    it('hides clear button when disabled', async () => {
        const wrapper = mountWithPrime({ modelValue: 'test', clearable: true, disabled: true });
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
        expect(button.attributes('disabled')).not.toBeUndefined();
        expect(button.classes()).toContain('disabled:hidden');
        await button.trigger('click');
        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });
});
