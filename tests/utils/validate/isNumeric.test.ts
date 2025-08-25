import { describe, it, expect } from 'vitest';
import { isNumeric } from '../../../src/utils/validate/isNumeric';

describe('isNumeric', () => {
    // True cases - these should be considered numeric
    it('should return true for integer number', () => {
        expect(isNumeric(42)).toBe(true);
    });

    it('should return true for negative integer', () => {
        expect(isNumeric(-42)).toBe(true);
    });

    it('should return true for decimal number', () => {
        expect(isNumeric(3.14)).toBe(true);
    });

    it('should return true for zero', () => {
        expect(isNumeric(0)).toBe(true);
    });

    it('should return true for numeric string', () => {
        expect(isNumeric('123')).toBe(true);
    });

    it('should return true for decimal string', () => {
        expect(isNumeric('3.14')).toBe(true);
    });

    it('should return true for negative numeric string', () => {
        expect(isNumeric('-42.5')).toBe(true);
    });

    it('should return true for scientific notation', () => {
        expect(isNumeric('1e3')).toBe(true);
    });

    // False cases - these should not be considered numeric
    it('should return false for null', () => {
        expect(isNumeric(null as unknown as number)).toBe(false);
    });

    it('should return false for undefined', () => {
        expect(isNumeric(undefined as unknown as number)).toBe(false);
    });

    it('should return false for empty string', () => {
        expect(isNumeric('')).toBe(false);
    });

    it('should return false for alphabetic string', () => {
        expect(isNumeric('abc')).toBe(false);
    });

    it('should return false for alphanumeric string', () => {
        expect(isNumeric('123abc')).toBe(false);
    });

    it('should return false for string with special characters', () => {
        expect(isNumeric('12,345')).toBe(false);
    });

    it('should return false for boolean', () => {
        expect(isNumeric(true as unknown as number)).toBe(false);
    });

    it('should return false for object', () => {
        expect(isNumeric({} as unknown as number)).toBe(false);
    });

    it('should return false for array', () => {
        expect(isNumeric([] as unknown as number)).toBe(false);
    });
});
