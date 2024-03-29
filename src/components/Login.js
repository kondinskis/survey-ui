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
import { useHistory, Link } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import CustomInput from "./shared/CustomInput";
import { useAxios } from "../http/axios-hook";
import Header from "./core/Header";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [error, setError] = useState("");

  const history = useHistory();
  const axios = useAxios();

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    axios
      .post(`/auth/token`, values)
      .then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        history.push("/");
      })
      .catch((err) => setError(err.response.data.message))
      .then(() => setSubmitting(false));
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Email not valid"),
    password: Yup.string().required("Required"),
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
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ values, isSubmitting }) => (
                      <Form>
                        <h6 className="heading-small text-muted mb-4">Login</h6>
                        {error && <Alert color="danger">{error}</Alert>}
                        <Row>
                          <Col xs="12">
                            <Field
                              name="email"
                              component={CustomInput}
                              placeholder="Email"
                            />
                          </Col>
                          <Col xs="12">
                            <Field
                              name="password"
                              component={CustomInput}
                              placeholder="Password"
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
                          Login
                        </Button>

                        <div className="d-flex justify-content-center align-items-center">
                          <Button
                            className="p-1"
                            color="link"
                            type="button"
                            tag={Link}
                            to={`/forgot-password`}
                          >
                            Forgot password?
                          </Button>
                          <span>·</span>
                          <Button
                            className="p-1"
                            color="link"
                            type="button"
                            tag={Link}
                            to={`/register`}
                          >
                            Sign up for survey
                          </Button>
                        </div>
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

export default Login;
