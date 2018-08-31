import * as React from 'react';
import { Form, Card, CardHeader, CardBody, CardTitle, Button, Table} from 'reactstrap';
import { QuizListProps } from '../../types/form';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const QuizList: React.SFC<QuizListProps> = ({onEdit, onDelete, quizzes}) => {
        let quizList = [];
        console.log(quizzes);
        if(quizzes){
            quizList = quizzes.map((quiz, index) => {
                return  <tr key={index}>
                            <td>{index+1}</td>
                            <td>{quiz.name}</td>
                            <td>{quiz.activeDate}</td>
                            <td>
                                <Button onClick={()=> {onEdit(quiz.id)}} size="sm" color="primary">
                                    <FontAwesomeIcon icon="edit"/>
                                </Button>
                                <Button className="ml-2" onClick={()=> {onDelete(quiz.id)}} size="sm" color="danger">
                                    <FontAwesomeIcon icon="times"/>
                                </Button>
                            </td>
                        </tr>
            });
        }
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th></th>
                    </tr> 
                </thead>
                <tbody>
                    {quizList}
                </tbody>
            </Table>
        );
};

export default QuizList;
