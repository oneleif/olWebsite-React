import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { UserProvider, useUser } from '../UserContext';

describe('UserContext tests', () => {
    it('should return the null as the initial default user value and a setter', () => {
        const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
        const { result } = renderHook(() => {
            return { userValues: useUser() };
        }, { wrapper });

        expect(result.current.userValues[0]).toBeNull();
        expect(result.current.userValues[1]).toBeInstanceOf(Function);
    });

    it('should set the new user value on the context', () => {
        const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
        const { result } = renderHook(() => {
            return { userValues: useUser() };
        }, { wrapper });

        const newUser = { user: 'someValue'};

        act(() => {
            result.current.userValues[1](newUser);
        });

        expect(result.current.userValues[0]).toBe(newUser);
    })
});