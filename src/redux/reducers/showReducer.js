import {
    SHOW_ADD_FAIL,
    SHOW_ADD_REQUEST,
    SHOW_ADD_SUCCESS,
    SHOW_DELETE_FAIL,
    SHOW_DELETE_REQUEST,
    SHOW_DELETE_SUCCESS,
    SHOW_GET_FAIL,
    SHOW_GET_REQUEST,
    SHOW_GET_SUCCESS,
    SHOW_UPDATE_FAIL,
    SHOW_UPDATE_REQUEST,
    SHOW_UPDATE_SUCCESS
} from '../constants/showConstant'

const initialState = {
    shows: [],
    loading: false,
    error: null,
    message: null
}

export const showReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ADD_REQUEST:
        case SHOW_DELETE_REQUEST:
        case SHOW_UPDATE_REQUEST:
        case SHOW_GET_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            }

        case SHOW_ADD_FAIL:
        case SHOW_DELETE_FAIL:
        case SHOW_GET_FAIL:
        case SHOW_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state

    }
}