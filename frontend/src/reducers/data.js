import {
    TEACHERS_LOADED_FAIL,
    TEACHERS_LOADED_SUCCESS,
    NEW_TEACHERS_LOADED_FAIL,
    NEW_TEACHERS_LOADED_SUCCESS,
    BOOKMARKED_TEACHERS_LOADED_SUCCESS,
    BOOKMARKED_TEACHERS_LOADED_FAIL,
    ADD_BOOKMARK_SUCCESS,
    ADD_BOOKMARK_FAIL,
    UPDATED_TEACHERS
} from '../actions/types';

const initialState = {
    teachers: [],
    newTeachers: [],
    bookmarkedTeachers: [],
    bookmarksUpdated: false,
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
            return {
                ...state,
                newTeachers: payload
            }
        case NEW_TEACHERS_LOADED_FAIL:
            return {
                ...state,
            }
        case BOOKMARKED_TEACHERS_LOADED_SUCCESS:
            return {
                ...state,
                bookmarkedTeachers: payload
            }
        case BOOKMARKED_TEACHERS_LOADED_FAIL:
            return {
                ...state,
            }
        case ADD_BOOKMARK_SUCCESS:
            return {
                ...state,
                bookmarksUpdated: true
            }
        case ADD_BOOKMARK_FAIL:
            return {
                ...state,
            }
        case UPDATED_TEACHERS:
            return {
                ...state,
                bookmarksUpdated: false
            }
        default:
            return state
    }
};