import React, { useState } from "react";

import { Field, FieldArray } from "formik";

import { Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import CustomInput from "../shared/CustomInput";

const SurveyQuestionForm = ({
  values,
  addQuestion,
  addOption,
  deleteQuestion,
  deleteOption,
}) => {

  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <FieldArray
      name="questions"
      render={() => (
        <>
          <div className="col-12">
            <div className="d-flex align-items-center mb-2">
              <h4 className="mb-0">Questions</h4>
            </div>

            {values.questions &&
              values.questions.length > 0 &&
              values.questions.map((question, index) => (
                index === currentQuestion && <div className="position-relative">
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
                          <div className="col-3 text-center d-flex align-items-center justify-content-center" style={{ "minHeight": "5rem" }}>
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
          <Pagination className="d-flex w-100 justify-content-center mt-4" size="sm">
            {Array.from(Array(values.questions.length)).map((_, i) => (
              <PaginationItem active={i === currentQuestion}>
                <PaginationLink onClick={() => setCurrentQuestion(i)} type="button">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>)
            )}
            <PaginationItem>
              <PaginationLink type="button" onClick={() => {
                addQuestion();
                setCurrentQuestion(values.questions.length);
              }}
                className="bg-success text-white border-success"> <i className="fas fa-plus"></i> NEW </PaginationLink>
            </PaginationItem>
          </Pagination>
        </>
      )}
    />
  );
};

export default SurveyQuestionForm;
