<?php

if (!function_exists('format_phone_number')) {
    /**
     * Formats a 10-digit US phone number to (XXX) XXX-XXXX format.
     *
     * @param string|int|null $phoneNumber The raw phone number input
     * @return string|null Formatted phone number or null if input is empty
     */
    function format_phone_number(null|int|string $phoneNumber): ?string
    {
        if (! $phoneNumber) {
            return null;
        }

        $phoneNumber = (string) $phoneNumber;

        if (strlen($phoneNumber) !== 10) {
            return $phoneNumber;
        }

        return '(' . substr($phoneNumber, 0, 3) . ') ' .
            substr($phoneNumber, 3, 3) . '-' .
            substr($phoneNumber, 6);
    }
}
