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

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useScroll } from '@atlas/composables/useScroll';

const props = defineProps({
    scrollKey: {
        type: String,
        default: null,
    },
    page: {
        type: Boolean,
        default: false,
    },
    allowBodyScroll: {
        type: Boolean,
        default: false,
    },
    offset: {
        type: Number,
        default: null,
    },
    addOffset: {
        type: Number,
        default: 0,
    },
    rootClass: {
        type: String,
        default: 'overflow-y-auto',
    }
});

const frame = ref(null);
const dynamicHeight = ref('0px');

const {
    bindScrollHandler,
    lockScroll,
    unlockScroll
} = useScroll(props.scrollKey!==null ? props.scrollKey : (props.page ? 'page' : Symbol()));

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
});

onBeforeUnmount(() => {
    remove();
    if (props.page && !props.allowBodyScroll) unlockScroll();
});

watch(() => props.offset, updateHeight);

watch(() => props.allowBodyScroll, () => {
    if (!props.page) return;
    props.allowBodyScroll ? unlockScroll() : lockScroll();
});

</script>
