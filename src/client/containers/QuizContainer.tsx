import * as React from 'react';

import * as PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as _ from "lodash";
import Helmet from 'react-helmet';

import { Container, Row, Col } from 'reactstrap';

import TypedText from '../components/common/TypedText';
import QuizForm from '../components/admin/QuizForm';
import QuestionFormModal from '../components/admin/QuestionFormModal';
import * as initialState from '../reducers/initialState';
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
        quizData: _.cloneDeep(initialState.quizData),
        toggleQuestionModal: false,
        questionToEdit: _.cloneDeep(initialState.question),
        answer: ""
    }
    this.updateFormState = this.updateFormState.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSaveQuestion = this.onSaveQuestion.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
    this.onQuestionChange = this.onQuestionChange.bind(this);
  };

  componentWillMount(){
    if(this.props.user.userData.role == 'guest'){
      this.context.router.history.push('/');
    }
  }

  componentDidMount(){
    this.props.actions.getCommunities();
  }

  private onAnswerChange(event) {
    const value = event.target.value;
    return this.setState({answer: value})
  }

  private addAnswer() {
    let question = _.cloneDeep(this.state.questionToEdit);
    question.answers.push({id:question.answers.length, name: this.state.answer});
    return this.setState({questionToEdit: question, answer: ""});
  }

  private removeAnswer(id) {
    let question = _.cloneDeep(this.state.questionToEdit);
    let index = question.answers.findIndex(answer => {
      return answer.id == id;
    });

    question.answers.splice(index,1);

    let newAnswerIds  = question.answers.map((answer, index) => {
      answer.id = index;
      return answer;
    });

    question.answers = _.cloneDeep(newAnswerIds);
    return this.setState({questionToEdit: question});
  }

  private updateFormState(event) {
    const field = event.target.name;
    
    let quizData = _.cloneDeep(this.state.quizData);
    quizData[field] = event.target.value;
    return this.setState({quizData: quizData});
  }

  private onEdit(questionToEdit) {
    this.setState({toggleQuestionModal: true, questionToEdit: _.cloneDeep(questionToEdit)});
  }

  private onDelete(questionId) {
    let quizData = _.cloneDeep(this.state.quizData);
    let index = this.findQuestionById(questionId);
    quizData.questions.splice(index,1);

    let newQuestionIds = quizData.questions.map((questionObj, index) => {
      questionObj.id = index;
      return questionObj;
    });

    quizData.questions = _.cloneDeep(newQuestionIds);

    this.setState({quizData: quizData});
  }

  private findQuestionById(id) {
    return  this.state.quizData.questions.findIndex(question => {
              return question.id == id;
            });
  }

  private onSaveQuestion(event) {
    event.preventDefault();
    let quizData = _.cloneDeep(this.state.quizData);
    let question = _.cloneDeep(this.state.questionToEdit);
    let index = this.findQuestionById(question.id);

    if(index == -1){
      question.id = this.state.quizData.questions.length;
      quizData.questions.push(question);
    }
    else{
      quizData.questions[index] = question;
    }
    this.setState({quizData: quizData, toggleQuestionModal: false, questionToEdit: _.cloneDeep(question)});
  }

  private onQuestionChange(event) {
    const field = event.target.name;
    let questionToEdit = _.cloneDeep(this.state.questionToEdit);
    questionToEdit[field] = event.target.value;
    return this.setState({questionToEdit: questionToEdit});
  }

  private toggleModal() {
    this.setState({toggleQuestionModal: !this.state.toggleQuestionModal});
  }

  private onSave() {
    event.preventDefault();
    this.props.actions.saveQuiz(this.state.quizData).then((data) => {this.redirect()});
  }

  private redirect() {
    this.context.router.history.push('/admin');
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
                onDelete = {this.onDelete}
            />
            <QuestionFormModal
              onSave = {this.onSaveQuestion}
              onChange = {this.onQuestionChange}
              onAnswerChange = {this.onAnswerChange}
              addAnswer = {this.addAnswer}
              removeAnswer = {this.removeAnswer}
              answer = {this.state.answer}
              toggleModal = {this.toggleModal}
              toggle = {this.state.toggleQuestionModal}
              question = {this.state.questionToEdit}
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