import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import DialogConfirmation from '../../src/components/DialogConfirmation.vue';

const mountWithPrime = (props: any = {}, slots: any = {}) =>
    mount(DialogConfirmation, {
        global: { plugins: [PrimeVue] },
        props,
        slots,
    });

describe('DialogConfirmation', () => {
    it('merges provided style with default style', () => {
        const wrapper = mountWithPrime({ modelValue: true, style: { height: '100px' } });
        expect(wrapper.vm.dialogBindProps.style).toMatchObject({ width: '25rem', height: '100px' });
    });
});
