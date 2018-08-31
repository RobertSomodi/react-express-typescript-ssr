import * as React from 'react';
import {bindActionCreators} from 'redux';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from "lodash";
import Helmet from 'react-helmet';

import { Container, Row, Col } from 'reactstrap';

import TypedText from '../components/common/TypedText';
import QuizList from '../components/admin/QuizList';
import {user} from '../reducers/initialState';
import * as types from '../types/state';
import * as quizActions from '../actions/quizActions';
import {State} from '../types/state';


class Admin extends React.Component<any, any> {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  public constructor(props, context) {
    super(props, context);

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  };

  componentWillMount(){
    if(this.props.user.userData.role == 'guest'){
      this.context.router.history.push('/');
    }
  }

  componentDidMount(){
    this.props.actions.getQuizzes();
  }

  private onEdit(id) {

  }

  private onDelete(id) {

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
                <QuizList
                  onEdit={this.onEdit}
                  onDelete={this.onDelete}
                  quizzes={this.props.quizzes}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({user: state.user, quizzes: state.quizzes});
const mapDispatchToProps = ( dispatch ) => {
    return {
      actions: bindActionCreators(quizActions,dispatch)
            };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);