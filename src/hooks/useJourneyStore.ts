import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addJourney, updateJourney, deleteJourney, setJourneys } from '../store/journeySlice';
import { Journey } from '../types/types';

const useJourneyStore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const journeys = useSelector((state: RootState) => state.journey.journeys);

    const setJourneyData = (journeyData: Journey[]) => {
        dispatch(setJourneys(journeyData));
    };

    const createJourney = (journey: Journey) => {
        dispatch(addJourney(journey));
    };

    const editJourney = (journey: Journey) => {
        dispatch(updateJourney(journey));
    };

    const removeJourney = (id: string) => {
        dispatch(deleteJourney(id));
    };

    return { journeys, createJourney, editJourney, removeJourney, setJourneyData };
};

export default useJourneyStore;
