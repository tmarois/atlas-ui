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

    it('renders custom choose label', () => {
        const wrapper = mount(FileUpload, {
            props: { chooseLabel: 'Select' },
            global: { plugins: [PrimeVue] },
        });
        const button = wrapper.find('button');
        expect(button.text()).toBe('Select');
    });

    it('shows file name when one file selected', () => {
        const file = new File(['a'], 'a.txt', { type: 'text/plain' });
        const wrapper = mount(FileUpload, {
            props: { multiple: true, modelValue: [file] },
            global: { plugins: [PrimeVue] },
        });
        const label = wrapper.find('span.truncate');
        expect(label.text()).toBe('a.txt');
    });

    it('shows file count when multiple files selected', () => {
        const file1 = new File(['a'], 'a.txt', { type: 'text/plain' });
        const file2 = new File(['b'], 'b.txt', { type: 'text/plain' });
        const wrapper = mount(FileUpload, {
            props: { multiple: true, modelValue: [file1, file2] },
            global: { plugins: [PrimeVue] },
        });
        const label = wrapper.find('span.truncate');
        expect(label.text()).toBe('2 files selected');
    });

    it('truncates long file names without shrinking choose button', () => {
        const longName = 'a'.repeat(300) + '.txt';
        const file = new File(['a'], longName, { type: 'text/plain' });
        const wrapper = mount(FileUpload, {
            props: { clearable: true, modelValue: file },
            global: { plugins: [PrimeVue] },
        });
        const buttons = wrapper.findAll('button');
        expect(buttons[0].classes()).toContain('flex-shrink-0');
        const labelWrapper = wrapper.find('.relative.flex-1');
        expect(labelWrapper.classes()).toContain('min-w-0');
        const textDiv = labelWrapper.find('div');
        expect(textDiv.classes()).toContain('pr-8');
        const label = wrapper.find('span.truncate');
        expect(label.text()).toBe(longName);
    });
});
