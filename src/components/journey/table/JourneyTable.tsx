import React from 'react';

interface JourneyTableProps {
    children: React.ReactNode;
}

const JourneyTable: React.FC<JourneyTableProps> = ({ children }) => {
    return (
        <table className={'min-w-full divide-y divide-gray-200'}>
            <thead className={'bg-gray-300'}>
                <tr>
                    <th className={'px-4 py-4 text-left text-xs font-medium text-black uppercase tracking-wider'}>
                        Journey Name
                    </th>
                    <th className={'px-4 py-4 text-left text-xs font-medium text-black uppercase tracking-wider'}>
                        Destination
                    </th>
                    <th className={'px-4 py-4 text-left text-xs font-medium text-black uppercase tracking-wider'}>
                        Members
                    </th>
                    <th className={'px-4 py-4 text-left text-xs font-medium text-black uppercase tracking-wider'}>
                        Departure Date
                    </th>
                    <th className={'px-4 py-4 text-center text-xs font-medium text-black uppercase tracking-wider'}>
                        Actions
                    </th>
                </tr>
            </thead>
            {children}
        </table>
    );
};

export default JourneyTable;
