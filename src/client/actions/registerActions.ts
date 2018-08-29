import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import AuthApi from '../api/authApi';

export function registerSuccess(userData) {
    return {type: types.SIGN_UP_SUCCESS, userData};
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


