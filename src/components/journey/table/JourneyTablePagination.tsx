import React from 'react';
import Button from '../../base/Button';
import { NextIcon, PreviousIcon } from '../../../icons/icons';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage = 1, totalPages = 0, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null;

    return (
        <div className={'mt-4 flex justify-between items-center'}>
            <Button
                type={'button'}
                name={'Previous'}
                ariaLabel={'Previous'}
                onClick={() => {
                    onPageChange(currentPage - 1);
                }}
                disabled={currentPage === 1}
                icon={<PreviousIcon />}
            />
            <div>
                {pages.map((page) => (
                    <span key={page} className={'px-1'}>
                        <Button
                            type={'button'}
                            name={'Pages'}
                            ariaLabel={`Page-${page}`}
                            onClick={() => {
                                onPageChange(page);
                            }}
                            className={`rounded-full ${currentPage === page ? 'bg-stone-500 hover:bg-stone-200' : 'bg-gray-300 hover:bg-stone-100 text-slate-700'}`}
                        >
                            {page}
                        </Button>
                    </span>
                ))}
            </div>
            <Button
                type={'button'}
                name={'Next'}
                ariaLabel={'Next'}
                onClick={() => {
                    onPageChange(currentPage + 1);
                }}
                disabled={currentPage === totalPages}
                icon={<NextIcon />}
            />
        </div>
    );
};

export default Pagination;
