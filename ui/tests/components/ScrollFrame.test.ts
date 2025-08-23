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
});

