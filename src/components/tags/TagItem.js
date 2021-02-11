import React, { useState } from "react";

import { Formik, Form, Field } from "formik";

import { Button, Card, CardBody } from "reactstrap";
import CustomInput from "../shared/CustomInput";
import TagEdit from "./TagEdit";
import { colors, get_random } from "../../utils";
import { Link } from "react-router-dom";

const TagItem = ({ id, title, description, onDelete }) => {
  const color = get_random(colors);

  return (
    <Card className="card-lift--hover shadow border-0 mb-4">
      <CardBody className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className={`icon icon-shape icon-shape-${color} rounded-circle`}>
            <i className="fas fa-tag" />
          </div>
          <Button color="danger" size="sm" onClick={() => onDelete(id)}>
            <i className="fas fa-trash"></i>
          </Button>
        </div>
        <h6 className={`text-${color} text-uppercase`}>{title}</h6>
        <p className="description mt-3">{description}</p>
        <Link to={`/tag/${id}`}>
          <Button className="mt-4" color={color}>
            Edit
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default TagItem;
