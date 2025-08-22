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
import Accordion from '@ui/components/Accordion.vue'
import AccordionPanel from '@ui/components/AccordionPanel.vue'
import AccordionHeader from '@ui/components/AccordionHeader.vue'
import AccordionContent from '@ui/components/AccordionContent.vue'
import AutoComplete from '@ui/components/AutoComplete.vue'
import MultiSelect from '@ui/components/MultiSelect.vue'
import InputOtp from '@ui/components/InputOtp.vue'
import InputGroup from '@ui/components/InputGroup.vue'

const text = ref('')
const number = ref()
const date = ref('')
const selected = ref()
const options = [
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' },
  { label: 'Option C', value: 'C' }
]
const agree = ref(false)
const message = ref('')
const active = ref('0')
const autoValue = ref('')
const autoOptions = ['Apple', 'Banana', 'Cherry']
const filteredOptions = ref([])
const search = (event) => {
  filteredOptions.value = autoOptions.filter((item) =>
    item.toLowerCase().includes(event.query.toLowerCase())
  )
}
const multi = ref([])
const otp = ref()
const website = ref('')
</script>

<template>
  <main class="mx-auto max-w-3xl space-y-12 p-8">
    <section>
      <h2 class="mb-4 text-xl font-semibold">Buttons</h2>
      <div class="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button severity="secondary">Secondary</Button>
        <Button severity="success">Success</Button>
        <Button severity="info">Info</Button>
        <Button severity="warning">Warning</Button>
        <Button severity="danger">Danger</Button>
        <Button severity="help">Help</Button>
        <Button outlined>Outlined</Button>
        <Button text>Text</Button>
        <Button raised>Raised</Button>
        <Button rounded>Rounded</Button>
        <Button :loading="true" label="loading" />
        <Button disabled>Disabled</Button>
      </div>
    </section>

    <section>
      <h2 class="mb-4 text-xl font-semibold">Card</h2>
      <Card>
        <template #header>Example Card</template>
        <template #content>
          <p>This is a simple card showcasing how content is displayed inside.</p>
        </template>
      </Card>
    </section>

    <section>
      <h2 class="mb-4 text-xl font-semibold">Accordion</h2>
      <Accordion v-model:value="active">
        <AccordionPanel value="0">
          <AccordionHeader>Header I</AccordionHeader>
          <AccordionContent>
            <p class="m-0">Content I</p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader>Header II</AccordionHeader>
          <AccordionContent>
            <p class="m-0">Content II</p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
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
        <AutoComplete
          v-model="autoValue"
          :suggestions="filteredOptions"
          @complete="search"
          placeholder="AutoComplete"
        />
        <MultiSelect
          v-model="multi"
          :options="options"
          optionLabel="label"
          optionValue="value"
          placeholder="MultiSelect"
          class="w-full"
        />
        <Textarea v-model="message" placeholder="Textarea" rows="4" />
        <div class="flex items-center gap-2">
          <Checkbox v-model="agree" inputId="agree" binary />
          <label for="agree">Checkbox</label>
          <span class="text-sm text-gray-500">{{ agree }}</span>
        </div>
        <InputOtp v-model="otp" />
        <InputGroup class="w-full md:col-span-2">
          <span class="p-inputgroup-addon">https://</span>
          <InputText v-model="website" placeholder="example" />
          <span class="p-inputgroup-addon">.com</span>
        </InputGroup>
      </div>
    </section>
  </main>
</template>

