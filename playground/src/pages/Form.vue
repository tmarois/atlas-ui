<script setup>
import { ref } from 'vue';
import InputMask from '@ui/components/InputMask.vue';
import InputNumber from '@ui/components/InputNumber.vue';
import InputText from '@ui/components/InputText.vue';
import Select from '@ui/components/Select.vue';
import Textarea from '@ui/components/Textarea.vue';
import Checkbox from '@ui/components/Checkbox.vue';
import AutoComplete from '@ui/components/AutoComplete.vue';
import MultiSelect from '@ui/components/MultiSelect.vue';
import InputOtp from '@ui/components/InputOtp.vue';

const text = ref('');
const number = ref();
const date = ref('');
const selected = ref();
const options = [
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' },
  { label: 'Option C', value: 'C' },
];
const agree = ref(false);
const message = ref('');
const autoValue = ref('');
const autoOptions = ['Apple', 'Banana', 'Cherry'];
const filteredOptions = ref([]);
const search = (event) => {
  filteredOptions.value = autoOptions.filter((item) =>
    item.toLowerCase().includes(event.query.toLowerCase())
  );
};
const multi = ref([]);
const otp = ref();
</script>

<template>
  <section class="p-4 space-y-6">
    <h2 class="text-xl font-semibold">Form Inputs</h2>
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
    </div>
  </section>
</template>
