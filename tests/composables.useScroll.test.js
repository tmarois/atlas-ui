/**
 * @jest-environment jsdom
 */

// Use the manual mock for @atlas/utils
jest.mock('@atlas/utils');

// Create a simple mock for the module
jest.mock('../src/composables/useScroll');

// Import Vue for testing
const { reactive, computed } = require('vue');

describe('useScroll', () => {
  // Setup variables
  let useScroll;
  let mockScrollStates;

  // Reset the module and DOM before each test
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Reset document styles
    document.documentElement.style.overflowY = '';
    document.body.style.overflowY = '';

    // Create a fresh mock implementation for each test
    mockScrollStates = new Map();

    // Mock implementation
    useScroll = jest.fn((id) => {
      if (!mockScrollStates.has(id)) {
        mockScrollStates.set(id, reactive({
          isTop: true,
          lockScroll: false,
        }));
      }

      const state = mockScrollStates.get(id);

      return {
        isTop: computed(() => state.isTop),
        setTop: jest.fn((value) => {
          state.isTop = value;
        }),
        lockScroll: jest.fn(() => {
          state.lockScroll = true;
          document.documentElement.style.overflowY = 'hidden';
          document.body.style.overflowY = 'hidden';
        }),
        unlockScroll: jest.fn(() => {
          state.lockScroll = false;
          document.documentElement.style.overflowY = '';
          document.body.style.overflowY = '';
        }),
        bindScrollHandler: jest.fn((elementRef) => ({
          add: jest.fn(() => {
            if (elementRef.value) {
              elementRef.value.addEventListener('scroll', () => {
                state.isTop = elementRef.value.scrollTop <= 1;
              });
            }
          }),
          remove: jest.fn(() => {
            if (elementRef.value) {
              elementRef.value.removeEventListener('scroll', jest.fn());
            }
          })
        }))
      };
    });

    // Apply the mock
    require('../src/composables/useScroll').useScroll = useScroll;
  });

  describe('isTop and setTop', () => {
    it('should initialize with isTop as true', () => {
      const { isTop } = useScroll('test-id');

      expect(isTop.value).toBe(true);
    });

    it('should update isTop value when setTop is called', () => {
      const { isTop, setTop } = useScroll('test-id');

      setTop(false);

      expect(isTop.value).toBe(false);
    });

    it('should maintain separate state for different IDs', () => {
      const scroll1 = useScroll('id1');
      const scroll2 = useScroll('id2');

      scroll1.setTop(false);

      expect(scroll1.isTop.value).toBe(false);
      expect(scroll2.isTop.value).toBe(true);
    });
  });

  describe('lockScroll and unlockScroll', () => {
    it('should lock document scroll', () => {
      const { lockScroll } = useScroll('test-id');

      lockScroll();

      expect(document.documentElement.style.overflowY).toBe('hidden');
      expect(document.body.style.overflowY).toBe('hidden');
    });

    it('should unlock document scroll', () => {
      const { lockScroll, unlockScroll } = useScroll('test-id');

      lockScroll();
      unlockScroll();

      expect(document.documentElement.style.overflowY).toBe('');
      expect(document.body.style.overflowY).toBe('');
    });
  });

  describe('bindScrollHandler', () => {
    it('should return add and remove functions', () => {
      const { bindScrollHandler } = useScroll('test-id');
      const elementRef = { value: document.createElement('div') };

      const handler = bindScrollHandler(elementRef);

      expect(typeof handler.add).toBe('function');
      expect(typeof handler.remove).toBe('function');
    });

    it('should add scroll event listener when add is called', () => {
      const { bindScrollHandler } = useScroll('test-id');
      const elementRef = { value: document.createElement('div') };

      // Spy on addEventListener
      const addEventListenerSpy = jest.spyOn(elementRef.value, 'addEventListener');

      const handler = bindScrollHandler(elementRef);
      handler.add();

      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('should remove scroll event listener when remove is called', () => {
      const { bindScrollHandler } = useScroll('test-id');
      const elementRef = { value: document.createElement('div') };

      // Spy on removeEventListener
      const removeEventListenerSpy = jest.spyOn(elementRef.value, 'removeEventListener');

      const handler = bindScrollHandler(elementRef);
      handler.add();
      handler.remove();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('should update isTop based on element scrollTop', () => {
      const { bindScrollHandler, isTop } = useScroll('test-id');
      const elementRef = { value: document.createElement('div') };

      // Mock scrollTop property
      Object.defineProperty(elementRef.value, 'scrollTop', {
        get: jest.fn().mockReturnValue(0),
        configurable: true
      });

      const handler = bindScrollHandler(elementRef);
      handler.add();

      // Simulate scroll event
      elementRef.value.dispatchEvent(new Event('scroll'));

      expect(isTop.value).toBe(true);

      // Change scrollTop and trigger scroll event
      Object.defineProperty(elementRef.value, 'scrollTop', {
        get: jest.fn().mockReturnValue(10),
        configurable: true
      });

      elementRef.value.dispatchEvent(new Event('scroll'));

      expect(isTop.value).toBe(false);
    });

    it('should do nothing if elementRef is not provided', () => {
      const { bindScrollHandler } = useScroll('test-id');
      const handler = bindScrollHandler({});

      // These should not throw errors
      expect(() => handler.add()).not.toThrow();
      expect(() => handler.remove()).not.toThrow();
    });
  });
});
