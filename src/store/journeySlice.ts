import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Journey } from '../types/types';

interface JourneyState {
    journeys: Journey[];
    totalJourneys: number;
}

const initialState: JourneyState = {
    journeys: [],
    totalJourneys: 0,
};

const journeySlice = createSlice({
    name: 'journey',
    initialState,
    reducers: {
        setJourneys(state, action: PayloadAction<Journey[]>) {
            state.journeys = action.payload;
            state.totalJourneys = action.payload.length;
        },
        addJourney(state, action: PayloadAction<Journey>) {
            state.journeys.push(action.payload);
            state.totalJourneys += 1;
        },
        updateJourney(state, action: PayloadAction<Journey>) {
            const index = state.journeys.findIndex((journey) => journey.journeyId === action.payload.journeyId);
            if (index !== -1) {
                state.journeys[index] = action.payload;
            }
        },
        deleteJourney(state, action: PayloadAction<string>) {
            state.journeys = state.journeys.filter((journey) => journey.journeyId !== action.payload);
            state.totalJourneys -= 1;
        },
    },
});

export const { setJourneys, addJourney, updateJourney, deleteJourney } = journeySlice.actions;

export default journeySlice.reducer;
