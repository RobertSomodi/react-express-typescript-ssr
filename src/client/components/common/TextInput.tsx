import * as React from 'react';
import {InputProps} from '../../types/form';
import { FormGroup, Input, FormFeedback} from 'reactstrap';
const TextInput: React.SFC<InputProps> = ({onChange, name, label, placeholder, value, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <FormGroup>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="field">
        <Input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          invalid={error.length > 0}
          onChange={onChange}
          />
        <FormFeedback>{error}</FormFeedback>
      </div>
    </FormGroup>
  );
};

export default TextInput;