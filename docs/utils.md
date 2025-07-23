# Atlas UI Utilities Documentation

## Table of Contents

- [Format Utilities](#format-utilities)
  - [formatBytes](#formatbytes)
  - [formatDate](#formatdate)
  - [formatDatetime](#formatdatetime)
  - [formatNumber](#formatnumber)
  - [formatPercentage](#formatpercentage)
  - [formatSlug](#formatslug)
  - [formatValidURL](#formatvalidurl)
- [Validation Utilities](#validation-utilities)
  - [isEmpty](#isempty)
  - [isNumeric](#isnumeric)
  - [isValidEmail](#isvalidemail)
  - [isValidURL](#isvalidurl)
- [Other Utilities](#other-utilities)
  - [isClient](#isclient)

## Format Utilities

Utilities for formatting various data types into human-readable strings.

### formatBytes

Converts a number of bytes into a human-readable file size string.

**Parameters:**
- `bytes` (number): Number of bytes
- `decimals` (number, optional): Number of decimal places (default: 2)

**Returns:** The formatted size string (e.g. '1.24 MB')

**Example:**
```typescript
import { formatBytes } from '@tmarois/atlas';

formatBytes(1024);        // '1.00 KB'
formatBytes(1536, 1);     // '1.5 KB'
formatBytes(1073741824);  // '1.00 GB'
formatBytes(0);           // '0 Bytes'
```

### formatDate

Formats a date string or Date object into a localized date string.

**Parameters:**
- `utcDatetime` (string | Date): The date to format
- `userTimezone` (string, optional): User's timezone (default: 'UTC')
- `locale` (string, optional): Locale string (default: 'en-US')

**Returns:** The formatted date string

**Example:**
```typescript
import { formatDate } from '@tmarois/atlas';

formatDate('2023-01-15T12:00:00');                  // '1/15/2023'
formatDate('2023-01-15T12:00:00', 'America/New_York'); // '1/15/2023'
formatDate(new Date(2023, 0, 15), 'Europe/London', 'en-GB'); // '15/01/2023'
```

### formatDatetime

Formats a date string or Date object into a localized date and time string.

**Parameters:**
- `utcDatetime` (string | Date): The date to format
- `userTimezone` (string, optional): User's timezone (default: 'UTC')
- `locale` (string, optional): Locale string (default: 'en-US')

**Returns:** The formatted date and time string

**Example:**
```typescript
import { formatDatetime } from '@tmarois/atlas';

formatDatetime('2023-01-15T12:00:00');                  // '1/15/2023, 12:00 PM'
formatDatetime('2023-01-15T12:00:00', 'America/New_York'); // '1/15/2023, 7:00 AM'
formatDatetime(new Date(2023, 0, 15, 12), 'Europe/London', 'en-GB'); // '15/01/2023, 12:00 pm'
```

### formatNumber

Formats a number with thousands separators and optional decimal places.

**Parameters:**
- `n` (string | number): The number to format
- `decimals` (number, optional): Number of decimal places (default: 0)

**Returns:** The formatted number string

**Example:**
```typescript
import { formatNumber } from '@tmarois/atlas';

formatNumber(1000);      // '1,000'
formatNumber(1234.56, 2); // '1,234.56'
formatNumber('5000');     // '5,000'
formatNumber('abc');      // 'Invalid'
```

### formatPercentage

Formats a numeric decimal into a percentage string.

**Parameters:**
- `value` (number): The decimal value (e.g. 0.25 = 25%)
- `decimals` (number, optional): Number of decimal places (default: 0)

**Returns:** The formatted percentage string

**Example:**
```typescript
import { formatPercentage } from '@tmarois/atlas';

formatPercentage(0.25);     // '25%'
formatPercentage(0.3333, 2); // '33.33%'
formatPercentage(1);         // '100%'
formatPercentage(0);         // '0%'
```

### formatSlug

Converts a string into a safe, lowercase slug.

**Parameters:**
- `str` (string): The input string

**Returns:** A hyphenated slug (e.g. 'my-post-title')

**Example:**
```typescript
import { formatSlug } from '@tmarois/atlas';

formatSlug('Hello World');      // 'hello-world'
formatSlug('My Blog Post!');    // 'my-blog-post'
formatSlug('Café & Résumé');    // 'cafe-resume'
formatSlug('   Multiple   Spaces  '); // 'multiple-spaces'
```

### formatValidURL

Normalizes and ensures a URL includes a valid protocol.

**Parameters:**
- `url` (string): Input string (e.g. 'google.com')
- `https` (boolean, optional): Force HTTPS (default: false)

**Returns:** A valid HTTP(S) URL (e.g. 'https://google.com')

**Example:**
```typescript
import { formatValidURL } from '@tmarois/atlas';

formatValidURL('google.com');                // 'http://google.com'
formatValidURL('google.com', true);         // 'https://google.com'
formatValidURL('http://example.com');       // 'http://example.com'
formatValidURL('http://example.com', true); // 'https://example.com'
```

## Validation Utilities

Utilities for validating data types and formats.

### isEmpty

Checks if a value is empty (null, undefined, empty string, empty array, or empty object).

**Parameters:**
- `value` (any): The value to check

**Returns:** Boolean indicating if the value is empty

**Example:**
```typescript
import { isEmpty } from '@tmarois/atlas';

isEmpty('');        // true
isEmpty(null);       // true
isEmpty(undefined);  // true
isEmpty([]);         // true
isEmpty({});         // true
isEmpty('text');     // false
isEmpty([1, 2, 3]);  // false
isEmpty({ key: 'value' }); // false
```

### isNumeric

Checks if a value is a valid number or numeric string.

**Parameters:**
- `value` (any): The value to check

**Returns:** Boolean indicating if the value is numeric

**Example:**
```typescript
import { isNumeric } from '@tmarois/atlas';

isNumeric(123);        // true
isNumeric('123');       // true
isNumeric('123.45');    // true
isNumeric('-123');      // true
isNumeric('abc');       // false
isNumeric('123abc');    // false
isNumeric(null);        // false
```

### isValidEmail

Checks if a string is a valid email address format.

**Parameters:**
- `email` (string): The email string to validate

**Returns:** Boolean indicating if the string is a valid email format

**Example:**
```typescript
import { isValidEmail } from '@tmarois/atlas';

isValidEmail('user@example.com');      // true
isValidEmail('name.surname@domain.co'); // true
isValidEmail('email@subdomain.domain.com'); // true
isValidEmail('plainaddress');          // false
isValidEmail('email@domain');           // false
isValidEmail('@domain.com');            // false
```

### isValidURL

Checks if a string is a valid URL format.

**Parameters:**
- `url` (string): The URL string to validate

**Returns:** Boolean indicating if the string is a valid URL format

**Example:**
```typescript
import { isValidURL } from '@tmarois/atlas';

isValidURL('https://google.com');         // true
isValidURL('http://subdomain.domain.co.uk'); // true
isValidURL('https://domain.com/path?query=123'); // true
isValidURL('domain.com');                 // false (no protocol)
isValidURL('https://');                   // false (no domain)
isValidURL('not a url');                  // false
```

## Other Utilities

### isClient

Detects if the code is running in a client/browser environment (as opposed to server-side).

**Parameters:** None

**Returns:** Boolean indicating if running in a browser

**Example:**
```typescript
import { isClient } from '@tmarois/atlas';

// Only execute browser-specific code when in the browser
if (isClient) {
  window.addEventListener('resize', handleResize);
}
```
