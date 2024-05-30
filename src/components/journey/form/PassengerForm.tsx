import React from 'react';
import Input from '../../base/Input';
import Button from '../../base/Button';
import useFormValidation from '../../../hooks/useFormValidation';
import { validatePassenger } from '../../../utils/validation';
import { Engineer, Passenger, Pilot } from '../../../types/types';

interface PassengerProps {
    onAddPassenger: (toAdd: boolean, type: string, member: Pilot | Engineer | Passenger) => void;
}

const initialState: Passenger = {
    name: '',
    age: 0,
    wealth: 0,
};

const PassengerForm: React.FC<PassengerProps> = ({ onAddPassenger }) => {
    const { values, errors, handleChange, hasErrors } = useFormValidation(initialState, validatePassenger);
    const isAddEnabled = !hasErrors() && values.name !== '' && values.age !== 0 && values.wealth !== 0;
    return (
        <div className={'flex space-x-2 p-4'}>
            <div className={'flex-1'}>
                <label htmlFor={'passengerName'} className={'block text-gray-700 font-semibold mb-2'}>
                    Name
                </label>
                <Input
                    id={'passengerName'}
                    type={'text'}
                    ariaLabel={'Passenger Name'}
                    name={'name'}
                    value={values?.name}
                    onChange={handleChange}
                    placeholder={'Enter Passenger Name'}
                />
                {errors?.name && <p className={'text-red-500 text-sm mt-1'}>{errors?.name}</p>}
            </div>
            <div className={'flex-1'}>
                <label htmlFor={'passengerAge'} className={'block text-gray-700 font-semibold mb-2'}>
                    Age
                </label>
                <Input
                    id={'passengerAge'}
                    type={'number'}
                    ariaLabel={'Passenger Age'}
                    name={'age'}
                    value={values?.age}
                    onChange={handleChange}
                    placeholder={'Enter Passenger Age'}
                />
                {errors?.age && <p className={'text-red-500 text-sm mt-1'}>{errors?.age}</p>}
            </div>
            <div className={'flex-1'}>
                <label htmlFor={'passengerWealth'} className={'block text-gray-700 font-semibold mb-2'}>
                    Wealth <span className={'text-xs'}>(in Millions)</span>
                </label>
                <Input
                    id={'passengerWealth'}
                    type={'number'}
                    ariaLabel={'Passenger Wealth'}
                    name={'wealth'}
                    value={values?.wealth}
                    onChange={handleChange}
                    placeholder={'Enter Passenger Wealth'}
                />
                {errors?.wealth && <p className={'text-red-500 text-sm mt-1'}>{errors?.wealth}</p>}
            </div>
            <div className={'flex-1'}>
                <Button
                    type={'button'}
                    name={'Add Passenger'}
                    ariaLabel={'Add Passenger'}
                    onClick={() => onAddPassenger(true, 'Passenger', values)}
                    className={'mt-8'}
                    disabled={!isAddEnabled}
                >
                    Add To Queue
                </Button>
            </div>
        </div>
    );
};

export default PassengerForm;
