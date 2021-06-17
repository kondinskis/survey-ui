import React, { useState } from "react";

import {
  Button,
  Card,
  Container,
  CardBody,
  Row,
  Col,
  Spinner,
  Alert,
} from "reactstrap";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import CustomInput from "./shared/CustomInput";
import { useAxios } from "../http/axios-hook";
import Header from "./core/Header";

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };
  const [success, setSuccess] = useState("");

  const axios = useAxios();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    axios
      .post(`/forgot-password`, values)
      .then(({ data }) => {
        resetForm();
        setSuccess("Please check your email for further instructions");
      })
      .catch(() => {})
      .then(() => setSubmitting(false));
  };

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Email not valid"),
  });

  return (
    <>
      <div className="main-content">
        <Header />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="shadow border-0 mt--8">
                <CardBody className="px-lg-5 py-lg-5">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={ForgotPasswordSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ values, isSubmitting, resetForm }) => (
                      <Form>
                        <h6 className="heading-small text-muted mb-4">
                          Forgot password
                        </h6>
                        {success && <Alert color="success">{success}</Alert>}
                        <Row>
                          <Col xs="12">
                            <Field
                              name="email"
                              component={CustomInput}
                              placeholder="Email"
                            />
                          </Col>
                        </Row>

                        <Button
                          color="primary"
                          type="submit"
                          block
                          disabled={isSubmitting}
                        >
                          {isSubmitting && <Spinner size="sm" color="white" />}{" "}
                          Reset password
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ForgotPassword;
