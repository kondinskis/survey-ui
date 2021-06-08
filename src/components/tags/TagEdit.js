import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";

import { Button, Card, CardBody, Spinner } from "reactstrap";
import CustomInput from "../shared/CustomInput";

import { useParams, useHistory } from "react-router-dom";
import { useAxios } from "../../http/axios-hook";

import * as Yup from "yup";

const TagEdit = () => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });

  const history = useHistory();
  const axios = useAxios();

  const { id } = useParams();

  useEffect(() => {
    const fetchTag = (id) => {
      axios.get(`/tags/${id}`).then(({ data }) => {
        setInitialValues(data);
      });
    };

    id && fetchTag(id);
  }, [id, axios]);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const obj = {
      ...values,
    };

    let request;
    if (!!id) {
      request = axios.put(`/tags/${id}`, obj);
    } else {
      request = axios.post(`/tags`, obj);
    }
    request
      .then(({ data }) => history.push("/tags"))
      .catch((err) => console.error(err))
      .then(() => setSubmitting(false));
  };

  const TagSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  return (
    <Card className="shadow border-0 mb-4 col-8">
      <CardBody className="py-5">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
          validationSchema={TagSchema}
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

export default TagEdit;
