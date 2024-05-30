import { renderHook, act } from '@testing-library/react';
import useToast from '../../hooks/useToast';

describe('useToast Hook', () => {
    test('should initialize with the default state', () => {
        const { result } = renderHook(() => useToast());
        const { toast } = result.current;
        expect(toast).toEqual({
            messages: [],
            type: 'success',
        });
    });

    test('should show a toast message', () => {
        const { result } = renderHook(() => useToast());
        act(() => {
            result.current.handleShowToast(['Test message'], 'success');
        });
        expect(result.current.toast).toEqual({
            messages: ['Test message'],
            type: 'success',
        });
    });

    test('should show an error toast message', () => {
        const { result } = renderHook(() => useToast());
        act(() => {
            result.current.handleShowToast(['Error message'], 'error');
        });
        expect(result.current.toast).toEqual({
            messages: ['Error message'],
            type: 'error',
        });
    });

    test('should close the toast message', () => {
        const { result } = renderHook(() => useToast());
        act(() => {
            result.current.handleShowToast(['Test message'], 'success');
        });
        act(() => {
            result.current.handleCloseToast();
        });
        expect(result.current.toast).toEqual({
            messages: [],
            type: 'success',
        });
    });
});
