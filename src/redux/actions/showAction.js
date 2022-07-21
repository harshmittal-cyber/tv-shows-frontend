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

import { API } from '../../Backend';
import axios from 'axios';

export const addshow = (show) => async (dispatch) => {
    try {
        dispatch({ type: SHOW_ADD_REQUEST })

        const token = localStorage.getItem('token');

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                "Authorization": `Bearer ${token}`
            },
            withCredentials: true
        });

        const { data } = await authAxios.post(`/api/shows/create`, show);

        console.log(data)

        dispatch({ type: SHOW_ADD_SUCCESS, payload: data })

        return data
    } catch (err) {
        dispatch({ type: SHOW_ADD_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}

export const deleteShow = (id) => async (dispatch) => {
    try {
        dispatch({ type: SHOW_DELETE_REQUEST })

        const token = localStorage.getItem('token');

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                "Authorization": `Bearer ${token}`
            },
            withCredentials: true
        });

        const { data } = await authAxios.delete(`/api/shows/delete/${id}`);

        dispatch({ type: SHOW_DELETE_SUCCESS, payload: data });

        return data

    } catch (err) {
        dispatch({ type: SHOW_DELETE_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}

export const updateShow = (show) => async (dispatch) => {
    try {
        dispatch({ type: SHOW_UPDATE_REQUEST })

        const token = localStorage.getItem('token');

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            withCredentials: true
        })

        const { data } = await authAxios.put(`/api/shows/update/${show._id}`, show)

        dispatch({ type: SHOW_UPDATE_SUCCESS, payload: data })

        return data

    } catch (err) {
        dispatch({ type: SHOW_UPDATE_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}

export const getShows = () => async (dispatch) => {
    try {
        dispatch({ type: SHOW_GET_REQUEST })

        const token = localStorage.getItem('token');

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                "Authorization": `Bearer ${token}`
            },
            withCredentials: true
        });

        const { data } = await authAxios.get(`/api/shows/get`);

        dispatch({ type: SHOW_GET_SUCCESS, payload: data })

        return data

    } catch (err) {
        dispatch({ type: SHOW_GET_FAIL, payload: err.response.data.message })
    }
}