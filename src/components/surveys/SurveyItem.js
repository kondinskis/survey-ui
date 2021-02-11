import React from "react";
import { Link } from "react-router-dom";

import { Badge, Button, Card, CardBody } from "reactstrap";

import { get_random, colors } from "../../utils";

const SurveyItem = ({ id, title, description, tags, onDelete }) => {
  const color = get_random(colors);
  return (
    <Card className="card-lift--hover shadow border-0 mb-4">
      <CardBody className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div
            className={`icon icon-shape icon-shape-${color} rounded-circle`}
          >
            <i className="fas fa-poll" />
          </div>
          <Button color="danger" size="sm" onClick={() => onDelete(id)}>
            <i className="fas fa-trash"></i>
          </Button>
        </div>

        <h6 className={`text-${color} text-uppercase`}>{title}</h6>
        <p className="description mt-3">{description}</p>
        <div>
          {tags.map((tag) => (
            <Badge color={color} pill className="mr-1">
              {tag.title}
            </Badge>
          ))}
        </div>
        <Button
          className="mt-4"
          color={color}
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          Learn more
        </Button>
        <Link to={`/survey/${id}`}>
          <Button className="mt-4" color={color}>
            Edit
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default SurveyItem;
