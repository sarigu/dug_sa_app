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
    UPDATED_TEACHERS
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

            return { status: "ok" };
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

export const teachersAreUpdated = () => dispatch => {
    dispatch({
        type: UPDATED_TEACHERS
    });
};
