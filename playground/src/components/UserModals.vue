<template>
  <DrawerForm
    v-model="addEditUserVisible"
    :title="form.id ? 'Edit user' : 'Add user'"
    position="right"
    width="600px"
    :loading="form.processing"
    :errors="form.errors"
    @submit="submit"
  >
    <Card>
      <template #header>
        <div class="font-semibold text-gray-900 dark:text-gray-200 text-md flex items-center space-x-2">
          <div>Details</div>
          <TooltipIcon text="Edit the user details such as name and email." />
        </div>
      </template>
      <template #content>
        <form>
          <div class="space-y-4 w-full">
            <div class="w-full">
              <LabelField name="name" label="Name" required :error="form.errors.name">
                <InputText id="name" v-model="form.name" type="text" fluid :invalid="!!form.errors.name" />
              </LabelField>
            </div>
            <div class="w-full">
              <LabelField name="email" label="Email" required :error="form.errors.email">
                <InputText id="email" v-model="form.email" type="text" fluid :invalid="!!form.errors.email" />
              </LabelField>
            </div>
          </div>
        </form>
      </template>
    </Card>
  </DrawerForm>
  <DialogConfirmation
    v-model="deleteUserVisible"
    :message="`Are you sure you want to delete this user?`"
    @confirm="confirmDelete"
  />
</template>

<script setup>
import { reactive, watch } from 'vue';
import { DrawerForm, DialogConfirmation, LabelField, InputText, Card, TooltipIcon, useModal } from '@atlas/ui';

const { activeState, data, close } = useModal();

const addEditUserVisible = activeState('ADD_EDIT_USER');
const deleteUserVisible = activeState('DELETE_USER');
const addEditUserData = data('ADD_EDIT_USER');

const form = reactive({
  id: null,
  name: '',
  email: '',
  processing: false,
  errors: {},
});

watch(addEditUserVisible, (visible) => {
  if (visible) {
    const user = addEditUserData.value || {};
    form.id = user.id ?? null;
    form.name = user.name ?? '';
    form.email = user.email ?? '';
    form.errors = {};
  }
});

const submit = () => {
  close('ADD_EDIT_USER');
};

const confirmDelete = () => {
  close('DELETE_USER');
};
</script>
