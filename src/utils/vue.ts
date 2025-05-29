import { twMerge } from 'tailwind-merge';
import { mergeProps, Slot } from 'vue';

export const ptViewMerge = (globalPTProps = {} as any, selfPTProps = {} as any, datasets: any) => {
    const { class: globalClass, ...globalRest } = globalPTProps;
    const { class: selfClass, ...selfRest } = selfPTProps;

    return mergeProps({ class: twMerge(globalClass, selfClass) }, globalRest, selfRest, datasets);
};

export function hasSlotContent(slot?: Slot): boolean {
    if (!slot) return false;

    const content = slot();
    if (!Array.isArray(content) || content.length === 0) return false;

    return content.some(node => !!node.children && String(node.children).trim() !== '');
}
