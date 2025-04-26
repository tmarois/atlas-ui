import { ref, computed } from 'vue'

const modalName = ref(null)
const modalProps = ref({})

export function useModal() {

    const open = (name, props = {}) => {
        modalName.value = name
        modalProps.value = props
    }

    const close = () => {
        modalName.value = null
        modalProps.value = {}
    }

    const modal = (name) => computed({
        get: () => modalName.value === name,
        set: (value) => {
            if (value) {
                open(name)
            } else if (modalName.value === name) {
                close()
            }
        }
    })

    return {
        modalName,
        modalProps,
        open,
        close,
        modal,
    }
}
