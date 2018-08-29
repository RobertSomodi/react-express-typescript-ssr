import * as React from 'react';

import * as PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as _ from "lodash";
import Helmet from 'react-helmet';

import { Container, Row, Col } from 'reactstrap';

import TypedText from '../components/common/TypedText';
import QuizForm from '../components/admin/QuizForm';
import {quizData} from '../reducers/initialState';
import * as types from '../types/state';
import * as quizActions from '../actions/quizActions';


import {State} from '../types/state';

class Quiz extends React.Component<any, any> {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  public constructor(props, context) {
    super(props, context);

    this.state = {
        quizData: _.assign({}, quizData),
        toggleQuestionModal: false,
        questionToEdit: {}
    }
    this.updateFormState = this.updateFormState.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSaveQuestion = this.onSaveQuestion.bind(this);
  };

  componentWillMount(){
    if(this.props.user.userData.role == 'guest'){
      this.context.router.history.push('/');
    }
  }

  componentDidMount(){
    this.props.actions.getCommunities();
  }

  private updateFormState(event) {
    const field = event.target.name;
    
    let quizData = _.assign({}, this.state.quizData);
    quizData[field] = event.target.value;
    return this.setState({quizData: quizData});
  }

  private onEdit(question) {
    this.setState({toggleQuestionModal: false, questionToEdit: _.assign({}, question)});
  }

  private onSaveQuestion() {

  }

  private onSave() {
    event.preventDefault();
    this.props.actions.saveQuiz(this.state.quizData);
  }

  public render () {
    return (
      <div>
        <Helmet title='Create Quiz' />
        <Container className="fullHeight_container admin">
          <Row className="h-100 align-items-center justify-content-center">
            <QuizForm
                onChange = {this.updateFormState}
                onSave = {this.onSave}
                quizData = {this.state.quizData}
                communities = {this.props.communities.communities}
                onEdit = {this.onEdit}
                onSaveQuestion = {this.onSaveQuestion}
            />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({user: state.user, communities: state.communities});
const mapDispatchToProps = ( dispatch ) => {
    return {
            actions: bindActionCreators(quizActions,dispatch)
            };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);