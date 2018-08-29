import { QuizData } from "../types/state";
import * as _ from "lodash";
import {authHeader} from './authHeader';

class CommunityApi {
    static getCommunities() {
        const requestOptions = {
            method: 'GET',
            headers: {...authHeader() }
        };
        return fetch(`http://localhost:3000/api/community/getAll`, requestOptions);
    }
}
export default CommunityApi;