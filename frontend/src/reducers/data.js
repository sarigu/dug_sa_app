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
    STUDY_SESSION_DETAILS_LOADED_SUCCESS,
    STUDY_SESSION_DETAILS_LOADED_FAIL,
    PARTICIPATE_IN_STUDY_SESSION_SUCCESS,
    PARTICIPATE_IN_STUDY_SESSION_LOADED_FAIL,
    CANCEL_STUDY_SESSION_PARTICIPATION_SUCCESS,
    CANCEL_STUDY_SESSION_PARTICIPATION_FAIL
} from '../actions/types';

const initialState = {
    teachers: [],
    newTeachers: [],
    bookmarkedTeachers: [],
    bookmarksUpdated: false,
    totalTeacherPages: null,
    filteredTeachers: [],
    totalFilterPages: null,
    studySessions: [],
    bookedStudySessions: [],
    studySession: {},
    isBooked: false,
    participationIsDeleted: false,
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
                studySessions: payload.teachersSessions,
                bookedStudySessions: payload.bookedSessions
            }
        case STUDY_SESSIONS_LOADED_FAIL:
            return {
                ...state,
            }
        case STUDY_SESSION_DETAILS_LOADED_SUCCESS:
            return {
                ...state,
                studySession: payload,
            }
        case STUDY_SESSION_DETAILS_LOADED_FAIL:
            return {
                ...state,
            }
        case PARTICIPATE_IN_STUDY_SESSION_SUCCESS:
            console.log("PAYLOAD PARTICIPATE_IN_STUDY_SESSION_SUCCESS", payload, payload.status)
            return {
                ...state,
                isBooked: payload.status == "ok" ? true : false,
            }
        case PARTICIPATE_IN_STUDY_SESSION_LOADED_FAIL:
            return {
                ...state,
            }
        case CANCEL_STUDY_SESSION_PARTICIPATION_SUCCESS:
            return {
                ...state,
                participationIsDeleted: payload.status == "ok" ? true : false,
            }
        case CANCEL_STUDY_SESSION_PARTICIPATION_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
};