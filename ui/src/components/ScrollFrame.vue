<template>
    <div
        ref="frame"
        class="frame-scroll"
        :class="rootClass"
        :style="{ height: `calc(100vh - ${dynamicHeight} - ${addOffset}px)` }"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount, onUpdated } from 'vue';
import { useScroll } from '../composables/useScroll';

interface Props {
    scrollKey?: string | null;
    page?: boolean;
    allowBodyScroll?: boolean;
    offset?: number | null;
    addOffset?: number;
    rootClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
    scrollKey: null,
    page: false,
    allowBodyScroll: false,
    offset: null,
    addOffset: 0,
    rootClass: 'overflow-y-auto',
});

const frame = ref<HTMLElement | null>(null);
const dynamicHeight = ref('0px');
let resizeObserver: ResizeObserver | null = null;

const { bindScrollHandler, lockScroll, unlockScroll } = useScroll(
    props.scrollKey !== null ? props.scrollKey : props.page ? 'page' : Symbol()
);

const { add, remove } = bindScrollHandler(frame);

const updateHeight = () => {
    const offsetValue = props.offset !== null ? props.offset : calculateOffsets();
    dynamicHeight.value = `${offsetValue}px`;
};

const calculateOffsets = () => {
    const frameElement = frame.value;
    if (!frameElement) return 0;

    const { top } = frameElement.getBoundingClientRect();
    return Math.round(top);
};

onMounted(() => {
    add();
    if (props.page && !props.allowBodyScroll) lockScroll();
    nextTick(() => {
        updateHeight();
    });
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateHeight);
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => updateHeight());
            resizeObserver.observe(document.body);
        }
    }
});

onUpdated(() => {
    nextTick(() => {
        updateHeight();
    });
});

onBeforeUnmount(() => {
    remove();
    if (props.page && !props.allowBodyScroll) unlockScroll();
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateHeight);
        resizeObserver?.disconnect();
    }
});

watch(() => props.offset, updateHeight);
watch(() => props.addOffset, updateHeight);

watch(
    () => props.allowBodyScroll,
    () => {
        if (!props.page) return;
        props.allowBodyScroll ? unlockScroll() : lockScroll();
    }
);
</script>

