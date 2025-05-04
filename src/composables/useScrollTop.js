import { reactive, computed } from 'vue';

const scrollStates = reactive(new Map());

export function useScrollTop(id) {

    if (!scrollStates.has(id)) {
        scrollStates.set(id, {
            isTop: true,
            lockScroll: false,
        });
    }

    const state = scrollStates.get(id);

    const isTop = computed(() => state.isTop);

    const setTop = (value) => {
        state.isTop = value;
    };

    const lockScroll = () => {
        state.lockScroll = true;
        document.documentElement.style.overflowY = 'hidden';
        document.body.style.overflowY = 'hidden';
    };

    const unlockScroll = () => {
        state.lockScroll = false;
        document.documentElement.style.overflowY = '';
        document.body.style.overflowY = '';
    };

    const bindScrollHandler = (elementRef) => {
        const handleScroll = () => {
            if (!elementRef.value) return;
            setTop(elementRef.value.scrollTop <= 1);
        };

        const add = () => {
            if (elementRef.value) {
                elementRef.value.addEventListener('scroll', handleScroll);
                handleScroll();
            }
        };

        const remove = () => {
            if (elementRef.value) {
                elementRef.value.removeEventListener('scroll', handleScroll);
            }
        };

        return { add, remove };
    };

    return {
        isTop,
        setTop,
        bindScrollHandler,
        lockScroll,
        unlockScroll,
    };
}
