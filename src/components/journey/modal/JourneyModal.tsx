import React, { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { format } from 'date-fns';
import Select from '../../base/Select';
import Button from '../../base/Button';
import BasicDetail from '../form/BaseDetail';
import PilotForm from '../form/PilotForm';
import EngineerForm from '../form/EngineerForm';
import PassengerForm from '../form/PassengerForm';
import Card from '../form/Card';
import useJourneyStore from '../../../hooks/useJourneyStore';
import { validateJourney } from '../../../utils/validation';
import { getUpdatedFromData } from '../../../utils/utils';
import { Engineer, Journey, MemberType, Pilot, Passenger } from '../../../types/types';

interface JourneyModalProps {
    onClose: () => void;
    onShowToast: (messages: string[], type: 'success' | 'error') => void;
    currentJourney: Journey;
    setCurrentJourney: (journey: Journey) => void;
}

const initialState: Journey = {
    journeyId: '',
    journeyName: '',
    destination: '',
    departureTime: format(new Date(), 'yyyy-MM-dd'),
    passengers: [],
    pilots: [],
    engineers: [],
};

const JourneyModal: React.FC<JourneyModalProps> = ({ onClose, currentJourney, setCurrentJourney, onShowToast }) => {
    const [formData, setFormData] = useState(initialState);
    const [isAddMember, setIsAddMember] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { createJourney, editJourney } = useJourneyStore();

    const setInitialState = () => {
        setIsAddMember(false);
        setSelectedType('');
    };

    useEffect(() => {
        if (currentJourney.journeyId) {
            setFormData({
                ...currentJourney,
                departureTime: format(currentJourney.departureTime, 'yyyy-MM-dd'),
            });
        } else {
            setFormData(initialState);
        }
    }, [currentJourney]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setErrorMessage('');
        const { name, value } = e.target;
        if (name === 'journeyName' && value === '') {
            setErrorMessage('Journey Name is Required');
        }
        setFormData((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateJourney(formData);
        if (errors.length === 0) {
            if (formData.journeyId) {
                editJourney(formData);
                onShowToast(['Journey Updated Successfully'], 'success');
            } else {
                createJourney({ ...formData, journeyId: uuidV4() } as Journey);
                onShowToast(['Journey Created Successfully'], 'success');
            }
            setCurrentJourney(initialState);
            setInitialState();
            onClose();
        } else {
            onShowToast(errors, 'error');
        }
    };

    const handleAddOrRemoveMember = (toAdd: boolean, type: string, member: Pilot | Engineer | Passenger) => {
        const updatedFormData = getUpdatedFromData(toAdd, type, member, formData);
        setFormData(updatedFormData);
        setInitialState();
    };

    const handleModalClose = () => {
        setCurrentJourney(initialState);
        setInitialState();
        onClose();
    };

    return (
        <div className={'fixed inset-0 flex items-center justify-center z-50'}>
            <div className={'fixed inset-0 bg-black opacity-50'} onClick={handleModalClose} />
            <div className={'relative bg-slate-50 rounded-lg z-10 w-[80%] overflow-y-auto max-h-[95vh]'}>
                <span
                    onClick={handleModalClose}
                    className={'absolute top-2 right-4 cursor-pointer text-xxl font-bold text-gray-500'}
                    aria-label={'Close Modal'}
                >
                    &times;
                </span>
                <div className={'bg-slate-200 p-4'}>
                    <h2 className={'text-2xl text-black text-center font-semibold mb-3'}>Journey Mars</h2>
                </div>
                <form onSubmit={handleSubmit} className={'min-w-lg min-h-56'}>
                    {/* Journey Basic Details */}
                    <BasicDetail onChange={handleChange} values={formData} errorMessage={errorMessage} />

                    <hr />

                    {/* Card view holds the members associated with journey */}
                    {formData.pilots.length + formData.engineers.length + formData.passengers.length > 0 && (
                        <Card journey={formData} onRemoveMember={handleAddOrRemoveMember} />
                    )}

                    <hr />

                    {/* Select Member type */}
                    <div className={'min-h-6'}>
                        {isAddMember && (
                            <div className={'flex space-x-2 p-4'}>
                                <div className={'flex-1'}>
                                    <label htmlFor={'memberType'} className={'block text-gray-700 font-semibold mb-2'}>
                                        Member Type
                                    </label>
                                    <Select
                                        id={'memberType'}
                                        name={'memberType'}
                                        ariaLabel={'Member Type'}
                                        options={Object.values(MemberType).map((v) => {
                                            return { value: v };
                                        })}
                                        onSelectChange={(e) => setSelectedType(e.target.value)}
                                        selectedValue={selectedType}
                                    />
                                </div>
                            </div>
                        )}

                        {selectedType === MemberType.PILOT && <PilotForm onAddPilot={handleAddOrRemoveMember} />}
                        {selectedType === MemberType.ENGINEER && (
                            <EngineerForm onAddEngineer={handleAddOrRemoveMember} />
                        )}
                        {selectedType === MemberType.PASSENGER && (
                            <PassengerForm onAddPassenger={handleAddOrRemoveMember} />
                        )}
                    </div>

                    <div className={'flex justify-between b-0 space-x-4 bg-slate-200 p-4'}>
                        <div className={'flex-1'}>
                            {!isAddMember && (
                                <Button
                                    type={'button'}
                                    name={'New Member'}
                                    ariaLabel={'New Member'}
                                    variant={'secondary'}
                                    onClick={() => setIsAddMember((prev) => !prev)}
                                    disabled={isAddMember}
                                    className={'m-2'}
                                >
                                    New Member
                                </Button>
                            )}
                        </div>
                        <div className={'group'}>
                            <Button
                                type={'button'}
                                name={'Close Modal'}
                                variant={'cancel'}
                                ariaLabel={'Close Modal'}
                                onClick={handleModalClose}
                                className={'m-2'}
                            >
                                Close
                            </Button>
                            <Button
                                type={'submit'}
                                name={'Submit Journey Form'}
                                variant={'normal'}
                                ariaLabel={'Submit Journey Form'}
                                className={'m-2'}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JourneyModal;
