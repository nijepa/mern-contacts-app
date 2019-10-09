import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Load user
    const loadUser = async () => {
        // load token into default headers
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            });
        }
    };

    // Register user
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    // Login user
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    // Logout
    const logout =() => dispatch({ type: LOGOUT });

    // Clear errors
    const clearErrors =() => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}>
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthState;