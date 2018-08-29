import * as React from 'react';
import {SelectProps} from '../../types/form';
import { FormGroup, Input, FormFeedback} from 'reactstrap';
const SelectInput: React.SFC<SelectProps> = ({onChange, name, label, options, error, value}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  let optionItems = options.map((option, index) => {
    return  <option key={index} value={option.value} selected={option.selected} disabled={option.disabled}>{option.label}</option>
  });

  return (
    <FormGroup>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="field">
        <Input
          type="select"
          name={name}
          className="form-control"
          invalid={error.length > 0}
          onChange={onChange}
          value={value}
          >
          {optionItems}
          </Input>
        <FormFeedback>{error}</FormFeedback>
      </div>
    </FormGroup>
  );
};

export default SelectInput;