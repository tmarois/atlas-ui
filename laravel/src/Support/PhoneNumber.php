<?php

namespace Atlas\Laravel\Support;

class PhoneNumber
{
    /**
     * Formats a 10-digit US phone number to (XXX) XXX-XXXX format.
     *
     * @param string|int|null $phoneNumber The raw phone number input
     * @return string|null Formatted phone number or null if input is empty
     */
    public static function format(null|int|string $phoneNumber): ?string
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

    /**
     * Normalizes a US phone number by stripping out country code, symbols, and formatting.
     * Returns only the 10-digit number or null if invalid.
     *
     * @param string $phoneNumber The raw phone number string
     * @return string|null 10-digit phone number or null if invalid
     */
    public static function normalize(string $phoneNumber): ?string
    {
        $phoneNumber = preg_replace('/[^+\\d]|(?<=\\+|1)[^0-9]/', '', $phoneNumber);

        if (strlen($phoneNumber) > 1 && $phoneNumber[0] === '+') {
            $phoneNumber = substr($phoneNumber, 1);
        }

        if (strlen($phoneNumber) === 11 && $phoneNumber[0] === '1') {
            $phoneNumber = substr($phoneNumber, 1);
        }

        return strlen($phoneNumber) === 10 ? $phoneNumber : null;
    }
}
