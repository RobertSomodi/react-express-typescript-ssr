import * as React from 'react';

import * as PropTypes from 'prop-types';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import * as _ from "lodash";
import Helmet from 'react-helmet';

import RegisterForm from '../components/authentication/RegisterForm';
import WelcomeMessage from '../components/home/WelcomeMessage';
import SwitchForm from '../components/authentication/SwitchForm';

import * as registerActions from '../actions/registerActions';
import {State} from '../types/state';
import {registerData} from '../reducers/initialState';

class Register extends React.Component<any, any> {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  public constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      saving: false,
      registerData: _.assign({}, registerData)
    };
    this.updateRegisterFormState = this.updateRegisterFormState.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.login = this.login.bind(this);
    this.changeForm = this.changeForm.bind(this);
  };

  public updateRegisterFormState(event) {
    const field = event.target.name;
    let registerData = _.assign({}, this.state.registerData);
    registerData[field] = event.target.value;
    return this.setState({registerData: registerData});
  }

  public registerUser(event) {
    event.preventDefault();

    // if (!this.courseFormIsValid()) {
    //   return;
    // }

    this.setState({saving: true});
    this.props.actions.registerActions.signUp(this.state.registerData)
      .then(() => {  this.redirect()})
      .catch(error => {
        this.setState({saving: false});
      });; 
  }

  public changeForm(event: React.MouseEvent<HTMLAnchorElement>):void {
    event.preventDefault();
    this.context.router.history.push('/login');
  }

  public login(event){
    event.preventDefault();
    this.setState({logging: true});
    this.props.actions.loginActions.logIn(this.state.loginData)
      .then(() => {this.redirect()})
      .catch(error => {
        this.setState({logging: false});
      })
  }

  private redirect() {
    this.setState({saving: false});
    this.context.router.history.push('/');
  }

  public render () {
    return (
      <div>
        <Helmet title='Home' />
        <Container className="fullHeight_container">
          <Row className="h-100 align-items-center justify-content-center">
            <Col xs="auto">
                <WelcomeMessage/>
                <RegisterForm
                onChange={this.updateRegisterFormState}
                onRegister={this.registerUser}
                saving={this.state.saving}
                registerData={this.state.registerData}
                errors={this.state.errors}
                />
                <SwitchForm
                  loginForm={false}
                  changeForm={this.changeForm}
                />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({registerData: state.registerData});
const mapDispatchToProps = ( dispatch ) => {
    return {
            actions: {
              registerActions: bindActionCreators(registerActions,dispatch)
            }
            };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);