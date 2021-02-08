import React from "react";

import { Badge, Button, Card, CardBody } from "reactstrap";

const SurveyItem = ({ title, description, tags, color }) => {
  return (
    <Card className="card-lift--hover shadow border-0 mb-4">
      <CardBody className="py-5">
        <div
          className={`icon icon-shape icon-shape-${color} rounded-circle mb-4`}
        >
          <i className="fas fa-poll" />
        </div>
        <h6 className={`text-${color} text-uppercase`}>{title}</h6>
        <p className="description mt-3">{description}</p>
        <div>
          {tags.map((tag) => (
            <Badge color={color} pill className="mr-1">
              {tag}
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
      </CardBody>
    </Card>
  );
};

export default SurveyItem;
