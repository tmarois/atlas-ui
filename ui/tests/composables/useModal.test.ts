import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useModal } from '../../src/composables/useModal';

describe('useModal', () => {
    let modal: ReturnType<typeof useModal>;

    beforeEach(() => {
        modal = useModal();
    });

    describe('open and close', () => {
        it('should open a modal', () => {
            modal.open('testModal');
            expect(modal.activeState('testModal').value).toBe(true);
        });

        it('should open a modal with data', () => {
            const testData = { id: 1, name: 'Test' };
            modal.open('testModal', testData);
            expect(modal.data('testModal').value).toEqual(testData);
        });

        it('should close a modal', () => {
            modal.open('testModal');
            modal.close('testModal');
            expect(modal.activeState('testModal').value).toBe(false);
        });

        it('should handle closing a non-existent modal', () => {
            expect(() => modal.close('nonExistentModal')).not.toThrow();
        });

        it('should close all open modals', () => {
            modal.open('modal1');
            modal.open('modal2');
            modal.closeAll();
            expect(modal.activeState('modal1').value).toBe(false);
            expect(modal.activeState('modal2').value).toBe(false);
        });
    });

    describe('activeState', () => {
        it('should return the active state of a modal', () => {
            modal.open('testModal');
            expect(modal.activeState('testModal').value).toBe(true);
        });

        it('should set the active state of a modal to true', () => {
            const state = modal.activeState('testModal');
            state.value = true;
            expect(modal.activeState('testModal').value).toBe(true);
        });

        it('should set the active state of a modal to false', () => {
            modal.open('testModal');
            const state = modal.activeState('testModal');
            state.value = false;
            expect(modal.activeState('testModal').value).toBe(false);
        });
    });

    describe('data', () => {
        it('should return null for non-existent modal', () => {
            expect(modal.data('nonExistentModal').value).toBeNull();
        });

        it('should return data for an open modal', () => {
            const testData = { id: 1, name: 'Test' };
            modal.open('testModal', testData);
            expect(modal.data('testModal').value).toEqual(testData);
        });

        it('should return data for a closed modal', () => {
            const testData = { id: 1, name: 'Test' };
            modal.open('testModal', testData);
            modal.close('testModal');
            expect(modal.data('testModal').value).toEqual(testData);
        });
    });

    describe('isOpen', () => {
        it('should return true when any modal is open', () => {
            modal.open('testModal');
            expect(modal.isOpen.value).toBe(true);
        });

        it('should return false when all modals are closed', () => {
            modal.open('testModal');
            modal.close('testModal');
            expect(modal.isOpen.value).toBe(false);
        });
    });

    describe('listeners', () => {
        it('should call onOpen callback when modal is opened', () => {
            const callback = vi.fn();
            modal.onOpen('testModal', callback);
            modal.open('testModal', { data: 'test' });
            expect(callback).toHaveBeenCalledWith({ data: 'test' });
        });

        it('should call onClose callback when modal is closed', () => {
            const callback = vi.fn();
            const testData = { data: 'test' };
            modal.onClose('testModal', callback);
            modal.open('testModal', testData);
            modal.close('testModal');
            expect(callback).toHaveBeenCalledWith(testData);
        });

        it('should handle multiple open listeners', () => {
            const callback1 = vi.fn();
            const callback2 = vi.fn();
            modal.onOpen('testModal', callback1);
            modal.onOpen('testModal', callback2);
            modal.open('testModal');
            expect(callback1).toHaveBeenCalled();
            expect(callback2).toHaveBeenCalled();
        });

        it('should handle multiple close listeners', () => {
            const callback1 = vi.fn();
            const callback2 = vi.fn();
            modal.onClose('testModal', callback1);
            modal.onClose('testModal', callback2);
            modal.open('testModal');
            modal.close('testModal');
            expect(callback1).toHaveBeenCalled();
            expect(callback2).toHaveBeenCalled();
        });
    });
});
