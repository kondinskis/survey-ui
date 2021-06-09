import React from "react";

import { FormGroup, Label, Input } from "reactstrap";

const CustomCheckbox = ({ field, form: { touched, errors }, ...props }) => (
  <div className="mb-3">
    <Label className="form-control-label" for={field.name}>
      {props.placeholder}
    </Label>
    <FormGroup check>
      <Input type="checkbox" {...field} {...props} style={{}} />
    </FormGroup>
  </div>
);

export default CustomCheckbox;
