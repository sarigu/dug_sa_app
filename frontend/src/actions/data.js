import axios from 'axios';
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
} from './types';

export const load_teachers = (index) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get(`/api/teachers/?page=${index}`, config);
    dispatch({
      type: TEACHERS_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TEACHERS_LOADED_FAIL,
    });
  }
};

export const load_rejected_teachers = (index) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get(`/api/rejected/teachers/?page=${index}`, config);
    dispatch({
      type: LOAD_REJECTED_TEACHERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_REJECTED_TEACHERS_FAIL,
    });
  }
};

export const load_teacher_details = (teacherId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get(`/api/teacher/${teacherId}/`, config);
    dispatch({
      type: LOAD_TEACHER_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_TEACHER_DETAILS_FAIL,
    });
  }
};

export const add_teacher_review = (teacherId, isApproved) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  try {
    const body = JSON.stringify({ isApproved });
    await axios.patch(`/api/teacher/${teacherId}/`, body, config);
    dispatch({
      type: ADD_TEACHER_REVIEW_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ADD_TEACHER_REVIEW_FAIL,
    });
  }
};

export const load_new_teachers = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get('/api/new/teachers/', config);
    dispatch({
      type: NEW_TEACHERS_LOADED_SUCCESS,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: NEW_TEACHERS_LOADED_FAIL,
    });
  }
};

export const load_bookmarked_teachers = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get('/api/bookmarked/teachers/', config);
    dispatch({
      type: BOOKMARKED_TEACHERS_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOKMARKED_TEACHERS_LOADED_FAIL,
    });
  }
};

export const create_bookmark = (teacherId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const body = JSON.stringify({ teacherId });

    await axios.post('/api/bookmarked/teachers/', body, config);
    dispatch({
      type: ADD_BOOKMARK_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ADD_BOOKMARK_FAIL,
    });
  }
};

export const teachers_are_updated = () => (dispatch) => {
  dispatch({
    type: UPDATED_TEACHERS,
  });
};

export const filter_teachers = (subjectsFilter, languageFilter, index) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  const body = JSON.stringify({ subjectsFilter, languageFilter });

  try {
    const res = await axios.post(`/api/filter/teachers/?page=${index}`, body, config);
    dispatch({
      type: FILTER_TEACHERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FILTER_TEACHERS_FAIL,
    });
  }
};

export const load_study_sessions = (teacherId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const body = JSON.stringify({ teacherId });
    const res = await axios.post('/api/studysessions/', body, config);

    dispatch({
      type: STUDY_SESSIONS_LOADED_SUCCESS,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: STUDY_SESSIONS_LOADED_FAIL,
    });
  }
};

export const load_study_session = (studySessionId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get(`/api/studysession/${studySessionId}/`, config);
    dispatch({
      type: STUDY_SESSION_DETAILS_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUDY_SESSION_DETAILS_LOADED_FAIL,
    });
  }
};

export const participate_in_study_session = (studySessionId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const body = JSON.stringify({ studySessionId });
    const res = await axios.post('/api/studysession/participation/', body, config);

    dispatch({
      type: PARTICIPATE_IN_STUDY_SESSION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PARTICIPATE_IN_STUDY_SESSION_LOADED_FAIL,
    });
  }
};

export const cancle_participation_in_study_session = (studySessionId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.delete(`/api/studysession/participation/?session=${studySessionId}`, config);
    dispatch({
      type: CANCEL_STUDY_SESSION_PARTICIPATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CANCEL_STUDY_SESSION_PARTICIPATION_FAIL,
    });
  }
};

export const load_upcoming_booked_study_sessions = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get('/api/studysession/participation/', config);
    dispatch({
      type: UPCOMING_STUDY_SESSIONS_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPCOMING_STUDY_SESSIONS_LOADED_FAIL,
    });
  }
};

export const load_upcoming_booked_study_sessions_list = (index) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get(`/api/studysession/participation/?type=upcoming&page=${index}`, config);
    dispatch({
      type: UPCOMING_STUDY_SESSIONS_LIST_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPCOMING_STUDY_SESSIONS_LIST_LOADED_FAIL,
    });
  }
};

export const load_previous_booked_study_sessions_list = (index) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get(`/api/studysession/participation/?type=previous&page=${index}`, config);
    dispatch({
      type: PREVIOUS_STUDY_SESSIONS_LIST_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PREVIOUS_STUDY_SESSIONS_LIST_LOADED_FAIL,
    });
  }
};

export const load_upcoming_teachers_study_session = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get('/api/studysessions/', config);
    dispatch({
      type: TEACHERS_UPCOMING_STUDY_SESSIONS_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TEACHERS_UPCOMING_STUDY_SESSIONS_LOADED_FAIL,
    });
  }
};

export const load_teachers_upcoming_study_sessions_list = (index) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get(`/api/studysessions/?type=upcoming&page=${index}`, config);
    dispatch({
      type: TEACHERS_UPCOMING_STUDY_SESSIONS_LIST_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TEACHERS_UPCOMING_STUDY_SESSIONS_LIST_LOADED_FAIL,
    });
  }
};

export const load_teachers_previous_study_sessions_list = (index) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get(`/api/studysessions/?type=previous&page=${index}`, config);
    dispatch({
      type: TEACHERS_PREVIOUS_STUDY_SESSIONS_LIST_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TEACHERS_PREVIOUS_STUDY_SESSIONS_LIST_LOADED_FAIL,
    });
  }
};

export const cancel_study_session = (studySessionId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  const body = JSON.stringify({ isActive: false });

  try {
    await axios.patch(`/api/studysession/${studySessionId}/`, body, config);
    dispatch({
      type: CANCEL_STUDY_SESSION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: CANCEL_STUDY_SESSION_FAIL,
    });
  }
};

export const create_study_session = (date, language, subject, spots, startTime, endTime, description) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  // format date because Django expects YYYY-MM-DD
  const [day, month, year] = date.split('.');
  const formattedDate = `${year}-${month}-${day}`;

  const body = JSON.stringify({
    formattedDate, language, subject, spots, startTime, endTime, description,
  });

  try {
    await axios.post('/api/studysession/', body, config);

    dispatch({
      type: CREATE_STUDY_SESSION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: CREATE_STUDY_SESSION_FAIL,
    });
  }
};

export const edit_study_session = (studySessionId, language, subject, startTime, endTime, description, isActive) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  const body = JSON.stringify({
    language, subject, startTime, endTime, description, isActive,
  });

  try {
    await axios.patch(`/api/studysession/${studySessionId}/`, body, config);
    dispatch({
      type: EDIT_STUDY_SESSION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: EDIT_STUDY_SESSION_FAIL,
    });
  }
};

export const load_active_access_codes = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get('/api/accessCodes/', config);

    dispatch({
      type: LOAD_ACTIVE_ACCESS_CODES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_ACTIVE_ACCESS_CODES_FAIL,
    });
  }
};

export const load_inactive_access_codes = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get('/api/inactive/accessCodes/', config);

    dispatch({
      type: LOAD_INACTIVE_ACCESS_CODES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_INACTIVE_ACCESS_CODES_FAIL,
    });
  }
};

export const load_access_code = (accessCodeId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get(`/api/accessCodes/${accessCodeId}/`, config);

    dispatch({
      type: LOAD_ACTIVE_ACCESS_CODE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_ACTIVE_ACCESS_CODE_FAIL,
    });
  }
};

export const update_access_code = (accessCodeId, isActive) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  const body = JSON.stringify({ isActive });

  try {
    await axios.patch(`/api/accessCodes/${accessCodeId}/`, body, config);
    dispatch({
      type: REMOVE_ACTIVE_ACCESS_CODE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: REMOVE_ACTIVE_ACCESS_CODE_FAIL,
    });
  }
};

export const add_access_code = (code) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  const body = JSON.stringify({ code });

  try {
    await axios.post('/api/accessCodes/', body, config);

    dispatch({
      type: ADD_ACTIVE_ACCESS_CODE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ADD_ACTIVE_ACCESS_CODE_FAIL,
    });
  }
};
