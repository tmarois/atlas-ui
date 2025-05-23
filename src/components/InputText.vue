<template>
    <div class="relative">
        <div class="w-full">
            <InputText
                ref="input"
                v-model="model"
                unstyled
                v-bind="attrs"
                :pt="theme"
                :ptOptions="{ mergeProps: ptViewMerge }"
            />
            <button
                v-if="model && !attrs.disabled && clearable"
                type="button"
                @click="clearInput"
                class="absolute top-1/2 -translate-y-1/2 right-3 text-surface-400 hover:text-surface-600 dark:text-surface-300 dark:hover:text-white cursor-pointer"
            >
                <TimesIcon class="w-4 h-4" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputText, { type InputTextProps, type InputTextPassThroughOptions } from 'primevue/inputtext';
import TimesIcon from '@primevue/icons/times';
import { ref, useAttrs, computed } from 'vue';
import { ptViewMerge } from '@atlas/utils';

interface Props extends /* @vue-ignore */ InputTextProps {
    modelValue?: string;
    clearable?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const model = computed({
    get: () => props.modelValue ?? '',
    set: (val: string) => emit('update:modelValue', val),
});

const clearInput = () => {
    model.value = '';
};

const attrs = useAttrs();

const theme = ref<InputTextPassThroughOptions>({
    root: `appearance-none rounded-md outline-hidden
        bg-surface-0 dark:bg-surface-950
        p-filled:bg-surface-50 dark:p-filled:bg-surface-800
        text-surface-900 dark:text-surface-0
        placeholder:text-surface-500 dark:placeholder:text-surface-400
        border border-surface-300 dark:border-surface-700
        enabled:hover:border-surface-400 dark:enabled:hover:border-surface-600
        enabled:focus:border-primary
        dark:disabled:bg-surface-700 dark:disabled:text-surface-400
        p-invalid:border-red-400 dark:p-invalid:border-red-500
        p-invalid:placeholder:text-red-600 dark:p-invalid:placeholder:text-red-400
        px-3 py-2.5 w-full
        p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
        p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
        transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
        disabled:bg-surface-200 disabled:text-surface-700 disabled:dark:text-surface-400
        disabled:opacity-70 disabled:shadow-none disabled:placeholder:text-surface-400 disabled:dark:placeholder:text-surface-500`
});
</script>
