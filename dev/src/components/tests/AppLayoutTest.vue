<template>
    <div>
        <div class="test-controls dark:text-white py-6 px-8">
            <h3 class="text-lg font-medium mb-3">Layout Controls</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="control-group">
                    <label class="control-label">Navigation Type</label>
                    <div class="flex space-x-4">
                        <label class="inline-flex items-center">
                            <input type="radio" v-model="isSideNav" :value="true" class="form-radio">
                            <span class="ml-2">Side Navigation</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input type="radio" v-model="isSideNav" :value="false" class="form-radio">
                            <span class="ml-2">Top Navigation</span>
                        </label>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">Width Class</label>
                    <select v-model="widthClass" class="form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="max-w-screen-sm">Small (max-w-screen-sm)</option>
                        <option value="max-w-screen-md">Medium (max-w-screen-md)</option>
                        <option value="max-w-screen-lg">Large (max-w-screen-lg)</option>
                        <option value="max-w-screen-xl">Extra Large (max-w-screen-xl)</option>
                        <option value="max-w-screen-2xl">2X Large (max-w-screen-2xl)</option>
                        <option value="w-full">Full (w-full)</option>
                    </select>
                </div>
                <div class="control-group">
                    <label class="control-label">Show Components</label>
                    <div class="space-y-2">
                        <label class="inline-flex items-center">
                            <input type="checkbox" v-model="showPageHeader" class="form-checkbox">
                            <span class="ml-2">Page Header</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input type="checkbox" v-model="showPageSideNav" class="form-checkbox">
                            <span class="ml-2">Page Side Navigation</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input type="checkbox" v-model="showPageSideContent" class="form-checkbox">
                            <span class="ml-2">Page Side Content</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input type="checkbox" v-model="showPageFooter" class="form-checkbox">
                            <span class="ml-2">Page Footer</span>
                        </label>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">Content Size</label>
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

        <!-- App Layout Component -->
        <div class="test-frame" :style="{ height: `${frameHeight}px` }">
            <App
                :pageUrl="'#'"
                :isSideNav="isSideNav"
                :pageTitle="showPageHeader ? 'Test Page Title' : ''"
                :pageTabs="showPageHeader ? pageTabs : []"
                :pageNavItems="showPageSideNav ? pageNavItems : []"
                :sideBarItems="sideBarItems"
                :topBarItems="topBarItems"
                :widthClass="widthClass"
                :noScroll="noScroll"
            >
                <!-- Nav Logo Slot -->
                <template #navLogo>
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center text-white font-bold">A</div>
                    </div>
                </template>
                <!-- Nav Actions Slot -->
                <template #navActions>
                    <div class="flex space-x-2">
                        <button class="p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                            <span class="block w-6 h-6 flex items-center justify-center">🔔</span>
                        </button>
                        <button class="p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                            <span class="block w-6 h-6 flex items-center justify-center">👤</span>
                        </button>
                    </div>
                </template>
                <!-- App Top Bar Slot -->
                <template #appTopBar>
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="font-medium">Current User:</span> Test User
                        </div>
                        <div>
                            <button class="px-3 py-1 bg-indigo-500 text-white rounded-md text-sm">Action</button>
                        </div>
                    </div>
                </template>
                <!-- Header Title Slot -->
                <template #headerTitle v-if="showPageHeader">
                    <div class="flex items-center">
                        <span class="text-xl font-bold">Custom Header Title</span>
                    </div>
                </template>
                <!-- Header Action Slot -->
                <template #headerAction v-if="showPageHeader">
                    <button class="px-4 py-2 bg-indigo-600 text-white rounded-md">
                        Header Action
                    </button>
                </template>
                <!-- Page Side Content Slot -->
                <template #pageSideContent v-if="showPageSideContent">
                    <div class="p-4">
                        <h3 class="font-medium text-lg mb-3">Side Content</h3>
                        <ul class="space-y-2">
                            <li v-for="i in 5" :key="i" class="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                Item {{ i }}
                            </li>
                        </ul>
                    </div>
                </template>
                <!-- Footer Slot -->
                <template #footer v-if="showPageFooter">
                    <div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">© 2025 Atlas UI. All rights reserved.</span>
                    </div>
                </template>
                <!-- Footer Action Slot -->
                <template #footerAction v-if="showPageFooter">
                    <div>
                        <button class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm">
                            Footer Action
                        </button>
                    </div>
                </template>
                <!-- Default Slot (Main Content) -->
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 class="text-xl font-bold mb-4">Main Content Area</h2>
                    <p class="mb-4">This is the main content area of the App layout component.</p>
                    <div :style="{ height: `${contentSize}px`, overflow: 'auto' }" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div class="space-y-4">
                            <div v-for="i in 20" :key="i" class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                Content Block {{ i }}
                            </div>
                        </div>
                    </div>
                </div>
            </App>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { IconBook, IconUser, IconColorFilter } from '@tabler/icons-vue';
    import App from '@atlas/components/App/Layout/App.vue';

    const isSideNav = ref(true);
    const widthClass = ref('max-w-screen-2xl');
    const showPageHeader = ref(true);
    const showPageSideNav = ref(false);
    const showPageSideContent = ref(false);
    const showPageFooter = ref(true);
    const contentSize = ref(300);
    const noScroll = ref(false);
    const frameHeight = ref(600);

    const pageTabs = [
        { label: 'Overview', url: '#overview', active: true },
        { label: 'Details', url: '#details' },
        { label: 'Settings', url: '#settings' }
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

    const increaseContentSize = () => {
        contentSize.value += 100;
    };

    const decreaseContentSize = () => {
        if (contentSize.value > 100) {
            contentSize.value -= 100;
        }
    };
</script>
