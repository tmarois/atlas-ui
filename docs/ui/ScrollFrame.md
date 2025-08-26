# ScrollFrame
```ts
import { ScrollFrame } from '@atlas/ui';
```

```vue
<ScrollFrame
  page
  scroll-key="settings"
  :add-offset="16"
  class="p-4"
>
  <!-- scrollable content -->
</ScrollFrame>
```

Provides a scrollable container sized to the viewport. When `page` is set it locks body scrolling and uses `scroll-key` to preserve position.

##### Props

- `scrollKey` (string | null) – identifier used by the scroll composable to persist position. Defaults to `null`.
- `page` (boolean) – lock body scroll and treat the frame as a full page. Defaults to `false`.
- `allowBodyScroll` (boolean) – allow body scroll even when `page` is `true`. Defaults to `false`.
- `offset` (number | null) – explicit pixel offset for height calculation. Defaults to element top position.
- `addOffset` (number) – extra pixels subtracted from height. Defaults to `0`.
- `rootClass` (string) – additional classes for the frame element. Defaults to `overflow-y-auto`.

