import React from 'react';
import Input from '../../base/Input';
import Select from '../../base/Select';
import Button from '../../base/Button';
import useFormValidation from '../../../hooks/useFormValidation';
import { validateEngineer } from '../../../utils/validation';
import { Engineer, JobType } from '../../../types/types';

interface EngineerProps {
    onAddEngineer: (toAdd: boolean, type: string, member: Engineer) => void;
}

const initialState: Engineer = {
    job: JobType.DEFAULT,
    experience: 0,
};

const EngineerForm: React.FC<EngineerProps> = ({ onAddEngineer }) => {
    const { values, errors, handleChange, hasErrors } = useFormValidation(initialState, validateEngineer);
    const isAddEnabled = !hasErrors() && values.job !== '' && values.experience !== 0;
    return (
        <div className={'flex space-x-2 p-4'}>
            <div className={'flex-1'}>
                <label htmlFor={'engineerExperience'} className={'block text-gray-700 font-semibold mb-2'}>
                    Experience
                </label>
                <Input
                    id={'engineerExperience'}
                    type={'number'}
                    ariaLabel={'Engineer Experience'}
                    name={'experience'}
                    value={values.experience}
                    onChange={handleChange}
                    placeholder={'Enter Engineer Experience'}
                />
                {errors.experience && <p className={'text-red-500 text-sm mt-1'}>{errors.experience}</p>}
            </div>
            <div className={'flex-1'}>
                <label htmlFor={'jobType'} className={'block text-gray-700 font-semibold mb-2'}>
                    Job
                </label>
                <Select
                    id={'jobType'}
                    ariaLabel={'Job Type'}
                    name={'job'}
                    selectedValue={values.job.toString()}
                    options={Object.values(JobType).map((v) => {
                        return { value: v };
                    })}
                    onSelectChange={handleChange}
                    className={'border border-gray-300 p-4  rounded w-full text-slate-950'}
                />
                {errors.job && <p className={'text-red-500 text-sm mt-1'}>{errors.job}</p>}
            </div>
            <div className={'flex-1'}>
                <Button
                    type={'button'}
                    name={'Add Engineer'}
                    ariaLabel={'Add Engineer'}
                    onClick={() => onAddEngineer(true, 'Engineer', values)}
                    className={'mt-8'}
                    disabled={!isAddEnabled}
                >
                    Add To Queue
                </Button>
            </div>
        </div>
    );
};

export default EngineerForm;
