import * as actions from '../actions/actionTypes';
import {communities} from './initialState'; 

export default function community(state = communities, action) {
  switch (action.type) {
    case actions.GET_COMMUNITIES_SUCCESS:
      return { communities: action.communities };
    default:
      return state
  }
}