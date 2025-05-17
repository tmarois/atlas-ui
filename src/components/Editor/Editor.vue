<template>
    <div class="atlas-editor-content flex flex-col w-full h-full">
        <div>
            <EditorToolbar :editor="editorInstance" />
        </div>
        <div>
            <EditorContent :editor="editorInstance" />
        </div>
    </div>
</template>

<script setup>
import { EditorContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import EditorToolbar from '@atlas/components/Editor/Toolbar.vue';
import { watch } from 'vue';

const emit = defineEmits(['save']);

const props = defineProps({
    content: {
        type: String,
        default: '',
    }
});

const editorInstance = useEditor({
    editorProps: {
        attributes: {
            class: 'p-4 w-full h-full focus:outline-none text-black text-sm dark:text-white',
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
    ],
    onUpdate: () => {
        save();
    },
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
