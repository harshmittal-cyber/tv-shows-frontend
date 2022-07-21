import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    RESET,
    LOGOUT_SUCCESS
} from '../constants/userConstant';

import { API } from '../../Backend';

import axios from 'axios';
import { persistor } from '../store';

export const login = (user) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
            },
            withCredentials: true
        });

        const { data } = await authAxios.post('/api/users/login', user);

        localStorage.setItem('token', data.token)

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })

        return data;
    } catch (err) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}

export const logout = () => async (dispatch) => {
    localStorage.clear();
    await persistor.purge();
    dispatch({ type: RESET });

    dispatch({ type: LOGOUT_SUCCESS })
}