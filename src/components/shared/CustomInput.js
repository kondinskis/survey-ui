import React from "react";

import { FormGroup, FormFeedback, Input, Label } from "reactstrap";

import { get } from "../../utils";

const CustomInput = ({ field, form: { touched, errors }, ...props }) => (
  <FormGroup className="mb-3">
    <Label className="form-control-label" for={field.name}>
      {props.placeholder}
    </Label>
    <Input
      className="form-control-alternative"
      type={props.type || "text"}
      {...field}
      {...props}
      invalid={get(field.name, errors) && get(field.name, touched)}
    />
    <FormFeedback>{get(field.name, errors)}</FormFeedback>
  </FormGroup>
);

export default CustomInput;
