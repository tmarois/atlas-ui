<template>
    <Dialog
        modal
        :visible="modelValue"
        :header="title"
        :style="{ width: '25rem' }"
        :dissmissible="false"
        :dismissable-mask="false"
        @update:visible="close"
    >
        <div class="relative text-center flex flex-col space-y-6">
            <slot name="message">
                <div class="text-gray-400 dark:text-gray-500 mx-auto">
                    <i class="text-4xl" :class="icon"></i>
                </div>
                <div class="text-gray-700 dark:text-gray-200">
                    {{ message }}
                </div>
            </slot>
            <div class="flex justify-center items-center space-x-4 py-2">
                <slot name="actions">
                    <Button
                        label="Confirm"
                        raised
                        :disabled="loading"
                        :loading="loading"
                        pt:root:class="text-white bg-red-600 enabled:hover:bg-red-700 border-red-600 enabled:active:border-red-400 enabled:active:bg-red-600 enabled:hover:border-red-emphasis"
                        @click="confirm"
                    />
                    <Button text label="Cancel" @click="close" />
                </slot>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from '@atlas/components/Volt/Dialog.vue';
import Button from '@atlas/components/Volt/Button.vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Delete Item'
    },
    icon: {
        type: String,
        default: 'pi pi-trash'
    },
    message: {
        type: String,
        default: 'Are you sure you want to delete this item?'
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const close = () => {
    emit('update:modelValue', false)
}

const confirm = () => {
    emit('confirm')
}
</script>
