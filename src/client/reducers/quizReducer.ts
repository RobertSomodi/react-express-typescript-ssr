import * as actions from '../actions/actionTypes';
import {quizzes} from './initialState'; 

export default function community(state = quizzes, action) {
  switch (action.type) {
    case actions.GET_QUIZZES_SUCCESS:
      return action.quizzes;
    default:
      return state
  }
}