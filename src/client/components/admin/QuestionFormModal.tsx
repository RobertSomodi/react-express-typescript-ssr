import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, InputGroupAddon ,InputGroup, Input, Table } from 'reactstrap';
import { QuestionFormModalProps } from '../../types/form';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import TextInput from '../common/TextInput';
import NumberInput from '../common/NumberInput';
import SelectInput from '../common/SelectInput';

const QuestionFormModal: React.SFC<QuestionFormModalProps> = ({onSave, onChange, onAnswerChange, addAnswer, removeAnswer, answer, toggleModal, toggle, question}) => {

    let answers =  question.answers.map(answerObj => {
        return <tr key={answerObj.id}>
                    <td>{answerObj.id + 1}</td>
                    <td>{answerObj.name}</td>
                    <td className="text-right">
                        <Button onClick={()=> {removeAnswer(answerObj.id)}} size="sm" color="danger">
                            <FontAwesomeIcon icon="times"/>
                        </Button>
                    </td>
                </tr>
    });
    let correctAnswerOptions = question.answers.map(answerObj => {
        return {
            label:answerObj.name,
            value:answerObj.id.toString()
            }
    });  
    return (
            <Modal isOpen={toggle} toggle={toggleModal} >
                <ModalHeader className="text-center" toggle={toggleModal}>Edit question</ModalHeader>
                <ModalBody>
                    <Form>
                        <TextInput
                            name="name"
                            label="Intrebare"
                            placeholder=""
                            value={question.name}
                            onChange={onChange}
                            error=""
                        />
                        <NumberInput
                            name="time"
                            label="Timp de raspuns"
                            placeholder="Timp de raspuns"
                            value={(question.time) ? question.time.toString() : ""}
                            onChange={onChange}
                            error=""
                        />
                        <InputGroup>
                            <Input
                                type="text"
                                name="answer"
                                placeholder="Varianta de raspuns"
                                value={answer}
                                onChange={onAnswerChange}
                            />
                            <InputGroupAddon addonType="append">
                                <Button color="primary" onClick={addAnswer}>
                                    <FontAwesomeIcon icon="plus"/>
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <Table className="mt-2">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Raspuns</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {answers}
                            </tbody>
                        </Table>
                        <SelectInput
                            name="correctAnswer"
                            label="Raspuns corect"
                            onChange={onChange}
                            error=""
                            value={(question.correctAnswer) ? question.correctAnswer.toString() : "null"}
                            options={[...correctAnswerOptions, {label: "Selecteaza raspunsul corect", value: "null", disabled: true}]}
                        />
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={onSave}>Save</Button>
                </ModalFooter>
            </Modal>
        );
};

export default QuestionFormModal;
