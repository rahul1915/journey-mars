import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import JourneyView from '../../pages/JourneyView';
import { Journey } from '../../types/types';

const mockStore = configureStore([]);

const mockJourneys: Journey[] = [
    {
        journeyId: '1',
        journeyName: 'Journey1',
        pilots: [],
        passengers: [],
        engineers: [],
        departureTime: '2025-01-24',
        destination: '',
    },
    {
        journeyId: '2',
        journeyName: 'Journey2',
        pilots: [],
        passengers: [],
        engineers: [],
        departureTime: '2025-08-19',
        destination: '',
    },
];

const initialState = {
    journey: {
        journeys: [] as Journey[],
        totalJourneys: 0,
    },
};

describe('JourneyView component', () => {
    test('renders without crashing', () => {
        const store = mockStore(initialState);
        act(() => {
            render(
                <Provider store={store}>
                    <JourneyView onEdit={jest.fn()} onOpenModal={jest.fn()} onShowToast={jest.fn()} />
                </Provider>
            );
        });

        expect(screen.getByText('Create Journey')).toBeInTheDocument();
    });

    test('renders with journey list', () => {
        const store = mockStore({ journey: { journeys: mockJourneys, totalJourneys: mockJourneys.length } });
        act(() => {
            render(
                <Provider store={store}>
                    <JourneyView onEdit={jest.fn()} onOpenModal={jest.fn()} onShowToast={jest.fn()} />
                </Provider>
            );
        });
        expect(screen.getAllByRole('button', { name: 'Edit Journey' }).length).toBe(mockJourneys.length);
        expect(screen.getAllByRole('button', { name: 'Delete Journey' }).length).toBe(mockJourneys.length);
    });
});
