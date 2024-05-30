import journeyReducer, { setJourneys, addJourney, updateJourney, deleteJourney } from '../../store/journeySlice';
import { Journey } from '../../types/types';

const initialTestData = {
    journeyId: '1',
    journeyName: 'Journey1',
    pilots: [],
    passengers: [],
    engineers: [],
    departureTime: '',
    destination: '',
} as Journey;

describe('journeySlice', () => {
    const initialState = {
        journeys: [] as Journey[],
        totalJourneys: 0,
    };

    test('should handle initial state', () => {
        expect(journeyReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('should handle setJourneys', () => {
        const journeys: Journey[] = [initialTestData];
        const actual = journeyReducer(initialState, setJourneys(journeys));
        expect(actual.journeys).toEqual(journeys);
        expect(actual.totalJourneys).toBe(1);
    });

    test('should handle addJourney', () => {
        const newJourney: Journey = { ...initialTestData, journeyId: '2', journeyName: 'Journey2' };
        const actual = journeyReducer(initialState, addJourney(newJourney));
        expect(actual.journeys).toContainEqual(newJourney);
        expect(actual.totalJourneys).toBe(1);
    });

    test('should handle updateJourney', () => {
        const initialStateWithJourney = {
            journeys: [initialTestData],
            totalJourneys: 1,
        };
        const updatedJourney: Journey = { ...initialTestData, journeyId: '1', journeyName: 'Updated Journey1' };
        const actual = journeyReducer(initialStateWithJourney, updateJourney(updatedJourney));
        expect(actual.journeys[0].journeyName).toBe('Updated Journey1');
    });

    test('should handle deleteJourney', () => {
        const initialStateWithJourney = {
            journeys: [initialTestData],
            totalJourneys: 1,
        };
        const actual = journeyReducer(initialStateWithJourney, deleteJourney('1'));
        expect(actual.journeys).toEqual([]);
        expect(actual.totalJourneys).toBe(0);
    });
});
