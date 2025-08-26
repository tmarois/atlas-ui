# Popover

Transient overlay for supplemental content.

```ts
import { Popover, Button } from '@atlas/ui';
```

## Usage

```vue
<Popover ref="popover">
  <template #content>More info</template>
</Popover>
<Button label="Show" @click="popover.toggle($event)" />
```

## API

### Props
See the [PrimeVue Popover API](https://primevue.org/popover/#api) for a full list of props.

### Slots
See the [PrimeVue Popover API](https://primevue.org/popover/#api) for available slots.

### Events
See the [PrimeVue Popover API](https://primevue.org/popover/#api) for emitted events.
