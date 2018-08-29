import { RegisterData, LoginData, QuizData, Community, Question} from './state';
import { EventHandler } from '../../../node_modules/@types/react';
import { communities } from '../reducers/initialState';

export interface InputProps {
    name: string,
    label: string,
    placeholder: string,
    value: string,
    error?: string,
    onChange: Function
}

export interface SelectProps {
    name: string,
    label: string,
    error?: string,
    value: string,
    onChange: Function,
    options: Array<SelectOption>
}

export interface SelectOption {
    value: string,
    label: string,
    disabled?: boolean,
    selected?: boolean
}

export interface RadioInputProps {
    name: string,
    label: string,
    error?: string,
    onChange: Function,
    options: Array<RadioOption>
}

export interface RadioOption {
    value: string | number | boolean,
    label: string,
    disabled?: boolean
}

export interface SignUpProps {
    onRegister: Function,
    onChange: Function,
    saving: boolean,
    registerData: RegisterData
    errors?: string
}

export interface LoginProps {
    onLogin: Function,
    onChange: Function,
    logging: boolean,
    loginData: LoginData,
    errors?: string
}

export interface SwitchFormProps {
    loginForm: boolean,
    changeForm: EventHandler<React.MouseEvent<HTMLAnchorElement>>
}

export interface FormWrapperProps{
    loginForm: boolean
}

export interface QuizFormProps {
    onChange: Function,
    onSave: Function,
    onEdit: Function,
    onSaveQuestion: Function,
    quizData: QuizData
    communities: Array<Community>
}

export interface QuestionListProps {
    onEdit: Function,
    onSave: Function,
    questions: Array<Question>
}