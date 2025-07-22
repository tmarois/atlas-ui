/**
 * JavaScript version of Vue utilities for testing compatibility
 */
import { twMerge } from 'tailwind-merge';
import { mergeProps } from 'vue';

/**
 * Merges PT (PassThrough) props with tailwind classes
 * @param {Object} globalPTProps - Global PT props
 * @param {Object} selfPTProps - Component-specific PT props
 * @param {Object} datasets - Additional data attributes
 * @returns {Object} Merged properties
 */
export const ptViewMerge = (globalPTProps = {}, selfPTProps = {}, datasets = {}) => {
    const { class: globalClass, ...globalRest } = globalPTProps;
    const { class: selfClass, ...selfRest } = selfPTProps;

        // When both classes are undefined, set the class to undefined explicitly
        const mergedClass = (!globalClass && !selfClass) ? undefined : twMerge(globalClass, selfClass);

        return mergeProps(
            { class: mergedClass },
        globalRest,
        selfRest,
        datasets
    );
};

/**
 * Checks if a slot has content
 * @param {Function|undefined} slot - The slot to check
 * @returns {boolean} True if the slot has content, false otherwise
 */
export function hasSlotContent(slot) {
    if (!slot) return false;

    const content = slot();
    if (!Array.isArray(content) || content.length === 0) return false;

    return content.some((node) => {
        return (
            typeof node.type === 'object' ||
            (node.children && String(node.children).trim() !== '')
        );
    });
}
