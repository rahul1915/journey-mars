import React, { useEffect, useState } from 'react';
import Button from '../components/base/Button';
import JourneyFilter from '../components/journey/filter/JourneyFilter';
import JourneyTable from '../components/journey/table/JourneyTable';
import JourneyTableRow from '../components/journey/table/JourneyTableRow';
import JourneyTablePagination from '../components/journey/table/JourneyTablePagination';
import usePagination from '../hooks/usePagination';
import useJourneyStore from '../hooks/useJourneyStore';
import { AddIcon } from '../icons/icons';
import { Journey } from '../types/types';

interface JourneyViewProps {
    onOpenModal: () => void;
    onEdit: (journey: Journey) => void;
    onShowToast: (messages: string[], type: 'success' | 'error') => void;
}

const ITEM_PER_PAGE = 10;

const JourneyView: React.FC<JourneyViewProps> = ({ onOpenModal, onEdit, onShowToast }) => {
    const { journeys, removeJourney } = useJourneyStore();
    const [filteredJourneys, setFilteredJourneys] = useState<Journey[]>(journeys);
    const { currentPage, totalPages, changePage, startIndex, endIndex } = usePagination(
        filteredJourneys.length,
        ITEM_PER_PAGE
    );

    useEffect(() => {
        setFilteredJourneys(journeys);
    }, [journeys]);

    const handleFilterChange = (filter: string) => {
        const filtered = journeys.filter((journey) => journey.journeyName.toLowerCase().includes(filter.toLowerCase()));
        setFilteredJourneys(filtered);
        changePage(1);
    };

    const handleDelete = (id: string) => {
        removeJourney(id);
        onShowToast(['Journey Deleted Successfully'], 'success');
    };

    return (
        <div className={'grid grid-rows-12 h-full min-h-auto overflow-hidden'}>
            <div className={'mb-4 row-span-1'}>
                <div className={'flex justify-between px-4'}>
                    <JourneyFilter onChange={handleFilterChange} />
                    <Button
                        type={'button'}
                        name={'Add Journey'}
                        ariaLabel={'Create Journey'}
                        onClick={onOpenModal}
                        icon={<AddIcon />}
                    >
                        Create Journey
                    </Button>
                </div>
            </div>
            <div className={'px-4 py-4 row-span-11 overflow-y-auto'}>
                <JourneyTable>
                    <JourneyTableRow
                        journeys={filteredJourneys.slice(startIndex, endIndex)}
                        onEdit={onEdit}
                        onDelete={handleDelete}
                    />
                </JourneyTable>
                <JourneyTablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
            </div>
        </div>
    );
};

export default JourneyView;
