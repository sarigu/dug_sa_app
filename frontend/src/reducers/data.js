import {
    TEACHERS_LOADED_FAIL,
    TEACHERS_LOADED_SUCCESS,
    NEW_TEACHERS_LOADED_FAIL,
    NEW_TEACHERS_LOADED_SUCCESS,
} from '../actions/types';

const initialState = {
    teachers: [],
    loadedNewTeachers: false
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
        case NEW_TEACHERS_LOADED_SUCCESS:
            console.log("loaded")
            return {
                ...state,
                loadedNewTeachers: true
            }
        case NEW_TEACHERS_LOADED_FAIL:
            console.log("not loaded")
            return {
                ...state,
            }
        default:
            return state
    }
};