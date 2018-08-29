import * as React from 'react';
import { Form, Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap';
import EmailInput from '../common/EmailInput';
import PasswordInput from '../common/PasswordInput';
import TextInput from '../common/TextInput';
import { SignUpProps } from '../../types/form';

const RegisterForm: React.SFC<SignUpProps> = ({onRegister, onChange, saving, registerData, errors}) => {
    return (
        <Card className="mt-3 text-center form-card">
            <CardHeader>Sign up</CardHeader>
            <CardBody className="p-5">
                <CardTitle>Please signup to continue</CardTitle>
                <Form >
                <TextInput
                name="firstname"
                label=""
                placeholder="First name"
                value={registerData.firstname}
                error=""
                onChange={onChange}/>
                <TextInput
                name="lastname"
                label=""
                placeholder="Last name"
                value={registerData.lastname}
                error=""
                onChange={onChange}/>
                <EmailInput
                name="email"
                label=""
                placeholder="Eg. mail@softvision.ro"
                value={registerData.email}
                error=""
                onChange={onChange}/>
                <PasswordInput
                name="password"
                label=""
                placeholder="Create a password"
                value={registerData.password}
                error=""
                onChange={onChange}/>
                <Button className="submit-btn" outline size="lg" block onClick={onRegister} disabled={saving}>
                    Register
                </Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default RegisterForm;
