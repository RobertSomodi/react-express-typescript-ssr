import { LoaderOptionsPlugin } from "../../../node_modules/@types/webpack";
import { RegisterData, LoginData } from "../types/state";
import * as _ from "lodash";

class AuthApi {
    static signUp(registerData: RegisterData ) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(_.assign({}, registerData))
        };
        return fetch(`http://localhost:3000/auth/signup`, requestOptions);
    }

    static logIn(loginData: LoginData ) {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(_.assign({}, loginData))
        };
        return fetch(`http://localhost:3000/auth/login`, requestOptions);

    }
}
export default AuthApi;