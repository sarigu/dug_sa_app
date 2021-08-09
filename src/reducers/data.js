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
  LOAD_ACTIVE_ACCESS_CODE_SUCCESS,
  LOAD_ACTIVE_ACCESS_CODE_FAIL,
  REMOVE_ACTIVE_ACCESS_CODE_SUCCESS,
  REMOVE_ACTIVE_ACCESS_CODE_FAIL,
  ADD_ACTIVE_ACCESS_CODE_SUCCESS,
  ADD_ACTIVE_ACCESS_CODE_FAIL,
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
  accessCode: undefined,
  accessCodeIsUpdated: false,
  accessCodeIsCreated: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TEACHERS_LOADED_SUCCESS:
      return {
        ...state,
        teachers: payload.data.length > 0 ? payload.data : state.teachers,
        totalTeacherPages: payload.total_pages,
      };
    case NEW_TEACHERS_LOADED_SUCCESS:
      return {
        ...state,
        newTeachers: payload,
      };
    case LOAD_REJECTED_TEACHERS_SUCCESS:
      return {
        ...state,
        rejectedTeachers: payload.data.length > 0 ? payload.data : state.rejectedTeachers,
        totalRejectedTeacherPages: payload.total_pages,
      };
    case BOOKMARKED_TEACHERS_LOADED_SUCCESS:
      return {
        ...state,
        bookmarkedTeachers: payload.reverse(),
      };
    case ADD_BOOKMARK_SUCCESS:
      return {
        ...state,
        bookmarksUpdated: true,
      };
    case UPDATED_TEACHERS:
      return {
        ...state,
        bookmarksUpdated: false,
      };
    case FILTER_TEACHERS_SUCCESS:
      return {
        ...state,
        filteredTeachers: payload.data,
        totalFilterPages: payload.total_pages,
      };
    case STUDY_SESSIONS_LOADED_SUCCESS:
      return {
        ...state,
        studySessions: payload.teachersSessions,
        bookedStudySessions: payload.bookedSessions ? payload.bookedSessions : state.bookedStudySessions,
      };
    case STUDY_SESSION_DETAILS_LOADED_SUCCESS:
      return {
        ...state,
        studySession: payload.studySession,
        studySessionParticipants: payload.studySessionParticipants,
      };
    case PARTICIPATE_IN_STUDY_SESSION_SUCCESS:
      return {
        ...state,
        isBooked: payload.status === 'ok',
      };
    case CANCEL_STUDY_SESSION_PARTICIPATION_SUCCESS:
      return {
        ...state,
        participationIsDeleted: payload.status === 'ok',
      };
    case UPCOMING_STUDY_SESSIONS_LOADED_SUCCESS:
      return {
        ...state,
        upcomingStudySessions: payload.upcomingStudySessions,
      };
    case UPCOMING_STUDY_SESSIONS_LIST_LOADED_SUCCESS:
      return {
        ...state,
        allUpcomingStudySessions: payload.allStudySessions,
        totalUpcomingStudySessionPages: payload.total_pages,
      };
    case PREVIOUS_STUDY_SESSIONS_LIST_LOADED_SUCCESS:
      return {
        ...state,
        allPreviousStudySessions: payload.allStudySessions,
        totalPreviousStudySessionPages: payload.total_pages,
      };

    case TEACHERS_UPCOMING_STUDY_SESSIONS_LOADED_SUCCESS:
      return {
        ...state,
        upcomingStudySessions: payload.upcomingStudySessions,
      };
    case TEACHERS_UPCOMING_STUDY_SESSIONS_LIST_LOADED_SUCCESS:
      return {
        ...state,
        allUpcomingStudySessions: payload.allStudySessions,
        totalUpcomingStudySessionPages: payload.total_pages,
      };
    case TEACHERS_PREVIOUS_STUDY_SESSIONS_LIST_LOADED_SUCCESS:
      return {
        ...state,
        allPreviousStudySessions: payload.allStudySessions,
        totalPreviousStudySessionPages: payload.total_pages,
      };
    case CANCEL_STUDY_SESSION_SUCCESS:
      return {
        ...state,
        isCancelled: true,
      };
    case CREATE_STUDY_SESSION_SUCCESS:
      return {
        ...state,
        isCreated: true,
      };
    case EDIT_STUDY_SESSION_SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };

    case LOAD_TEACHER_DETAILS_SUCCESS:
      return {
        ...state,
        teacher: payload,
      };
    case ADD_TEACHER_REVIEW_SUCCESS:
      return {
        ...state,
        isReviewed: true,
      };
    case ADD_TEACHER_REVIEW_FAIL:
      return {
        ...state,
        isReviewed: false,
      };
    case LOAD_ACTIVE_ACCESS_CODES_SUCCESS:
      return {
        ...state,
        accessCodes: payload,
      };
    case LOAD_INACTIVE_ACCESS_CODES_SUCCESS:
      return {
        ...state,
        inactiveAccessCodes: payload,
      };
    case LOAD_ACTIVE_ACCESS_CODE_SUCCESS:
      return {
        ...state,
        accessCode: payload,
      };
    case REMOVE_ACTIVE_ACCESS_CODE_SUCCESS:
      return {
        ...state,
        accessCodeIsUpdated: true,
      };
    case REMOVE_ACTIVE_ACCESS_CODE_FAIL:
      return {
        ...state,
        accessCodeIsUpdated: false,
      };
    case ADD_ACTIVE_ACCESS_CODE_SUCCESS:
      return {
        ...state,
        accessCodeIsCreated: true,
      };
    case ADD_ACTIVE_ACCESS_CODE_FAIL:
      return {
        ...state,
        accessCodeIsCreated: false,
      };
    case TEACHERS_LOADED_FAIL:
    case NEW_TEACHERS_LOADED_FAIL:
    case LOAD_REJECTED_TEACHERS_FAIL:
    case BOOKMARKED_TEACHERS_LOADED_FAIL:
    case ADD_BOOKMARK_FAIL:
    case FILTER_TEACHERS_FAIL:
    case STUDY_SESSIONS_LOADED_FAIL:
    case STUDY_SESSION_DETAILS_LOADED_FAIL:
    case PARTICIPATE_IN_STUDY_SESSION_LOADED_FAIL:
    case CANCEL_STUDY_SESSION_PARTICIPATION_FAIL:
    case UPCOMING_STUDY_SESSIONS_LIST_LOADED_FAIL:
    case UPCOMING_STUDY_SESSIONS_LOADED_FAIL:
    case PREVIOUS_STUDY_SESSIONS_LIST_LOADED_FAIL:
    case TEACHERS_UPCOMING_STUDY_SESSIONS_LOADED_FAIL:
    case TEACHERS_PREVIOUS_STUDY_SESSIONS_LIST_LOADED_FAIL:
    case TEACHERS_UPCOMING_STUDY_SESSIONS_LIST_LOADED_FAIL:
    case CREATE_STUDY_SESSION_FAIL:
    case CANCEL_STUDY_SESSION_FAIL:
    case LOAD_INACTIVE_ACCESS_CODES_FAIL:
    case LOAD_TEACHER_DETAILS_FAIL:
    case EDIT_STUDY_SESSION_FAIL:
    case LOAD_ACTIVE_ACCESS_CODE_FAIL:
    case LOAD_ACTIVE_ACCESS_CODES_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
