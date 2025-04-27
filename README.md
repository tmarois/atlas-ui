# Atlas

## Composables

### useModal

```js
// Importing via alias path
import { useModal } from '@atlas/composables';

const { openModal, closeModal, modalActiveState, modalData } = useModal()

const isModal = modalActiveState('modal-key')

// open and close based on reactive bool
isModal.value = true // or false

// OR open and set props for global state
openModal('modal-key', { name: 'Custom Name' })

// access the modalProps 
modalData.value.name
```

## 📦 Utilities

Importing via alias path

```js
import { formatNumber } from '@atlas/utils/format';
```

### formatNumber

`formatNumber(n, decimals = 0)`

```js
formatNumber(1000000) // "1,000,000"
formatNumber(1020.2, 2) // "1,020.20"
formatNumber(10000.4567, 2); // "10,000.46"
```

### formatToCurrency

`formatToCurrency(n, decimals = 2, currency = 'USD', invalid = 'Invalid')`

```js
formatToCurrency(1000000) // "$1,000,000.00"
formatToCurrency(1000000,0) // "$1,000,000"
formatToCurrency(1020.2) // "$1,020.20"

formatToCurrency(5000, 0, 'EUR'); // "€5,000" 
```

### formatToDate

`formatToDate(utcDatetime, userTimezone = 'America/New_York', locale = 'en-US')`

```js
formatToDate('2024-05-01T14:30:00'); // "5/1/2024"
```

### formatToDatetime

`formatToDatetime(utcDatetime, userTimezone = 'America/New_York', locale = 'en-US')`

```js
formatToDatetime('2024-05-01T14:30:00'); // "5/1/2024, 10:30 AM"
```

### formatToSlug

`formatToSlug(str)`

```js
formatToSlug('Hello    World!!') // "hello-world"
```

### formatToValidURL

`formatToValidURL(url, https = false)`

```js
formatToValidURL('example.com'); // "https://example.com"
formatToValidURL(' http://example.com'); // "http://example.com"
formatToValidURL('http://example.com', true); // "https://example.com"
formatToValidURL('HTTPS://example.com'); // "https://example.com"
```
