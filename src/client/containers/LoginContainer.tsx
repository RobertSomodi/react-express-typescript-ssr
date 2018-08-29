import * as React from 'react';

import * as PropTypes from 'prop-types';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import * as _ from "lodash";
import Helmet from 'react-helmet';

import LoginForm from '../components/authentication/LoginForm';
import WelcomeMessage from '../components/home/WelcomeMessage';
import SwitchForm from '../components/authentication/SwitchForm';

import * as userActions from '../actions/userActions';
import {State} from '../types/state';
import {loginData, user} from '../reducers/initialState';

class Login extends React.Component<any, any> {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  public constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      saving: false,
      logging: false,
      loginData: _.assign({}, loginData),
      user: _.assign({}, user)
    };
    this.updateLoginFormState = this.updateLoginFormState.bind(this);
    this.login = this.login.bind(this);
    this.changeForm = this.changeForm.bind(this);
  };

  public updateLoginFormState(event) {
    const field = event.target.name;
    let loginData = _.assign({}, this.state.loginData);
    loginData[field] = event.target.value;
    return this.setState({loginData: loginData});
  }

  public changeForm(event: React.MouseEvent<HTMLAnchorElement>):void {
    event.preventDefault();
    this.context.router.history.push('/register');
  }

  public login(event){
    event.preventDefault();
    this.setState({logging: true});
    this.props.actions.userActions.logIn(this.state.loginData)
      .then((data) => {this.redirect(data)})
      .catch(error => {
        this.setState({logging: false});
      })
  }

  private redirect(role:string) {
    this.setState({logging: false});
    if(role == "guest"){
      this.context.router.history.push('/');
    }
    else{
      this.context.router.history.push('/admin');
    }
    
  }

  public render () {
    return (
      <div>
        <Helmet title='Home' />
        <Container className="fullHeight_container">
          <Row className="h-100 align-items-center justify-content-center">
            <Col xs="auto">
                <WelcomeMessage/>
                <LoginForm
                    onChange={this.updateLoginFormState}
                    onLogin={this.login}
                    logging={this.state.logging}
                    loginData={this.state.loginData}
                    errors={this.state.errors}
                />
                 <SwitchForm
                  loginForm={true}
                  changeForm={this.changeForm}
                />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({user: state.user});
const mapDispatchToProps = ( dispatch ) => {
    return {
            actions: {
              userActions: bindActionCreators(userActions,dispatch)
            }
            };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);