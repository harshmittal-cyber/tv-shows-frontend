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

        case SHOW_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                shows: [...state.shows, action.payload.show],
                message: action.payload.message,
                error: null
            }

        case SHOW_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                shows: action.payload.shows,
                message: action.payload.message,
                error: null
            }

        case SHOW_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                shows: state.shows.filter((show) => show._id !== action.payload._id)
            }

        case SHOW_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                shows: state.shows.map((show) => {
                    if (show._id === action.payload.show._id) {
                        return action.payload.show
                    }
                    return show
                })
            }


        default:
            return state

    }
}