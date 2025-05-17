# 🪐 Atlas

Atlas UI kit is still under-construction and expect breaking changes. 

## Install

```bash
npm install github:tmarois/atlas-ui#semver:^1.1
```

Peer dependencies:

```
"@tabler/icons-vue": "^3.31.0",
"primeicons": "^7.0.0",
"primevue": "^4.0.0",
"tailwind-merge": "^3.2.0",
"tailwindcss": "^4.1.4",
"tailwindcss-primeui": "^0.6.1",
"vue": "^3.4.0"
```

If using inertia composables make sure `@inertiajs/vue3` is installed.

## 💾 Composables

### useModal

```js
// Importing via alias path
import { useModal } from '@atlas/composables';

// ------------------------------------

const { open, close, activeState, data } = useModal();

const isModal = activeState('modal-key');

// Open or close modal reactively
isModal.value = true;  // open
isModal.value = false; // close

// OR open and attach props/data
open('modal-key', { name: 'Custom Name' });

// Access the modal data reactively
data('modal-key').value.name;

// ------------------------------------

onOpen('modal-key', (data) => {
    console.log('Modal opened with data:', data);
});

onClose('modal-key', (data) => {
    console.log('Modal closed. Last data was:', data);
});
```

## ✅ Format (Utils)

Importing via alias path

```js
import { formatNumber } from '@atlas/utils/format';
```

------------------------------------------------

### 👉 formatNumber

`formatNumber(n, decimals = 0)`

```js
formatNumber(1000000) // "1,000,000"
formatNumber(1020.2, 2) // "1,020.20"
formatNumber(10000.4567, 2); // "10,000.46"
```

------------------------------------------------

### 👉 formatToCurrency

`formatToCurrency(n, decimals = 2, currency = 'USD', invalid = 'Invalid')`

```js
formatToCurrency(1000000) // "$1,000,000.00"
formatToCurrency(1000000,0) // "$1,000,000"
formatToCurrency(1020.2) // "$1,020.20"

formatToCurrency(5000, 0, 'EUR'); // "€5,000" 
```

------------------------------------------------

### 👉 formatPercentage

`formatPercentage(value, decimals = 0)`

```js
formatPercentage(0.2); // "25%"
formatPercentage(0.2567, 1) // 25.7%
formatPercentage(1); // "100%"
```

------------------------------------------------

### 👉 formatBytes

`formatBytes(bytes, decimals = 2)`

```js
formatBytes(1024) // 1.00 KB
formatBytes(1500, 1) // 1.50 KB
formatBytes(1073741824) // 1.00 GB
```

------------------------------------------------

### 👉 formatToDate

`formatToDate(utcDatetime, userTimezone = 'America/New_York', locale = 'en-US')`

```js
formatToDate('2024-05-01T14:30:00'); // "5/1/2024"
```

------------------------------------------------

### 👉 formatToDatetime

`formatToDatetime(utcDatetime, userTimezone = 'America/New_York', locale = 'en-US')`

```js
formatToDatetime('2024-05-01T14:30:00'); // "5/1/2024, 10:30 AM"
```

------------------------------------------------

### 👉 formatToSlug

`formatToSlug(str)`

```js
formatToSlug('Hello    World!!') // "hello-world"
```

------------------------------------------------

### 👉 formatToValidURL

`formatToValidURL(url, https = false)`

```js
formatToValidURL('example.com'); // "https://example.com"
formatToValidURL(' http://example.com'); // "http://example.com"
formatToValidURL('http://example.com', true); // "https://example.com"
formatToValidURL('HTTPS://example.com'); // "https://example.com"
```

------------------------------------------------

## ✅ Validate (Utils)

Importing via alias path

```js
import { isValidURL } from '@atlas/utils/validate';
```

------------------------------------------------

### 👉 isValidURL

`isValidURL(url)`

```js
isValidURL('https://example.com') // true
isValidURL('www.example.com') // false
```

------------------------------------------------

### 👉 isNumeric

`isNumeric(value)`

```js
isNumeric(5) // true
isNumeric('5') // true
isNumeric('test') // false
```

------------------------------------------------

### 👉 isEmpty

`isEmpty(value)`

```js
isEmpty(null) // true
isEmpty([]) // true
isEmpty([1, 2, 3]) // false
```
