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
