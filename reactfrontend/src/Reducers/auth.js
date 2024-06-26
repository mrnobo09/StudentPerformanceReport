import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT
} from '../Actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh : localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
};

export default function auth(state = initialState,action){
    const {type,payload} = action;

    switch(type){
        case AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated:true
            }
        case AUTHENTICATED_FAIL:
            return{
                ...state,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access',payload.access)
            localStorage.setItem('refresh',payload.refresh)
            console.log("login success")
            return{
                ...state,
                isAuthenticated : true,
                refresh:payload.refresh,
                access:payload.access
            }
        case USER_LOADED_SUCCESS:
            return{
                ...state,
                user:payload
            }
        case USER_LOADED_FAIL:
            return{
                ...state,
                user:null
            }
        case LOGOUT:
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                access:null,
                refresh:null,
                isAuthenticated:false,
                user: null
            }
        default:
            return state;
    }
}

