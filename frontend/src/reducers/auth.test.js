/* eslint-disable */

import auth from './auth';

describe('auth Reducer', () => {
    const initialState = {
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
        isAuthenticated: null,
        user: null,
        userType: null,
        error: null,
        selectedRole: 'student',
        signUpStatus: '',
        subjects: [],
        languages: [],
    };

    it('if no action type is passed return initial state', () => {
        const reducer = auth(initialState, {});
        expect(reducer).toEqual(initialState);
    });

    it('if authentication is success then set isAuthenticated to true', () => {
        const reducer = auth(initialState, { type: 'AUTHENTICATED_SUCCESS' });
        expect(reducer.isAuthenticated).toEqual(true);
    });

    it('if authentication fails then set isAuthenticated to false', () => {
        const reducer = auth(initialState, { type: 'AUTHENTICATED_FAIL' });
        expect(reducer.isAuthenticated).toEqual(false);
    });

    it('if user is logout then reset state', () => {
        const reducer = auth(initialState, { type: 'LOGOUT' });
        expect(reducer).toEqual({
            access: null,
            refresh: null,
            isAuthenticated: false,
            user: null,
            userType: null,
            error: null,
            selectedRole: undefined,
            signUpStatus: '',
            subjects: [],
            languages: [],
        });
    });
});
