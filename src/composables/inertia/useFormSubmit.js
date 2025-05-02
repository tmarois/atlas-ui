import { useToast } from 'primevue/usetoast';

export const useFormSubmit = () => {
    const toast = useToast();
    const submitForm = async (
        form,
        method = 'post',
        routePath,
        {
            preserveScroll = true,
            preserveState = true,
            onSuccess = () => {},
            onError = () => {},
            onFinish = () => {},
            onBefore = () => {},
            onProgress = () => {},
            toastMessage = null,
        } = {}
    ) => {
        const options = {
            preserveScroll,
            preserveState,
            onSuccess: (response) => {
                if (toastMessage) {
                    toast.add({ severity: 'success', summary: toastMessage, life: 6000 });
                }
                onSuccess(response);
            },
            onError,
            onFinish,
            onBefore,
            onProgress
        };

        await form[method.toLowerCase()](routePath, options);
    };

    return {
        submitForm
    };
};
