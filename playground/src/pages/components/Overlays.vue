<script setup>
import { ref, reactive } from 'vue';
import Card from '@ui/components/Card.vue';
import Button from '@ui/components/Button.vue';
import Drawer from '@ui/components/Drawer.vue';
import Dialog from '@ui/components/Dialog.vue';
import DrawerForm from '@ui/components/DrawerForm.vue';
import TooltipIcon from '@ui/components/TooltipIcon.vue';
import LabelField from '@ui/components/LabelField.vue';
import InputText from '@ui/components/InputText.vue';
import ComponentsLayout from '../../layouts/ComponentsLayout.vue';

const drawerVisible = ref(false);
const dialogVisible = ref(false);
const drawerFormVisible = ref(false);
const form = reactive({
  id: null,
  name: null,
  email: null,
  processing: false,
  errors: {},
});

const openDrawerForm = () => {
  drawerFormVisible.value = true;
};

const submitDrawerForm = () => {
  drawerFormVisible.value = false;
};
</script>

<template>
  <ComponentsLayout>
    <section class="space-y-4">
      <Card pt.content="p-0">
        <template #header>
          <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center">
            Drawer
          </div>
        </template>
        <template #content>
          <div>
            <Button label="Open Drawer" @click="drawerVisible = true" />
          </div>
          <Drawer v-model:visible="drawerVisible" header="Drawer">
            <p class="m-0">Drawer Content</p>
          </Drawer>
        </template>
      </Card>

      <Card pt.content="p-0">
        <template #header>
          <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center">
            Drawer Form
          </div>
        </template>
        <template #content>
          <div>
            <Button label="Open Drawer Form" @click="openDrawerForm" />
          </div>
          <DrawerForm
            v-model="drawerFormVisible"
            :title="form.id ? 'Edit user' : 'Add user'"
            :tabs="[{ title: 'Details' }, { title: 'Line items' }, { title: 'Roles', disabled: true, lockTooltipText: 'Manage roles in settings' }]"
            position="right"
            width="600px"
            :loading="form.processing"
            :errors="form.errors"
            @submit="submitDrawerForm"
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
            <template #tab-1>
              <Card>
                <template #content>
                  <div>This is line items</div>
                </template>
              </Card>
            </template>
          </DrawerForm>
        </template>
      </Card>

      <Card pt.content="p-0">
        <template #header>
          <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center">
            Modal
          </div>
        </template>
        <template #content>
          <div>
            <Button label="Open Modal" @click="dialogVisible = true" />
          </div>
          <Dialog v-model:visible="dialogVisible" header="Modal">
            <p class="m-0">Modal Content</p>
            <template #footer>
              <Button label="Close" @click="dialogVisible = false" />
            </template>
          </Dialog>
        </template>
      </Card>
    </section>
  </ComponentsLayout>
</template>
