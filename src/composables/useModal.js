import { reactive, computed } from 'vue';

const modals = reactive(new Map())
const openListeners = new Map()
const closeListeners = new Map()

export function useModal() {
    const open = (name, data = null) => {
        modals.set(name, { open: true, data })

        if (openListeners.has(name)) {
            for (const callback of openListeners.get(name)) {
                callback(data)
            }
        }
    }

    const close = (name) => {
        if (modals.has(name)) {
            const previousData = modals.get(name)?.data || null
            modals.set(name, { ...modals.get(name), open: false })

            if (closeListeners.has(name)) {
                for (const callback of closeListeners.get(name)) {
                    callback(previousData)
                }
            }
        }
    }

    const closeAll = () => {
        for (const [name, modal] of modals.entries()) {
            if (modal.open) {
                close(name)
            }
        }
    }

    const activeState = (name) => computed({
        get: () => modals.get(name)?.open === true,
        set: (value) => {
            if (value) open(name)
            else close(name)
        }
    })

    const data = (name) => computed(() => modals.get(name)?.data || null)

    const isOpen = computed(() => {
        for (const modal of modals.values()) {
            if (modal.open) return true
        }
        return false
    })

    const onOpen = (name, callback) => {
        if (!openListeners.has(name)) {
            openListeners.set(name, [])
        }
        openListeners.get(name).push(callback)
    }

    const onClose = (name, callback) => {
        if (!closeListeners.has(name)) {
            closeListeners.set(name, [])
        }
        closeListeners.get(name).push(callback)
    }

    return {
        open,
        close,
        closeAll,
        activeState,
        data,
        isOpen,
        onOpen,
        onClose,
    }
}
