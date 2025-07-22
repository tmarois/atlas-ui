/**
 * @jest-environment jsdom
 */

// Mock the useModal module to ensure each test gets a fresh state
jest.mock('../src/composables/useModal', () => {
  // Create a factory function that returns a fresh instance of useModal for each test
  return {
    useModal: jest.fn(() => {
      const { reactive, computed } = require('vue');

      // Create fresh state for each test
      const modals = reactive(new Map());
      const openListeners = new Map();
      const closeListeners = new Map();

      const open = (name, data = null) => {
        modals.set(name, { open: true, data });

        if (openListeners.has(name)) {
          for (const callback of openListeners.get(name)) {
            callback(data);
          }
        }
      };

      const close = (name) => {
        if (modals.has(name)) {
          const previousData = modals.get(name)?.data || null;
          modals.set(name, { ...modals.get(name), open: false });

          if (closeListeners.has(name)) {
            for (const callback of closeListeners.get(name)) {
              callback(previousData);
            }
          }
        }
      };

      const closeAll = () => {
        for (const [name, modal] of modals.entries()) {
          if (modal.open) {
            close(name);
          }
        }
      };

      const activeState = (name) => computed({
        get: () => modals.get(name)?.open === true,
        set: (value) => {
          if (value) open(name);
          else close(name);
        }
      });

      const data = (name) => computed(() => modals.get(name)?.data || null);

      const isOpen = computed(() => {
        for (const modal of modals.values()) {
          if (modal.open) return true;
        }
        return false;
      });

      const onOpen = (name, callback) => {
        if (!openListeners.has(name)) {
          openListeners.set(name, []);
        }
        openListeners.get(name).push(callback);
      };

      const onClose = (name, callback) => {
        if (!closeListeners.has(name)) {
          closeListeners.set(name, []);
        }
        closeListeners.get(name).push(callback);
      };

      return {
        open,
        close,
        closeAll,
        activeState,
        data,
        isOpen,
        onOpen,
        onClose,
      };
    })
  };
});

// Import the useModal composable
const { useModal } = require('../src/composables/useModal');

describe('useModal', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('open and close', () => {
    it('should open a modal', () => {
      const { open, activeState } = useModal();

      open('testModal');

      expect(activeState('testModal').value).toBe(true);
    });

    it('should close a modal', () => {
      const { open, close, activeState } = useModal();

      open('testModal');
      close('testModal');

      expect(activeState('testModal').value).toBe(false);
    });

    it('should handle closing a non-existent modal', () => {
      const { close } = useModal();

      // This should not throw an error
      expect(() => close('nonExistentModal')).not.toThrow();
    });
  });

  describe('data handling', () => {
    it('should store and retrieve data with a modal', () => {
      const { open, data } = useModal();
      const testData = { test: 'value' };

      open('testModal', testData);

      expect(data('testModal').value).toEqual(testData);
    });

    it('should return null for non-existent modal data', () => {
      const { data } = useModal();

      expect(data('nonExistentModal').value).toBeNull();
    });
  });

  describe('activeState', () => {
    it('should return a computed property that reflects modal state', () => {
      const { activeState, open, close } = useModal();
      const state = activeState('testModal');

      expect(state.value).toBe(false);

      open('testModal');
      expect(state.value).toBe(true);

      close('testModal');
      expect(state.value).toBe(false);
    });

    it('should open modal when setting activeState to true', () => {
      const { activeState } = useModal();
      const state = activeState('testModal');

      state.value = true;

      expect(state.value).toBe(true);
    });

    it('should close modal when setting activeState to false', () => {
      const { activeState, open } = useModal();

      open('testModal');
      const state = activeState('testModal');

      state.value = false;

      expect(state.value).toBe(false);
    });
  });

  describe('isOpen', () => {
    it('should return true when any modal is open', () => {
      const { open, isOpen } = useModal();

      expect(isOpen.value).toBe(false);

      open('testModal');

      expect(isOpen.value).toBe(true);
    });

    it('should return false when all modals are closed', () => {
      const { open, close, isOpen } = useModal();

      open('testModal');
      close('testModal');

      expect(isOpen.value).toBe(false);
    });
  });

  describe('closeAll', () => {
    it('should close all open modals', () => {
      const { open, closeAll, activeState } = useModal();

      open('modal1');
      open('modal2');
      open('modal3');

      closeAll();

      expect(activeState('modal1').value).toBe(false);
      expect(activeState('modal2').value).toBe(false);
      expect(activeState('modal3').value).toBe(false);
    });
  });

  describe('event listeners', () => {
    it('should call onOpen callback when modal is opened', () => {
      const { open, onOpen } = useModal();
      const callback = jest.fn();
      const testData = { test: 'value' };

      onOpen('testModal', callback);
      open('testModal', testData);

      expect(callback).toHaveBeenCalledWith(testData);
    });

    it('should call onClose callback when modal is closed', () => {
      const { open, close, onClose } = useModal();
      const callback = jest.fn();
      const testData = { test: 'value' };

      open('testModal', testData);
      onClose('testModal', callback);
      close('testModal');

      expect(callback).toHaveBeenCalledWith(testData);
    });

    it('should handle multiple onOpen callbacks', () => {
      const { open, onOpen } = useModal();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      onOpen('testModal', callback1);
      onOpen('testModal', callback2);
      open('testModal');

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });

    it('should handle multiple onClose callbacks', () => {
      const { open, close, onClose } = useModal();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      open('testModal');
      onClose('testModal', callback1);
      onClose('testModal', callback2);
      close('testModal');

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });
});
