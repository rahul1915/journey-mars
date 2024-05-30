import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/base/Input';

describe('Input Component', () => {
    test('renders input with default type', () => {
        const handleChange = jest.fn();
        render(
            <Input
                id={'1'}
                name={'test-input'}
                ariaLabel={'test-input'}
                placeholder={'test'}
                value={''}
                onChange={handleChange}
            />
        );
        const inputElement = screen.getByLabelText('test-input');
        expect(inputElement).toHaveAttribute('type', 'text');
    });

    test('renders input with custom type', () => {
        const handleChange = jest.fn();
        render(
            <Input
                id={'1'}
                name={'test-input'}
                ariaLabel={'test-input'}
                type={'password'}
                placeholder={'test'}
                value={''}
                onChange={handleChange}
            />
        );
        const inputElement = screen.getByLabelText('test-input');
        expect(inputElement).toHaveAttribute('type', 'password');
    });

    test('handles change event', () => {
        const handleChange = jest.fn();
        render(
            <Input
                id={'1'}
                name={'test-input'}
                ariaLabel={'test-input'}
                placeholder={'test'}
                value={''}
                onChange={handleChange}
            />
        );
        const inputElement = screen.getByLabelText('test-input');
        fireEvent.change(inputElement, { target: { value: 'test value' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('disables input', () => {
        const handleChange = jest.fn();
        render(
            <Input
                id={'1'}
                name={'test-input'}
                disabled
                ariaLabel={'test-input'}
                placeholder={'test'}
                value={''}
                onChange={handleChange}
            />
        );
        const inputElement = screen.getByLabelText('test-input');
        expect(inputElement).toBeDisabled();
    });
});
