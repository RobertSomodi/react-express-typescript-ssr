export interface Community{
    name:string
}

export interface Quiz{
    name: string,
    activeDate: string,
    community: {type: number, ref: string}
    questions: Array<Question>,
}

export interface Question{
    name: string,
    time: number,
    answers: Array<Answer>,
    correctAnswers: number
}

export interface Answer{
    id: number
    name: string
}

export interface Results{
    question_count: number,
    correct_answers: number
}

export type checkAnswers = (answers: Array<Answer>, cb: (err: any, Results) => {}) => void;