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
              <MultiSelect v-model="form.roles" :options="roles" optionLabel="name" optionValue="id" fluid filter :size="item.size" />
            </LabelField>
            <LabelField name="roles_chips" label="Roles (chips)">
              <MultiSelect
                v-model="form.rolesChips"
                display="chip"
                :options="roles"
                optionLabel="name"
                optionValue="id"
                :maxSelectedLabels="6"
                showClear
                fluid
                filter
                :size="item.size"
              />
            </LabelField>
            <LabelField name="roles_chips_create" label="Roles (chips + create)">
              <MultiSelect
                v-model="form.rolesChipsCreate"
                display="chip"
                :options="roles"
                optionLabel="name"
                optionValue="id"
                :maxSelectedLabels="6"
                showClear
                fluid
                filter
                :size="item.size"
                @filter="onRolesFilter"
              >
                <template #emptyfilter>
                  <div class="px-3 py-2.5 text-sm text-surface-600 dark:text-surface-300 flex flex-col space-y-4">
                      <div class="truncate">No results for "<span class="font-semibold">{{ roleFilter }}</span>"</div>
                    <Button
                      :label="createRoleLabel"
                      size="small"
                      raised
                      @click.stop.prevent="createRoleFromQuery()"
                    />
                  </div>
                </template>
              </MultiSelect>
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
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <LabelField name="date" label="Date">
              <DatePicker v-model="form.date" fluid :size="item.size" />
            </LabelField>
            <LabelField name="month" label="Month">
              <DatePicker v-model="form.month" view="month" dateFormat="mm/yy" fluid :size="item.size" />
            </LabelField>
            <LabelField name="time" label="Time">
              <DatePicker v-model="form.time" timeOnly fluid :size="item.size" />
            </LabelField>
          </div>
          <div class="w-full">
            <LabelField name="file" label="File">
              <FileUpload v-model="form.file" clearable :size="item.size" />
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
import { ref, reactive, computed } from 'vue';
import Card from '@atlas/ui/components/Card.vue';
import LabelField from '@atlas/ui/components/LabelField.vue';
import InputText from '@atlas/ui/components/InputText.vue';
import Select from '@atlas/ui/components/Select.vue';
import MultiSelect from '@atlas/ui/components/MultiSelect.vue';
import AutoComplete from '@atlas/ui/components/AutoComplete.vue';
import DatePicker from '@atlas/ui/components/DatePicker.vue';
import InputNumber from '@atlas/ui/components/InputNumber.vue';
import Button from '@atlas/ui/components/Button.vue';
import FileUpload from '@atlas/ui/components/FileUpload.vue';

const form = reactive({
  first_name: 'John',
  last_name: null,
  amount: null,
  email: 'example@example.com',
  roles: [],
  rolesChips: [],
  rolesChipsCreate: [],
  type: 'credit',
  payment: 'disabled',
  agree: false,
  checked: 'on',
  gender: null,
  autorole: null,
  date: null,
  month: null,
  time: null,
  file: null,
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

// Track the active MultiSelect filter text to support "Create new" actions
const roleFilter = ref('');
const onRolesFilter = (event) => {
  roleFilter.value = (event?.value || '').trim();
};

const createRoleLabel = computed(() => (roleFilter.value ? `Create "${roleFilter.value}"` : 'Create'));

const slugify = (text) =>
  (text || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const createRoleFromQuery = () => {
  const label = roleFilter.value;
  if (!label) return;
  let id = slugify(label);
  if (!id) return;
  // Ensure unique id
  const existing = roles.value.find((r) => r.id === id);
  if (existing) {
    // If exists, just select it
    if (!form.rolesChipsCreate.includes(id)) form.rolesChipsCreate.push(id);
    return;
  }
  const newRole = { id, name: label };
  roles.value.push(newRole);
  if (!form.rolesChipsCreate.includes(id)) form.rolesChipsCreate.push(id);
};

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
