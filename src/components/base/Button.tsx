import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
    type?: 'submit' | 'button';
    name: string;
    ariaLabel: string;
    onClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger' | 'icon' | 'normal' | 'cancel';
    className?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    type = 'button',
    name = '',
    ariaLabel,
    onClick = () => {},
    disabled = false,
    variant = 'primary',
    className = '',
    children,
    icon,
}) => {
    const baseStyles =
        'inline-flex items-center justify-center rounded px-4 py-2 font-semibold focus:outline-none transition-all duration-300 ease-in-out';
    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-800 text-white-600 hover:bg-gray-500',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        normal: 'bg-green-500 text-white hover:bg-green-600',
        cancel: 'bg-slate-400 text-white hover:bg-slate-600',
        icon: 'hover:bg-gray-300',
    };

    const disabledStyles = 'bg-gray-400 hover:bg-gray-600 text-slate-600 opacity-50 cursor-not-allowed';

    return (
        <button
            type={type}
            name={name}
            aria-label={ariaLabel}
            onClick={onClick}
            disabled={disabled}
            className={classNames(baseStyles, variantStyles[variant], { [disabledStyles]: disabled }, className)}
        >
            {icon && (
                <span className={classNames('transition-transform duration-300 ease-in-out', children ? 'mr-2' : '')}>
                    {icon}
                </span>
            )}
            {children}
        </button>
    );
};

export default Button;
