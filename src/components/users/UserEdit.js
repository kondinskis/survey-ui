import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";

import { Button, Card, CardBody, Spinner } from "reactstrap";
import CustomInput from "../shared/CustomInput";

import { useParams, useHistory } from "react-router-dom";
import { useAxios } from "../../http/axios-hook";

import * as Yup from "yup";
import CustomSelect from "../shared/CustomSelect";

const UserEdit = () => {
  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role_id: -1,
    password: "",
    confirm_password: "",
  });

  const [roles, setRoles] = useState([]);
  const history = useHistory();
  const axios = useAxios();

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = (id) => {
      axios
        .get(`/users/${id}`)
        .then(({ data }) => {
          setInitialValues({
            ...data,
            confirm_password: "",
          });
        })
        .catch(() => {});
    };

    id && fetchUser(id);
  }, [id, axios]);

  useEffect(() => {
    const fetchRoles = () => {
      axios
        .get("/roles")
        .then(({ data }) => {
          setRoles(data);
        })
        .catch(() => {});
    };

    fetchRoles();
  }, [axios]);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const obj = {
      ...values,
      role_id: Number(values.role_id),
    };

    let request;
    if (!!id) {
      request = axios.put(`/users/${id}`, obj);
    } else {
      request = axios.post(`/users`, obj);
    }
    request
      .then(({ data }) => history.push("/users"))
      .catch(() => {})
      .then(() => setSubmitting(false));
  };

  const UserSchema = Yup.object().shape({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string().required("Required").email("Email not valid"),
    role_id: Yup.number().moreThan(-1, "Required").required("Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .when("password", {
        is: (val) => !!val,
        then: Yup.string().required("Password confirm is required"),
        otherwise: Yup.string().notRequired(),
      }),
    ...(!id && {
      password: Yup.string().required("Required"),
    }),
  });

  return (
    <Card className="shadow border-0 mb-4 col-8">
      <CardBody className="py-5">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
          validationSchema={UserSchema}
        >
          {({ values, isSubmitting, setFieldValue, errors }) => (
            <Form>
              <div className="form-row">
                <div className="col-6">
                  <Field
                    name="firstname"
                    component={CustomInput}
                    placeholder="Firstname"
                  />
                </div>
                <div className="col-6">
                  <Field
                    name="lastname"
                    component={CustomInput}
                    placeholder="Lastname"
                  />
                </div>
                <div className="col-6">
                  <Field
                    name="email"
                    component={CustomInput}
                    placeholder="Email"
                  />
                </div>
                <div className="col-6">
                  <Field name="role_id" component={CustomSelect} label="Role">
                    <option value={-1}>Select</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="col-6">
                  <Field
                    name="password"
                    component={CustomInput}
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div className="col-6">
                  <Field
                    name="confirm_password"
                    component={CustomInput}
                    placeholder="Confirm password"
                    type="password"
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

export default UserEdit;
