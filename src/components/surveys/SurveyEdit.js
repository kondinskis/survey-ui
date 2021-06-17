import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";

import { Button, Card, CardBody, Spinner, Label } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import CustomInput from "../shared/CustomInput";

import { useParams, useHistory } from "react-router-dom";
import { useAxios } from "../../http/axios-hook";

import * as Yup from "yup";
import * as dayjs from "dayjs";
import SurveyQuestionForm from "./SyrveyQuestionForm";
import CustomCheckbox from "../shared/CustomCheckbox";

const SurveyEdit = () => {
  const optionInitialValues = {
    option: "",
    order: 0,
  };

  const questionInitialValues = {
    question: "",
    order: 0,
    options: [optionInitialValues],
  };

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    active_till: "",
    active_from: "",
    questions: [questionInitialValues],
    tags: [],
    login_required: false,
  });
  const [tags, setTags] = useState([]);

  const history = useHistory();
  const axios = useAxios();

  const { id } = useParams();

  useEffect(() => {
    const fetchSurvey = (id) => {
      axios
        .get(`/surveys/${id}`)
        .then(({ data }) => {
          setInitialValues({
            ...data,
            active_till: dayjs(data.active_till).format("YYYY-MM-DD"),
            active_from: dayjs(data.active_from).format("YYYY-MM-DD"),
          });
        })
        .catch(() => {});
    };

    id && fetchSurvey(id);
  }, [id, axios]);

  useEffect(() => {
    const fetchTags = () => {
      axios
        .get(`/tags`)
        .then(({ data }) => setTags(data))
        .catch(() => {});
    };
    fetchTags();
  }, [axios]);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const obj = {
      ...values,
      tag_ids: values.tags.map((tag) => tag.id),
    };

    let request;
    if (!!id) {
      request = axios.put(`/surveys/${id}`, obj);
    } else {
      request = axios.post(`/surveys`, obj);
    }
    request
      .then(({ data }) => history.push("/surveys"))
      .catch(() => {})
      .then(() => setSubmitting(false));
  };

  const SurveySchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    active_till: Yup.date()
      .min(Yup.ref("active_from"), "Till date must be after from date")
      .required("Required"),
    active_from: Yup.date().required("Required"),
    questions: Yup.array()
      .required("Must have at least 1 question")
      .min(1, "Must have at least 1 question")
      .of(
        Yup.object().shape({
          question: Yup.string().required("Required"),
          options: Yup.array()
            .required("Must have at least 1 option")
            .min(1, "Must have at least 1 option")
            .of(
              Yup.object().shape({
                option: Yup.string().required("Required"),
              })
            ),
        })
      ),
  });

  return (
    <Card className="shadow border-0 mb-4 col-11 col-md-8">
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
                <div className="col-8">
                  <Label className="form-control-label" for="tags">
                    Tags
                  </Label>
                  <Field
                    name="tags"
                    component={Typeahead}
                    options={tags}
                    id="tags"
                    labelKey="title"
                    multiple
                    selected={values.tags}
                    className="mb-3"
                    onChange={(selected) => {
                      setFieldValue("tags", [...selected]);
                    }}
                  />
                </div>
                <div className="col-4">
                  <Field
                    name="login_required"
                    component={CustomCheckbox}
                    type="checkbox"
                    checked={values.login_required}
                    placeholder="Login required"
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
                  errors={errors}
                  addQuestion={() => {
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
                  }}
                  deleteQuestion={(index) => {
                    const questions = [...values.questions];
                    questions.splice(index, 1);
                    setFieldValue("questions", [...questions]);
                  }}
                  deleteOption={(qIndex, oIndex) => {
                    const options = [...values.questions[qIndex].options];
                    options.splice(oIndex, 1);
                    setFieldValue(`questions.${qIndex}.options`, [...options]);
                  }}
                />
              </div>
              <div className="d-flex">
                <Button color="info" type="submit" disabled={isSubmitting}>
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
