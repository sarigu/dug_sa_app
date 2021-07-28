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
} from './types';


export const load_teachers = (index) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            let res = await axios.get(`http://localhost:8000/api/find/teachers/?page=${index}`, config);
            dispatch({
                type: TEACHERS_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: TEACHERS_LOADED_FAIL
            });
        }
    }
};


export const load_new_teachers = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            let res = await axios.get('http://localhost:8000/api/new_teachers/', config);

            dispatch({
                type: NEW_TEACHERS_LOADED_SUCCESS,
            });

            return res.data;
        } catch (err) {
            dispatch({
                type: NEW_TEACHERS_LOADED_FAIL
            });
        }
    }
};

export const load_bookmarked_teachers = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            let res = await axios.get('http://localhost:8000/api/bookmarked/teachers/', config);

            dispatch({
                type: BOOKMARKED_TEACHERS_LOADED_SUCCESS,
                payload: res.data
            });


        } catch (err) {
            dispatch({
                type: BOOKMARKED_TEACHERS_LOADED_FAIL
            });
        }
    }
};

export const create_bookmark = (teacherId) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:8000/api/bookmarked/teachers/', { 'teacherId': teacherId }, config);
            dispatch({
                type: ADD_BOOKMARK_SUCCESS,
            });

        } catch (err) {
            dispatch({
                type: ADD_BOOKMARK_FAIL
            });
        }
    }
};

export const teachers_are_updated = () => dispatch => {
    dispatch({
        type: UPDATED_TEACHERS
    });
};


export const filter_teachers = (subjectsFilter, languageFilter, index) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ subjectsFilter, languageFilter });

        try {
            const res = await axios.post(`http://localhost:8000/api/filter/teachers/?page=${index}`, body, config);
            dispatch({
                type: FILTER_TEACHERS_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: FILTER_TEACHERS_FAIL
            });
        }
    }
};


export const load_study_sessions = (teacherId) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const body = JSON.stringify({ teacherId });
            let res = await axios.post('http://localhost:8000/api/studysessions/', body, config);

            dispatch({
                type: STUDY_SESSIONS_LOADED_SUCCESS,
                payload: res.data
            });

            return res.data;
        } catch (err) {
            dispatch({
                type: STUDY_SESSIONS_LOADED_FAIL
            });
        }
    }
};


export const load_study_session = (studySessionId) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`http://localhost:8000/api/studysession/${studySessionId}`, config);
            dispatch({
                type: STUDY_SESSION_DETAILS_LOADED_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: STUDY_SESSION_DETAILS_LOADED_FAIL
            });
        }
    }
};


export const participate_in_study_session = (studySessionId) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const body = JSON.stringify({ studySessionId });
            const res = await axios.post('http://localhost:8000/api/studysession/participation/', body, config);
            console.log("in data.js --> ", res)
            dispatch({
                type: PARTICIPATE_IN_STUDY_SESSION_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: PARTICIPATE_IN_STUDY_SESSION_LOADED_FAIL
            });
        }
    }
};

export const cancle_participation_in_study_session = (studySessionId) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.delete(`http://localhost:8000/api/studysession/participation/?session=${studySessionId}`, config);
            console.log("in data.js --> ", res)
            dispatch({
                type: CANCEL_STUDY_SESSION_PARTICIPATION_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: CANCEL_STUDY_SESSION_PARTICIPATION_FAIL
            });
        }
    }
};


export const load_upcoming_booked_study_sessions = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get('http://localhost:8000/api/studysession/participation/', config);
            console.log("LOAD 5 --> ", res.data)
            dispatch({
                type: UPCOMING_STUDY_SESSIONS_LOADED_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: UPCOMING_STUDY_SESSIONS_LOADED_FAIL
            });
        }
    }
};

export const load_upcoming_booked_study_sessions_list = (index) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`http://localhost:8000/api/studysession/participation/?type=upcoming&page=${index}`, config);
            console.log("LOAD ALL --> ", res.data)
            dispatch({
                type: UPCOMING_STUDY_SESSIONS_LIST_LOADED_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: UPCOMING_STUDY_SESSIONS_LIST_LOADED_FAIL
            });
        }
    }
};


export const load_previous_booked_study_sessions_list = (index) => async dispatch => {
    console.log(index, "in load_previous_booked_study_sessions_list");
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`http://localhost:8000/api/studysession/participation/?type=previous&page=${index}`, config);
            console.log("LOAD ALL PREV --> ", res.data)
            dispatch({
                type: PREVIOUS_STUDY_SESSIONS_LIST_LOADED_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: PREVIOUS_STUDY_SESSIONS_LIST_LOADED_FAIL
            });
        }
    }
};