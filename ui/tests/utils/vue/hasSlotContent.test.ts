import { describe, it, expect } from 'vitest';
import { hasSlotContent } from '../../../src/utils';
import { h, type Slot, type Component } from 'vue';

describe('hasSlotContent', () => {
    // Test with undefined/null slot
    it('should return false when slot is undefined', () => {
        expect(hasSlotContent(undefined)).toBe(false);
    });

    it('should return false when slot is null', () => {
        expect(hasSlotContent(null as any)).toBe(false);
    });

    // Test with empty slot content
    it('should return false when slot content is empty array', () => {
        const emptySlot = () => [];
        expect(hasSlotContent(emptySlot)).toBe(false);
    });

    // Test with text-only content
    it('should return false when slot content has only empty text', () => {
        const emptyTextSlot: Slot = () => [h('span', ' ')];
        expect(hasSlotContent(emptyTextSlot)).toBe(false);
    });

    it('should return true when slot content has non-empty text', () => {
        const textSlot: Slot = () => [h('span', 'Some text')];
        expect(hasSlotContent(textSlot)).toBe(true);
    });

    // Test with component content
    it('should return true when slot content has component', () => {
        const MyComponent = {} as Component;
        const componentSlot: Slot = () => [h(MyComponent)];
        expect(hasSlotContent(componentSlot)).toBe(true);
    });

    // Test with mixed content
    it('should return true when slot content has mixed elements', () => {
        const mixedSlot: Slot = () => [
            h('div', 'Content'),
            h('span')
        ];
        expect(hasSlotContent(mixedSlot)).toBe(true);
    });

    // Test with some empty and some valid content
    it('should return true when at least one node has valid content', () => {
        const partialContentSlot: Slot = () => [
            h('div', ''),
            h('div', 'Valid content')
        ];
        expect(hasSlotContent(partialContentSlot)).toBe(true);
    });

});
