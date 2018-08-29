import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import AuthApi from '../api/authApi';

export function loginSuccess(userData) {
    return {type: types.LOGIN_SUCCESS, userData};
}

export function registerSuccess(userData) {
    return {type: types.REGISTER_SUCCESS, userData};
}

export function logIn(loginData) {
    return function (dispatch, getState) {
      dispatch(beginAjaxCall());

      return AuthApi.logIn(loginData).then(res => {
              return res.json();
            }).then(data => {
              if (data.jwt) {
                localStorage.setItem('user', JSON.stringify(data));
              }
              dispatch(loginSuccess(data));
              return data.role;
              })
              .catch(error => {
              dispatch(ajaxCallError());
              throw(error);
            });
    };
}

export function signUp(registerData) {
    return function (dispatch, getState) {
      dispatch(beginAjaxCall());

      return AuthApi.signUp(registerData).then(res => {
              return res.json();
            }).then(data => {
              dispatch(registerSuccess(data));  
              })
              .catch(error => {
              dispatch(ajaxCallError());
              throw(error);
            });
    };
}