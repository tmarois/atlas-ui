const { isValidURL, isValidEmail, isNumeric, isEmpty } = require('@/utils');

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


describe('isNumeric', () => {
    it('returns true for integers', () => {
        expect(isNumeric(123)).toBe(true);
        expect(isNumeric('123')).toBe(true);
    });

    it('returns true for floats', () => {
        expect(isNumeric(123.45)).toBe(true);
        expect(isNumeric('123.45')).toBe(true);
    });

    it('returns false for non-numeric strings', () => {
        expect(isNumeric('abc')).toBe(false);
        expect(isNumeric('123abc')).toBe(false);
        expect(isNumeric('')).toBe(false);
    });

    it('returns false for null and undefined', () => {
        expect(isNumeric(null)).toBe(false);
        expect(isNumeric(undefined)).toBe(false);
    });
});

describe('isEmpty', () => {
    it('returns true for empty strings', () => {
        expect(isEmpty('')).toBe(true);
    });

    it('returns true for empty arrays', () => {
        expect(isEmpty([])).toBe(true);
    });

    it('returns true for empty objects', () => {
        expect(isEmpty({})).toBe(true);
    });

    it('returns true for null and undefined', () => {
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty(undefined)).toBe(true);
    });

    it('returns false for non-empty strings', () => {
        expect(isEmpty('hello')).toBe(false);
    });

    it('returns false for non-empty arrays', () => {
        expect(isEmpty([1, 2, 3])).toBe(false);
    });

    it('returns false for non-empty objects', () => {
        expect(isEmpty({ key: 'value' })).toBe(false);
    });

    it('returns false for numbers and booleans', () => {
        expect(isEmpty(0)).toBe(false);
        expect(isEmpty(true)).toBe(false);
        expect(isEmpty(false)).toBe(false);
    });
});
