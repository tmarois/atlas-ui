<script setup>
import { ref, computed } from 'vue';
import LayoutApp from '@ui/components/App/Index.vue';
import Table from '@ui/components/App/Table/Table.vue';
import ButtonMenu from '@ui/components/ButtonMenu.vue';
import TableActions from '@ui/components/App/Table/Actions.vue';
import InputText from '@ui/components/InputText.vue';
import Button from '@ui/components/Button.vue';
import Select from '@ui/components/Select.vue';
import Link from '../components/RouterLink.vue';
import { useModal } from '@ui/composables';

const { open } = useModal();

const tableActionMenuItems = ref([
  { label: 'Edit', action: 'edit' },
  { label: 'Delete', action: 'delete', disabled: true, tooltip: 'This action is disabled.' },
  {
    label: 'More',
    children: [
      { label: 'Export', action: 'export' },
      { separator: true },
      { label: 'Duplicate', action: 'dup', disabled: true },
      { label: 'Email', action: 'email', disabled: true },
    ],
  },
]);

const handleTableAction = (action) => {
  if (action === 'clear') {
    resetSelection();
  }
};

const columns = [
  { key: 'edit', header: '', class: 'w-[20px]', sortable: false, frozen: true, style: 'min-width: 40px', locked: true, hidden: true },
  { key: 'name', header: 'Name', sortable: true, frozen: true, style: 'min-width: 200px', locked: true },
  { key: 'email', header: 'Email', sortable: true, style: 'min-width: 200px' },
  { key: 'email2', header: 'Email 2', sortable: true, style: 'min-width: 200px' },
  { key: 'email3', header: 'Email 3', sortable: true, style: 'min-width: 200px' },
  { key: 'email4', header: 'Email 4', sortable: true, style: 'min-width: 200px' },
];

const perPageOptions = [
  { label: '15', value: 15 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

const search = ref('');
const perPage = ref(15);
const sortField = ref('name');
const sortOrder = ref(1);
const viewFields = ref(['edit', 'name', 'email']);
const selectAll = ref(false);
const selected = ref([]);

const defaultColumnList = ['edit', 'name', 'email'];

const resetSelection = () => {
  selectAll.value = false;
  selected.value = [];
};

const onSort = ({ field, order }) => {
  sortField.value = field;
  sortOrder.value = order;
};

const mockUsers = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  email2: `user${i + 1}.2@example.com`,
  email3: `user${i + 1}.3@example.com`,
  email4: `user${i + 1}.4@example.com`,
}));

const filteredUsers = computed(() =>
  mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase())
  )
);

const sortedUsers = computed(() =>
  [...filteredUsers.value].sort((a, b) => {
    const field = sortField.value;
    const order = sortOrder.value;
    if (a[field] < b[field]) return -1 * order;
    if (a[field] > b[field]) return 1 * order;
    return 0;
  })
);

const paginatedUsers = computed(() => sortedUsers.value.slice(0, perPage.value));

const userTotal = computed(() => filteredUsers.value.length);
</script>

<template>
  <LayoutApp title="Users" :pageTitle="`Users (${userTotal})`" containerClass="p-0" :noScroll="true">
    <template v-if="(selectAll ? userTotal : selected.length) > 0" #headerTitle>
      <TableActions
        :selectedCount="selectAll ? userTotal : selected.length"
        :menuItems="tableActionMenuItems"
        @action="handleTableAction"
      />
    </template>
    <template #headerAction>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <InputText
            v-model="search"
            placeholder="Search user name or email"
            class="w-[400px]"
            size="small"
            clearable
          />
          <Button size="small" label="Add user" @click="open('ADD_EDIT_USER')" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="bg-white dark:bg-surface-800">
        <Table
          :items="paginatedUsers"
          :itemTotal="userTotal"
          :columns="columns"
          :sortField="sortField"
          :sortOrder="sortOrder"
          :selected="selected"
          :selectAll="selectAll"
          :defaultColumnList="defaultColumnList"
          :activeColumnList="viewFields"
          hasSelection
          hasCustomizeColumns
          :scrollOffset="53"
          scrollable
          @update:selected="selected = $event"
          @update:selectAll="selectAll = $event"
          @update:activeColumnList="viewFields = $event"
          @sort="onSort"
        >
          <template #edit="{ data }">
            <div class="w-full flex items-center justify-center">
              <ButtonMenu
                :items="[
                  { label: 'Edit', icon: 'pi pi-pencil', click: () => open('ADD_EDIT_USER', data) },
                  { separator: true },
                  { label: 'Archive', icon: 'pi pi-trash', click: () => open('DELETE_USER', data) },
                ]"
              />
            </div>
          </template>
          <template #name="{ data }">
            <Link class="hover:underline text-black font-medium" :href="`/users/${data.id}`">
              {{ data.name }}
            </Link>
          </template>
        </Table>
      </div>
    </template>
    <template #footer>
      <Select
        v-model="perPage"
        :options="perPageOptions"
        size="small"
        option-label="label"
        option-value="value"
      />
    </template>
  </LayoutApp>
</template>

