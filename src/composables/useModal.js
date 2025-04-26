import { ref } from 'vue'

const isOpen = ref(false)
const modalName = ref(null)
const modalProps = ref({})

export function useModal() {
    const open = (name, props = {}) => {
        modalName.value = name
        modalProps.value = props
        isOpen.value = true
    }

    const close = () => {
        isOpen.value = false
        modalName.value = null
        modalProps.value = {}
    }

    return {
        isOpen,
        modalName,
        modalProps,
        open,
        close,
    }
}
