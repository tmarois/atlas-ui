import { reactive, computed } from 'vue'

const modals = reactive(new Map())

export function useModal() {
    const openModal = (name, data = null) => {
        modals.set(name, { open: true, data })
    }

    const closeModal = (name) => {
        if (modals.has(name)) {
            modals.set(name, { ...modals.get(name), open: false })
        }
    }

    const closeAllModals = () => {
        for (const [name, modal] of modals.entries()) {
            modals.set(name, { ...modal, open: false })
        }
    }

    const modalActiveState = (name) => computed({
        get: () => modals.get(name)?.open === true,
        set: (value) => {
            if (value) openModal(name)
            else closeModal(name)
        }
    })

    const getModalData = (name) => computed(() => modals.get(name)?.data || null)

    const isAnyModalOpen = computed(() => {
        for (const modal of modals.values()) {
            if (modal.open) return true
        }
        return false
    })

    return {
        openModal,
        closeModal,
        closeAllModals,
        modalActiveState,
        getModalData,
        isAnyModalOpen,
    }
}
