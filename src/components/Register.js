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

const Register = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [error, setError] = useState("");

  const history = useHistory();
  const axios = useAxios();

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    axios
      .post(`/users/register`, values)
      .then(({ data }) => {
        history.push("/login");
      })
      .catch((err) => setError(err.response.data.message))
      .then(() => setSubmitting(false));
  };

  const RegisterSchema = Yup.object().shape({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string().required("Required").email("Email not valid"),
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
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ values, isSubmitting }) => (
                      <Form>
                        <h6 className="heading-small text-muted mb-4">
                          Register
                        </h6>
                        {error && <Alert color="danger">{error}</Alert>}
                        <Row>
                          <Col xs="12">
                            <Field
                              name="email"
                              component={CustomInput}
                              placeholder="Email"
                            />
                          </Col>
                          <Col xs="6">
                            <Field
                              name="firstname"
                              component={CustomInput}
                              placeholder="Firstname"
                            />
                          </Col>
                          <Col xs="6">
                            <Field
                              name="lastname"
                              component={CustomInput}
                              placeholder="Lastname"
                            />
                          </Col>
                          <Col xs="6">
                            <Field
                              name="password"
                              component={CustomInput}
                              placeholder="Password"
                              type="password"
                            />
                          </Col>
                          <Col xs="6">
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

                        <p className="text-center">
                          Already have an account?{" "}
                          <Button
                            className="p-0"
                            color="link"
                            type="button"
                            tag={Link}
                            to={`/login`}
                          >
                            Login
                          </Button>
                        </p>
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

export default Register;
