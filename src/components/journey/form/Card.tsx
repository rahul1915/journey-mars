import React from 'react';
import { ActualMember, DefaultMember } from '../../../icons/icons';
import { Engineer, Journey, MemberType, Passenger, Pilot } from '../../../types/types';

interface CardProps {
    journey: Journey;
    onRemoveMember: (toAdd: boolean, type: string, member: Pilot | Engineer | Passenger) => void;
}

const NUMBER_OF_PILOTS = 1;
const NUMBER_OF_ENGINEERS = 4;
const NUMBER_OF_PASSENGERS = 20;

const Card: React.FC<CardProps> = ({ journey, onRemoveMember }) => {
    const { pilots, engineers, passengers } = journey;

    const pilotSeats: Pilot[] = [
        ...pilots,
        ...Array.from({ length: NUMBER_OF_PILOTS - pilots.length }, () => ({}) as Pilot),
    ];
    const engineerSeats: Engineer[] = [
        ...engineers,
        ...Array.from({ length: NUMBER_OF_ENGINEERS - engineers.length }, () => ({}) as Engineer),
    ];
    const passengerSeats: Passenger[] = [
        ...passengers,
        ...Array.from({ length: NUMBER_OF_PASSENGERS - passengers.length }, () => ({}) as Passenger),
    ];

    return (
        <div className={'max-w-7xl mx-auto p-2 m-4 bg-white text-black rounded-lg shadow-lg overflow-hidden'}>
            <div className={'flex flex-col items-center'}>
                <h2 className={'text-xl font-semibold mb-4 no-underline hover:underline'}>Journey Members</h2>
                <div className={'flex w-full'}>
                    {/* Pilot */}
                    <div className={'relative w-1/4 p-2 flex flex-col items-center border-r border-slate-200'}>
                        <div className={'relative'}>
                            {pilotSeats?.map((pilot, index) => (
                                <div key={`Pilot ${index + 1}`} className={'flex flex-col items-center mt-8'}>
                                    {!pilot.experience ? (
                                        <DefaultMember iconSize={'w-24 h-24 cursor-default'} />
                                    ) : (
                                        <div className={'relative inline-block w-24 h-24 hover:cursor-pointer'}>
                                            <ActualMember />
                                            <span
                                                className={
                                                    'top-0 right-3 absolute w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-xs text-black hover:cursor-pointer'
                                                }
                                                onClick={() => onRemoveMember(false, 'Pilot', pilot)}
                                            >
                                                &times;
                                            </span>
                                        </div>
                                    )}
                                    <span className={'mt-2 text-sm font-bold'}>{MemberType.PILOT}</span>
                                    {pilot.experience && (
                                        <span
                                            className={'mt-2 text-xs text-slate-400'}
                                        >{`Experience: ${pilot.experience}`}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Engineers */}
                    <div className={'w-1/4 p-2 grid grid-cols-2 mt-2 gap-4 border-r border-slate-200'}>
                        {engineerSeats?.map((engineer, index) => (
                            <div key={`Engineer ${index + 1}`} className={'flex flex-col items-center'}>
                                {!engineer.job ? (
                                    <DefaultMember iconSize={'w-12 h-!2 cursor-default'} />
                                ) : (
                                    <div className={'relative inline-block w-12 h-12 hover:cursor-pointer'}>
                                        <ActualMember />
                                        <span
                                            className={
                                                'top-0 right-0 absolute w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-xs text-black hover:cursor-pointer'
                                            }
                                            onClick={() => onRemoveMember(false, 'Engineer', engineer)}
                                        >
                                            &times;
                                        </span>
                                    </div>
                                )}
                                <span className={'mt-1 text-xs'}>{engineer.job}</span>
                            </div>
                        ))}
                        <div className={'flex flex-col items-center col-span-2'}>
                            <span className={'mt-2 text-sm text-center font-bold'}>{MemberType.ENGINEER}</span>
                        </div>
                    </div>
                    {/* Passengers */}
                    <div className={'w-1/2 p-2 grid grid-cols-5 mt-2 gap-4 overflow-y-auto max-h-80'}>
                        {passengerSeats?.map((passenger, index) => (
                            <div key={`Passenger ${index + 1}`} className={'flex flex-col items-center'}>
                                {!passenger.name ? (
                                    <DefaultMember iconSize={'w-8 h-8 cursor-default'} />
                                ) : (
                                    <div className={'relative inline-block w-8 h-8 hover:cursor-pointer'}>
                                        <ActualMember />
                                        <span
                                            className={
                                                'top-0 left-6 absolute w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-xs text-black hover:cursor-pointer'
                                            }
                                            onClick={() => onRemoveMember(false, 'Passenger', passenger)}
                                        >
                                            &times;
                                        </span>
                                    </div>
                                )}
                                <span className={'mt-1 text-xs'}>{passenger.name}</span>
                            </div>
                        ))}
                        <div className={'flex flex-col items-center col-span-5'}>
                            <span className={'mt-2 text-sm text-center font-bold'}>{MemberType.PASSENGER}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
