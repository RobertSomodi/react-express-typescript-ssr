import { LoaderOptionsPlugin } from "../../../node_modules/@types/webpack";
import { QuizData } from "../types/state";
import * as _ from "lodash";
import {authHeader} from './authHeader';

class QuizApi {
    static saveQuiz(quizData: QuizData ) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            body: JSON.stringify(_.assign({}, quizData))
        };
        return fetch(`http://localhost:3000/api/quiz/save`, requestOptions);
    }

    static getQuizzes() {
        const requestOptions = {
            method: 'GET',
            headers: {...authHeader() }
        };
        return fetch(`http://localhost:3000/api/quiz/getAll`, requestOptions);
    }
}
export default QuizApi;