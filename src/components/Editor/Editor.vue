<template>
    <div class="atlas-editor-content flex flex-col w-full h-full">
        <EditorToolbar v-if="toolbar" :editor="editorInstance" />
        <EditorContent :editor="editorInstance" />
    </div>
</template>

<script setup>
import { EditorContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import EditorToolbar from '@atlas/components/Editor/Toolbar.vue';
import { watch, defineExpose } from 'vue';

const emit = defineEmits(['save']);

const props = defineProps({
    content: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    editorClass: {
        type: String,
        default: 'p-4 w-full h-full focus:outline-none text-black text-sm dark:text-white',
    },
    toolbar: {
        type: Boolean,
        default: true,
    }
});

const editorInstance = useEditor({
    editorProps: {
        attributes: {
            class: props.editorClass,
        },
    },
    content: props.content,
    autofocus: false,
    extensions: [
        StarterKit,
        Link.configure({
            openOnClick: false,
            defaultProtocol: 'https',
        }),
        Placeholder.configure({
            placeholder: props.placeholder,
        }),
    ],
    onUpdate: () => {
        save();
    },
});

defineExpose({
    editorInstance
});

watch(() => props.content, (v) => {
    if (!v) {
        editorInstance.value.commands.setContent('');
        return;
    }
});

const save = () => {
    emit('save', editorInstance.value.getHTML());
};
</script>

<style>
.ProseMirror p.is-empty::before {
    content: attr(data-placeholder);
    color: #9ca3af; /* Tailwind's text-gray-400 */
    float: left;
    height: 0;
    pointer-events: none;
}
.atlas-editor-content {
    font-size: 0.875rem; /* Tailwind's text-sm */
    line-height: 1.625;  /* Tailwind's leading-relaxed */
}
.atlas-editor-content p:empty {
    height: 1rem;
}
.atlas-editor-content p {
    font-size: 0.875rem; /* Tailwind's text-sm */
}
.atlas-editor-content a {
    color: #4f46e5; /* Tailwind's text-indigo-600 */
    text-decoration: underline;
}
.atlas-editor-content ul,
.atlas-editor-content ol {
    padding-left: 1rem;
    margin-top: 0.125rem;
    margin-bottom: 0.125rem;
}
.atlas-editor-content ul {
    list-style-type: disc;
}
.atlas-editor-content ol {
    list-style-type: decimal;
}
</style>
