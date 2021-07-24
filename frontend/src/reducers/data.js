import {
    TEACHERS_LOADED_FAIL,
    TEACHERS_LOADED_SUCCESS,
    NEW_TEACHERS_LOADED_FAIL,
    NEW_TEACHERS_LOADED_SUCCESS,
    BOOKMARKED_TEACHERS_LOADED_SUCCESS,
    BOOKMARKED_TEACHERS_LOADED_FAIL,
    ADD_BOOKMARK_SUCCESS,
    ADD_BOOKMARK_FAIL,
    UPDATED_TEACHERS,
    FILTER_TEACHERS_SUCCESS,
    FILTER_TEACHERS_FAIL,
    STUDY_SESSIONS_LOADED_SUCCESS,
    STUDY_SESSIONS_LOADED_FAIL,
} from '../actions/types';

const initialState = {
    teachers: [],
    newTeachers: [],
    bookmarkedTeachers: [],
    bookmarksUpdated: false,
    totalTeacherPages: null,
    filteredTeachers: [],
    totalFilterPages: null,
    studySessions: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEACHERS_LOADED_SUCCESS:
            return {
                ...state,
                teachers: payload.data.length > 0 ? payload.data : state.teachers,
                totalTeacherPages: payload.total_pages
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
                bookmarkedTeachers: payload.reverse()
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
        case FILTER_TEACHERS_SUCCESS:
            return {
                ...state,
                filteredTeachers: payload.data,
                totalFilterPages: payload.total_pages
            }
        case FILTER_TEACHERS_FAIL:
            return {
                ...state,
            }
        case STUDY_SESSIONS_LOADED_SUCCESS:
            return {
                ...state,
                studySessions: payload
            }
        case STUDY_SESSIONS_LOADED_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
};