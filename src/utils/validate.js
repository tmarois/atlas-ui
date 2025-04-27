/**
 * Checks if a given string is a valid HTTP or HTTPS URL
 * @param {String} url - The URL string to validate
 * @returns {Boolean} true if valid, false otherwise
 */
export const isValidURL = (url) => {
    try {
        const parsedUrl = new URL(url);
        return /^(http|https):/.test(parsedUrl.protocol);
    } catch (e) {
        return false;
    }
};

/**
 * Checks if a given string is a valid email address
 * @param {String} email - The email string to validate
 * @returns {Boolean} true if valid, false otherwise
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Checks if the given value is a number (integer or float)
 * @param {String|Number} value
 * @returns {Boolean}
 */
export const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
};

/**
 * Checks if a string, array, or object is empty
 * @param {String|Array|Object|null|undefined} value
 * @returns {Boolean}
 */
export const isEmpty = (value) => {
    if (value == null) return true;
    if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
};
