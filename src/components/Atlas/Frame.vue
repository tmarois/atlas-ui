<template>
    <div
        ref="frame"
        class="frame-scroll"
        :class="rootClass"
        :style="{ height: `calc(100vh - ${dynamicHeight})` }"
    >
        <div :class="containerClass">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useScrollTop } from '../../composables/useScrollTop';

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
    rootClass: {
        type: String,
        default: 'overflow-y-auto',
    },
    containerClass: {
        type: String,
        default: 'mx-auto max-w-screen-2xl p-4',
    }
});

const frame = ref(null);
const dynamicHeight = ref('0px');

const {
    isTop,
    setTop,
    bindScrollHandler,
    lockScroll,
    unlockScroll
} = useScrollTop(props.scrollKey ? props.scrollKey : (props.page ? 'page' : Symbol()));

const { add, remove } = bindScrollHandler(frame);

const updateHeight = () => {
    const offsetValue = props.offset !== null ? props.offset : calculateOffsets();
    dynamicHeight.value = `${offsetValue}px`;
};

const calculateOffsets = () => {
    let totalOffset = 0;
    const frameElement = frame.value;

    if (frameElement?.parentElement) {
        const siblings = Array.from(frameElement.parentElement.children);
        for (const sibling of siblings) {
            if (sibling !== frameElement) {
                totalOffset += sibling.offsetHeight;
            }
        }
    }

    return totalOffset;
};

onMounted(() => {
    setTop(true);
    add();
    if (props.page && !props.allowBodyScroll) lockScroll();
    nextTick(() => {
        updateHeight();
    });
});

onBeforeUnmount(() => {
    setTop(true);
    remove();
    if (props.page && !props.allowBodyScroll) unlockScroll();
});

watch(() => props.offset, updateHeight);

watch(() => props.allowBodyScroll, () => {
    if (!props.page) return;
    props.allowBodyScroll ? unlockScroll() : lockScroll();
});

</script>
