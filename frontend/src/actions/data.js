import axios from 'axios';
import {
    TEACHERS_LOADED_FAIL,
    TEACHERS_LOADED_SUCCESS,
    NEW_TEACHERS_LOADED_FAIL,
    NEW_TEACHERS_LOADED_SUCCESS,
} from './types';


export const load_teachers = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            let res = await axios.get('http://localhost:8000/api/find/teachers', config);

            dispatch({
                type: TEACHERS_LOADED_SUCCESS,
                payload: res.data
            });

            return res.data;
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
            let res = await axios.get('http://localhost:8000/api/new_teachers', config);

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
