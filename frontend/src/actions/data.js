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
    PARTICIPATE_IN_STUDY_SESSION_LOADED_FAIL
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
            const res = await axios.post('http://localhost:8000/api/studysession/participate', body, config);
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