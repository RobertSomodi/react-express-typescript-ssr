import * as React from 'react';
import { Form, Card, CardHeader, CardBody, CardTitle, Button, Table} from 'reactstrap';
import { QuestionListProps } from '../../types/form';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const QuestionList: React.SFC<QuestionListProps> = ({onEdit, onSave, questions}) => {
        let questionlist = questions.map((question, index) => {
            return  <tr key={index}>
                        <td>{index+1}</td>
                        <td>{question.name}</td>
                        <td>{question.time}</td>
                        <td><Button onClick={()=> {onEdit(question)}} size="sm" color="primary">
                                <FontAwesomeIcon icon="edit"/>
                            </Button>
                        </td>
                    </tr>
        });
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Time</th>
                        <th></th>
                    </tr> 
                </thead>
                <tbody>
                    {questionlist}
                </tbody>
            </Table>
        );
};

export default QuestionList;
