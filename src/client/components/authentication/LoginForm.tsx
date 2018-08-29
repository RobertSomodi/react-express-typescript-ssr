import * as React from 'react';
import { Form, Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap';
import EmailInput from '../common/EmailInput';
import PasswordInput from '../common/PasswordInput';
import { LoginProps } from '../../types/form';

const LoginForm: React.SFC<LoginProps> = ({onLogin, onChange, logging, loginData, errors}) => {
    return (
        <Card className="mt-3 text-center form-card">
                <CardHeader>Login</CardHeader>
                <CardBody className="p-5">
                    <CardTitle>Please login to continue</CardTitle>
                    <Form >
                        <EmailInput
                            name="email"
                            label=""
                            placeholder="Email"
                            value={loginData.email}
                            error=""
                            onChange={onChange}
                        />
                        <PasswordInput
                            name="password"
                            label=""
                            placeholder="Password"
                            value={loginData.password}
                            error=""
                            onChange={onChange}
                        />
                        <Button className="submit-btn" outline size="lg" block onClick={onLogin} disabled={logging}>
                            Login
                        </Button>
                    </Form>
                </CardBody>
        </Card>         
    );
};

export default LoginForm;
