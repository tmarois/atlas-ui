/**
 * Validates whether a string is a valid HTTP or HTTPS URL.
 * @param url - The URL string to validate
 * @returns True if valid, false otherwise
 */
export const isValidURL = (url: string): boolean => {
    try {
        const parsed = new URL(url);
        return /^(http|https):/.test(parsed.protocol);
    } catch {
        return false;
    }
};
