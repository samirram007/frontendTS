import { toast } from 'sonner';

export const showQueryError = (error: unknown) => {
    const message =
        (error as any)?.response?.data?.message ||
        (error as any)?.message ||
        'Failed to fetch data.';
    toast.error(message);
};

export const showMutationError = (error: unknown) => {
    const message =
        (error as any)?.response?.data?.message ||
        (error as any)?.message ||
        'Something went wrong.';
    toast.error(message);
};
