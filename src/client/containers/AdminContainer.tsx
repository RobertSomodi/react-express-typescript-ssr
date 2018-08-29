import * as React from 'react';

import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from "lodash";
import Helmet from 'react-helmet';

import { Container, Row, Col } from 'reactstrap';

import TypedText from '../components/common/TypedText';
import {user} from '../reducers/initialState';
import * as types from '../types/state';

import {State} from '../types/state';


class Admin extends React.Component<any, any> {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  public constructor(props, context) {
    super(props, context);
  };

  componentWillMount(){
    if(this.props.user.userData.role == 'guest'){
      this.context.router.history.push('/');
    }
  }

  public render () {
    return (
      <div>
        <Helmet title='Community' />
        <Container className="fullHeight_container admin">
          <Row className="h-100 align-items-center justify-content-center">
            <Col>
              <TypedText
                text="Hello, admin"
              />
              <Row className="mt-5">
              </Row>
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
            actions: {}
            };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);