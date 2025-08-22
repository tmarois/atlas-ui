<script setup>
import { ref } from 'vue'
import Button from '@ui/components/Button.vue'
import Card from '@ui/components/Card.vue'
import Checkbox from '@ui/components/Checkbox.vue'
import InputMask from '@ui/components/InputMask.vue'
import InputNumber from '@ui/components/InputNumber.vue'
import InputText from '@ui/components/InputText.vue'
import Select from '@ui/components/Select.vue'
import Textarea from '@ui/components/Textarea.vue'

const text = ref('')
const number = ref()
const date = ref('')
const selected = ref()
const options = [
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' }
]
const agree = ref(false)
const message = ref('')
</script>

<template>
  <main class="mx-auto max-w-3xl space-y-12 p-8">
    <section>
      <h2 class="mb-4 text-xl font-semibold">Buttons</h2>
      <div class="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button severity="secondary">Secondary</Button>
        <Button severity="success">Success</Button>
      </div>
    </section>

    <section>
      <h2 class="mb-4 text-xl font-semibold">Card</h2>
      <Card>
        <template #title>Example Card</template>
        <template #content>
          <p>This is a simple card showcasing how content is displayed inside.</p>
        </template>
      </Card>
    </section>

    <section>
      <h2 class="mb-4 text-xl font-semibold">Form Inputs</h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputText v-model="text" placeholder="InputText" />
        <InputNumber v-model="number" placeholder="InputNumber" />
        <InputMask v-model="date" mask="99/99/9999" placeholder="InputMask" />
        <Select
          v-model="selected"
          :options="options"
          optionLabel="label"
          optionValue="value"
          placeholder="Select"
          class="w-full"
        />
        <Textarea v-model="message" placeholder="Textarea" rows="4" />
        <div class="flex items-center gap-2">
          <Checkbox v-model="agree" inputId="agree" />
          <label for="agree">Checkbox</label>
        </div>
      </div>
    </section>
  </main>
</template>

