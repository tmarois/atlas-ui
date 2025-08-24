<template>
    <AppLayout
        title="Users"
        :pageTitle="`Users (${userTotal})`"
        containerClass="p-0"
        :noScroll="true"
    >
        <template #headerTitle v-if="(selectAll ? userTotal : selected?.length) > 0">
            <TableActions
                :selectedCount="selectAll ? userTotal : selected?.length"
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
                    :items="users.data"
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
        <template #footerAction>
            [placeholder]
        </template>
        <template #modals>
            <UserModals />
        </template>
    </AppLayout>
</template>
<script setup>
import { ref, computed } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import { Table, ButtonMenu, TableActions, InputText, Button, Select, useModal } from '@atlas/ui';
import UserModals from '../components/UserModals.vue';
import Link from '../components/RouterLink.vue';

const { open } = useModal();

const tableActionMenuItems = ref([
    { label: 'Edit', action: 'edit' },
    { label: 'Delete', action: 'delete', disabled: true, tooltip: 'This action is disabled.'},
    { label: 'More',
        children:
        [
            { label: 'Export', action: 'export' },
            { separator: true },
            { label: 'Duplicate', action: 'dup', disabled: true, },
            { label: 'Email', action: 'email', disabled: true },
        ]
    }
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
    { key: 'email3', header: 'Email 3', sortable: true, style: 'min-width: 400px;' },
    { key: 'email4', header: 'Email 3', sortable: true, style: 'min-width: 200px;' },
    { key: 'email5', header: 'Email 3', sortable: true, style: 'min-width: 200px;' },
    { key: 'email6', header: 'Email 3', sortable: true, style: 'min-width: 200px;', group: 'Email fields' },
    { key: 'email7', header: 'Email 3', sortable: true, style: 'min-width: 200px;', group: 'Email fields' },
    { key: 'email8', header: 'Email 3', sortable: true, style: 'min-width: 200px;', group: 'Email fields' },
    { key: 'email9', header: 'Email 3', sortable: true, style: 'min-width: 200px;', group: 'Email fields' },
    { key: 'email0', header: 'Email 3', sortable: true, style: 'min-width: 200px;', group: 'Email fields' },
];

const perPageOptions = [
    { label: '15', value: 15 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
];

const search = ref('');
const perPage = ref(100);
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
    email5: `user${i + 1}.5@example.com`,
    email6: `user${i + 1}.6@example.com`,
    email7: `user${i + 1}.7@example.com`,
    email8: `user${i + 1}.8@example.com`,
    email9: `user${i + 1}.9@example.com`,
    email0: `user${i + 1}.0@example.com`,
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

const users = computed(() => ({
    data: paginatedUsers.value,
    total: filteredUsers.value.length,
    links: [],
}));

const userTotal = computed(() => users.value.total);
</script>
