<template>
    <div
        class="min-h-screen w-full bg-surface-100 dark:bg-surface-900"
        :class="{
            'relative h-screen flex w-full overflow-hidden': isSideNav === true
        }"
    >
        <div>
            <slot name="nav">
                <NavSideBar
                    v-if="isSideNav"
                    ref="sideNavRef"
                    :pageUrl="pageUrl"
                    :items="sideBarItems"
                    :linkComponent="linkComponent"
                >
                    <template #logo>
                        <slot name="navLogo" />
                    </template>
                    <template #actions>
                        <slot name="navActions" />
                    </template>
                </NavSideBar>
                <NavTopBar v-else
                    :pageUrl="pageUrl"
                    :items="topBarItems"
                    :linkComponent="linkComponent"
                    :widthClass="widthClass"
                >
                    <template #logo>
                        <slot name="navLogo" />
                    </template>
                    <template #actions>
                        <slot name="navActions" />
                    </template>
                </NavTopBar>
            </slot>
        </div>
        <div class="w-full flex flex-col">
            <AppTopBar v-if="hasAppTopBar">
                <template #default>
                    <slot name="appTopBar" />
                </template>
            </AppTopBar>
            <div class="flex flex-1 overflow-hidden">
                <PageSideNav
                    v-if="pageNavItems?.length"
                    ref="pageSideNavRef"
                    :items="pageNavItems"
                    :pageUrl="pageUrl"
                    :linkComponent="linkComponent"
                />
                <div class="flex-1 min-w-0">
                    <PageHeader
                        v-if="hasPageHeader"
                        :title="pageTitle"
                        :tabs="pageTabs"
                        :pageUrl="pageUrl"
                        :linkComponent="linkComponent"
                        :breadcrumbs="breadcrumbs"
                        :widthClass="widthClass"
                    >
                        <template #title>
                            <slot name="headerTitle" />
                        </template>
                        <template #action>
                            <slot name="headerAction" />
                        </template>
                    </PageHeader>
                    <div class="w-full flex h-screen overflow-hidden">
                        <div
                            v-if="hasPageSideContent"
                            ref="sideContentRef"
                            class="flex-none border-r border-gray-300 h-full bg-white dark:bg-surface-800 dark:border-surface-700 min-w-64 shadow-sm z-[99]"
                        >
                            <PageSideContent>
                                <template #default>
                                    <slot name="pageSideContent" />
                                </template>
                            </PageSideContent>
                        </div>
                        <div class="flex-grow">
                            <PageContent
                                :footerHeight="footerHeight"
                                :containerClass="containerClass"
                                :widthClass="widthClass"
                            >
                                <template #side>
                                    <slot name="pageSideContent" />
                                </template>
                                <template #default>
                                    <slot />
                                </template>
                            </PageContent>
                            <PageFooter
                                v-if="hasPageFooter"
                                ref="footerRef"
                                :leftOffset="footerLeftOffset"
                                :widthClass="widthClass"
                            >
                                <template #default>
                                    <slot name="footer" />
                                </template>
                                <template #action>
                                    <slot name="footerAction" />
                                </template>
                            </PageFooter>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Toast v-if="hasToast" position="bottom-left" />
    </div>
    <slot name="modals" />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, useSlots } from 'vue';
import { hasSlotContent } from '@atlas/utils';
import PageHeader from '@atlas/components/App/Page/Header.vue';
import PageFooter from '@atlas/components/App/Page/Footer.vue';
import PageContent from '@atlas/components/App/Page/Content.vue';
import PageSideNav from '@atlas/components/App/Page/SideNav.vue';
import PageSideContent from '@atlas/components/App/Page/SideContent.vue';
import NavSideBar from '@atlas/components/App/Nav/SideBar.vue';
import NavTopBar from '@atlas/components/App/Nav/TopBar.vue';
import AppTopBar from '@atlas/components/App/TopBar.vue';
import Toast from '@atlas/components/Toast.vue';

const props = defineProps({
    pageUrl: {
        type: String,
        required: true,
    },
    isSideNav: {
        type: Boolean,
        default: true,
    },
    hasToast: {
        type: Boolean,
        default: true,
    },
    pageTitle: {
        type: String,
        default: 'Home',
    },
    pageTabs: {
        type: Array,
        default: () => [],
    },
    pageNavItems: {
        type: Array,
        default: () => [],
    },
    sideBarItems: {
        type: Array,
        default: () => [],
    },
    topBarItems: {
        type: Array,
        default: () => [],
    },
    linkComponent: {
        type: [String, Object],
        default: 'a'
    },
    breadcrumbs : {
        type: Array,
        default: () => []
    },
    widthClass: {
        type: String,
        default: 'max-w-screen-2xl',
    },
    containerClass: {
        type: String,
        default: 'mx-auto p-4',
    }
});

const slots = useSlots();

const sideNavRef = ref(null);
const pageSideNavRef = ref(null);
const footerRef = ref(null);
const sideContentRef = ref(null);

const footerHeight = ref(0);
const footerLeftOffset = ref(0);

const calculateFooterMetrics = () => {
    const sideNavWidth = sideNavRef.value?.$el?.offsetWidth || 0;
    const pageSideNavWidth = pageSideNavRef.value?.$el?.offsetWidth || 0;
    const sideContentWidth = sideContentRef.value?.offsetWidth || 0;
    const footerEl = footerRef.value?.$el;

    footerLeftOffset.value = sideNavWidth + pageSideNavWidth + sideContentWidth;
    footerHeight.value = footerEl?.offsetHeight || 0;
};

const hasAppTopBar = computed(() => hasSlotContent(slots.appTopBar));
const hasPageSideContent = computed(() => hasSlotContent(slots.pageSideContent));

const hasPageHeader = computed(() =>
    !!props.pageTitle || (Array.isArray(props.pageTabs) && props.pageTabs.length > 0) || hasSlotContent(slots.headerAction)
);

const hasPageFooter = computed(() => hasSlotContent(slots.footer) || hasSlotContent(slots.footerAction));

onMounted(() => {
    nextTick(() => {
        calculateFooterMetrics();
    });

    window.addEventListener('resize', calculateFooterMetrics);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', calculateFooterMetrics);
});
</script>
