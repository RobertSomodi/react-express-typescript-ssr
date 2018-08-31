import * as types from '../types/state';
export  const loginData = {
    email: "",
    password: ""
}

export const quizzes: Array<types.QuizData> = [];

export const user: types.UserData = {
    userData:{  firstname: "",
            lastname: "",
            email: "",
            id: "",
            jwt: "",
            role: ""},
    isAuthenticated: false
}

export const communities: Array<types.Community> = []

export const quizData: types.QuizData = {
    id: null,
    name: "",
    status: false,
    activeDate: "",
    community: null,
    questions: [
        {   
            id: 0,
            name: "Intrebare",
            answers: [
                {name: 'Raspuns 1', id: 0},
                {name: 'Raspuns 2', id: 1},
                {name: 'Raspuns 3', id: 2},
                {name: 'Raspuns 4', id: 3},
                ],
            time: 50,
            correctAnswer: 2
        }
    ]
}

export const question: types.Question  = {
    id: null,
    name: "",
    answers: [],
    time: null,
    correctAnswer: null
}

export const registerData = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
}