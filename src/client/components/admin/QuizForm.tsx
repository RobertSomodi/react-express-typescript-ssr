import * as React from 'react';
import { Form, Card, CardHeader, CardBody, CardTitle, Button, Table} from 'reactstrap';
import { QuizFormProps } from '../../types/form';
import TextInput from '../../components/common/TextInput';
import RadioInput from '../../components/common/RadioInput';
import DateInput from '../../components/common/DateInput';
import SelectInput from '../../components/common/SelectInput';
import QuestionList from './QuestionList';

const QuizForm: React.SFC<QuizFormProps> = ({onChange, onSave, quizData, communities, onEdit, onSaveQuestion}) => {
        let communityOptions = [];
        if(communities){
            communityOptions = communities.map(community => {
                return {
                        label:community.name,
                        value:community.id
                        }
            });
        }
        return (
            <Card className="mt-3 text-center form-card">
            <CardHeader>Quiz</CardHeader>
            <CardBody className="p-5">
                <CardTitle>Please fill the following fields</CardTitle>
                <Form >
                    <TextInput
                        name="name"
                        label=""
                        placeholder="Quiz name"
                        value={quizData.name}
                        onChange={onChange}
                        error=""
                    />
                    <DateInput
                        name="activeDate"
                        label=""
                        placeholder=""
                        value={quizData.activeDate}
                        onChange={onChange}
                        error=""
                    />
                    <SelectInput
                        name="community"
                        label=""
                        onChange={onChange}
                        error=""
                        value={(quizData.community) ? quizData.community : "0"}
                        options={[...communityOptions, {label: "Selecteaza o comunitate", value: "0", disabled: true}]}
                    />
                    <QuestionList
                        onEdit={onEdit}
                        onSave={onSaveQuestion}
                        questions={quizData.questions}
                    />
                    <Button className="submit-btn" outline size="lg" block onClick={onSave}>
                        Save
                    </Button>
                </Form>
            </CardBody>
    </Card>
        );
};

export default QuizForm;
