import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isClient } from '../../src/utils';

describe('isClient', () => {
    // Store the original window and document objects
    const originalWindow = global.window;
    const originalDocument = global.document;

    // Reset mocks before each test
    beforeEach(() => {
        vi.resetModules();
        global.window = originalWindow;
        global.document = originalDocument;
    });

    it('should be true when window and document are defined', () => {
        // Browser environment (default in jsdom)
        expect(isClient).toBe(true);
    });

    it('should be false when window is undefined', async () => {
        // Mock SSR environment where window is undefined
        vi.stubGlobal('window', undefined);

        // Re-import to get fresh evaluation
        const module = await import('../../src/utils/browser/isClient');

        expect(module.isClient).toBe(false);
    });

    it('should be false when document is undefined', async () => {
        // Mock environment where document is undefined
        vi.stubGlobal('document', undefined);

        // Re-import to get fresh evaluation
        const module = await import('../../src/utils/browser/isClient');

        expect(module.isClient).toBe(false);
    });
});
