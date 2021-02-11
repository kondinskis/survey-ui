import React from "react";

import { FormGroup, FormFeedback, CustomInput, Label } from "reactstrap";

import { get } from '../../utils';

const CustomSelect = ({ field, form: { touched, errors }, ...props }) => (
  <FormGroup className="mb-3">
    <Label className="form-control-label" for={field.name}>
      {props.label}{" "}
      {props.multiple && get(field.name, errors) && get(field.name, touched) && (
        <span className="invalid-feedback d-inline">*</span>
      )}
    </Label>
    <CustomInput
      className="form-control-alternative"
      type="select"
      {...field}
      {...props}
      id={field.name}
      invalid={get(field.name, errors) && get(field.name, touched)}
    ></CustomInput>
    <FormFeedback>{get(field.name, errors)}</FormFeedback>
  </FormGroup>
);

export default CustomSelect;
