<template>
  <section class="space-y-4">
    <div class="flex flex-col space-y-4">
      <div class="flex space-x-4">
        <Card>
          <template #header>
            <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div>Edit</div>
                <TooltipInfo>This is where you edit your form data</TooltipInfo>
              </div>
              <div class="flex items-center space-x-2">
                <ToggleSwitch v-model="form.checked" true-value="on" false-value="off" />
                <ButtonMenu :items="manageItems" />
              </div>
            </div>
          </template>
          <template #content>
            <div class="space-y-4 w-full">
              <div class="w-full flex items-center space-x-4">
                <LabelField name="first_name" label="First Name" required tooltip="This is a tooltip with some cool information about First Name fields. You can type an entire paragraph here, it is really cool.">
                  <InputText id="first_name" v-model="form.first_name" type="text" fluid clearable />
                </LabelField>
                <LabelField name="last_name" label="Last Name" required>
                  <InputText id="last_name" placeholder="Last Name" v-model="form.last_name" type="text" fluid />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="email" label="Email" required>
                  <InputText id="email" v-model="form.email" type="text" fluid />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="gender" label="Gender">
                  <Select v-model="form.gender" showClear :options="genders" optionLabel="gender" optionValue="id" fluid filter />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="roles" label="Roles">
                  <MultiSelect v-model="form.roles" showClear :options="roles" optionLabel="name" optionValue="id" fluid filter />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="roles" label="Roles (chips)">
                  <MultiSelect v-model="form.roles" display="chip" :options="roles" optionLabel="name" optionValue="id" fluid filter :maxSelectedLabels="6" />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="roles" label="Roles (autocomplete)">
                  <AutoComplete v-model="form.autorole" :suggestions="filteredRoles" @complete="search" optionLabel="label" optionValue="id" fluid dropdown showClear forceSelection />
                </LabelField>
              </div>
              <div class="w-full flex items-center space-x-4">
                <LabelField name="date" label="Date">
                  <DatePicker id="date" v-model="form.date" fluid />
                </LabelField>
                <LabelField name="month" label="Month">
                  <DatePicker id="month" v-model="form.month" view="month" dateFormat="mm/yy" fluid />
                </LabelField>
                <LabelField name="time" label="Time">
                  <DatePicker id="time" v-model="form.time" timeOnly fluid />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="description" label="Description">
                  <Textarea id="description" v-model="form.description" fluid autoResize />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="file" label="File">
                  <FileUpload v-model="form.file" clearable />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="files" label="Files">
                  <FileUpload v-model="form.files" multiple clearable />
                </LabelField>
              </div>
            </div>
          </template>
        </Card>
        <Card>
          <template #header>
            <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center justify-between space-x-2">
              <div>Edit (disabled)</div>
              <ToggleSwitch v-model="form.checked" :disabled="true" true-value="on" false-value="off" />
            </div>
          </template>
          <template #content>
            <div class="space-y-4 w-full">
              <div class="w-full flex items-center space-x-4">
                <LabelField name="first_name" label="First Name" required tooltip="This is a tooltip with some cool information about First Name fields. You can type an entire paragraph here, it is really cool.">
                  <InputText id="first_name" v-model="form.first_name" type="text" fluid :disabled="true" clearable />
                </LabelField>
                <LabelField name="last_name" label="Last Name" required>
                  <InputText id="last_name" placeholder="Last Name" v-model="form.last_name" type="text" fluid :disabled="true" />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="email" label="Email" required>
                  <InputText id="email" v-model="form.email" type="text" fluid :disabled="true" />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="gender" label="Gender">
                  <Select v-model="form.gender" showClear :options="genders" optionLabel="gender" optionValue="id" fluid filter :disabled="true" />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="roles" label="Roles">
                  <MultiSelect v-model="form.roles" showClear :options="roles" optionLabel="name" optionValue="id" fluid filter :disabled="true" />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="roles" label="Roles (chips)">
                  <MultiSelect v-model="form.roles" display="chip" :options="roles" optionLabel="name" optionValue="id" fluid filter :maxSelectedLabels="6" :disabled="true" />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="roles" label="Roles (autocomplete)">
                  <AutoComplete v-model="form.autorole" :suggestions="filteredRoles" @complete="search" optionLabel="label" optionValue="id" fluid :disabled="true" dropdown showClear forceSelection />
                </LabelField>
              </div>
              <div class="w-full flex items-center space-x-4">
                <LabelField name="date" label="Date">
                  <DatePicker id="date" v-model="form.date" fluid :disabled="true" />
                </LabelField>
                <LabelField name="month" label="Month">
                  <DatePicker id="month" v-model="form.month" view="month" dateFormat="mm/yy" fluid :disabled="true" />
                </LabelField>
                <LabelField name="time" label="Time">
                  <DatePicker id="time" v-model="form.time" timeOnly fluid :disabled="true" />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="description" label="Description">
                  <Textarea id="description_disabled" v-model="form.description" fluid :disabled="true" autoResize />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="file" label="File">
                  <FileUpload v-model="form.file" clearable :disabled="true" />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="files" label="Files">
                  <FileUpload v-model="form.files" multiple clearable :disabled="true" />
                </LabelField>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="flex space-x-4">
        <Card>
          <template #header>
            <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center space-x-2">
              <div>Cash</div>
            </div>
          </template>
          <template #content>
            <div class="space-y-4 w-full">
              <Alert>
                <div>Your account is in good standing, but just keep in mind that we need to do some checks. Be sure to check out our help docs.</div>
              </Alert>
              <div class="w-full flex items-center space-x-4">
                <LabelField name="amount" label="Amount" required>
                  <InputNumber id="amount" v-model="form.amount" mode="currency" currency="USD" locale="en-US" fluid placeholder="$0.00" />
                </LabelField>
                <LabelField name="roles" label="Roles">
                  <Select v-model="form.type" showClear :options="types" optionLabel="name" optionValue="id" fluid />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="when" label="Charge">
                  <div class="space-y-2 mt-2">
                    <LabelRadioButton v-model="form.payment" label="Now" inputId="payment1" name="payment" value="Now" />
                    <LabelRadioButton v-model="form.payment" label="Later" inputId="payment2" name="payment" value="Later" />
                    <LabelRadioButton v-model="form.payment" label="Disabled" inputId="payment3" name="payment" value="disabled" :disabled="true" />
                  </div>
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="agree" label="Terms">
                  <div class="space-y-2 mt-2">
                    <LabelCheckbox v-model="form.agree" label="I agree to the terms" inputId="agree" binary />
                    <LabelCheckbox v-model="form.agree" label="Terms disabled" inputId="agreeDisabled" binary :disabled="true" />
                  </div>
                </LabelField>
              </div>
            </div>
          </template>
          <template #footer>
              <div class="flex items-center space-x-4">
                <Button label="Save" @click="open('TEST')" />
              </div>
          </template>
        </Card>
        <Card>
          <template #header>
            <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center space-x-2">
              <div>Cash (disabled)</div>
            </div>
          </template>
          <template #content>
            <div class="space-y-4 w-full">
              <Alert warning>
                <div>Your account is <span class="font-semibold">negative</span>, but just keep in mind that we need to do some checks. Be sure to check out our help docs.</div>
                <template #actions>
                  <Button size="small" label="Add funds" @click="open('TEST')" :disabled="true" />
                </template>
              </Alert>
              <div class="w-full flex items-center space-x-4">
                <LabelField name="amount" label="Amount" required>
                  <InputNumber id="amount" v-model="form.amount" mode="currency" currency="USD" locale="en-US" fluid placeholder="$0.00" :disabled="true" />
                </LabelField>
                <LabelField name="roles" label="Roles">
                  <Select v-model="form.type" showClear :options="types" optionLabel="name" optionValue="id" fluid :disabled="true" />
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="when" label="Charge">
                  <div class="space-y-2 mt-2">
                    <LabelRadioButton v-model="form.payment" label="Now" inputId="payment1d" name="payment2" value="Now" :disabled="true" />
                    <LabelRadioButton v-model="form.payment" label="Later" inputId="payment2d" name="payment2" value="Later" :disabled="true" />
                    <LabelRadioButton v-model="form.payment" label="Disabled" inputId="payment3d" name="payment2" value="disabled" :disabled="true" />
                  </div>
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="agree" label="Terms">
                  <div class="space-y-2 mt-2">
                    <LabelCheckbox v-model="form.agree" label="I agree to the terms" inputId="agree2" binary :disabled="true" />
                    <LabelCheckbox v-model="form.agree" label="Terms disabled" inputId="agree2d" binary :disabled="true" />
                  </div>
                </LabelField>
              </div>
            </div>
          </template>
          <template #footer>
              <div class="flex items-center space-x-4">
                <Button label="Save" @click="open('TEST')" :disabled="true" />
              </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Card from '@atlas/ui/components/Card.vue';
import ToggleSwitch from '@atlas/ui/components/ToggleSwitch.vue';
import Button from '@atlas/ui/components/Button.vue';
import ButtonMenu from '@atlas/ui/components/ButtonMenu.vue';
import LabelField from '@atlas/ui/components/LabelField.vue';
import InputText from '@atlas/ui/components/InputText.vue';
import Select from '@atlas/ui/components/Select.vue';
import MultiSelect from '@atlas/ui/components/MultiSelect.vue';
import AutoComplete from '@atlas/ui/components/AutoComplete.vue';
import DatePicker from '@atlas/ui/components/DatePicker.vue';
import Textarea from '@atlas/ui/components/Textarea.vue';
import FileUpload from '@atlas/ui/components/FileUpload.vue';
import InputNumber from '@atlas/ui/components/InputNumber.vue';
import Alert from '@atlas/ui/components/Alert.vue';
import LabelCheckbox from '@atlas/ui/components/LabelCheckbox.vue';
import LabelRadioButton from '@atlas/ui/components/LabelRadioButton.vue';
import TooltipInfo from '@atlas/ui/components/TooltipInfo.vue';
import { useModal } from '@atlas/ui/composables';

const { open } = useModal();

const form = reactive({
    first_name: 'John',
    last_name: 'Doe',
    amount: 100,
    email: 'example@example.com',
    roles: ['admin', 'user'],
    type: 'credit',
    payment: 'Now',
    agree: true,
    checked: 'on',
    gender: 'male',
    autorole: 'admin',
    date: new Date('2024-01-01'),
    month: new Date('2024-02-01'),
    time: new Date('2024-01-01T12:00:00'),
    description: 'Example description',
    file: null,
    files: [],
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

const types = ref([
    { id: 'credit', name: 'Credit' },
    { id: 'debit', name: 'Debit' },
    { id: 'transfer', name: 'Transfer' },
    { id: 'deposit', name: 'Deposit' },
]);

const manageItems = [
    {
        label: 'Edit',
        icon: 'text-sm pi pi-pencil',
        action: 'edit'
    },
    {
        label: 'Download',
        icon: 'text-sm pi pi-download',
        action: 'download',
        disabled: true
    },
    {
        separator: true
    },
    {
        label: 'Archive',
        icon: 'text-sm pi pi-trash',
        action: 'delete'
    }
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
