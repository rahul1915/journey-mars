import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JourneyTablePagination from '../../../../components/journey/table/JourneyTablePagination';

const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;
const TOTAL_PAGE_SIZE = 5;

describe('JourneyTablePagination Component', () => {
    const setup = (currentPage: number, totalPages: number, onPageChange: jest.Mock) => {
        return render(
            <JourneyTablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        );
    };

    test('renders correctly when totalPages is 1 or less', () => {
        const { container } = setup(1, 1, jest.fn());
        expect(container).toBeEmptyDOMElement();
    });

    test('renders correctly with multiple pages', () => {
        setup(1, TOTAL_PAGE_SIZE, jest.fn());
        const prevButton = screen.getByLabelText('Previous');
        const nextButton = screen.getByLabelText('Next');
        const pageButtons = screen.getAllByRole('button', { name: /Page-/ });

        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
        expect(pageButtons).toHaveLength(TOTAL_PAGE_SIZE);
    });

    test('disables Previous button on first page', () => {
        setup(1, TOTAL_PAGE_SIZE, jest.fn());
        const prevButton = screen.getByLabelText('Previous');
        expect(prevButton).toBeDisabled();
    });

    test('disables Next button on last page', () => {
        setup(FIVE, TOTAL_PAGE_SIZE, jest.fn());
        const nextButton = screen.getByLabelText('Next');
        expect(nextButton).toBeDisabled();
    });

    test('calls onPageChange with correct page number on button click', () => {
        const onPageChange = jest.fn();
        setup(THREE, TOTAL_PAGE_SIZE, onPageChange);

        const prevButton = screen.getByLabelText('Previous');
        const nextButton = screen.getByLabelText('Next');
        const page3Button = screen.getByLabelText('Page-3');
        const page4Button = screen.getByLabelText('Page-4');

        fireEvent.click(prevButton);
        expect(onPageChange).toHaveBeenCalledWith(TWO);

        fireEvent.click(nextButton);
        expect(onPageChange).toHaveBeenCalledWith(FOUR);

        fireEvent.click(page3Button);
        expect(onPageChange).toHaveBeenCalledWith(THREE);

        fireEvent.click(page4Button);
        expect(onPageChange).toHaveBeenCalledWith(FOUR);
    });
});
