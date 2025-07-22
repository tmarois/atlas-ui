<template>
    <div v-if="init" class="relative">
        <!-- Control button -->
        <button
            @click="showControls = !showControls"
            class="fixed top-2 right-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
        >
            <span v-if="showControls">✕</span>
            <span v-else>⚙️</span>
            <span class="text-sm">{{ showControls ? 'Close' : 'Controls' }}</span>
        </button>
        <Drawer
            v-model:visible="showControls"
            position="right"
            class="test-controls-drawer"
            :style="{ width: '350px' }"
        >
            <div class="p-4 dark:text-white">
                <h3 class="text-lg font-medium mb-4">Layout Controls</h3>
                <div class="space-y-5">
                    <div class="control-group">
                        <label class="control-label block mb-2">Theme</label>
                        <div class="flex items-center space-x-2">
                            <button
                                @click="handleToggleDark"
                                class="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center space-x-2"
                            >
                                <span v-if="isDark">🌞</span>
                                <span v-else>🌙</span>
                                <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label block mb-2">Navigation Type</label>
                        <div class="space-y-2">
                            <label class="flex items-center">
                                <input type="radio" v-model="isSideNav" :value="true" class="form-radio">
                                <span class="ml-2">Side Navigation</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" v-model="isSideNav" :value="false" class="form-radio">
                                <span class="ml-2">Top Navigation</span>
                            </label>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label block mb-2">Width Class</label>
                        <select v-model="widthClass" class="form-select block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600">
                            <option value="max-w-screen-sm">Small (max-w-screen-sm)</option>
                            <option value="max-w-screen-md">Medium (max-w-screen-md)</option>
                            <option value="max-w-screen-lg">Large (max-w-screen-lg)</option>
                            <option value="max-w-screen-xl">Extra Large (max-w-screen-xl)</option>
                            <option value="max-w-screen-2xl">2X Large (max-w-screen-2xl)</option>
                            <option value="w-full">Full (w-full)</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label class="control-label block mb-2">Show Components</label>
                        <div class="space-y-2 flex flex-col">
                            <label class=" items-center">
                                <input type="checkbox" v-model="showAppBar" class="form-checkbox">
                                <span class="ml-2">App Top Bar</span>
                            </label>
                            <label class=" items-center">
                                <input type="checkbox" v-model="showPageHeader" class="form-checkbox">
                                <span class="ml-2">Page Header</span>
                            </label>
                            <label class="items-center ml-6" v-if="showPageHeader">
                                <input type="checkbox" v-model="showPageHeaderTabs" class="form-checkbox">
                                <span class="ml-2">Page Header Tabs</span>
                            </label>
                            <label class=" items-center">
                                <input type="checkbox" v-model="showPageSideNav" class="form-checkbox">
                                <span class="ml-2">Page Side Navigation</span>
                            </label>
                            <label class=" items-center">
                                <input type="checkbox" v-model="showPageSideContent" class="form-checkbox">
                                <span class="ml-2">Page Side Content</span>
                            </label>
                            <label class=" items-center">
                                <input type="checkbox" v-model="showPageFooter" class="form-checkbox">
                                <span class="ml-2">Page Footer</span>
                            </label>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label block mb-2">Content Size</label>
                        <div class="flex items-center space-x-2">
                            <button @click="decreaseContentSize" class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">-</button>
                            <span>{{ contentSize }}px</span>
                            <button @click="increaseContentSize" class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">+</button>
                        </div>
                        <div class="mt-2">
                            <label class="inline-flex items-center">
                                <input type="checkbox" v-model="noScroll" class="form-checkbox">
                                <span class="ml-2">Disable Scroll</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>

        <!-- App Layout Component -->
        <div class="h-screen">
            <LayoutApp
                :pageUrl="'#'"
                :isSideNav="isSideNav"
                :pageTitle="showPageHeader ? 'Test Page Title' : null"
                :pageTabs="showPageHeader && showPageHeaderTabs ? pageTabs : []"
                :pageNavItems="showPageSideNav ? pageNavItems : []"
                :sideBarItems="sideBarItems"
                :topBarItems="topBarItems"
                :widthClass="widthClass"
                :noScroll="noScroll"
            >
                <template #navLogo>
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center text-white font-bold">A</div>
                    </div>
                </template>
                <template #navActions>
                    <div class="flex flex-col space-x-2">
                        <button class="p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                            <span class="block w-6 h-6 flex items-center justify-center">🔔</span>
                        </button>
                        <button class="p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                            <span class="block w-6 h-6 flex items-center justify-center">👤</span>
                        </button>
                    </div>
                </template>
                <template v-if="showAppBar" #appTopBar>
                    <div class="px-4 w-full flex items-center justify-between">
                        <div class="w-[400px]">
                            <InputText placeholder="Search for contacts" size="small" fluid />
                        </div>
                        <div>
                            [profile]
                        </div>
                    </div>
                </template>
                <template v-if="showPageHeader" #headerAction>
                    <Button label="Action" size="small" />
                </template>
                <template v-if="showPageSideContent" #pageSideContent>
                    <div class="p-4 w-[300px]">
                        <div class="bg-gray-100 dark:bg-zinc-700 rounded mb-4 py-8 px-4">
                            <div class="flex items-center justify-center">
                                Can do anything here and it will resize the width with your content.
                            </div>
                        </div>
                        <ul class="space-y-2">
                            <li v-for="i in 50" :key="i" class="p-2 px-4 bg-gray-100 dark:bg-zinc-700 rounded">
                                Item {{ i }}
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-if="showPageFooter" #footer>
                    <div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">© 2025 Atlas UI. All rights reserved.</span>
                    </div>
                </template>
                <template v-if="showPageFooter" #footerAction>
                    <div>
                        [footer actions]
                    </div>
                </template>
                <div>
                    <div class="space-y-4">
                        <Card v-for="i in 20" :key="i">
                            <template #content>
                                test
                            </template>
                        </Card>
                    </div>
                </div>
            </LayoutApp>
        </div>
    </div>
</template>

<script setup>
import {ref, computed, onMounted, watch, nextTick} from 'vue';
    import { IconBook, IconUser, IconColorFilter } from '@tabler/icons-vue';
    import LayoutApp from '@atlas/components/App/Layout/App.vue';
    import Drawer from '@atlas/components/Drawer.vue';
    import Button from '@atlas/components/Button.vue';
    import { useTheme } from '@atlas/composables/useTheme';
    import InputText from '@atlas/components/InputText.vue';
    import Card from '@atlas/components/Card.vue';

    const STORAGE_KEY = 'atlas-ui-layout-controls';
    const showControls = ref(false);

    const { toggleDark, isDark, setDark } = useTheme();

    // Custom toggleDark function that also saves to localStorage
    const handleToggleDark = () => {
        toggleDark();
        saveControls();
    };

    const isSideNav = ref(true);
    const widthClass = ref('w-full'); // Default to full width
    const showPageHeader = ref(true);
    const showPageHeaderTabs = ref(true);
    const showPageSideNav = ref(false);
    const showPageSideContent = ref(false);
    const showPageFooter = ref(true);
    const showAppBar = ref(false);
    const contentSize = ref(300);
    const noScroll = ref(false);
    const init = ref(false);

    // Load saved controls from localStorage
    onMounted(() => {
        nextTick(() => {
            init.value = true;
        });
        const savedControls = localStorage.getItem(STORAGE_KEY);
        if (savedControls) {
            try {
                const controls = JSON.parse(savedControls);
                // Set the dark mode first to avoid flashing
                if (controls.isDark !== undefined) {
                    setDark(controls.isDark);
                }

                isSideNav.value = controls.isSideNav ?? true;
                widthClass.value = controls.widthClass ?? 'w-full';
                showPageHeader.value = controls.showPageHeader ?? true;
                showPageHeaderTabs.value = controls.showPageHeaderTabs ?? true;
                showPageSideNav.value = controls.showPageSideNav ?? false;
                showPageSideContent.value = controls.showPageSideContent ?? false;
                showPageFooter.value = controls.showPageFooter ?? true;
                showAppBar.value = controls.showAppBar ?? false;
                contentSize.value = controls.contentSize ?? 300;
                noScroll.value = controls.noScroll ?? false;
            } catch (e) {
                console.error('Error loading saved controls', e);
            }
        }
    });

    // Save controls to localStorage whenever they change
    const saveControls = () => {
        const controls = {
            isDark: isDark.value,
            isSideNav: isSideNav.value,
            widthClass: widthClass.value,
            showPageHeader: showPageHeader.value,
            showPageHeaderTabs: showPageHeaderTabs.value,
            showPageSideNav: showPageSideNav.value,
            showPageSideContent: showPageSideContent.value,
            showPageFooter: showPageFooter.value,
            showAppBar: showAppBar.value,
            contentSize: contentSize.value,
            noScroll: noScroll.value
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(controls));
    };

    // Watch for changes in all controls
    watch(
        [
            isDark,
            isSideNav,
            widthClass,
            showPageHeader,
            showPageHeaderTabs,
            showPageSideNav,
            showPageSideContent,
            showPageFooter,
            showAppBar,
            contentSize,
            noScroll
        ],
        () => saveControls(),
        { deep: true }
    );

    const pageTabs = [
        { title: 'Overview', href: '/' },
        { title: 'Variants', href: '/components/editor/variant' },
        { title: 'Text', href: '/components/editor/text' },
    ];

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

    const sideBarItems = computed(() => [
        {
            children: [
                { label: 'Users', href: '/users', parent: null, icon: IconUser, activeIcon: IconUser },
                { label: 'Components', href: '/components/editor', parent: '/components', icon: IconColorFilter, activeIcon: IconColorFilter }
            ],
        },
        {
            children: [
                { label: 'Inbox', href: '/lb', parent: '/test', icon: IconBook, activeIcon: IconBook, count: 5},
                { label: 'Contacts', href: '/lb', parent: '/test', icon: IconBook, activeIcon: IconBook },
            ],
        },
        {
            children: [
                { label: 'Campaigns', href: '/ff', parent: null, icon: IconBook, activeIcon: IconBook },
                { label: 'Workflows', href: '/ff', parent: null, icon: IconBook, activeIcon: IconBook },
                { label: 'Analytics', href: '/ff', parent: null, icon: IconBook, activeIcon: IconBook },
                { label: 'More', href: null, icon: IconBook, activeIcon: IconBook },
            ],
        },
    ]);

    const pageNavItems = [
        { label: 'Components', children: [
                { label: 'Forms', href: '/' },
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

    const increaseContentSize = () => {
        contentSize.value += 100;
        saveControls();
    };

    const decreaseContentSize = () => {
        if (contentSize.value > 100) {
            contentSize.value -= 100;
            saveControls();
        }
    };
</script>
