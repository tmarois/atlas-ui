<template>
    <DataTable
        lazy
        v-bind="{
            value: items,
            selection: selectedItems,
            dataKey: hasSelection ? dataKey : undefined,
            rowHover: true,
            showGridlines: true,
            size,
            tableStyle,
            ...$attrs
        }"
        @sort="handleSort"
        @update:selection="emit('update:selected', $event)"
        @row-select-all="emit('update:selectAll', false)"
        @row-unselect-all="emit('update:selectAll', false)"
        @row-select=""
        @row-unselect="selectAll ? resetSelection() : () => {}"
    >
        <Column
            v-if="hasSelection"
            selectionMode="multiple"
            class="text-center"
            header-style="width: 2rem;text-align:center;"
            :class="{ 'hide-select': hasSelectAll }"
            frozen
        >
            <template v-if="hasSelectAll" #header>
                <ButtonMenu :items="selectOptions" :onHover="true" />
            </template>
        </Column>
        <template v-for="column in columns" :key="column.field">
            <Column
                :field="column.field"
                :header="column.header"
                :style="column.style"
                :class="column.class"
                :body-class="column.bodyClass"
                :sortable="column.sortable ?? false"
                :frozen="column.frozen ?? false"
                v-bind="column.props"
            >
                <template v-if="$slots[column.field]" #body="slotProps">
                    <slot :name="column.field" v-bind="slotProps" />
                </template>
                <template #sorticon="{ sorted, sortOrder }">
                    <span
                        class="inline-block transition-transform"
                        :class="{
                            'pi pi-sort': !sorted,
                            'pi pi-sort-up': sortOrder === 1,
                            'pi pi-sort-down': sortOrder === -1
                        }"
                    />
                </template>
            </Column>
        </template>
        <template #empty>
            <slot name="empty">
                <div class="text-center p-4">{{  emptyLabel  }}</div>
            </slot>
        </template>
    </DataTable>
</template>

<script setup>
import { useAttrs } from 'vue';
import DataTable from '@atlas/components/DataTable.vue';
import Column from 'primevue/column';
import ButtonMenu from '@atlas/components/ButtonMenu.vue';
import { computed } from 'vue';
import { formatNumber } from '@atlas/utils';

const emit = defineEmits(['sort', 'update:selected', 'update:selectAll']);

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    itemTotal: {
        type: Number,
        default: 0
    },
    selected: {
        type: Array,
        default: undefined,
    },
    selectAll: {
        type: Boolean,
        default: false,
    },
    columns: {
        type: Array,
        required: true,
    },
    size: {
        type: String,
        default: 'small',
    },
    tableStyle: {
        type: String,
        default: 'min-width: 50rem',
    },
    dataKey: {
        type: String,
        default: 'id',
    },
    emptyLabel : {
        type: String,
        default: 'No results'
    },
    hasSelectAll: {
        type: Boolean,
        default: true
    },
    hasSelection: {
        type: Boolean,
        default: false
    }
});

const $attrs = useAttrs();

const selectedItems = computed(() => props.selectAll ? props.items : props.selected);

const handleSort = (event) => {
    emit('sort', {
        field: event.sortField,
        order: event.sortOrder,
    });
};

const resetSelection = () => {
    emit('update:selectAll', false);
    emit('update:selected', [])
};

const selectOptions = computed(() => [
    {
        label: `Select All (${formatNumber(props.itemTotal)})`,
        click: () => {
            emit('update:selectAll', true);
            emit('update:selected', []);
        }
    },
    {
        label: 'Select Visible',
        click: () => {
            emit('update:selectAll', false);
            emit('update:selected', props.items);
        }
    },
    {
        label: 'Select None',
        click: () => {
            resetSelection();
        }
    },
]);
</script>

<style>
.hide-select [data-pc-name="pcheadercheckbox"] {
    display: none ! important;
}
</style>
