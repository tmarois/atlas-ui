const { isValidURL, isValidEmail } = require('@/utils');

describe('isValidURL', () => {
    it('returns true for valid HTTP URL', () => {
        expect(isValidURL('http://example.com')).toBe(true);
    });

    it('returns true for valid HTTPS URL', () => {
        expect(isValidURL('https://example.com')).toBe(true);
    });

    it('returns false for non-http/https protocols', () => {
        expect(isValidURL('ftp://example.com')).toBe(false);
        expect(isValidURL('file:///Users/test.txt')).toBe(false);
    });

    it('returns false for completely invalid URLs', () => {
        expect(isValidURL('not-a-url')).toBe(false);
        expect(isValidURL('')).toBe(false);
        expect(isValidURL(null)).toBe(false);
        expect(isValidURL(undefined)).toBe(false);
    });

    it('returns false for missing protocol URLs', () => {
        expect(isValidURL('www.example.com')).toBe(false);
    });
});


describe('isValidEmail', () => {
    it('returns true for valid email addresses', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('user.name+tag+sorting@example.com')).toBe(true);
        expect(isValidEmail('user_name@example.co.uk')).toBe(true);
    });

    it('returns false for invalid email addresses', () => {
        expect(isValidEmail('plainaddress')).toBe(false);
        expect(isValidEmail('missingatsign.com')).toBe(false);
        expect(isValidEmail('@missingusername.com')).toBe(false);
        expect(isValidEmail('username@.com')).toBe(false);
        expect(isValidEmail('username@com')).toBe(false);
        expect(isValidEmail('USERNAME@site.')).toBe(false);
    });

    it('returns false for empty, null, or undefined', () => {
        expect(isValidEmail('')).toBe(false);
        expect(isValidEmail(null)).toBe(false);
        expect(isValidEmail(undefined)).toBe(false);
    });

    it('returns false if spaces are present', () => {
        expect(isValidEmail('user @example.com')).toBe(false);
        expect(isValidEmail('user@ example.com')).toBe(false);
    });
});
