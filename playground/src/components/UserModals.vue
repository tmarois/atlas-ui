<script setup>
import { reactive, watch } from 'vue';
import { DrawerForm, DialogConfirmation, LabelField, InputText, useModal } from '@atlas/ui';

const { activeState, data, close } = useModal();

const addEditUserVisible = activeState('ADD_EDIT_USER');
const deleteUserVisible = activeState('DELETE_USER');
const addEditUserData = data('ADD_EDIT_USER');
const deleteUserData = data('DELETE_USER');

const form = reactive({
  id: null,
  name: '',
  email: '',
  processing: false,
  errors: {},
});

watch(addEditUserVisible, (visible) => {
  if (visible) {
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

<template>
  <DrawerForm
    v-model="addEditUserVisible"
    :title="form.id ? 'Edit user' : 'Add user'"
    :loading="form.processing"
    :errors="form.errors"
    @submit="submit"
  >
    <div class="space-y-4 w-full">
      <LabelField name="name" label="Name">
        <InputText id="name" v-model="form.name" type="text" />
      </LabelField>
      <LabelField name="email" label="Email">
        <InputText id="email" v-model="form.email" type="text" />
      </LabelField>
    </div>
  </DrawerForm>
  <DialogConfirmation
    v-model="deleteUserVisible"
    :message="`Are you sure you want to delete this user?`"
    @confirm="confirmDelete"
  />
</template>
