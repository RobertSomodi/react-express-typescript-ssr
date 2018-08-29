import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import AuthApi from '../api/authApi';

export function changeForm(form) {
    return {type: types.SHOW_REGISTER_FORM, form};
}

export function loginSuccess(userData) {
    return {type: types.LOG_IN_SUCCESS, userData};
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
              })
              .catch(error => {
              dispatch(ajaxCallError());
              throw(error);
            });
    };
  }