import { ref, computed } from 'vue'

const modalName = ref(null)
const modalProps = ref({})

export function useModal() {

    const openModal = (name, props = {}) => {
        modalName.value = name
        modalProps.value = props
    }

    const closeModal = () => {
        modalName.value = null
        modalProps.value = {}
    }

    const modal = (name) => computed({
        get: () => modalName.value === name,
        set: (value) => {
            if (value) {
                openModal(name)
            } else if (modalName.value === name) {
                closeModal()
            }
        }
    })

    return {
        modalName,
        modalProps,
        openModal,
        closeModal,
        modal,
    }
}
