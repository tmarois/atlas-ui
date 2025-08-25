import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import ScrollFrame from '../../src/components/ScrollFrame.vue';

describe('ScrollFrame', () => {
    it('recalculates height when content updates', async () => {
        let top = 10;
        const getBoundingClientRect = vi.spyOn(
            HTMLElement.prototype,
            'getBoundingClientRect'
        );
        getBoundingClientRect.mockImplementation(() => ({
            top,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            x: 0,
            y: top,
            toJSON: () => {}
        }));

        const Parent = {
            components: { ScrollFrame },
            setup() {
                const content = ref('A');
                return { content };
            },
            template: `<ScrollFrame><div>{{ content }}</div></ScrollFrame>`
        };

        const wrapper = mount(Parent);
        const frameComp = wrapper.findComponent(ScrollFrame);

        await nextTick();
        expect(frameComp.vm.dynamicHeight).toBe('10px');

        top = 20;
        (wrapper.vm as any).content = 'B';

        await nextTick();
        await nextTick();

        expect(frameComp.vm.dynamicHeight).toBe('20px');

        getBoundingClientRect.mockRestore();
    });

    it('recalculates height when parent resizes', async () => {
        const originalResizeObserver = (global as any).ResizeObserver;
        let resizeCb: () => void = () => {};
        const observe = vi.fn();
        const disconnect = vi.fn();
        (global as any).ResizeObserver = vi.fn((cb) => {
            resizeCb = cb;
            return { observe, disconnect } as any;
        });

        let top = 10;
        const getBoundingClientRect = vi.spyOn(
            HTMLElement.prototype,
            'getBoundingClientRect'
        );
        getBoundingClientRect.mockImplementation(() => ({
            top,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            x: 0,
            y: top,
            toJSON: () => {}
        }));

        const Parent = {
            components: { ScrollFrame },
            template: `<div id="parent"><ScrollFrame /></div>`
        };

        const wrapper = mount(Parent);
        const frameComp = wrapper.findComponent(ScrollFrame);

        await nextTick();
        expect(observe).toHaveBeenCalledWith(wrapper.element);
        expect(frameComp.vm.dynamicHeight).toBe('10px');

        top = 20;
        resizeCb();

        await nextTick();
        expect(frameComp.vm.dynamicHeight).toBe('20px');

        getBoundingClientRect.mockRestore();
        (global as any).ResizeObserver = originalResizeObserver;
    });

    it('recalculates height when becoming visible', async () => {
        const originalIntersectionObserver = (global as any).IntersectionObserver;
        let intersectionCb: (entries: any[]) => void = () => {};
        const observe = vi.fn();
        const disconnect = vi.fn();
        (global as any).IntersectionObserver = vi.fn((cb) => {
            intersectionCb = cb;
            return { observe, disconnect } as any;
        });

        let top = 0;
        const getBoundingClientRect = vi.spyOn(
            HTMLElement.prototype,
            'getBoundingClientRect'
        );
        getBoundingClientRect.mockImplementation(() => ({
            top,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            x: 0,
            y: top,
            toJSON: () => {}
        }));

        const Parent = {
            components: { ScrollFrame },
            template: `<ScrollFrame />`
        };

        const wrapper = mount(Parent);
        const frameComp = wrapper.findComponent(ScrollFrame);

        await nextTick();
        expect(frameComp.vm.dynamicHeight).toBe('0px');

        top = 20;
        intersectionCb([{ isIntersecting: true }]);

        await nextTick();
        expect(frameComp.vm.dynamicHeight).toBe('20px');

        getBoundingClientRect.mockRestore();
        (global as any).IntersectionObserver = originalIntersectionObserver;
    });

    it('recalculates height when external DOM changes', async () => {
        const originalMutationObserver = (global as any).MutationObserver;
        let mutationCb: (mutations: any[]) => void = () => {};
        const observe = vi.fn();
        const disconnect = vi.fn();
        (global as any).MutationObserver = vi.fn((cb) => {
            mutationCb = cb;
            return { observe, disconnect } as any;
        });

        let top = 10;
        const getBoundingClientRect = vi.spyOn(
            HTMLElement.prototype,
            'getBoundingClientRect'
        );
        getBoundingClientRect.mockImplementation(() => ({
            top,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            x: 0,
            y: top,
            toJSON: () => {}
        }));

        const Parent = {
            components: { ScrollFrame },
            template: `<div><div id="header"></div><ScrollFrame /></div>`
        };

        const wrapper = mount(Parent);
        const frameComp = wrapper.findComponent(ScrollFrame);

        await nextTick();
        expect(observe).toHaveBeenCalledWith(document.body, expect.any(Object));
        expect(frameComp.vm.dynamicHeight).toBe('10px');

        top = 20;
        mutationCb([{ target: document.body }]);

        await nextTick();
        expect(frameComp.vm.dynamicHeight).toBe('20px');

        getBoundingClientRect.mockRestore();
        (global as any).MutationObserver = originalMutationObserver;
    });
});

