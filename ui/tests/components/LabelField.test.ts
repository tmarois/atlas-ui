import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import { nextTick } from 'vue';
import LabelField from '../../src/components/LabelField.vue';
import InputText from '../../src/components/InputText.vue';

const globalConfig = {
    plugins: [PrimeVue],
    components: { InputText },
};

describe('LabelField', () => {
    it('links label to existing input id', async () => {
        const wrapper = mount(LabelField, {
            global: globalConfig,
            props: { label: 'Email' },
            slots: { default: '<InputText id="email" />' },
        });

        await nextTick();

        const label = wrapper.find('label');
        const input = wrapper.find('input');
        expect(input.attributes('id')).toBe('email');
        expect(label.attributes('for')).toBe('email');
    });

    it('assigns name as id when input lacks id', async () => {
        const wrapper = mount(LabelField, {
            global: globalConfig,
            props: { label: 'Name', name: 'name' },
            slots: { default: '<InputText />' },
        });

        await nextTick();

        const label = wrapper.find('label');
        const input = wrapper.find('input');
        expect(input.attributes('id')).toBe('name');
        expect(label.attributes('for')).toBe('name');
    });
});
