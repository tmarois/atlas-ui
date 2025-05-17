<template>
    <div class="flex items-center justify-between p-2 py-1 border-b border-surface-300 dark:border-surface-700">
        <div class="flex items-center space-x-1">
            <Button
                v-tooltip.top="{
                    value: 'Bold',
                    pt: {
                        root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px]',
                        text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
                    }
                }"
                icon
                text
                size="small"
                class="!px-2"
                :class="{
                    '!bg-surface-300/50 text-black': props.editor?.isActive('bold')
                }"
                @click="props.editor.chain().focus().toggleBold().run()"
            >
                <div class="flex items-center text-black dark:text-white">
                    <IconBold class="size-5" />
                </div>
            </Button>
            <Button
                v-tooltip.top="{
                    value: 'Italic',
                    pt: {
                        root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px]',
                        text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
                    }
                }"
                icon
                text
                size="small"
                class="!px-2"
                :class="{
                    '!bg-surface-300/50 text-black': props.editor?.isActive('italic')
                }"
                @click="props.editor.chain().focus().toggleItalic().run()"
            >
                <div class="flex items-center text-black dark:text-white">
                    <IconItalic class="size-5" />
                </div>
            </Button>
            <Button
                v-tooltip.top="{
                    value: 'Strikethrough',
                    pt: {
                        root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px]',
                        text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
                    }
                }"
                icon
                text
                size="small"
                class="!px-2"
                :class="{
                    '!bg-surface-300/50 text-black': props.editor?.isActive('strike')
                }"
                @click="props.editor.chain().focus().toggleStrike().run()"
            >
                <div class="flex items-center text-black dark:text-white">
                    <IconStrikethrough class="size-5" />
                </div>
            </Button>
            <Button
                v-tooltip.top="{
                    value: 'Bullet list',
                    pt: {
                        root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px]',
                        text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
                    }
                }"
                icon
                text
                size="small"
                class="!px-2"
                :class="{
                    '!bg-surface-300/50 text-black': props.editor?.isActive('bulletList')
                }"
                @click="props.editor.chain().focus().toggleBulletList().run()"
            >
                <div class="flex items-center text-black dark:text-white">
                    <IconList class="size-5" />
                </div>
            </Button>
            <Button
                v-tooltip.top="{
                    value: 'Numbered list',
                    pt: {
                        root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px]',
                        text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
                    }
                }"
                icon
                text
                size="small"
                class="!px-2"
                :class="{
                    '!bg-surface-300/50 text-black': props.editor?.isActive('orderedList')
                }"
                @click="props.editor.chain().focus().toggleOrderedList().run()"
            >
                <div class="flex items-center text-black dark:text-white">
                    <IconListNumbers class="size-5" />
                </div>
            </Button>
            <Button
                v-tooltip.top="{
                    value: 'Add link',
                    pt: {
                        root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px]',
                        text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
                    }
                }"
                icon
                text
                size="small"
                class="!px-2"
                @click="toggleLinkPopover"
            >
                <div class="flex items-center text-black dark:text-white">
                    <IconLink class="size-5" />
                </div>
            </Button>
            <Popover ref="linkPopover">
                <div class="flex items-center space-x-2 w-[320px]">
                    <InputText
                        v-model.trim="linkText"
                        fluid
                        type="text"
                        placeholder="https://example.com"
                        @keyup.enter="toggleLink"
                    />
                    <Button
                        size="small"
                        icon="pi pi-check"
                        :disabled="!isValidUrl"
                        @click="toggleLink"
                    />
                </div>
            </Popover>
            <Button
                v-tooltip.top="{
                    value: 'Clear formatting',
                    pt: {
                        root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px]',
                        text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
                    }
                }"
                icon
                text
                size="small"
                class="!px-2"
                @click="clearFormatting"
            >
                <div class="flex items-center text-black dark:text-white">
                    <IconClearFormatting class="size-5" />
                </div>
            </Button>
        </div>
    </div>
</template>

<script setup>
import Popover from '@atlas/components/Popover.vue';
import Button from '@atlas/components/Button.vue';
import InputGroup from '@atlas/components/InputGroup.vue';
import InputText from '@atlas/components/InputText.vue';
import { computed, ref } from 'vue';

import {
    IconBold,
    IconItalic,
    IconLink,
    IconList,
    IconListNumbers,
    IconStrikethrough,
    IconUnderline,
    IconClearFormatting
} from '@tabler/icons-vue';

const props = defineProps({
    editor: {
        type: Object,
        default: null,
    },
});

const linkPopover = ref();
const linkText = ref('');

const isValidUrl = computed(() => {
    return /^https?:\/\//i.test(linkText.value);
});

const clearFormatting = () => {
    if (!props.editor) return;
    props.editor.chain().focus().unsetAllMarks().clearNodes().run();
};

const toggleLink = () => {
    if (!props.editor) {
        return;
    }

    if (!linkText.value) {
        return;
    }

    if (!isValidUrl) {
        return;
    }

    props.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkText.value })
        .run();

    linkPopover.value.hide();
};

const toggleLinkPopover = (event) => {
    linkText.value = '';
    const isLinkActive = props.editor.isActive('link');
    if (isLinkActive) {
        props.editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
        linkPopover.value.toggle(event);
    }
};
</script>
