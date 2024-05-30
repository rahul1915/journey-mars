import React from 'react';
import classNames from 'classnames';
import Input from '../../base/Input';
import { Journey } from '../../../types/types';

interface BasicDetailProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    values: Journey;
    errorMessage: string;
}

const BasicDetail: React.FC<BasicDetailProps> = ({ values, onChange, errorMessage }) => {
    return (
        <div className={'flex space-x-2 p-4'}>
            <div className={'flex-1'}>
                <label htmlFor={'journeyName'} className={'block text-gray-700 font-semibold mb-2'}>
                    Journey Name
                </label>
                <Input
                    id={'journeyName'}
                    type={'text'}
                    ariaLabel={'Journey Name'}
                    name={'journeyName'}
                    value={values.journeyName}
                    onChange={onChange}
                    disabled={!!values.journeyId}
                    placeholder={'Enter Journey Name'}
                />
                {errorMessage && <p className={'text-red-500 text-sm mt-1'}>{errorMessage}</p>}
            </div>
            <div className={'flex-1'}>
                <label htmlFor={'destination'} className={'block text-gray-700 font-semibold mb-2'}>
                    Destination
                </label>
                <Input
                    id={'destination'}
                    type={'text'}
                    ariaLabel={'Destination'}
                    name={'destination'}
                    value={values.destination}
                    onChange={onChange}
                    disabled={!!values.journeyId}
                    placeholder={'Enter Destination'}
                />
            </div>
            <div className={'flex-1'}>
                <label htmlFor={'departureDate'} className={'block text-gray-700 font-semibold mb-2'}>
                    Departure
                </label>
                <input
                    id={'departureDate'}
                    type={'date'}
                    aria-label={'Departure Date'}
                    name={'departureTime'}
                    value={values.departureTime}
                    onChange={onChange}
                    disabled={!!values.journeyId}
                    className={classNames(
                        'rounded px-3 py-2 w-full border text-slate-950 cursor-pointer focus:outline-none focus:ring focus:border-blue-500',
                        {
                            'opacity-50 cursor-not-allowed': !!values.journeyId,
                        }
                    )}
                />
            </div>
        </div>
    );
};

export default BasicDetail;
