import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT
} from './types';

// Check if the user is authenticated
export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/jwt/verify/', body, config);
            if (res.data.code !== 'token_not_valid') {
                dispatch({ type: AUTHENTICATED_SUCCESS });
            } else {
                dispatch({ type: AUTHENTICATED_FAIL });
            }
        } catch (err) {
            dispatch({ type: AUTHENTICATED_FAIL });
            console.error('Error verifying token:', err);
        }
    } else {
        dispatch({ type: AUTHENTICATED_FAIL });
    }
};

// Load user details
export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get('http://127.0.0.1:8000/auth/users/me/', config);
            console.log("User data loaded: ", res.data.std_id); 
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
            localStorage.setItem("user_id", res.data.std_id);
            localStorage.setItem("user_first_name", res.data.first_name);
            localStorage.setItem("user_last_name",res.data.last_name);
            localStorage.setItem("user_email",JSON.stringify(res.data.email))
        } catch (err) {
            dispatch({ type: USER_LOADED_FAIL });
            console.error('Error loading user:', err);
        }
    } else {
        dispatch({ type: USER_LOADED_FAIL });
    }
};

// Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', body, config);
        console.log("Login response data: ", res.data); 
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({ type: LOGIN_FAIL });
        console.error('Error during login:', err);
    }
};

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem('access');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_first_name');
    localStorage.removeItem('user_last_name');
    localStorage.removeItem('user_email');
};
