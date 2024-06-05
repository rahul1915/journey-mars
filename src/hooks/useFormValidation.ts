import React, { useState } from 'react';
import { Engineer, JobType, Passenger, Pilot } from '../types/types';

interface CombinedFormProps {
    name: string;
    age: number;
    experience: number;
    wealth: number;
    job: JobType;
}

const useFormValidation = (
    initialState: Pilot | Engineer | Passenger,
    validate: (name: string, value: string | number | JobType) => string
) => {
    const [values, setValues] = useState<CombinedFormProps>(initialState as CombinedFormProps);
    const [errors, setErrors] = useState<CombinedFormProps>(initialState as CombinedFormProps);

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
