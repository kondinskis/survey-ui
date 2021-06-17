import React from "react";

import {
  Button,
  Card,
  Container,
  CardBody,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import CustomInput from "./shared/CustomInput";
import { useAxios } from "../http/axios-hook";
import Header from "./core/Header";

const SetPassword = () => {
  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const location = useLocation();
  const history = useHistory();
  const axios = useAxios();

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const token = new URLSearchParams(location.search).get("token");

    const obj = {
      ...values,
      token,
    };

    axios
      .post(`/forgot-password/set`, obj)
      .then(({ data }) => {
        history.push("/login");
      })
      .catch(() => {})
      .then(() => setSubmitting(false));
  };

  const SetPasswordSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Password confirm is required"),
  });

  return (
    <>
      <div className="main-content">
        <Header />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              <Card className="shadow border-0 mt--8">
                <CardBody className="px-lg-5 py-lg-5">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={SetPasswordSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ values, isSubmitting }) => (
                      <Form>
                        <h6 className="heading-small text-muted mb-4">
                          Set password
                        </h6>
                        <Row>
                          <Col xs="12">
                            <Field
                              name="password"
                              component={CustomInput}
                              placeholder="Password"
                              type="password"
                            />
                          </Col>
                          <Col xs="12">
                            <Field
                              name="confirm_password"
                              component={CustomInput}
                              placeholder="Confirm password"
                              type="password"
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
                          Sign up
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

export default SetPassword;
