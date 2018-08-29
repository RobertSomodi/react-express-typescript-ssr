import * as actions from '../actions/actionTypes';
 
export function registration(state = {}, action) {
  switch (action.type) {
    case actions.REGISTER_REQUEST:
      return { registering: true };
    case actions.REGISTER_SUCCESS:
      return {};
    case actions.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}