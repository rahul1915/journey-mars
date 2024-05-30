import React, { useEffect } from 'react';

interface ToastProps {
    messages: string[];
    type: 'success' | 'error';
    onClose: () => void;
}

const TIMEOUT = 3000;

const Toast: React.FC<ToastProps> = ({ messages = [], type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, TIMEOUT);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!messages) return null;

    return (
        <div
            className={`fixed right-4 top-4 p-4 rounded-md shadow-lg text-white flex justify-between items-center z-50
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
        transform transition-transform duration-500 ease-in-out translate-x-0 w-80`}
        >
            <span className={'flex-1'}>{messages}</span>
            <span onClick={onClose} className={'ml-4 cursor-pointer text-white hover:text-gray-200'}>
                &times;
            </span>
        </div>
    );
};

export default Toast;
