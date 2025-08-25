import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from '../../src/components/Card.vue';

const mountWithPrime = (props: any = {}, slots: any = {}) =>
    mount(Card, {
        global: { plugins: [PrimeVue] },
        props,
        slots,
    });

describe('Card', () => {
    it('has default content padding', () => {
        const wrapper = mountWithPrime({}, { content: 'Content' });
        const content = wrapper.find('[data-pc-section="content"]');
        expect(content.classes()).toContain('p-6');
    });

    it('removes content padding when noPadding is true', () => {
        const wrapper = mountWithPrime({ noPadding: true }, { content: 'Content' });
        const content = wrapper.find('[data-pc-section="content"]');
        expect(content.classes()).not.toContain('p-6');
    });
});
