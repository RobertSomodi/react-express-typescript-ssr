import * as _ from 'lodash';
import { ActionCreator, combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import communityReducer from './communityReucer';
import quizReducer from './quizReducer';

const USERS_LOADED = '@ssr/users/loaded';

const rootReducer = combineReducers({
  user: authenticationReducer,
  communities: communityReducer,
  quizzes: quizReducer
});

export default rootReducer;