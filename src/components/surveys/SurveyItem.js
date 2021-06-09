import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Badge, Button, ButtonGroup, Card, CardBody } from "reactstrap";
import UserContext from "../../context/User";

const SurveyItem = ({
  id,
  title,
  description,
  tags,
  published,
  onDelete,
  onPublish,
}) => {

  const user = useContext(UserContext);

  return (
    <Card className="shadow border-0 mb-4">
      <CardBody className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <i className="fas fa-2x fa-poll" />
          {user.coordinator() && <ButtonGroup>
            <Button color="info" size="sm" tag={Link} to={`/survey/${id}`}>
              <i className="fas fa-pen"></i>
            </Button>
            <Button color="danger" size="sm" onClick={() => onDelete(id)}>
              <i className="fas fa-trash"></i>
            </Button>
          </ButtonGroup>}
        </div>

        <h6 className={`text-uppercase`}>{title}</h6>
        <div>
          {tags.map((tag) => (
            <Badge className="mr-1" color="secondary" key={tag.id}>
              {tag.title}
            </Badge>
          ))}
        </div>
        <p className="description mt-3">{description}</p>
        {published && (
          <>
            <Link to={`/survey/${id}/take`}>
              <Button className="mt-4 mr-2">Take survey</Button>
            </Link>
            <Link to={`/survey/${id}/results`}>
              <Button className="mt-4">View results</Button>
            </Link>
          </>
        )}
        {!published && (
          <>
            <Button className="mt-4 mr-2" onClick={() => onPublish(id)}>
              Publish survey
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default SurveyItem;
