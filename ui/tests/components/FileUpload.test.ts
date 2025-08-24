import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import FileUpload from '../../src/components/FileUpload.vue';

describe('FileUpload', () => {
    it('emits selected file and clears', async () => {
        const wrapper = mount(FileUpload, {
            props: { clearable: true },
            global: { plugins: [PrimeVue] },
        });
        const input = wrapper.find('input[type="file"]');
        const file = new File(['test'], 'test.txt', { type: 'text/plain' });
        Object.defineProperty(input.element, 'files', {
            value: [file],
        });
        await input.trigger('change');
        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(file);
        await wrapper.setProps({ modelValue: file });
        const buttons = wrapper.findAll('button');
        await buttons[1].trigger('click');
        expect(wrapper.emitted('update:modelValue')?.[1]?.[0]).toBeNull();
    });
});
