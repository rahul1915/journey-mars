import React from 'react';
import { format, differenceInDays, formatDistance } from 'date-fns';
import classNames from 'classnames';
import Button from '../../base/Button';
import { DeleteIcon, EditIcon } from '../../../icons/icons';
import { Journey } from '../../../types/types';

interface JourneyTableRowProps {
    journeys: Journey[];
    onDelete: (id: string) => void;
    onEdit: (journey: Journey) => void;
}

const JourneyTableRow: React.FC<JourneyTableRowProps> = ({ journeys = [], onDelete, onEdit }) => {
    return (
        <tbody className={'bg-white divide-y divide-gray-200'}>
            {journeys.length !== 0 &&
                journeys.map((journey) => (
                    <tr key={journey.journeyId} className={'hover:bg-gray-100'}>
                        <td className={'px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700'}>
                            {journey.journeyName}
                        </td>
                        <td className={'px-4 py-3 whitespace-nowrap text-sm text-gray-500'}>{journey.destination}</td>
                        <td className={'px-4 py-3 whitespace-nowrap text-sm text-gray-500'}>
                            {journey.pilots.length + journey.passengers.length + journey.engineers.length}
                        </td>
                        <td className={'px-4 py-3 whitespace-nowrap text-sm text-gray-500'}>
                            <div className={'flex flex-col'}>
                                <span>{format(new Date(journey.departureTime), 'dd-MM-yyyy')}</span>
                                <div className={'flex items-center text-xs text-red-400'}>
                                    <img
                                        aria-label={'Time let to departure'}
                                        src={'../../../images/rocket.png'}
                                        alt={'Pilot'}
                                        className={'w-3 h-3 mr-1 rounded-full'}
                                    />
                                    <span
                                        className={classNames({
                                            'text-green-500': differenceInDays(journey.departureTime, new Date()) <= 0,
                                        })}
                                    >
                                        {formatDistance(journey.departureTime, new Date(), {
                                            addSuffix: true,
                                        })}
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td className={'px-4 py-3 whitespace-nowrap text-center'}>
                            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                            <Button
                                type={'button'}
                                name={'Edit Journey'}
                                ariaLabel={'Edit Journey'}
                                onClick={() => onEdit(journey)}
                                className={'rounded-full text-stone-600'}
                                variant={'icon'}
                                icon={<EditIcon />}
                            />
                            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                            <Button
                                type={'button'}
                                name={'Delete Journey'}
                                ariaLabel={'Delete Journey'}
                                onClick={() => onDelete(journey.journeyId)}
                                className={'rounded-full text-red-500'}
                                variant={'icon'}
                                icon={<DeleteIcon />}
                            />
                        </td>
                    </tr>
                ))}
            {journeys.length === 0 && (
                <tr className={'hover:bg-gray-100'}>
                    <td className={'px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700'} colSpan={5}>
                        <div className={'flex justify-center items-center'}>
                            <span>No Journeys Found</span>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    );
};

export default JourneyTableRow;
