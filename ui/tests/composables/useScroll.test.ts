import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useScroll } from '../../src/composables/useScroll';
import { ref } from 'vue';

// Mock isClient utility
vi.mock('../../src/utils', () => ({
    isClient: true
}));

describe('useScroll', () => {
    let scroll: ReturnType<typeof useScroll>;
    const testId = 'test-scroll';

    beforeEach(() => {
        scroll = useScroll(testId);
    });

    afterEach(() => {
        // Reset document styles after each test
        document.documentElement.style.overflowY = '';
        document.body.style.overflowY = '';
    });

    describe('initial state', () => {
        it('should initialize with isTop as true', () => {
            expect(scroll.isTop.value).toBe(true);
        });
    });

    describe('setTop', () => {
        it('should update isTop value', () => {
            scroll.setTop(false);
            expect(scroll.isTop.value).toBe(false);

            scroll.setTop(true);
            expect(scroll.isTop.value).toBe(true);
        });
    });

    describe('lockScroll and unlockScroll', () => {
        it('should lock scroll by setting overflow to hidden', () => {
            scroll.lockScroll();
            expect(document.documentElement.style.overflowY).toBe('hidden');
            expect(document.body.style.overflowY).toBe('hidden');
        });

        it('should unlock scroll by removing overflow style', () => {
            scroll.lockScroll();
            scroll.unlockScroll();
            expect(document.documentElement.style.overflowY).toBe('');
            expect(document.body.style.overflowY).toBe('');
        });
    });

    describe('bindScrollHandler', () => {
        it('should return add and remove functions', () => {
            const elementRef = ref<HTMLElement | null>(null);
            const handler = scroll.bindScrollHandler(elementRef);

            expect(typeof handler.add).toBe('function');
            expect(typeof handler.remove).toBe('function');
        });

        it('should handle scroll events on the element', () => {
            // Create a mock element
            const mockElement = document.createElement('div');

            // Mock scrollTop property
            Object.defineProperty(mockElement, 'scrollTop', {
                get: vi.fn().mockReturnValue(0),
                configurable: true
            });

            // Add event listener spy
            const addEventListenerSpy = vi.spyOn(mockElement, 'addEventListener');
            const removeEventListenerSpy = vi.spyOn(mockElement, 'removeEventListener');

            const elementRef = ref(mockElement);
            const handler = scroll.bindScrollHandler(elementRef);

            // Add scroll handler
            handler.add();
            expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
            expect(scroll.isTop.value).toBe(true);

            // Simulate scrolling
            Object.defineProperty(mockElement, 'scrollTop', {
                get: vi.fn().mockReturnValue(10),
                configurable: true
            });

            // Trigger scroll event manually
            const scrollEvent = new Event('scroll');
            mockElement.dispatchEvent(scrollEvent);

            // Now isTop should be false
            expect(scroll.isTop.value).toBe(false);

            // Remove scroll handler
            handler.remove();
            expect(removeEventListenerSpy).toHaveBeenCalled();
        });

        it('should handle null element ref', () => {
            const elementRef = ref<HTMLElement | null>(null);
            const handler = scroll.bindScrollHandler(elementRef);

            // Should not throw errors when element is null
            expect(() => handler.add()).not.toThrow();
            expect(() => handler.remove()).not.toThrow();
        });
    });

    describe('multiple scroll instances', () => {
        it('should maintain separate state for different ids', () => {
            const scroll1 = useScroll('scroll1');
            const scroll2 = useScroll('scroll2');

            scroll1.setTop(false);
            expect(scroll1.isTop.value).toBe(false);
            expect(scroll2.isTop.value).toBe(true);
        });

        it('should handle locking/unlocking with different instances', () => {
            // Create a new instance for this specific test
            afterEach(() => {
                // Reset document styles after test
                document.documentElement.style.overflowY = '';
                document.body.style.overflowY = '';
            });

            // Test explanation: The current implementation of useScroll affects
            // the global document styles regardless of instance.
            // When multiple instances exist, the last one to call lock/unlock "wins"
            const scroll1 = useScroll('instance1');
            const scroll2 = useScroll('instance2');

            // Both lock
            scroll1.lockScroll();
            scroll2.lockScroll();
            expect(document.documentElement.style.overflowY).toBe('hidden');

            // Only one unlocks - this will unlock globally
            scroll1.unlockScroll();
            expect(document.documentElement.style.overflowY).toBe('');

            // The other instance can lock again
            scroll2.lockScroll();
            expect(document.documentElement.style.overflowY).toBe('hidden');
        });
    });
});
