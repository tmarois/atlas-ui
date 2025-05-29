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
        <div class="w-full flex">
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
                    <template #action>
                        <slot name="headerAction" />
                    </template>
                </PageHeader>
                <PageContent
                    :footerHeight="footerHeight"
                    :widthClass="widthClass"
                >
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
        <Toast v-if="hasToast" position="bottom-left" />
    </div>
    <slot name="modals" />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, useSlots } from 'vue';
import PageHeader from '@atlas/components/App/Page/Header.vue';
import PageFooter from '@atlas/components/App/Page/Footer.vue';
import PageContent from '@atlas/components/App/Page/Content.vue';
import PageSideNav from '@atlas/components/App/Page/SideNav.vue';
import NavSideBar from '@atlas/components/App/Nav/SideBar.vue';
import NavTopBar from '@atlas/components/App/Nav/TopBar.vue';
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
    }
});

const slots = useSlots();

const sideNavRef = ref(null);
const pageSideNavRef = ref(null);
const footerRef = ref(null);

const footerHeight = ref(0);
const footerLeftOffset = ref(0);

const calculateFooterMetrics = () => {
    const sideNavWidth = sideNavRef.value?.$el?.offsetWidth || 0;
    const pageSideNavWidth = pageSideNavRef.value?.$el?.offsetWidth || 0;
    const footerEl = footerRef.value?.$el;

    footerLeftOffset.value = sideNavWidth + pageSideNavWidth;
    footerHeight.value = footerEl?.offsetHeight || 0;
};

const hasPageHeader = computed(() =>
    !!props.pageTitle ||
    (Array.isArray(props.pageTabs) && props.pageTabs.length > 0) ||
    !!slots.headerAction ||
    !!(Array.isArray(slots.headerAction?.()) &&
        slots.headerAction()[0]?.children &&
        slots.headerAction()[0].children.length > 0)
);

const hasPageFooter = computed(() =>
    !!(Array.isArray(slots.footer?.()) &&
        slots.footer()[0]?.children &&
        slots.footer()[0].children.length > 0) ||
    !!(Array.isArray(slots.footerAction?.()) &&
        slots.footerAction()[0]?.children &&
        slots.footerAction()[0].children.length > 0)
);

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
