import { ref, computed } from 'vue'

const modalName = ref(null)
const modalData = ref(null)

export function useModal() {
    const openModal = (name, data = null) => {
        modalName.value = name
        modalData.value = data
    }

    const closeModal = () => {
        modalName.value = null
        modalData.value = null
    }

    const modalActiveState = (name) => computed({
        get: () => modalName.value === name,
        set: (value) => {
            if (value) openModal(name)
            else if (modalName.value === name) closeModal()
        }
    })

    const isModalOpen = computed(() => modalName.value !== null)

    return {
        modalName,
        modalData,
        openModal,
        closeModal,
        modalActiveState,
        isModalOpen,
    }
}
