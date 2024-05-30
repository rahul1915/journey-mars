import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import JourneyView from './pages/JourneyView';
import JourneyModal from './components/journey/modal/JourneyModal';
import Toast from './components/toast/Toast';
import useToast from './hooks/useToast';
import useModal from './hooks/useModal';
import { Journey } from './types/types';
import { setJourneys } from './store/journeySlice';
import data from './data/journeys.json';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const [currentJourney, setCurrentJourney] = useState<Journey>({} as Journey);
    const { isOpen, handleCloseModal, handleOpenModal } = useModal();
    const { toast, handleShowToast, handleCloseToast } = useToast();

    useEffect(() => {
        dispatch(setJourneys(data.journeys as Journey[]));
    }, [dispatch]);

    const handleEdit = (journey: Journey) => {
        setCurrentJourney(journey);
        handleOpenModal();
    };

    // for multiple views routing logic can be written and imported instead of Views directly.
    return (
        <Provider store={store}>
            <div className={'container mx-auto p-4 h-dvh bg-gradient-to-r from-amber-500 to-amber-100 text-white'}>
                <JourneyView onEdit={handleEdit} onOpenModal={handleOpenModal} onShowToast={handleShowToast} />
                {isOpen && (
                    <JourneyModal
                        onClose={handleCloseModal}
                        currentJourney={currentJourney}
                        setCurrentJourney={setCurrentJourney}
                        onShowToast={handleShowToast}
                    />
                )}
                {toast.messages.length > 0 && (
                    <Toast messages={toast.messages} type={toast.type} onClose={handleCloseToast} />
                )}
            </div>
        </Provider>
    );
};

export default App;
