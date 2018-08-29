

import * as React from 'react';
import { A } from 'reactstrap';
import { SwitchFormProps } from '../../types/form';

const SwitchForm: React.SFC<SwitchFormProps> = ({loginForm, changeForm}) => {
    const text = (loginForm) ? "Don't have an account?" : "Already have an account?";
    const button_text = (loginForm) ? "Sign up now" : "Log in now";
    return (
        <p className="mt-3">{text} <a className="switch-form" href="" onClick={changeForm}>{button_text}</a> !</p>
    );
};

export default SwitchForm;
