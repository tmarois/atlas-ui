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
import LabelCheckbox from '@ui/components/LabelCheckbox.vue';
import LabelRadioButton from '@ui/components/LabelRadioButton.vue';
import { useModal } from '@ui/composables';
import ComponentsLayout from '../../../layouts/ComponentsLayout.vue';

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
]);
</script>

<template>
    <ComponentsLayout>
        <section class="space-y-4">
            <Card>
                <template #header>
                    <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center">Overview</div>
                </template>
                <template #content>
                    <Button label="Create" @click="open('open drawer')" />
                </template>
            </Card>
            <Card>
                <template #header>
                    <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center">Account</div>
                </template>
                <template #content>
                    <div class="space-y-4">
                        <div class="w-full">
                            <LabelField name="first_name" label="First Name" required :error="form.errors?.first_name">
                                <InputText v-model="form.first_name" type="text" fluid :invalid="!!form.errors?.first_name" />
                            </LabelField>
                        </div>
                        <div class="w-full">
                            <LabelField name="last_name" label="Last Name" :error="form.errors?.last_name">
                                <InputText v-model="form.last_name" type="text" fluid :invalid="!!form.errors?.last_name" />
                            </LabelField>
                        </div>
                        <div class="w-full">
                            <LabelField name="amount" label="Amount" required :error="form.errors?.amount">
                                <InputNumber
                                    v-model="form.amount"
                                    class="w-full"
                                    :invalid="!!form.errors?.amount"
                                />
                            </LabelField>
                        </div>
                        <div class="w-full">
                            <LabelField name="email" label="Email" required :error="form.errors?.email">
                                <InputText v-model="form.email" type="text" fluid :invalid="!!form.errors?.email" />
                            </LabelField>
                        </div>
                        <div class="w-full">
                            <LabelField name="roles" label="Roles" required :error="form.errors?.roles">
                                <MultiSelect
                                    v-model="form.roles"
                                    filter
                                    :options="roles"
                                    option-label="name"
                                    option-value="id"
                                    placeholder="Select roles"
                                    class="w-full"
                                    :invalid="!!form.errors?.roles"
                                    selection-limit="3"
                                />
                            </LabelField>
                        </div>
                    </div>
                </template>
            </Card>
        </section>
    </ComponentsLayout>
</template>
