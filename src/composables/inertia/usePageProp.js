import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

export function usePageProp(path, defaultValue = null) {
    const page = usePage();

    const value = computed(() => {
        const keys = path.split('.');
        let result = page.props.value;

        for (const key of keys) {
            if (result && Object.prototype.hasOwnProperty.call(result, key)) {
                result = result[key]
            } else {
                return defaultValue;
            }
        }

        return result;
    });

    return value;
}
