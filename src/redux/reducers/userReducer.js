import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/userConstant';


const initialState = {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                error: null,
                loading: false,
                user: action.payload
            }

        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload,
                loading: false,
                user: null
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}