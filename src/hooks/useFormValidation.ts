import React, { useState } from 'react';
import { JobType } from '../types/types';

const useFormValidation = <T>(
    initialState: T,
    validate: (name: string, value: string | number | JobType) => string
) => {
    const [values, setValues] = useState<T>(initialState);
    const [errors, setErrors] = useState<T>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

        const error = validate(name, value);
        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const hasErrors = () => {
        return Object.values(errors).some((error) => error);
    };

    return {
        values,
        errors,
        handleChange,
        hasErrors,
    };
};

export default useFormValidation;
