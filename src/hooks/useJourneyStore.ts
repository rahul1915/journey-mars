import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '../store';
import { addJourney, updateJourney, deleteJourney, setJourneys } from '../store/journeySlice';
import { Journey } from '../types/types';

const useJourneyStore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const journeys = useSelector((state: RootState) => state.journey.journeys);

    const setJourneyData = useCallback(
        (journeyData: Journey[]) => {
            dispatch(setJourneys(journeyData));
        },
        [dispatch]
    );

    const createJourney = useCallback(
        (journey: Journey) => {
            dispatch(addJourney(journey));
        },
        [dispatch]
    );

    const editJourney = useCallback(
        (journey: Journey) => {
            dispatch(updateJourney(journey));
        },
        [dispatch]
    );

    const removeJourney = useCallback(
        (id: string) => {
            dispatch(deleteJourney(id));
        },
        [dispatch]
    );

    return { journeys, createJourney, editJourney, removeJourney, setJourneyData };
};

export default useJourneyStore;
