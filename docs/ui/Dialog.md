# Dialog

Modal overlay for user interactions.

```ts
import { Dialog, Button } from '@atlas/ui';
```

## Usage

```vue
<Dialog v-model:visible="visible">
  Content
  <template #footer>
    <Button label="Close" @click="visible = false" />
  </template>
</Dialog>
```

## API

### Props
See the [PrimeVue Dialog API](https://primevue.org/dialog/#api) for a full list of props.

### Slots
See the [PrimeVue Dialog API](https://primevue.org/dialog/#api) for available slots.

### Events
See the [PrimeVue Dialog API](https://primevue.org/dialog/#api) for emitted events.
