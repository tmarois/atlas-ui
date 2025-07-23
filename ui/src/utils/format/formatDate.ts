/**
 * Converts a UTC datetime string to a localized date string.
 * @param utcDatetime - The UTC ISO date string
 * @param userTimezone - Target time zone (default: 'UTC')
 * @param locale - Output locale (default: 'en-US')
 * @returns Localized date string (e.g. '7/22/2025')
 */
export const formatDate = (
    utcDatetime: string,
    userTimezone = 'UTC',
    locale = 'en-US'
): string => {
    if (!utcDatetime) return '';
    const date = new Date(utcDatetime.endsWith('Z') ? utcDatetime : `${utcDatetime}Z`);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString(locale, { timeZone: userTimezone });
};
