import React from 'react';
import classNames from 'classnames';

interface SelectProps {
    id: string;
    options: { value: string }[];
    onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedValue: string;
    ariaLabel: string;
    className?: string;
    disabled?: boolean;
    name: string;
}

const Select: React.FC<SelectProps> = ({
    id = '',
    options,
    selectedValue = '',
    onSelectChange,
    ariaLabel = '',
    className = '',
    name,
    disabled = false,
}) => {
    const baseStyles =
        'rounded px-3 py-2 w-full border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-150';

    return (
        <select
            id={id}
            aria-label={ariaLabel}
            name={name}
            value={selectedValue}
            onChange={onSelectChange}
            className={classNames(baseStyles, { 'opacity-50 cursor-not-allowed': disabled }, className)}
        >
            <option value={''} disabled hidden>
                Select Member Type
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value} className={'bg-white text-gray-900 hover:bg-gray-100'}>
                    {option.value}
                </option>
            ))}
        </select>
    );
};

export default Select;
