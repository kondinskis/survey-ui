import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";

import { Button, Card, CardBody, Spinner } from "reactstrap";
import CustomInput from "../shared/CustomInput";

import { useParams, useHistory } from "react-router-dom";
import { useAxios } from "../../http/axios-hook";

import * as Yup from "yup";
import SurveyQuestionForm from "./SyrveyQuestionForm";

const SurveyEdit = () => {
  const questionInitialValues = {
    question: "",
    order: 0,
    options: [],
  };

  const optionInitialValues = {
    option: "",
    order: 0,
  };

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    active_till: "",
    active_from: "",
    questions: [],
    tag_ids: [],
  });

  const history = useHistory();
  const axios = useAxios();

  const { id } = useParams();

  const fetchSurvey = (id) => {
    axios.get(`/surveys/${id}`).then(({ data }) => {
      setInitialValues(data);
    });
  };

  useEffect(() => {
    id && fetchSurvey(id);
  }, [id, axios]);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const obj = {
      ...values,
    };

    let request;
    if (!!id) {
      request = axios.put(`/surveys/${id}`, obj);
    } else {
      request = axios.post(`/surveys`, obj);
    }
    request
      .then(({ data }) => history.push("/surveys"))
      .catch((err) => console.error(err))
      .then(() => setSubmitting(false));
  };

  const SurveySchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    active_till: Yup.date().required("Required"),
    active_from: Yup.date().required("Required"),
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Required"),
        options: Yup.array().of(
          Yup.object().shape({
            option: Yup.string().required("Required"),
          })
        ),
      })
    ),
  });

  return (
    <Card className="shadow border-0 mb-4 col-8">
      <CardBody className="py-5">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
          validationSchema={SurveySchema}
        >
          {({ values, isSubmitting, setFieldValue, errors }) => (
            <Form>
              <div className="form-row">
                <div className="col-12">
                  <Field
                    name="title"
                    component={CustomInput}
                    placeholder="Title"
                  />
                </div>
                <div className="col-12">
                  <Field
                    name="description"
                    component={CustomInput}
                    type="textarea"
                    placeholder="Description"
                    rows="6"
                  />
                </div>
                <div className="col-6">
                  <Field
                    name="active_from"
                    component={CustomInput}
                    placeholder="Active from"
                    type="date"
                  />
                </div>
                <div className="col-6">
                  <Field
                    name="active_till"
                    component={CustomInput}
                    placeholder="Active till"
                    type="date"
                  />
                </div>
                <SurveyQuestionForm
                  values={values}
                  addQuestion={() => {
                    console.log(values);
                    setFieldValue("questions", [
                      ...values.questions,
                      questionInitialValues,
                    ]);
                  }}
                  addOption={(index) => {
                    setFieldValue(`questions.${index}.options`, [
                      ...values.questions[index].options,
                      optionInitialValues,
                    ]);
                    // console.log(index, values.questions[index]);
                  }}
                  deleteQuestion={(index) => {
                    const questions = [...values.questions];
                    questions.splice(index, 1);
                    setFieldValue("questions", [...questions]);
                  }}
                  deleteOption={(qIndex, oIndex) => {
                    //   console.log(index);
                    const options = [...values.questions[qIndex].options];
                    options.splice(oIndex, 1);
                    //   const options = []
                    setFieldValue(`questions.${qIndex}.options`, [...options]);
                  }}
                />
              </div>
              <div className="d-flex">
                <Button color="success" type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Spinner size="sm" color="white" />} Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default SurveyEdit;
