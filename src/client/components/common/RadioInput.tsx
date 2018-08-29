import * as React from 'react';
import {RadioInputProps} from '../../types/form';
import { FormGroup, Input, FormFeedback, Col, Label} from 'reactstrap';
const TextInput: React.SFC<RadioInputProps> = ({onChange, name, label, options, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  let optionItems = options.map((option, index) => {
        return <FormGroup check>
                    <Label check disabled={option.disabled}>
                    <Input type="radio" name={name} value={option.value} />
                        {option.label}
                    </Label>
                </FormGroup>
  });
  return (
    // <FormGroup radio inline>
    //   {label && <label htmlFor={name}>{label}</label>}
    //   <div className="field">
    //     <Input
    //       type="text"
    //       name={name}
    //       className="form-control"
    //       placeholder={placeholder}
    //       value={value}
    //       invalid={error.length > 0}
    //       onChange={onChange}
    //       />
    //     <FormFeedback>{error}</FormFeedback>
    //   </div>
    // </FormGroup>
    <FormGroup tag="fieldset" row>
        <legend className="col-form-label col-sm-2">{label}</legend>
        <Col sm={10}>
        {optionItems}
        </Col>
    </FormGroup>
  );
};

export default TextInput;