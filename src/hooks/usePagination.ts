import { useCallback, useEffect, useState } from 'react';

const usePagination = (totalItems: number, itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage((c) => (c - 1 > 0 ? c - 1 : 1));
        }
    }, [totalItems]);

    const changePage = useCallback(
        (page: number) => {
            if (page > 0 && page <= totalPages) {
                setCurrentPage(page);
            }
        },
        [totalPages]
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
        currentPage,
        totalPages,
        changePage,
        startIndex,
        endIndex,
    };
};

export default usePagination;
