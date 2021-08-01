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
    CANCEL_STUDY_SESSION_PARTICIPATION_FAIL,
    UPCOMING_STUDY_SESSIONS_LOADED_SUCCESS,
    UPCOMING_STUDY_SESSIONS_LOADED_FAIL,
    UPCOMING_STUDY_SESSIONS_LIST_LOADED_SUCCESS,
    UPCOMING_STUDY_SESSIONS_LIST_LOADED_FAIL,
    PREVIOUS_STUDY_SESSIONS_LIST_LOADED_SUCCESS,
    PREVIOUS_STUDY_SESSIONS_LIST_LOADED_FAIL,
    TEACHERS_UPCOMING_STUDY_SESSIONS_LOADED_SUCCESS,
    TEACHERS_UPCOMING_STUDY_SESSIONS_LOADED_FAIL,
    TEACHERS_UPCOMING_STUDY_SESSIONS_LIST_LOADED_SUCCESS,
    TEACHERS_UPCOMING_STUDY_SESSIONS_LIST_LOADED_FAIL,
    TEACHERS_PREVIOUS_STUDY_SESSIONS_LIST_LOADED_SUCCESS,
    TEACHERS_PREVIOUS_STUDY_SESSIONS_LIST_LOADED_FAIL,
    CANCEL_STUDY_SESSION_SUCCESS,
    CANCEL_STUDY_SESSION_FAIL,
    CREATE_STUDY_SESSION_SUCCESS,
    CREATE_STUDY_SESSION_FAIL,
    EDIT_STUDY_SESSION_SUCCESS,
    EDIT_STUDY_SESSION_FAIL,
    LOAD_TEACHER_DETAILS_SUCCESS,
    LOAD_TEACHER_DETAILS_FAIL,
    ADD_TEACHER_REVIEW_SUCCESS,
    ADD_TEACHER_REVIEW_FAIL,
    LOAD_REJECTED_TEACHERS_SUCCESS,
    LOAD_REJECTED_TEACHERS_FAIL,
    LOAD_ACTIVE_ACCESS_CODES_SUCCESS,
    LOAD_ACTIVE_ACCESS_CODES_FAIL,
    LOAD_INACTIVE_ACCESS_CODES_SUCCESS,
    LOAD_INACTIVE_ACCESS_CODES_FAIL,
} from '../actions/types';

const initialState = {
    teachers: [],
    newTeachers: [],
    rejectedTeachers: [],
    bookmarkedTeachers: [],
    bookmarksUpdated: false,
    totalTeacherPages: null,
    totalRejectedTeacherPages: null,
    filteredTeachers: [],
    totalFilterPages: null,
    studySessions: [],
    bookedStudySessions: [],
    studySession: {},
    studySessionParticipants: [],
    isBooked: false,
    isCancelled: false,
    participationIsDeleted: false,
    upcomingStudySessions: [],
    allUpcomingStudySessions: [],
    allPreviousStudySessions: [],
    totalUpcomingStudySessionPages: null,
    totalPreviousStudySessionPages: null,
    isCreated: false,
    isUpdated: false,
    teacher: undefined,
    isReviewed: false,
    accessCodes: [],
    inactiveAccessCodes: [],
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
        case LOAD_REJECTED_TEACHERS_SUCCESS:
            return {
                ...state,
                rejectedTeachers: payload.data.length > 0 ? payload.data : state.rejectedTeachers,
                totalRejectedTeacherPages: payload.total_pages
            }
        case LOAD_REJECTED_TEACHERS_FAIL:
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
                bookedStudySessions: payload.bookedSessions ? payload.bookedSessions : state.bookedStudySessions
            }
        case STUDY_SESSIONS_LOADED_FAIL:
            return {
                ...state,
            }
        case STUDY_SESSION_DETAILS_LOADED_SUCCESS:
            return {
                ...state,
                studySession: payload.studySession,
                studySessionParticipants: payload.studySessionParticipants
            }
        case STUDY_SESSION_DETAILS_LOADED_FAIL:
            return {
                ...state,
            }
        case PARTICIPATE_IN_STUDY_SESSION_SUCCESS:
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
        case UPCOMING_STUDY_SESSIONS_LOADED_SUCCESS:
            return {
                ...state,
                upcomingStudySessions: payload.upcomingStudySessions,
            }
        case UPCOMING_STUDY_SESSIONS_LOADED_FAIL:
            return {
                ...state,
            }
        case UPCOMING_STUDY_SESSIONS_LIST_LOADED_SUCCESS:
            return {
                ...state,
                allUpcomingStudySessions: payload.allStudySessions,
                totalUpcomingStudySessionPages: payload.total_pages
            }
        case UPCOMING_STUDY_SESSIONS_LIST_LOADED_FAIL:
            return {
                ...state,
            }
        case PREVIOUS_STUDY_SESSIONS_LIST_LOADED_SUCCESS:
            return {
                ...state,
                allPreviousStudySessions: payload.allStudySessions,
                totalPreviousStudySessionPages: payload.total_pages
            }
        case PREVIOUS_STUDY_SESSIONS_LIST_LOADED_FAIL:
            return {
                ...state,
            }
        case TEACHERS_UPCOMING_STUDY_SESSIONS_LOADED_SUCCESS:
            return {
                ...state,
                upcomingStudySessions: payload.upcomingStudySessions,
            }
        case TEACHERS_UPCOMING_STUDY_SESSIONS_LOADED_FAIL:
            return {
                ...state,
            }
        case TEACHERS_UPCOMING_STUDY_SESSIONS_LIST_LOADED_SUCCESS:
            return {
                ...state,
                allUpcomingStudySessions: payload.allStudySessions,
                totalUpcomingStudySessionPages: payload.total_pages
            }
        case TEACHERS_UPCOMING_STUDY_SESSIONS_LIST_LOADED_FAIL:
            return {
                ...state,
            }
        case TEACHERS_PREVIOUS_STUDY_SESSIONS_LIST_LOADED_SUCCESS:
            return {
                ...state,
                allPreviousStudySessions: payload.allStudySessions,
                totalPreviousStudySessionPages: payload.total_pages
            }
        case TEACHERS_PREVIOUS_STUDY_SESSIONS_LIST_LOADED_FAIL:
            return {
                ...state,
            }
        case CANCEL_STUDY_SESSION_SUCCESS:
            return {
                ...state,
                isCancelled: true,
            }
        case CANCEL_STUDY_SESSION_FAIL:
            return {
                ...state,
            }
        case CREATE_STUDY_SESSION_SUCCESS:
            return {
                ...state,
                isCreated: true,
            }
        case CREATE_STUDY_SESSION_FAIL:
            return {
                ...state,
            }
        case EDIT_STUDY_SESSION_SUCCESS:
            return {
                ...state,
                isUpdated: true,
            }
        case EDIT_STUDY_SESSION_FAIL:
            return {
                ...state,
            }
        case LOAD_TEACHER_DETAILS_SUCCESS:
            return {
                ...state,
                teacher: payload,
            }
        case LOAD_TEACHER_DETAILS_FAIL:
            return {
                ...state,
            }

        case ADD_TEACHER_REVIEW_SUCCESS:
            return {
                ...state,
                isReviewed: true,
            }
        case ADD_TEACHER_REVIEW_FAIL:
            return {
                ...state,
                isReviewed: false,
            }
        case LOAD_ACTIVE_ACCESS_CODES_SUCCESS:
            console.log(payload, "payload.data")
            return {
                ...state,
                accessCodes: payload.length > 0 ? payload : state.accessCodes,
            }
        case LOAD_ACTIVE_ACCESS_CODES_FAIL:
            return {
                ...state,
            }
        case LOAD_INACTIVE_ACCESS_CODES_SUCCESS:
            return {
                ...state,
                inactiveAccessCodes: payload.length > 0 ? payload : state.inactiveAccessCodes,
            }
        case LOAD_INACTIVE_ACCESS_CODES_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
};
