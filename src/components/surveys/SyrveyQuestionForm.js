import React, { useEffect, useState } from "react";

import { Formik, Form, Field, FieldArray } from "formik";

import { Button, Card, CardBody, Col, Spinner } from "reactstrap";
import CustomInput from "../shared/CustomInput";

import { useParams, useHistory } from "react-router-dom";
import { useAxios } from "../../http/axios-hook";

import * as Yup from "yup";

const SurveyQuestionForm = ({
  values,
  addQuestion,
  addOption,
  deleteQuestion,
  deleteOption,
}) => {
  return (
    <FieldArray
      name="questions"
      render={() => (
        <>
          <div className="col-12">
            <div className="d-flex align-items-center mb-2">
              <h4 className="mb-0">Questions</h4>
              <Button color="success" size="sm" className="ml-2" onClick={() => addQuestion()}>
                <i className="fas fa-plus"></i> NEW
              </Button>
            </div>

            {values.questions &&
              values.questions.length > 0 &&
              values.questions.map((question, index) => (
                <div className="position-relative">
                  <Field
                    name={`questions.${index}.question`}
                    component={CustomInput}
                    placeholder="Question"
                  />
                  <Button
                    color="link"
                    className="position-absolute top-0 right-0 text-danger"
                    
                    onClick={() => deleteQuestion(index)}
                    style={{ padding: "0.05rem 0.3rem" }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                  <FieldArray
                    name="options"
                    render={() => (
                      <>
                        <h6>Options</h6>
                        <div className="form-row">
                          {values.questions[index].options &&
                            values.questions[index].options.length > 0 &&
                            values.questions[index].options.map((option, i) => (
                              <div className="col-3 position-relative">
                                <Field
                                  name={`questions.${index}.options.${i}.option`}
                                  component={CustomInput}
                                  placeholder="Option"
                                />
                                <Button
                                  color="link"
                                  className="position-absolute top-0 right-0 text-danger"
                                  size="sm"
                                  onClick={() => deleteOption(index, i)}
                                  style={{ padding: "0.05rem 0.3rem" }}
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              </div>
                            ))}
                          <div className="col-3 text-center d-flex align-items-center justify-content-center" style={{"minHeight": "5rem"}}>
                            <Button
                              color="success"
                              size="sm"
                              onClick={() => addOption(index)}
                            >
                              <i className="fas fa-plus"></i> option
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    />
  );
};

export default SurveyQuestionForm;
