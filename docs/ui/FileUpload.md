# FileUpload
```ts
import { FileUpload } from '@atlas/ui';
```

```vue
<script setup lang="ts">
import { ref } from 'vue';

const file = ref<File | null>(null);

const submit = async () => {
    if (!file.value) return;

    const form = new FormData();
    form.append('file', file.value);

    await fetch('/upload', { method: 'POST', body: form });
};
</script>

<template>
  <form @submit.prevent="submit">
    <FileUpload v-model="file" clearable />
    <button type="submit">Upload</button>
  </form>
</template>
```

Use `v-model` to bind the selected file or files. Submit them with `FormData` to upload to your server. When `multiple` is true, `modelValue` becomes an array and each file should be appended separately.

```vue
<script setup lang="ts">
import { ref } from 'vue';

const files = ref<File[]>([]);

const submit = async () => {
    const form = new FormData();
    files.value.forEach((file, i) => form.append(`files[${i}]`, file));
    await fetch('/upload', { method: 'POST', body: form });
};
</script>

<template>
  <form @submit.prevent="submit">
    <FileUpload v-model="files" multiple clearable />
    <button type="submit">Upload</button>
  </form>
</template>
```

##### Props

- `modelValue` – selected `File` or `File[]`.
- `multiple` – allow selecting multiple files.
- `clearable` – show a clear button to reset the selection.
- `chooseLabel` – text for the choose button.
- `size` – `'small' | 'large'` to match `InputText` heights (34 px and 42 px).
- `invalid` – show the error style with a red border.

##### Events

- `update:modelValue` – emitted with the selected file or files.


