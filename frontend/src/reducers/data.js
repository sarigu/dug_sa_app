import {
    TEACHERS_LOADED_FAIL,
    TEACHERS_LOADED_SUCCESS,
} from '../actions/types';

const initialState = {
    teachers: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEACHERS_LOADED_SUCCESS:
            return {
                ...state,
                teachers: payload
            }
        case TEACHERS_LOADED_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
};