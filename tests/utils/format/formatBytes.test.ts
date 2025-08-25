import { describe, it, expect } from 'vitest';
import { formatBytes } from '../../../src/utils/format/formatBytes';

describe('formatBytes', () => {
    // Happy path tests
    it('should format bytes as bytes for small values', () => {
        expect(formatBytes(100)).toBe('100.00 Bytes');
    });

    it('should format 1024 bytes as 1 KB', () => {
        expect(formatBytes(1024)).toBe('1.00 KB');
    });

    it('should format KB correctly', () => {
        expect(formatBytes(1536)).toBe('1.50 KB');
    });

    it('should format MB correctly', () => {
        expect(formatBytes(1048576)).toBe('1.00 MB');
    });

    it('should format GB correctly', () => {
        expect(formatBytes(1073741824)).toBe('1.00 GB');
    });

    it('should format TB correctly', () => {
        expect(formatBytes(1099511627776)).toBe('1.00 TB');
    });

    it('should use custom decimal places', () => {
        expect(formatBytes(1536, 0)).toBe('2 KB');
    });
});
