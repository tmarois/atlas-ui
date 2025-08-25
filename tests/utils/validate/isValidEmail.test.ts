import { describe, it, expect } from 'vitest';
import { isValidEmail } from '../../../src/utils/validate/isValidEmail';

describe('isValidEmail', () => {
    // Happy path tests
    it('should return true for valid email', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
    });

    it('should return true for email with subdomain', () => {
        expect(isValidEmail('test@sub.example.com')).toBe(true);
    });

    it('should return true for email with plus sign', () => {
        expect(isValidEmail('test+label@example.com')).toBe(true);
    });

    it('should return true for email with numbers', () => {
        expect(isValidEmail('test123@example.com')).toBe(true);
    });

    it('should return true for email with dots in local part', () => {
        expect(isValidEmail('first.last@example.com')).toBe(true);
    });

    // Bad path tests
    it('should return false for empty string', () => {
        expect(isValidEmail('')).toBe(false);
    });

    it('should return false for null input', () => {
        expect(isValidEmail(null as unknown as string)).toBe(false);
    });

    it('should return false for undefined input', () => {
        expect(isValidEmail(undefined as unknown as string)).toBe(false);
    });

    it('should return false for email without @', () => {
        expect(isValidEmail('testexample.com')).toBe(false);
    });

    it('should return false for email without domain part', () => {
        expect(isValidEmail('test@')).toBe(false);
    });

    it('should return false for email with spaces', () => {
        expect(isValidEmail('test @example.com')).toBe(false);
    });

    it('should return false for email without TLD', () => {
        expect(isValidEmail('test@example')).toBe(false);
    });
});
