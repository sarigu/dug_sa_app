import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT,
    TEACHER_UPDATE_SUCCESS,
    TEACHER_UPDATE_FAIL,
    SELECTED_ROLE,
    SUBJECTS_LOADED_SUCCESS,
    LANGUAGES_LOADED_SUCCESS
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    userType: null,
    error: null,
    selectedRole: "student",
    signUpStatus: "",
    subjects: [],
    languages: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                error: null,
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                error: null,
                signUpStatus: "success",
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
                userType: payload.role,
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
                userType: null,
                isAuthenticated: false
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                userType: null,
                error: "login_fail",
            }
        case SIGNUP_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                userType: null,
                error: "signup_fail",
                signUpStatus: "fail",
            }
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                userType: null,
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case TEACHER_UPDATE_FAIL:
            return {
                ...state,
                error: "teacher_update_fail",
            }
        case TEACHER_UPDATE_SUCCESS:
            return {
                ...state,
                user: payload,
                error: null,
            }
        case SELECTED_ROLE:
            return {
                ...state,
                selectedRole: payload,
            }
        case SUBJECTS_LOADED_SUCCESS:
            return {
                ...state,
                subjects: payload,
            }
        case LANGUAGES_LOADED_SUCCESS:
            return {
                ...state,
                languages: payload,
            }
        default:
            return state
    }
};