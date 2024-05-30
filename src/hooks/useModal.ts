import { useState, useCallback } from 'react';

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        handleOpenModal,
        handleCloseModal,
    };
};

export default useModal;
