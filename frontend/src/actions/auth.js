import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  TEACHER_UPDATE_SUCCESS,
  TEACHER_UPDATE_FAIL,
  SELECTED_ROLE,
  SUBJECTS_LOADED_SUCCESS,
  LANGUAGES_LOADED_SUCCESS,
} from './types';

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };

    try {
      let res = await axios.get('/auth/users/me/', config);
      if (res.data.role === 'teacher') {
        res = await axios.get(`/api/teacher/${res.data.id}/`, config);
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data.teacher,
        });
      } else {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
      }
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    dispatch({
      type: AUTHENTICATED_SUCCESS,
    });
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/auth/jwt/create/', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const signup = (
  first_name,
  last_name, email,
  access_code,
  password,
  re_password, role,
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    first_name, last_name, email, access_code, password, re_password, role,
  });

  try {
    const res = await axios.post('/auth/users/', body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });

    dispatch(login(email, password));
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post('/auth/users/reset_password/', body, config);

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const reset_password_confirm = (
  uid,
  token,
  new_password,
  re_new_password,
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    uid, token, new_password, re_new_password,
  });

  try {
    await axios.post('/auth/users/reset_password_confirm/', body, config);

    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const update_teacher = (
  userID,
  degree,
  university,
  year_of_graduation,
  last_position,
  last_school,
  years_of_experience,
  street,
  postal_code,
  city,
  proof_of_address,
  profile_image,
  phone_number,
  selectedSubjects,
  selectedLanguages,
) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  // format date because Django expects YYYY-MM-DD
  const [day, month, year] = year_of_graduation.split('.');
  const formattedDate = `${year}-${month}-${day}`;

  const formData = new FormData();
  formData.append('degree', degree);
  formData.append('university', university);
  formData.append('year_of_graduation', formattedDate);
  formData.append('last_position', last_position);
  formData.append('last_workplace', last_school);
  formData.append('years_of_experience', years_of_experience);
  formData.append('street', street);
  formData.append('postal_code', postal_code);
  formData.append('city', city);
  formData.append('proof_of_address', proof_of_address);
  formData.append('profile_image', profile_image);
  formData.append('phone', phone_number);
  formData.append('selectedSubjects', selectedSubjects);
  formData.append('selectedLanguages', selectedLanguages);

  try {
    const res = await axios.put(`/api/teacher/${userID}/`, formData, config);

    dispatch({
      type: TEACHER_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TEACHER_UPDATE_FAIL,
    });
  }
};

export const update_selected_role = (role) => (dispatch) => {
  dispatch({
    type: SELECTED_ROLE,
    payload: role,
  });
};

export const load_subjects = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  const res = await axios.get('/api/subjects/', config);

  dispatch({
    type: SUBJECTS_LOADED_SUCCESS,
    payload: res.data,
  });
};

export const load_languages = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  const res = await axios.get('/api/languages/', config);

  dispatch({
    type: LANGUAGES_LOADED_SUCCESS,
    payload: res.data,
  });
};
