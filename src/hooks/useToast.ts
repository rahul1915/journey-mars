import { useState } from 'react';

interface ToastState {
    messages: string[];
    type: 'success' | 'error';
}

const initialState: ToastState = {
    messages: [],
    type: 'success',
};

const useToast = () => {
    const [toast, setToast] = useState<ToastState>(initialState);

    const handleShowToast = (messages: string[], type: 'success' | 'error') => {
        setToast({ messages, type });
    };

    const handleCloseToast = () => {
        setToast(initialState);
    };

    return {
        toast,
        handleShowToast,
        handleCloseToast,
    };
};

export default useToast;
