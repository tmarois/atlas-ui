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
 * @param { String|Number } v
 * @param { String<USD>} currency
 * @returns
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
 * Format a UTC timestamp into user's timezone (date and time)
 * @param {String} utcDatetime
 * @param {String} userTimezone
 * @param {String} locale
 * @returns {String}
 */
export const formatToDatetime = (utcDatetime, userTimezone = 'America/New_York', locale = 'en-US') => {
    if (!utcDatetime) return '';
    const utcDate = new Date(utcDatetime.endsWith('Z') ? utcDatetime : `${utcDatetime}Z`);
    if (isNaN(utcDate)) return 'Invalid date';
    return utcDate.toLocaleString(locale, { timeZone: userTimezone });
};
