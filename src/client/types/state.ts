import { communities } from "../reducers/initialState";

export interface State {
    registerData: RegisterData,
    loginData:LoginData,
    user:UserData,
    communities: Array<Community>
    quizzes: Array<QuizData>
}

export interface RegisterData {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

export interface LoginData {
    email: string,
    password: string
}

export interface UserData {
    userData: Object,
    isAuthenticated: boolean
}

export interface Community {
    name: string,
    id: string
}

export interface QuizData {
    id: string | number
    name: string,
    status: boolean,
    activeDate: string,
    community: string,
    questions: Array<Question>
}

export interface Question {
    id: number,
    name: string,
    time: number,
    answers: Array<Answer>,
    correctAnswer: number
}

export interface Answer {
    id: number,
    name: string
}
