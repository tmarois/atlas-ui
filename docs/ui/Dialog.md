# Dialog
```ts
import { Dialog, Button } from '@atlas/ui';
```

```vue
<Dialog v-model:visible="visible">
  Content
  <template #footer>
    <Button label="Close" @click="visible = false" />
  </template>
</Dialog>
```

##### API

Refer to the [PrimeVue Dialog API](https://primevue.org/dialog/#api).

