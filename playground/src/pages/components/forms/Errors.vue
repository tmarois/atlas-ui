<template>
  <section class="space-y-4">
    <div class="flex space-x-4">
      <Card>
        <template #header>
          <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center justify-between">
            <div>Edit (errors)</div>
            <div class="flex items-center space-x-2">
              <ToggleSwitch v-model="form.checked" true-value="on" false-value="off" />
              <ButtonMenu :items="manageItems" />
            </div>
          </div>
        </template>
        <template #content>
          <div class="space-y-4 w-full">
            <div class="w-full flex items-center space-x-4">
              <LabelField name="first_name" label="First Name" required :error="errors.first_name">
                <InputText id="first_name_invalid" v-model="form.first_name" type="text" fluid clearable :invalid="true" />
              </LabelField>
              <LabelField name="last_name" label="Last Name" required :error="errors.last_name">
                <InputText id="last_name_invalid" placeholder="Last Name" v-model="form.last_name" type="text" fluid :invalid="true" />
              </LabelField>
            </div>
            <div class="w-full">
              <LabelField name="gender" label="Gender" :error="errors.gender">
                <Select v-model="form.gender" showClear :options="genders" optionLabel="gender" optionValue="id" fluid filter :invalid="true" />
              </LabelField>
            </div>
            <div class="w-full">
              <LabelField name="roles" label="Roles" :error="errors.roles">
                <MultiSelect v-model="form.roles" showClear :options="roles" optionLabel="name" optionValue="id" fluid filter :invalid="true" />
              </LabelField>
            </div>
            <div class="w-full">
              <LabelField name="roles" label="Roles (chips)" :error="errors.roles">
                <MultiSelect v-model="form.roles" display="chip" :options="roles" optionLabel="name" optionValue="id" fluid filter :maxSelectedLabels="6" :invalid="true" />
              </LabelField>
            </div>
            <div class="w-full">
              <LabelField name="autorole" label="Roles (autocomplete)" :error="errors.autorole">
                <AutoComplete v-model="form.autorole" :suggestions="filteredRoles" @complete="search" optionLabel="label" optionValue="id" fluid dropdown showClear forceSelection :invalid="true" />
              </LabelField>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="space-y-4 w-full">
            <Errors :errors="errors" />
            <div class="flex items-center space-x-4">
              <Button label="Save" @click="open('TEST')" />
              <Button label="Cancel" variant="text" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Card from '@ui/components/Card.vue';
import ToggleSwitch from '@ui/components/ToggleSwitch.vue';
import Button from '@ui/components/Button.vue';
import ButtonMenu from '@ui/components/ButtonMenu.vue';
import LabelField from '@ui/components/LabelField.vue';
import InputText from '@ui/components/InputText.vue';
import Select from '@ui/components/Select.vue';
import MultiSelect from '@ui/components/MultiSelect.vue';
import AutoComplete from '@ui/components/AutoComplete.vue';
import { useModal } from '@ui/composables';
import Errors from '@ui/components/Errors.vue';

const { open } = useModal();

const form = reactive({
  first_name: 'John',
  last_name: null,
  roles: [],
  gender: null,
  autorole: null,
  checked: 'on',
});

const errors = reactive({
  first_name: 'First name is required',
  last_name: 'Last name is required',
  gender: 'Gender is required',
  roles: 'Roles are required',
  autorole: 'Role is required',
});

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

const manageItems = [
  {
    label: 'Edit',
    icon: 'text-sm pi pi-pencil',
    action: 'edit',
  },
  {
    label: 'Download',
    icon: 'text-sm pi pi-download',
    action: 'download',
    disabled: true,
  },
  {
    separator: true,
  },
  {
    label: 'Archive',
    icon: 'text-sm pi pi-trash',
    action: 'delete',
  },
];

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
