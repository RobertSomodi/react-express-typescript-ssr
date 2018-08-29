import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import QuizApi from '../api/quizApi';
import * as type from '../types/state';
import CommunityApi from '../api/communityApi';

export function saveSuccess() {
   return {type: types.SAVE_QUIZ_SUCCESS}; 
}

export function saveFailure() {
    return {type: types.SAVE_QUIZ_FAILURE};
}

export function getCommunitiesSuccess(communities) {
    return {type: types.GET_COMMUNITIES_SUCCESS, communities}
}

export function saveQuiz(quizData : type.QuizData) {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        return QuizApi.saveQuiz(quizData).then(res => {
           dispatch(saveSuccess());
        });
    }
}

export function getCommunities() {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        return CommunityApi.getCommunities().
        then(res => {
            return res.json();
        })
        .then(data => {
            dispatch(getCommunitiesSuccess(data));
        })
    }
}