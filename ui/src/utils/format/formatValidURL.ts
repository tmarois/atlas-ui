/**
 * Normalizes and ensures a URL includes a valid protocol.
 * @param url - Input string (e.g. 'google.com')
 * @param https - Force HTTPS (default: false)
 * @returns A valid HTTP(S) URL (e.g. 'https://google.com')
 */
export const formatValidURL = (url: string, https = false): string => {
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
};
