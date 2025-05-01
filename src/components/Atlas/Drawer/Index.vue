<template>
    <Drawer
        :visible="modelValue"
        position="right"
        blockScroll
        :style="width ? `width: ${width}; max-width: 100%;` : ''"
        pt:root:class="p-right:lg:w-[60%] p-right:md:w-[80%] p-right:sm:w-[90%] p-right:w-full"
        pt:mask:class="p-modal:bg-black/30"
        pt:header:class="py-2 px-6 border-b border-surface-400/60 dark:border-surface-700 dark:bg-surface-800 shadow"
        pt:content:class="p-0 bg-surface-100 dark:bg-surface-900"
        pt:footer:class="py-4 px-6 border-t border-surface-300 dark:border-surface-700 shadow-sm flex items-center space-x-4"
        @update:visible="close"
    >
        <template #header>
            <slot name="header">
                <div class="font-semibold text-black dark:text-gray-200 text-lg z-1">
                    {{ title }}
                </div>
            </slot>
        </template>
        <div class="w-full p-6">
            <div class="max-w-4xl mx-auto flex flex-col space-y-6 justify-start items-center">
                <slot />
            </div>
        </div>
        <template #footer>
            <slot name="footer">
                <div class="w-full flex flex-col space-y-4">
                    <AtlasErrors :errors="errors" />
                    <div class="flex items-center space-x-4">
                        <Button label="Save" :disabled="loading" :loading="loading" @click="emit('submit')" />
                        <Button text label="Cancel" @click="close" />
                    </div>
                </div>
            </slot>
        </template>
    </Drawer>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    },
    width: {
        type: String,
        default: ''
    },
    errors: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const close = () => {
    emit('update:modelValue', false)
}
</script>
