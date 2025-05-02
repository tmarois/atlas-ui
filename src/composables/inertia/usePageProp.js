import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

export const usePageProp = (path, defaultValue = null) => {
    const page = usePage()

    return computed(() => {
        const keys = path.split('.')
        let result = page.props

        for (const key of keys) {
            if (result == null || typeof result !== 'object') {
                return defaultValue
            }

            result = result[key]
        }

        return result === undefined ? defaultValue : result
    })
}
