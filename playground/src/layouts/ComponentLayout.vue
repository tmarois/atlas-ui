<template>
    <LayoutApp
        :title="title"
        :pageTitle="title"
        :pageTabs="pageTabs"
        :pageNavItems="pageNavItems"
        :sideBarItems="sideBarItems"
        :linkComponent="Link"
        :isSideNav="true"
    >
        <slot />
    </LayoutApp>
</template>

<script setup>
import LayoutApp from '@ui/components/App/Index.vue';
import Link from '../components/RouterLink.vue';
import { sideBarItems } from '../sideBarItems.js';

const props = defineProps({
    title: {
        type: String,
        default: 'Home'
    },
    pageTabs: {
        type: Array,
        default: () => []
    },
});

const pageNavItems = [
    { label: 'Components', children: [
        { label: 'Forms', href: '/components/forms' },
        { label: 'Editor', href: '/components/editor', parent: '/components/editor' },
    ] },
    { label: 'My Account', children: [
        { label: 'Account', href: '/settings/account' },
        { label: 'Security', href: '/settings/security' },
    ] },
    { label: 'Notifications', children: [
        { label: 'Email', href: '/settings/notifications/email' },
        { label: 'Push', href: '/settings/notifications/push' },
    ] },
    { label: 'Security', children: [
        { label: 'Password', href: '/settings/security/password' },
        { label: 'Two Factor', href: '/settings/security/two-factor' },
    ] },
    { label: 'Billing', children: [
        { label: 'Plans', href: '/settings/billing/plans' },
        { label: 'Invoices', href: '/settings/billing/invoices' },
        { label: 'Subscriptions', href: '/settings/billing/subscriptions' },
    ] },
    { label: 'Integrations', children: [
        { label: 'Google', href: '/settings/integrations/google' },
        { label: 'Slack', href: '/settings/integrations/slack' },
        { label: 'Dropbox', href: '/settings/integrations/dropbox' },
        { label: 'Mailchimp', href: '/settings/integrations/mailchimp' },
        { label: 'Stripe', href: '/settings/integrations/stripe' },
    ] },
];
</script>
