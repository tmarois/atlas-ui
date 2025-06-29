/**
 * Format a number with commas and optional decimal places
 * @param { String|Number } n
 * @param { Number } decimals
 * @returns { String }
 */
export const formatNumber = (n, decimals = 0) => {
    if (n === '' || n === null || n === undefined) return '';
    if (isNaN(n)) return 'Invalid';
    return Number(n).toFixed(decimals).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formats a string or number into a currency
 * like: 1000000 into $1,000,000
 * @param {String|Number} n
 * @param {Number} decimals
 * @param { String<USD>} currency
 * @param {String} invalid
 * @returns {String}
*/
export const formatToCurrency = (n, decimals = 2, currency = 'USD', invalid = 'Invalid') => {
    if (isNaN(n)) return invalid;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(n);
};

/**
 * Formats a decimal value into a percentage string
 * @param {Number} value
 * @param {Number} decimals
 * @returns {String}
 */
export const formatPercentage = (value, decimals = 0) => {
    if (value === null || value === undefined || isNaN(value)) return '';
    return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Converts a byte value into a human-readable size (KB, MB, GB, etc.)
 * @param {Number} bytes
 * @param {Number} decimals
 * @returns {String}
 */
export const formatBytes = (bytes, decimals = 2) => {
    if (typeof bytes !== 'number' || isNaN(bytes)) return '';
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(decimals) + ' ' + sizes[i];
};

/**
 * Format a UTC timestamp into user's timezone (only date)
 * @param {String} utcDatetime
 * @param {String} userTimezone
 * @param {String} locale
 * @returns {String}
 */
export const formatToDate = (utcDatetime, userTimezone = 'America/New_York', locale = 'en-US') => {
    if (!utcDatetime) return '';
    const utcDate = new Date(utcDatetime.endsWith('Z') ? utcDatetime : `${utcDatetime}Z`);
    if (isNaN(utcDate)) return 'Invalid date';
    return utcDate.toLocaleDateString(locale, { timeZone: userTimezone });
};

/**
 * Format a UTC timestamp into user's timezone (date and time, no seconds)
 * @param {String} utcDatetime
 * @param {String} userTimezone
 * @param {String} locale
 * @returns {String}
 */
export const formatToDatetime = (utcDatetime, userTimezone = 'America/New_York', locale = 'en-US') => {
    if (!utcDatetime) return '';
    const utcDate = new Date(utcDatetime.endsWith('Z') ? utcDatetime : `${utcDatetime}Z`);
    if (isNaN(utcDate)) return 'Invalid date';
    return utcDate.toLocaleString(locale, {
        timeZone: userTimezone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
};

/**
 * Creates a safe slug for URL
 * @param { String } str
 * @returns a formatted string
 */
export const formatToSlug = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Allow only alphanumerics, replace everything else
      .replace(/-+/g, '-') // Collapse multiple hyphens into one
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Formats a string and ensures its a valid URL
 * @param { String } url
 * @param { Boolean } https - Force https protocol (default: false)
 * @returns formatted URL string
 */
export const formatToValidURL = (url, https = false) => {
    if (!url) return '';
    url = url.trim().toLowerCase();

    if (/^https?:\/\//.test(url)) {
        if (https && url.startsWith('http://')) {
            url = url.replace(/^http:\/\//, 'https://');
        }
    } else {
        url = (https ? 'https://' : 'http://') + url;
    }

    return url;
}
