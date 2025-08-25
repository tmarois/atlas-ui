import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Alert from '../../src/components/Alert.vue';
import Button from '../../src/components/Button.vue';
import Card from '../../src/components/Card.vue';
import Checkbox from '../../src/components/Checkbox.vue';
import InputMask from '../../src/components/InputMask.vue';
import InputNumber from '../../src/components/InputNumber.vue';
import InputText from '../../src/components/InputText.vue';
import Select from '../../src/components/Select.vue';
import Textarea from '../../src/components/Textarea.vue';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: () => ({
        matches: false,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        onchange: null,
        dispatchEvent: () => false,
    }),
});

const mountWithPrime = (component: any, props: any = {}) =>
    mount(component, {
        global: { plugins: [PrimeVue] },
        props,
    });

describe('pass-through prop merging', () => {
    it('Button merges pt classes', () => {
        const wrapper = mountWithPrime(Button, { pt: { root: { class: 'bg-red-500' } } });
        const el = wrapper.find('button');
        expect(el.classes()).toContain('bg-red-500');
        expect(el.classes()).not.toContain('bg-primary-500');
    });

    it('Card merges pt classes', () => {
        const wrapper = mountWithPrime(Card, { pt: { root: { class: 'bg-red-500' } } });
        expect(wrapper.element.className).toContain('bg-red-500');
    });

    it('Checkbox merges pt classes', () => {
        const wrapper = mountWithPrime(Checkbox, { pt: { root: { class: 'bg-red-500' } } });
        expect(wrapper.element.className).toContain('bg-red-500');
    });

    it('InputMask merges pt classes', () => {
        const wrapper = mountWithPrime(InputMask, { mask: '99', pt: { root: { class: 'bg-red-500' } } });
        expect(wrapper.find('input').classes()).toContain('bg-red-500');
    });

    it('InputNumber merges pt classes', () => {
        const wrapper = mountWithPrime(InputNumber, { pt: { root: { class: 'bg-red-500' } } });
        expect(wrapper.element.className).toContain('bg-red-500');
    });

    it('Select merges pt classes', () => {
        const wrapper = mountWithPrime(Select, { options: [{ label: 'A', value: 'a' }], pt: { root: { class: 'bg-red-500' } } });
        expect(wrapper.element.className).toContain('bg-red-500');
    });

    it('Textarea merges pt classes', () => {
        const wrapper = mountWithPrime(Textarea, { pt: { root: { class: 'bg-red-500' } } });
        expect(wrapper.find('textarea').classes()).toContain('bg-red-500');
    });

    it('Alert merges pt classes', () => {
        const wrapper = mountWithPrime(Alert, { pt: { root: { class: 'bg-red-500' } } });
        expect(wrapper.element.className).toContain('bg-red-500');
        expect(wrapper.element.className).not.toContain('bg-surface-50');
    });
});
