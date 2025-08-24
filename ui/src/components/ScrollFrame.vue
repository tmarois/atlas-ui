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
let intersectionObserver: IntersectionObserver | null = null;
let mutationObserver: MutationObserver | null = null;
let draggingTextarea = false;

const { bindScrollHandler, lockScroll, unlockScroll } = useScroll(
    props.scrollKey !== null ? props.scrollKey : props.page ? 'page' : Symbol()
);

const { add, remove } = bindScrollHandler(frame);

const stopObserving = () => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateHeight);
    }
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    mutationObserver?.disconnect();
    resizeObserver = null;
    intersectionObserver = null;
    mutationObserver = null;
};

const startObserving = () => {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', updateHeight);
    if (typeof ResizeObserver !== 'undefined' && !resizeObserver) {
        resizeObserver = new ResizeObserver(() => updateHeight());
        const element = frame.value?.parentElement ?? document.body;
        resizeObserver.observe(element);
    }
    if (typeof IntersectionObserver !== 'undefined' && !intersectionObserver) {
        intersectionObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                updateHeight();
            }
        });
        if (frame.value) intersectionObserver.observe(frame.value);
    }
    if (typeof MutationObserver !== 'undefined' && !mutationObserver) {
        mutationObserver = new MutationObserver((mutations) => {
            const frameEl = frame.value;
            if (!frameEl) return;
            const shouldUpdate = mutations.some((m) => !frameEl.contains(m.target as Node));
            if (shouldUpdate) updateHeight();
        });
        mutationObserver.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }
};

const updateHeight = (force = false) => {
    if (
        !force &&
        (draggingTextarea ||
            (typeof document !== 'undefined' &&
                document.activeElement instanceof HTMLTextAreaElement))
    )
        return;
    const offsetValue = props.offset !== null ? props.offset : calculateOffsets();
    dynamicHeight.value = `${offsetValue}px`;
};

const handlePointerDown = (e: PointerEvent) => {
    if (e.target instanceof HTMLTextAreaElement) {
        draggingTextarea = true;
        stopObserving();
    }
};

const handlePointerUp = () => {
    if (draggingTextarea) {
        draggingTextarea = false;
        startObserving();
        updateHeight(true);
    }
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
        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp);
        startObserving();
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
        window.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointerup', handlePointerUp);
        stopObserving();
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

