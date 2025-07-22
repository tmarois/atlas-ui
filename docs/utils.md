# Atlas Utility Functions Documentation

This document provides detailed documentation for the utility functions available in the Atlas utilities collection.

## Table of Contents

- [Format Utilities](#format-utilities)
  - [formatNumber](#formatnumber)
  - [formatToCurrency](#formattocurrency)
  - [formatPercentage](#formatpercentage)
  - [formatBytes](#formatbytes)
  - [formatToDate](#formattodate)
  - [formatToDatetime](#formattodatetime)
  - [formatToSlug](#formattoslug)
  - [formatToValidURL](#formattovalidurl)
- [Validation Utilities](#validation-utilities)
  - [isValidURL](#isvalidurl)
  - [isValidEmail](#isvalidemail)
  - [isNumeric](#isnumeric)
  - [isEmpty](#isempty)
- [Environment Utilities](#environment-utilities)
  - [isClient](#isclient)

## Format Utilities

These utilities help format data for display to users.

### formatNumber

Formats a number with commas and optional decimal places.

```js
import { formatNumber } from '@atlas/utils';

formatNumber(1000000);      // "1,000,000"
formatNumber(1000000, 2);   // "1,000,000.00"
formatNumber(null);         // ""
formatNumber('invalid');    // "Invalid"
```

**Parameters:**
- `n` (String|Number): The number to format
- `decimals` (Number, optional): The number of decimal places to include (default: 0)

**Returns:** String - The formatted number or empty string if input is invalid

### formatToCurrency

Formats a number as currency with specified currency code.

```js
import { formatToCurrency } from '@atlas/utils';

formatToCurrency(1000000);                 // "$1,000,000.00"
formatToCurrency(1000000, 0);              // "$1,000,000"
formatToCurrency(1000000, 2, 'EUR');       // "€1,000,000.00"
formatToCurrency('invalid', 2, 'USD');     // "Invalid"
```

**Parameters:**
- `n` (String|Number): The number to format
- `decimals` (Number, optional): The number of decimal places (default: 2)
- `currency` (String, optional): The currency code (default: 'USD')
- `invalid` (String, optional): Text to display for invalid input (default: 'Invalid')

**Returns:** String - The formatted currency string

### formatPercentage

Formats a decimal value into a percentage string.

```js
import { formatPercentage } from '@atlas/utils';

formatPercentage(0.25);      // "25%"
formatPercentage(0.255, 1);  // "25.5%"
formatPercentage(null);      // ""
```

**Parameters:**
- `value` (Number): The decimal value to format (e.g., 0.25 for 25%)
- `decimals` (Number, optional): The number of decimal places (default: 0)

**Returns:** String - The formatted percentage or empty string if input is invalid

### formatBytes

Converts bytes into a human-readable file size.

```js
import { formatBytes } from '@atlas/utils';

formatBytes(1024);          // "1.00 KB"
formatBytes(1048576);       // "1.00 MB"
formatBytes(1073741824);    // "1.00 GB"
formatBytes(0);             // "0 Bytes"
formatBytes('invalid');     // ""
```

**Parameters:**
- `bytes` (Number): The number of bytes
- `decimals` (Number, optional): The number of decimal places (default: 2)

**Returns:** String - The formatted file size or empty string if input is invalid

### formatToDate

Formats a UTC timestamp into a date in the user's timezone.

```js
import { formatToDate } from '@atlas/utils';

// Assuming user in New York timezone
formatToDate('2025-01-01T12:00:00');                              // "1/1/2025"
formatToDate('2025-01-01T12:00:00', 'Europe/London');             // "1/1/2025"
formatToDate('2025-01-01T12:00:00', 'America/New_York', 'en-GB'); // "01/01/2025"
```

**Parameters:**
- `utcDatetime` (String): The UTC timestamp
- `userTimezone` (String, optional): The user's timezone (default: 'America/New_York')
- `locale` (String, optional): The locale for formatting (default: 'en-US')

**Returns:** String - The formatted date or empty string if input is invalid

### formatToDatetime

Formats a UTC timestamp into a date and time in the user's timezone (without seconds).

```js
import { formatToDatetime } from '@atlas/utils';

// Assuming user in New York timezone
formatToDatetime('2025-01-01T12:00:00');                              // "1/1/2025, 7:00 AM"
formatToDatetime('2025-01-01T12:00:00', 'Europe/London');             // "1/1/2025, 12:00 PM"
formatToDatetime('2025-01-01T12:00:00', 'America/New_York', 'en-GB'); // "01/01/2025, 07:00"
```

**Parameters:**
- `utcDatetime` (String): The UTC timestamp
- `userTimezone` (String, optional): The user's timezone (default: 'America/New_York')
- `locale` (String, optional): The locale for formatting (default: 'en-US')

**Returns:** String - The formatted date and time or empty string if input is invalid

### formatToSlug

Creates a URL-friendly slug from a string.

```js
import { formatToSlug } from '@atlas/utils';

formatToSlug('Hello World');              // "hello-world"
formatToSlug('This is a test!');          // "this-is-a-test"
formatToSlug('Multiple--Hyphens  here');  // "multiple-hyphens-here"
```

**Parameters:**
- `str` (String): The string to convert to a slug

**Returns:** String - The formatted slug

### formatToValidURL

Ensures a string is a valid URL, optionally forcing HTTPS.

```js
import { formatToValidURL } from '@atlas/utils';

formatToValidURL('example.com');                // "http://example.com"
formatToValidURL('example.com', true);          // "https://example.com"
formatToValidURL('http://example.com', true);   // "https://example.com"
formatToValidURL('https://example.com');        // "https://example.com"
```

**Parameters:**
- `url` (String): The URL to format
- `https` (Boolean, optional): Force HTTPS protocol (default: false)

**Returns:** String - The formatted URL or empty string if input is invalid

## Validation Utilities

These utilities help validate data.

### isValidURL

Checks if a string is a valid HTTP or HTTPS URL.

```js
import { isValidURL } from '@atlas/utils';

isValidURL('https://example.com');      // true
isValidURL('http://example.com');       // true
isValidURL('example.com');              // false (no protocol)
isValidURL('ftp://example.com');        // false (not http/https)
```

**Parameters:**
- `url` (String): The URL string to validate

**Returns:** Boolean - true if valid, false otherwise

### isValidEmail

Checks if a string is a valid email address.

```js
import { isValidEmail } from '@atlas/utils';

isValidEmail('user@example.com');       // true
isValidEmail('invalid-email');          // false
isValidEmail('');                       // false
```

**Parameters:**
- `email` (String): The email string to validate

**Returns:** Boolean - true if valid, false otherwise

### isNumeric

Checks if a value is a number (integer or float).

```js
import { isNumeric } from '@atlas/utils';

isNumeric(123);            // true
isNumeric('123');          // true
isNumeric('123.45');       // true
isNumeric('abc');          // false
```

**Parameters:**
- `value` (String|Number): The value to check

**Returns:** Boolean - true if numeric, false otherwise

### isEmpty

Checks if a string, array, or object is empty.

```js
import { isEmpty } from '@atlas/utils';

isEmpty('');               // true
isEmpty([]);               // true
isEmpty({});               // true
isEmpty(null);             // true
isEmpty(undefined);        // true
isEmpty('text');           // false
isEmpty([1, 2, 3]);        // false
isEmpty({ key: 'value' }); // false
```

**Parameters:**
- `value` (String|Array|Object|null|undefined): The value to check

**Returns:** Boolean - true if empty, false otherwise

## Environment Utilities

These utilities help determine the execution environment.

### isClient

Determines if code is running in the browser (client-side).

```js
import { isClient } from '@atlas/utils';

// In browser environment
console.log(isClient); // true

// In Node.js or SSR environment
console.log(isClient); // false
```

**Type:** Boolean constant
- `true` if running in a browser environment
- `false` if running in a server environment (Node.js, SSR)

Useful for safely accessing browser-only APIs like `window` or `document` in environments that support Server-Side Rendering (SSR).
