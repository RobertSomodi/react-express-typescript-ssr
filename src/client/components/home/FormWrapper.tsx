import * as React from 'react';
import { Form, Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap';
import { FormWrapperProps } from '../../types/form';


class FormWrapper extends React.Component<any, FormWrapperProps> {
    render() {
        const title = (this.props.loginForm) ? 'Login': 'Sign up';
        const message = (this.props.loginForm) ? 'Please login to continue': 'Please signup to continue';
        return(
            <Card className="mt-3 text-center form-card">
                <CardHeader>{title}</CardHeader>
                <CardBody className="p-5">
                    <CardTitle>{message}</CardTitle>
                    <Form >
                        {this.props.children}
                    </Form>
                </CardBody>
            </Card>
        );
    }
}

export default FormWrapper;
