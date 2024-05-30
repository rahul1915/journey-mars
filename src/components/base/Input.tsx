import React from 'react';
import classNames from 'classnames';

interface InputProps {
    id: string;
    type?: 'text' | 'number' | 'email' | 'password' | 'date';
    ariaLabel: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    type = 'text',
    ariaLabel,
    name,
    value,
    onChange,
    disabled = false,
    placeholder,
    className = '',
}) => {
    const baseStyles =
        'rounded px-3 py-2 w-full border text-slate-950 focus:outline-none focus:ring focus:border-blue-500';

    return (
        <input
            id={id}
            type={type}
            aria-label={ariaLabel}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={classNames(baseStyles, { 'opacity-50 cursor-not-allowed': disabled }, className)}
        />
    );
};

export default Input;
