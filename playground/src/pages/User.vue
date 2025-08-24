<template>
    <AppLayout
        title="User"
        :pageUrl="route.fullPath"
        :pageTitle="'User'"
    >
        <template #headerTitle>
            <div class="pr-2">
                <Button
                    as="a"
                    text
                    icon="pi pi-arrow-left"
                    size="small"
                    href="/users"
                />
            </div>
            <div class="flex flex-col space-y-0 py-3">
                <div class="text-md font-medium">{{ item.name }}</div>
                <div class="text-sm text-slate-500">{{ item.email }}</div>
            </div>
        </template>
        <template #headerAction>
            <Button
                size="small"
                label="Edit"
                @click="open('ADD_EDIT_USER', item)"
            />
        </template>
        <template #pageSideContent>
            <div class="h-[1000px] w-[350px] p-4">
                <div>This is my side content</div>
            </div>
        </template>
        <template #default>
            <div class="h-[1000px]">
                <div>This is my page content</div>
                <div>{{ item }}</div>
            </div>
        </template>
        <template #modals>
            <UserModals />
        </template>
    </AppLayout>
</template>
<script setup>
import { useRoute } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import { Button, useModal } from '@atlas/ui';
import UserModals from '../components/UserModals.vue';

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});

const { open } = useModal();
const route = useRoute();
</script>
