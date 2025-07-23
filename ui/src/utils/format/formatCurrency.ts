/**
 * Formats a value into a localized currency string.
 * @param n - The numeric value to format
 * @param decimals - Number of decimal places (default: 2)
 * @param currency - Currency code (e.g. 'USD') (default: 'USD')
 * @param invalid - Return value if n is not numeric (default: 'Invalid')
 * @returns The formatted currency string
 */
export const formatCurrency = (
    n: string | number,
    decimals = 2,
    currency = 'USD',
    invalid = 'Invalid'
): string => {
    if (isNaN(Number(n))) return invalid;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(Number(n));
};
