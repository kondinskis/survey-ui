import React from "react";
import { Link } from "react-router-dom";

import { Badge, Button, ButtonGroup, Card, CardBody } from "reactstrap";

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
          <ButtonGroup>
            <Button color="info" size="sm" tag={Link} to={`/survey/${id}`}>
              <i className="fas fa-pen"></i>
            </Button>
            <Button color="danger" size="sm" onClick={() => onDelete(id)}>
              <i className="fas fa-trash"></i>
            </Button>
          </ButtonGroup>
        </div>

        <h6 className={`text-${color} text-uppercase`}>{title}</h6>
        <p className="description mt-3">{description}</p>
        <div>
          {tags.map((tag) => (
            <Badge color={color} className="mr-1">
              {tag.title}
            </Badge>
          ))}
        </div>
        <Link to={`/survey/${id}/take`}>
          <Button className="mt-4 mr-2" color={color}>
            Take survey
          </Button>
        </Link>
        <Link to={`/survey/${id}/results`}>
          <Button className="mt-4" color={color}>
            Results
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default SurveyItem;
