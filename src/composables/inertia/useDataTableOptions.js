import { ref, reactive, watch } from 'vue';
import debounce from 'lodash/debounce';
import { router } from '@inertiajs/vue3';

export function useDataTableOptions(routeConfig, initialOptions = {}, options = {}) {
    const {
        only = [],
        preserveState = true,
        replace = true,
        debounceMs = 250,
        extraParams = {},
    } = options;

    const mergedOnly = only.includes('options') ? only : ['options', ...only];

    const search = ref(initialOptions.search ?? '');
    const perPage = ref(initialOptions.perPage ?? 15);
    const sortField = ref(initialOptions.sortField ?? 'name');
    const sortOrder = ref(initialOptions.sortOrder ?? 1);
    const filters = reactive({ ...(initialOptions.filters || {}) });

    const resolveRoute = () => {
        if (typeof routeConfig === 'string') {
            // Either a route name or a pre-resolved URL
            if (routeConfig.startsWith('http') || routeConfig.startsWith('/')) {
                return routeConfig;
            }
            return route(routeConfig);
        }

        if (typeof routeConfig === 'object' && routeConfig.name) {
            return route(routeConfig.name, routeConfig.params || {});
        }

        throw new Error('Invalid route configuration provided to useDataTableOptions.');
    };

    const update = () => {
        router.get(resolveRoute(), {
            search: search.value,
            perPage: perPage.value,
            sortField: sortField.value,
            sortOrder: sortOrder.value,
            filters: filters,
            ...extraParams,
        }, {
            only: mergedOnly,
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
