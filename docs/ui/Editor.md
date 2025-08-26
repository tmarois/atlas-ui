# Editor

See the [Editor guide](../editor.md) for dependencies and usage.


```ts
import { Editor } from '@atlas/ui';
```

```vue
<Editor v-model="content" placeholder="Write something..." />
```

##### Props

- `modelValue` – bound editor content.
- `placeholder` – placeholder text.
- `editorClass` – additional classes for the editor area.
- `autofocus` – focus editor on mount.
- `toolbar` – show the formatting toolbar.
- `toolbarOptions` – array of toolbar buttons to display.
- `textOnly` – restrict to plain text input.
- `toolbarClass` – additional classes for the toolbar.

