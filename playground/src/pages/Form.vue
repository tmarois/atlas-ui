<script setup>
import { ref, reactive } from 'vue';
import Column from 'primevue/column';
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
import Accordion from '@ui/components/Accordion.vue';
import AccordionPanel from '@ui/components/AccordionPanel.vue';
import AccordionHeader from '@ui/components/AccordionHeader.vue';
import AccordionContent from '@ui/components/AccordionContent.vue';
import Tabs from '@ui/components/Tabs.vue';
import TabList from '@ui/components/TabList.vue';
import Tab from '@ui/components/Tab.vue';
import TabPanels from '@ui/components/TabPanels.vue';
import TabPanel from '@ui/components/TabPanel.vue';
import DataTable from '@ui/components/DataTable.vue';
import { useModal } from '@ui/composables';

const { open } = useModal();

const products = ref(
    Array.from({ length: 100 }, (_, i) => ({
        code: `P-${String(i + 1).padStart(3, '0')}`,
        name: `Product ${i + 1}`,
        category: `Category ${((i % 10) + 1)}`,
        quantity: Math.floor(Math.random() * 100) + 1,
    }))
);

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
    <h2 class="text-xl font-semibold">Forms</h2>
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
                    <LabelChoice v-model="form.payment" label="Now">
                      <RadioButton inputId="payment1" name="payment" value="Now" />
                    </LabelChoice>
                    <LabelChoice v-model="form.payment" label="Later">
                      <RadioButton inputId="payment2" name="payment" value="Later" />
                    </LabelChoice>
                    <LabelChoice v-model="form.payment" label="Disabled">
                      <RadioButton inputId="payment3" name="payment" value="disabled" :disabled="true" />
                    </LabelChoice>
                  </div>
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="agree" label="Terms">
                  <div class="space-y-2 mt-2">
                    <LabelChoice v-model="form.agree" label="I agree to the terms">
                      <Checkbox inputId="agree" binary />
                    </LabelChoice>
                    <LabelChoice v-model="form.agree" label="Terms disabled">
                      <Checkbox inputId="agreeDisabled" binary :disabled="true" />
                    </LabelChoice>
                  </div>
                </LabelField>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex items-center space-x-4">
              <Button label="Save" @click="open('TEST')" />
              <Button outlined label="Show blank" @click="open('BLANK_DRAWER')" />
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
                    <LabelChoice v-model="form.payment" label="Now">
                      <RadioButton inputId="payment1d" name="payment2" value="Now" :disabled="true" />
                    </LabelChoice>
                    <LabelChoice v-model="form.payment" label="Later">
                      <RadioButton inputId="payment2d" name="payment2" value="Later" :disabled="true" />
                    </LabelChoice>
                    <LabelChoice v-model="form.payment" label="Disabled">
                      <RadioButton inputId="payment3d" name="payment2" value="disabled" :disabled="true" />
                    </LabelChoice>
                  </div>
                </LabelField>
              </div>
              <div class="w-full">
                <LabelField name="agree" label="Terms">
                  <div class="space-y-2 mt-2">
                    <LabelChoice v-model="form.agree" label="I agree to the terms">
                      <Checkbox inputId="agree2" binary :disabled="true" />
                    </LabelChoice>
                    <LabelChoice v-model="form.agree" label="Terms disabled">
                      <Checkbox inputId="agree2d" binary :disabled="true" />
                    </LabelChoice>
                  </div>
                </LabelField>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex items-center space-x-4">
              <Button label="Save" @click="open('TEST')" :disabled="true" />
              <Button outlined label="Show blank" @click="open('BLANK_DRAWER')" :disabled="true" />
            </div>
          </template>
        </Card>
      </div>
      <div class="flex space-x-4">
        <Card :pt="{ content: { class: 'p-0' } }">
          <template #header>
            <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center space-x-2">
              <div>Accordion</div>
            </div>
          </template>
          <template #content>
            <Accordion value="0">
              <AccordionPanel value="0">
                <AccordionHeader>Header I</AccordionHeader>
                <AccordionContent>
                  <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="1">
                <AccordionHeader>Header II</AccordionHeader>
                <AccordionContent>
                  <p class="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                  </p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="2" disabled>
                <AccordionHeader>Header III (disabled)</AccordionHeader>
                <AccordionContent>
                  <p class="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                  </p>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </template>
        </Card>
        <Card :pt="{ content: { class: 'p-0' } }">
          <template #header>
            <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center space-x-2">
              <div>Tabs</div>
            </div>
          </template>
          <template #content>
            <Tabs value="0">
              <TabList>
                <Tab value="0">Header I</Tab>
                <Tab value="1">Header II</Tab>
                <Tab value="2">Header III</Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="0">
                  <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </TabPanel>
                <TabPanel value="1">
                  <p class="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </TabPanel>
                <TabPanel value="2">
                  <p class="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </template>
        </Card>
      </div>
      <div>
        <Card :pt="{ content: { class: 'p-0' } }">
          <template #header>
            <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center space-x-2">
              <div>Virtual table</div>
            </div>
          </template>
          <template #content>
            <div>
              <DataTable
                :value="products"
                tableStyle="min-width: 50rem"
                paginator
                :rows="25"
                scrollable
                scrollHeight="300px"
              >
                <Column field="code" header="Code" sortable></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
              </DataTable>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

