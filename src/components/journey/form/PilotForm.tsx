import React from 'react';
import Input from '../../base/Input';
import Button from '../../base/Button';
import useFormValidation from '../../../hooks/useFormValidation';
import { validatePilot } from '../../../utils/validation';
import { Pilot } from '../../../types/types';

interface PilotProps {
    onAddPilot: (toAdd: boolean, type: string, member: Pilot) => void;
}

const initialState: Pilot = {
    experience: 0,
};

const PilotForm: React.FC<PilotProps> = ({ onAddPilot }) => {
    const { values, errors, handleChange, hasErrors } = useFormValidation(initialState, validatePilot);
    const isAddEnabled = !hasErrors() && values.experience !== 0;
    return (
        <div className={'flex space-x-2 p-4'}>
            <div className={'flex-1'}>
                <label htmlFor={'pilotExperience'} className={'block text-gray-700 font-semibold mb-2'}>
                    Experience
                </label>
                <Input
                    id={'pilotExperience'}
                    type={'number'}
                    ariaLabel={'Pilot Experience'}
                    name={'experience'}
                    value={values.experience}
                    onChange={handleChange}
                    placeholder={'Enter Pilot Experience'}
                />
                {errors.experience && <p className={'text-red-500 text-sm mt-1'}>{errors.experience}</p>}
            </div>
            <div className={'flex-1'}>
                <Button
                    type={'button'}
                    name={'Add Pilot'}
                    ariaLabel={'Add Pilot'}
                    onClick={() => onAddPilot(true, 'Pilot', values)}
                    className={'mt-8'}
                    disabled={!isAddEnabled}
                >
                    Add To Queue
                </Button>
            </div>
        </div>
    );
};

export default PilotForm;
