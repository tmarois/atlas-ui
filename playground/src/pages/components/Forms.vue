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
import InputNumber from '@ui/components/InputNumber.vue';
import Alert from '@ui/components/Alert.vue';
import LabelChoice from '@ui/components/LabelChoice.vue';
import RadioButton from '@ui/components/RadioButton.vue';
import Checkbox from '@ui/components/Checkbox.vue';
import Tabs from '@ui/components/Tabs.vue';
import TabList from '@ui/components/TabList.vue';
import Tab from '@ui/components/Tab.vue';
import TabPanels from '@ui/components/TabPanels.vue';
import TabPanel from '@ui/components/TabPanel.vue';
import { useModal } from '@ui/composables';

const { open } = useModal();

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

<template>
  <section class="p-4 space-y-4">
    <Tabs value="0">
      <TabList>
        <Tab value="0">General</Tab>
        <Tab value="1">Sizing</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div class="flex flex-col space-y-4">
      <div class="flex space-x-4">
        <Card>
          <template #header>
            <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center justify-between">
              <div>Edit</div>
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
                    <LabelChoice v-model="form.payment" label="Now" inputId="payment1" name="payment" value="Now">
                      <RadioButton />
                    </LabelChoice>
                    <LabelChoice v-model="form.payment" label="Later" inputId="payment2" name="payment" value="Later">
                      <RadioButton />
                    </LabelChoice>
                    <LabelChoice v-model="form.payment" label="Disabled" inputId="payment3" name="payment" value="disabled" :disabled="true">
                      <RadioButton />
                    </LabelChoice>
                  </div>
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="agree" label="Terms">
                  <div class="space-y-2 mt-2">
                    <LabelChoice v-model="form.agree" label="I agree to the terms" inputId="agree" binary>
                      <Checkbox />
                    </LabelChoice>
                    <LabelChoice v-model="form.agree" label="Terms disabled" inputId="agreeDisabled" binary :disabled="true">
                      <Checkbox />
                    </LabelChoice>
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
                    <LabelChoice v-model="form.payment" label="Now" inputId="payment1d" name="payment2" value="Now" :disabled="true">
                      <RadioButton />
                    </LabelChoice>
                    <LabelChoice v-model="form.payment" label="Later" inputId="payment2d" name="payment2" value="Later" :disabled="true">
                      <RadioButton />
                    </LabelChoice>
                    <LabelChoice v-model="form.payment" label="Disabled" inputId="payment3d" name="payment2" value="disabled" :disabled="true">
                      <RadioButton />
                    </LabelChoice>
                  </div>
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="agree" label="Terms">
                  <div class="space-y-2 mt-2">
                    <LabelChoice v-model="form.agree" label="I agree to the terms" inputId="agree2" binary :disabled="true">
                      <Checkbox />
                    </LabelChoice>
                    <LabelChoice v-model="form.agree" label="Terms disabled" inputId="agree2d" binary :disabled="true">
                      <Checkbox />
                    </LabelChoice>
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
    </TabPanel>
    <TabPanel value="1">
      <div class="space-y-4">
        <Card class="w-full">
          <template #content>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <LabelField name="first_name" label="First Name">
                  <InputText v-model="form.first_name" fluid />
                </LabelField>
                <LabelField name="last_name" label="Last Name">
                  <InputText v-model="form.last_name" fluid />
                </LabelField>
                <LabelField name="email" label="Email">
                  <InputText v-model="form.email" fluid />
                </LabelField>
                <LabelField name="type" label="Type">
                  <Select v-model="form.type" :options="types" optionLabel="name" optionValue="id" fluid />
                </LabelField>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <LabelField name="amount" label="Amount">
                  <InputNumber v-model="form.amount" mode="currency" currency="USD" locale="en-US" fluid placeholder="$0.00" />
                </LabelField>
                <LabelField name="roles" label="Roles">
                  <MultiSelect v-model="form.roles" :options="roles" optionLabel="name" optionValue="id" fluid />
                </LabelField>
                <LabelField name="autorole" label="Auto Role">
                  <AutoComplete v-model="form.autorole" :suggestions="filteredRoles" @complete="search" optionLabel="label" optionValue="id" fluid dropdown showClear />
                </LabelField>
                <LabelField name="gender" label="Gender">
                  <Select v-model="form.gender" :options="genders" optionLabel="gender" optionValue="id" fluid />
                </LabelField>
              </div>
              <div class="flex items-center space-x-4">
                <Button outlined label="Cancel" />
                <Button label="Save" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </TabPanel>
  </TabPanels>
    </Tabs>
  </section>
</template>

