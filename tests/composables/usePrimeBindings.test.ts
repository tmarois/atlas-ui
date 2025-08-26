import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { usePrimeBindings } from '../../src/composables/usePrimeBindings';

describe('usePrimeBindings', () => {
    it('merges attrs and props while excluding keys', () => {
        const props = { id: 'foo', modelValue: 'bar', pt: { root: { class: 'text-blue-500' } } };
        const attrs = { 'data-test': 'baz' };
        const { bindProps } = usePrimeBindings(props, attrs, undefined, ['modelValue']);
        expect(bindProps.value).toEqual({ id: 'foo', 'data-test': 'baz' });
    });

    it('merges theme and pt props', () => {
        const props = { pt: { root: { class: 'text-blue-500' }, button: { class: 'p-4' } } };
        const attrs = {};
        const theme = ref({ root: { class: 'bg-red-500' } });
        const { mergedPt } = usePrimeBindings(props, attrs, theme);
        expect(mergedPt.value.root.class).toBe('bg-red-500 text-blue-500');
        expect(mergedPt.value.button.class).toBe('p-4');
    });
});
