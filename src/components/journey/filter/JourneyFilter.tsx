import React from 'react';

interface JourneyFilterProps {
    onChange: (value: string) => void;
}

const JourneyFilter: React.FC<JourneyFilterProps> = ({ onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            type={'text'}
            placeholder={'Search by journey name...'}
            onChange={handleChange}
            className={'w-1/2 px-4 py-2 border rounded-lg text-black'}
        />
    );
};

export default JourneyFilter;
