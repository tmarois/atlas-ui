const {
    formatNumber,
    formatToCurrency,
    formatToDate,
    formatToDatetime,
    formatToSlug,
    formatToValidURL,
    formatPercentage,
    formatBytes
} = require('@/utils');


describe('formatNumber', () => {
    it('formats number without decimals', () => {
        expect(formatNumber(10000)).toBe('10,000');
    });

    it('formats number with decimals', () => {
        expect(formatNumber(1234.567, 2)).toBe('1,234.57');
    });

    it('returns "Invalid" if input is not a number', () => {
        expect(formatNumber('abc')).toBe('Invalid');
    });

    it('returns empty string for null, undefined or empty input', () => {
        expect(formatNumber(null)).toBe('');
        expect(formatNumber(undefined)).toBe('');
        expect(formatNumber('')).toBe('');
    });
});

describe('formatToCurrency', () => {
    it('formats number into default USD currency', () => {
        expect(formatToCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('formats number into specified currency with no decimals', () => {
        expect(formatToCurrency(5000, 0, 'EUR')).toBe('€5,000');
    });

    it('returns custom invalid message when input is invalid', () => {
        expect(formatToCurrency('invalid', 2, 'USD', 'Not a number')).toBe('Not a number');
    });
});

describe('formatToDate', () => {
    it('formats UTC datetime to date string in user timezone', () => {
        expect(formatToDate('2024-05-01T14:30:00Z', 'America/New_York')).toBe('5/1/2024');
    });

    it('returns empty string for empty input', () => {
        expect(formatToDate('')).toBe('');
    });

    it('returns "Invalid date" for badly formatted date', () => {
        expect(formatToDate('bad-date')).toBe('Invalid date');
    });
});

describe('formatToDatetime', () => {
    it('formats UTC datetime to date and time string in user timezone', () => {
        const result = formatToDatetime('2024-05-01T08:30:00Z', 'America/New_York');
        expect(result).toContain('5/1/2024');
        expect(result).toMatch(/4:30\s?AM/);
    });

    it('returns empty string for empty input', () => {
        expect(formatToDatetime('')).toBe('');
    });

    it('returns "Invalid date" for badly formatted date', () => {
        expect(formatToDatetime('bad-datetime')).toBe('Invalid date');
    });
});

describe('formatToSlug', () => {
    it('formats a string to a lowercase slug', () => {
        expect(formatToSlug('Hello World!')).toBe('hello-world');
    });

    it('removes leading and trailing hyphens', () => {
        expect(formatToSlug('---Hello---World---')).toBe('hello-world');
    });

    it('handles multiple spaces and special characters', () => {
        expect(formatToSlug('This is    a test!!!')).toBe('this-is-a-test');
    });
});

describe('formatToValidURL', () => {
    it('adds https if missing and forces lowercase', () => {
        expect(formatToValidURL('Example.COM')).toBe('http://example.com');
    });

    it('respects existing https', () => {
        expect(formatToValidURL('https://Example.com')).toBe('https://example.com');
    });

    it('forces https even if original was http', () => {
        expect(formatToValidURL('http://example.com', true)).toBe('https://example.com');
    });

    it('adds https to raw input if https flag is true', () => {
        expect(formatToValidURL('example.com', true)).toBe('https://example.com');
    });

    it('returns empty string if input is empty', () => {
        expect(formatToValidURL('')).toBe('');
        expect(formatToValidURL(null)).toBe('');
        expect(formatToValidURL(undefined)).toBe('');
    });
});

describe('formatPercentage', () => {
    it('formats decimal values to percentage without decimals', () => {
        expect(formatPercentage(0.25)).toBe('25%');
        expect(formatPercentage(1)).toBe('100%');
        expect(formatPercentage(0)).toBe('0%');
    });

    it('formats decimal values to percentage with decimals', () => {
        expect(formatPercentage(0.2567, 2)).toBe('25.67%');
        expect(formatPercentage(0.1, 1)).toBe('10.0%');
    });

    it('returns empty string for non-numeric input', () => {
        expect(formatPercentage('invalid')).toBe('');
        expect(formatPercentage(null)).toBe('');
        expect(formatPercentage(undefined)).toBe('');
    });
});

describe('formatBytes', () => {
    it('formats bytes to KB, MB, GB correctly', () => {
        expect(formatBytes(1024)).toBe('1.00 KB');
        expect(formatBytes(1048576)).toBe('1.00 MB');
        expect(formatBytes(1073741824)).toBe('1.00 GB');
        expect(formatBytes(1099511627776)).toBe('1.00 TB');
    });

    it('formats bytes with custom decimal precision', () => {
        expect(formatBytes(1500, 1)).toBe('1.5 KB');
        expect(formatBytes(10485760, 3)).toBe('10.000 MB');
    });

    it('returns empty string for invalid inputs', () => {
        expect(formatBytes('invalid')).toBe('');
        expect(formatBytes(null)).toBe('');
        expect(formatBytes(undefined)).toBe('');
    });
});
