<template>
  <section class="space-y-4">
    <Card v-for="item in formSizes" :key="item.label" class="w-full">
      <template #header>
        <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center">
          {{ item.label }}
        </div>
      </template>
      <template #content>
        <div class="space-y-4">
          <div class="flex items-end space-x-4">
            <InputText v-model="form.query" fluid :size="item.size" class="flex-1" />
            <Button label="Search" :size="item.size" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <LabelField name="first_name" label="First Name">
              <InputText v-model="form.first_name" fluid :size="item.size" />
            </LabelField>
            <LabelField name="last_name" label="Last Name">
              <InputText v-model="form.last_name" fluid :size="item.size" />
            </LabelField>
            <LabelField name="email" label="Email">
              <InputText v-model="form.email" fluid :size="item.size" />
            </LabelField>
            <LabelField name="type" label="Type">
              <Select v-model="form.type" :options="types" optionLabel="name" optionValue="id" fluid :size="item.size" />
            </LabelField>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <LabelField name="amount" label="Amount">
              <InputNumber
                v-model="form.amount"
                mode="currency"
                currency="USD"
                locale="en-US"
                fluid
                placeholder="$0.00"
                :size="item.size"
              />
            </LabelField>
            <LabelField name="roles" label="Roles">
              <MultiSelect v-model="form.roles" :options="roles" optionLabel="name" optionValue="id" fluid :size="item.size" />
            </LabelField>
            <LabelField name="autorole" label="Auto Role">
              <AutoComplete
                v-model="form.autorole"
                :suggestions="filteredRoles"
                @complete="search"
                optionLabel="label"
                optionValue="id"
                fluid
                dropdown
                showClear
                :size="item.size"
              />
            </LabelField>
            <LabelField name="gender" label="Gender">
              <Select v-model="form.gender" :options="genders" optionLabel="gender" optionValue="id" fluid :size="item.size" />
            </LabelField>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex items-center space-x-4">
          <Button label="Save" :size="item.size" />
          <Button label="Cancel" text :size="item.size" />
        </div>
      </template>
    </Card>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Card from '@ui/components/Card.vue';
import LabelField from '@ui/components/LabelField.vue';
import InputText from '@ui/components/InputText.vue';
import Select from '@ui/components/Select.vue';
import MultiSelect from '@ui/components/MultiSelect.vue';
import AutoComplete from '@ui/components/AutoComplete.vue';
import InputNumber from '@ui/components/InputNumber.vue';
import Button from '@ui/components/Button.vue';

const form = reactive({
  first_name: 'John',
  last_name: null,
  amount: null,
  email: 'example@example.com',
  roles: [],
  type: 'credit',
  payment: 'disabled',
  agree: false,
  checked: 'on',
  gender: null,
  autorole: null,
  query: null,
});

const formSizes = [
  { label: 'Default', size: undefined },
  { label: 'Small', size: 'small' },
  { label: 'Large', size: 'large' },
];

const roles = ref([
  { id: 'admin', name: 'Admin' },
  { id: 'user', name: 'User' },
  { id: 'guest', name: 'Guest' },
  { id: 'banned', name: 'Banned' },
  { id: 'pending', name: 'Pending' },
  { id: 'suspended', name: 'Suspended' },
  { id: 'deleted', name: 'Deleted' },
  { id: 'blacklisted', name: 'Blacklisted' },
  { id: 'archived', name: 'Archived' },
]);

const genders = ref([
  { id: 'male', gender: 'Male' },
  { id: 'female', gender: 'Female' },
  { id: 'other', gender: 'Other' },
]);

const autoRoles = ref([
  { id: 'admin', label: 'Admin' },
  { id: 'user', label: 'User' },
  { id: 'guest', label: 'Guest' },
  { id: 'banned', label: 'Banned' },
  { id: 'pending', label: 'Pending' },
  { id: 'suspended', label: 'Suspended' },
  { id: 'deleted', label: 'Deleted' },
  { id: 'blacklisted', label: 'Blacklisted' },
  { id: 'archived', label: 'Archived' },
]);

const types = ref([
  { id: 'credit', name: 'Credit' },
  { id: 'debit', name: 'Debit' },
  { id: 'transfer', name: 'Transfer' },
  { id: 'deposit', name: 'Deposit' },
]);

const filteredRoles = ref([...autoRoles.value]);

const search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredRoles.value = [...autoRoles.value];
    } else {
      filteredRoles.value = autoRoles.value.filter((country) => {
        return country.label.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};
</script>
