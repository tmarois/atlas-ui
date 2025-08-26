# Errors
```ts
import { Errors } from '@atlas/ui';
```

```vue
<Errors :errors="formErrors" />
```

##### Props

- `errors` – record or array of error messages.
- `failed` – show a default error message when true and no errors are provided.
- `title` – optional heading text.
- `expandDefault` – expand errors by default.
- `pt` – passthrough options to customize internal elements.

##### Slots

- `default` – custom template for each error. Slot props: `{ error }`.
- `defaultError` – content shown when `failed` is true and no errors exist.

