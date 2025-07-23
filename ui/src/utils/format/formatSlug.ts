/**
 * Converts a string into a safe, lowercase slug.
 * @param str - The input string
 * @returns A hyphenated slug (e.g. 'my-post-title')
 */
export const formatSlug = (str: string): string => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};
