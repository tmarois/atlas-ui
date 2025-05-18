import { ref, reactive, watch } from 'vue';
import debounce from 'lodash/debounce';
import { router } from '@inertiajs/vue3';

export function useDataTableOptions(routeName, initial = {}, options = {}) {
    const {
        only = ['users'],
        preserveState = true,
        replace = true,
        debounceMs = 250,
        extraParams = {},
    } = options;

    const search = ref(initial.search ?? '');
    const perPage = ref(initial.perPage ?? 15);
    const sortField = ref(initial.sortField ?? 'name');
    const sortOrder = ref(initial.sortOrder ?? 1);
    const filters = reactive({ ...(initial.filters || {}) });

    const update = () => {
        router.get(route(routeName), {
            search: search.value,
            perPage: perPage.value,
            sortField: sortField.value,
            sortOrder: sortOrder.value,
            filters: filters,
            ...extraParams,
        }, {
            only,
            preserveState,
            replace,
        });
    };

    const debouncedUpdate = debounce(update, debounceMs);
    watch(search, debouncedUpdate);

    watch([perPage, sortField, sortOrder], update);
    watch(filters, update, { deep: true });

    return {
        search,
        perPage,
        sortField,
        sortOrder,
        filters,
        update,
    };
}
