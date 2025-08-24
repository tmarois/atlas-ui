<template>
    <div class="relative">
        <InputGroup :class="rootClass" :style="rootStyle">
            <Button type="button" label="Choose" @click="choose" :disabled="isDisabled" />
            <div class="relative flex-1">
                <div :class="[textBase, clearable && hasFile ? 'pr-8' : '', isDisabled ? 'text-surface-700 dark:text-surface-400 bg-surface-200' : hasFile ? 'text-surface-900 dark:text-surface-0' : 'text-surface-500 dark:text-surface-400']">
                    <span class="truncate">{{ fileNames || 'No file selected' }}</span>
                </div>
                <button
                    v-if="clearable && hasFile"
                    type="button"
                    @click="clear"
                    :disabled="isDisabled"
                    class="absolute top-1/2 -translate-y-1/2 right-3 text-surface-400 hover:text-surface-600 dark:text-surface-300 dark:hover:text-white cursor-pointer disabled:hidden disabled:pointer-events-none"
                >
                    <TimesIcon class="w-4 h-4" />
                </button>
            </div>
        </InputGroup>
        <input
            ref="input"
            type="file"
            class="hidden"
            :multiple="multiple"
            @change="onChange"
            v-bind="inputAttrs"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue';
import Button from './Button.vue';
import InputGroup from './InputGroup.vue';
import TimesIcon from '@primevue/icons/times';

interface Props {
    modelValue?: File | File[] | null;
    multiple?: boolean;
    clearable?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const attrs = useAttrs();

const rootClass = computed(() => (attrs as any).class);
const rootStyle = computed(() => (attrs as any).style);
const inputAttrs = computed(() => {
    const { class: _c, style: _s, ...rest } = attrs as any;
    return rest;
});

const isDisabled = computed(() => !!inputAttrs.value.disabled);

const input = ref<HTMLInputElement>();
const choose = () => input.value?.click();

const onChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;
    emit('update:modelValue', props.multiple ? Array.from(files) : files[0] ?? null);
};

const clear = () => {
    emit('update:modelValue', props.multiple ? [] : null);
    if (input.value) input.value.value = '';
};

const model = computed(() => props.modelValue);
const fileNames = computed(() => {
    const value = model.value;
    if (!value || (Array.isArray(value) && value.length === 0)) return '';
    return Array.isArray(value) ? value.map((f) => f.name).join(', ') : value.name;
});
const hasFile = computed(() => !!fileNames.value);

const textBase = `flex items-center w-full
    bg-surface-0 dark:bg-surface-950
    px-3 py-[9px] leading-[1.25rem]
    p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
    p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
    transition-colors duration-200`;
</script>

