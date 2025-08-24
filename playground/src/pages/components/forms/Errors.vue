<template>
  <section class="space-y-4">
    <div class="flex space-x-4">
      <Card>
        <template #header>
          <div class="font-semibold text-gray-900 dark:text-gray-100 text-md">
            Edit (errors)
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
            <div class="w-full flex items-center space-x-4">
              <LabelField name="date" label="Date" :error="errors.date">
                <DatePicker id="date" v-model="form.date" fluid :invalid="true" />
              </LabelField>
              <LabelField name="month" label="Month" :error="errors.month">
                <DatePicker id="month" v-model="form.month" view="month" dateFormat="mm/yy" fluid :invalid="true" />
              </LabelField>
              <LabelField name="time" label="Time" :error="errors.time">
                <DatePicker id="time" v-model="form.time" timeOnly fluid :invalid="true" />
              </LabelField>
            </div>
            <div class="w-full">
              <LabelField name="description" label="Description" :error="errors.description">
                <Textarea id="description_invalid" v-model="form.description" fluid autoResize :invalid="true" />
              </LabelField>
            </div>
            <div class="w-full">
              <LabelField name="file" label="File" :error="errors.file">
                <FileUpload v-model="form.file" clearable invalid />
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
import Card from '@atlas/ui/components/Card.vue';
import Button from '@atlas/ui/components/Button.vue';
import LabelField from '@atlas/ui/components/LabelField.vue';
import InputText from '@atlas/ui/components/InputText.vue';
import Select from '@atlas/ui/components/Select.vue';
import MultiSelect from '@atlas/ui/components/MultiSelect.vue';
import AutoComplete from '@atlas/ui/components/AutoComplete.vue';
import DatePicker from '@atlas/ui/components/DatePicker.vue';
import Textarea from '@atlas/ui/components/Textarea.vue';
import { useModal } from '@atlas/ui/composables';
import Errors from '@atlas/ui/components/Errors.vue';
import FileUpload from '@atlas/ui/components/FileUpload.vue';

const { open } = useModal();

const form = reactive({
  first_name: 'John',
  last_name: null,
  roles: [],
  gender: null,
  autorole: null,
  date: null,
  month: null,
  time: null,
  description: null,
  file: null,
});

const errors = reactive({
  first_name: 'First name is required',
  last_name: 'Last name is required',
  gender: 'Gender is required',
  roles: 'Roles are required',
  autorole: 'Role is required',
  date: 'Date is required',
  month: 'Month is required',
  time: 'Time is required',
  description: 'Description is required',
  file: 'File is required',
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
