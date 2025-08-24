<template>
    <Head :title="title" />
    <LayoutApp
        :isSideNav="true"
        :pageTitle="pageTitle"
        :pageTabs="pageTabs"
        :pageNavItems="pageNavItems"
        :pageUrl="$page.url"
        :sideBarItems="sideBarItems"
        :topBarItems="topBarItems"
        :linkComponent="Link"
        :noScroll="noScroll"
        :containerClass="containerClass"
        widthClass="w-full"
    >
        <template #navActions>
            <NavOptionDarkToggle />
            <ProfileMenu
                :user="user"
                :items="profileMenuItems"
                :avatar-only="true"
                headerLink="/"
                :linkComponent="Link"
            />
        </template>
        <template #pageSideContent>
            <slot name="pageSideContent" />
        </template>
        <template #headerTitle>
            <slot name="headerTitle" />
        </template>
        <template #headerAction>
            <slot name="headerAction" />
        </template>
        <template #default>
            <slot />
        </template>
        <template #footer>
            <slot name="footer" />
        </template>
        <template #footerAction>
            <slot name="footerAction" />
        </template>
        <template #modals>
            <slot name="modals" />
        </template>
    </LayoutApp>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Head } from '@inertiajs/vue3';
import LayoutApp from '@ui/components/App/Index.vue';
import NavOptionDarkToggle from '../components/NavOptionDarkToggle.vue';
import ProfileMenu from '../components/ProfileMenu.vue';
import Link from '../components/RouterLink.vue';
import { sideBarItems } from '../sideBarItems.js';

const user = usePage().props.user || {};

const props = defineProps({
    title: { type: String, default: 'Home' },
    pageTitle: { type: String, default: 'Home' },
    pageTabs: { type: Array, default: () => [] },
    pageNavItems: { type: Array, default: () => [] },
    containerClass: { type: String, default: 'm-auto p-4' },
    noScroll: { type: Boolean, default: false }
});

const profileMenuItems = computed(() => [
    { separator: true },
    { label: 'Company Name', icon: 'pi pi-building-columns', href: '/' },
    { separator: true },
    { label: 'Billing & Plan', icon: 'pi pi-credit-card', href: '/' },
    { label: 'Manage Access', icon: 'pi pi-users', href: '/' },
    { label: 'Integrations', icon: 'pi pi-objects-column', href: '/' },
    { label: 'Settings', icon: 'pi pi-cog', href: '/' },
    { label: 'Status page', icon: 'pi pi-cog', href: 'https://google.com', external: true },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', href: '/logout' }
]);

const topBarItems = computed(() => [
    { href: '/', label: 'Home' },
    { href: '/users', label: 'Users', parent: null },
    {
        label: 'Overview',
        children: [
            { href: '/theme', label: 'Theme' },
            { href: '/theme/settings', label: 'Settings' }
        ]
    },
    {
        label: 'Components',
        children: [
            { href: '/components/buttons', label: 'Buttons' },
            { href: '/components/forms', label: 'Forms' }
        ]
    }
]);
</script>
