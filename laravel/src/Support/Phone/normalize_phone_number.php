<?php

if (!function_exists('normalize_phone_number')) {
    /**
     * Normalizes a US phone number by stripping out country code, symbols, and formatting.
     * Returns only the 10-digit number or null if invalid.
     *
     * @param string $phoneNumber The raw phone number string
     * @return string|null 10-digit phone number or null if invalid
     */
    function normalize_phone_number(string $phoneNumber): ?string
    {
        $phoneNumber = preg_replace('/[^+\d]|(?<=\+|1)[^0-9]/', '', $phoneNumber);

        if (strlen($phoneNumber) > 1 && $phoneNumber[0] === '+') {
            $phoneNumber = substr($phoneNumber, 1);
        }

        if (strlen($phoneNumber) === 11 && $phoneNumber[0] === '1') {
            $phoneNumber = substr($phoneNumber, 1);
        }

        return strlen($phoneNumber) === 10 ? $phoneNumber : null;
    }
}
