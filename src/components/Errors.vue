<template>
    <div
        class="rounded-md bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/70 p-4 cursor-pointer"
        :class="hasErrors || failed ? '' : 'hidden'"
        @click="expandErrors = !expandErrors"
    >
        <div class="flex">
            <div class="relative top-1 shrink-0 text-red-700 self-start flex items-center">
                <IconAlertCircle size="18" stroke-width="2.5" />
            </div>
            <div class="ml-2 basis-full">
                <div class="flex font-semibold text-red-700 dark:text-red-50 text-base">
                    <span>{{ title || (failed ? 'An error occurred' : 'Errors') }}</span>
                    <span class="ml-auto" :class="expandErrors ? 'rotate-180' : ''">
                        <IconChevronDown size="16" />
                    </span>
                </div>
            </div>
        </div>
        <transition
            name="expand"
            @enter="expandEnter"
            @leave="expandLeave"
        >
            <div v-show="expandErrors" class="overflow-hidden">
                <div class="text-sm text-red-800 dark:text-red-50 pt-1">
                    <ul v-if="hasErrors" role="list" class="list-disc pl-[26px] space-y-1 text-left">
                        <li v-for="(error, index) in props.errors" :key="index">
                            <slot :error="error">
                                <span v-html="error" />
                            </slot>
                        </li>
                    </ul>
                    <div v-else-if="failed" class="pl-[26px] text-left">
                        <slot name="defaultError">
                            <span>An unexpected error occurred. Please try again later.</span>
                        </slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { IconAlertCircle, IconChevronDown } from '@tabler/icons-vue'
import { isEmpty } from '@atlas/utils'

const props = defineProps({
    errors: {
        type: [Object, Array],
        default: () => ({})
    },
    failed: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    expandDefault: {
        type: Boolean,
        default: true
    }
})

const expandErrors = ref(props.expandDefault)

onMounted(() => {
    expandErrors.value = props.expandDefault
})

const hasErrors = computed(() => {
    if (!isEmpty(props.errors)) return true
    return false
})

function expandEnter(el) {
    el.style.height = '0'
    el.offsetHeight // force reflow
    el.style.transition = 'height 200ms ease'
    el.style.height = el.scrollHeight + 'px'
}

function expandLeave(el) {
    el.style.height = el.scrollHeight + 'px'
    el.offsetHeight // force reflow
    el.style.transition = 'height 200ms ease'
    el.style.height = '0'
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: height 200ms ease;
}
</style>
