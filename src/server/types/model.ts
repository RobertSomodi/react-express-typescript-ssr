export interface Community{
    name:string
}

export interface Quiz{
    name: string,
    activeData: string,
    community: {type: number, ref: string}
    questions: Array<Question>,
}

export interface Question{
    question: string,
    time: number,
    choices: Array<Choice>,
    answerId: number
}

export interface Choice{
    id: number,
    choice: string
}

export interface Answer{
    questionId: number
    choiceId: number
}

export interface Results{
    question_count: number,
    correct_answers: number
}

export type checkAnswers = (answers: Array<Answer>, cb: (err: any, Results) => {}) => void;