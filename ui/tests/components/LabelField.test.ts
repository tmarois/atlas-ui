import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import LabelField from '../../src/components/LabelField.vue';
import InputText from '../../src/components/InputText.vue';

const mountWithInput = (props: any = {}) =>
    mount(LabelField, {
        global: {
            plugins: [PrimeVue],
            components: { InputText },
        },
        props,
        slots: {
            default: '<InputText />',
        },
    });

describe('LabelField', () => {
    it('sets matching id and for attributes', async () => {
        const wrapper = mountWithInput({ label: 'Name', name: 'name' });
        const label = wrapper.find('label');
        const input = wrapper.find('input');
        expect(input.attributes('id')).toBe('name');
        expect(label.attributes('for')).toBe('name');
    });
});
