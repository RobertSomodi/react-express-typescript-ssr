import * as actions from '../actions/actionTypes'; 
import {user} from '../reducers/initialState';

export default function authentication(state = user, action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case actions.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        userData: action.userData
      };
    case actions.LOGIN_FAILURE:
      return {};
    case actions.LOGOUT:
      return {};
    default:
      return state
  }
}