import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import { nextTick } from 'vue';
import ButtonMenu from '../../src/components/ButtonMenu.vue';

const items = [{ label: 'Item', action: 'test' }];

const ButtonStub = {
    template: '<button @click="$emit(\'click\')"><slot /></button>',
};

const MenuStub = {
    template:
        '<div v-show="visible" @mouseenter="$emit(\'mouseenter\', $event)" @mouseleave="$emit(\'mouseleave\', $event)"><slot /></div>',
    data: () => ({ visible: false }),
    methods: {
        show() {
            this.visible = true;
            this.$emit('show');
        },
        hide() {
            this.visible = false;
            this.$emit('hide');
        },
    },
};

const mountWithPrime = (props: any = {}) =>
    mount(ButtonMenu, {
        props: { items, ...props },
        global: {
            plugins: [PrimeVue],
            stubs: { Button: ButtonStub, Menu: MenuStub, IconChevronDown: { template: '<span />' } },
        },
    });

describe('ButtonMenu', () => {
    it('keeps menu open on mouseleave when not onHover', async () => {
        vi.useFakeTimers();
        const wrapper = mountWithPrime();
        await wrapper.find('button').trigger('click');
        vi.runAllTimers();
        await nextTick();
        expect((wrapper.vm as any).isMenuOpen).toBe(true);

        await wrapper.trigger('mouseleave', { relatedTarget: document.createElement('div') });
        vi.runAllTimers();
        await nextTick();

        expect((wrapper.vm as any).isMenuOpen).toBe(true);

        wrapper.unmount();
        vi.useRealTimers();
    });

    it('auto closes on mouseleave when onHover', async () => {
        vi.useFakeTimers();
        const wrapper = mountWithPrime({ onHover: true });
        await wrapper.trigger('mouseenter');
        vi.runAllTimers();
        await nextTick();
        expect((wrapper.vm as any).isMenuOpen).toBe(true);

        await wrapper.trigger('mouseleave', { relatedTarget: document.createElement('div') });
        vi.runAllTimers();
        await nextTick();

        expect((wrapper.vm as any).isMenuOpen).toBe(false);

        wrapper.unmount();
        vi.useRealTimers();
    });
});
