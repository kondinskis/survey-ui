import React from "react";

import { Container, Row, Col, Button } from "reactstrap";
import SurveyItem from "./SurveyItem";

const surveys = [
  {
    title: "Download survey",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    tags: ["design", "system", "creative"],
    color: "primary",
  },
  {
    title: "Build Something",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    tags: ["business", "vision", "sucess"],
    color: "success",
  },
  {
    title: "Prepare Launch",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    tags: ["marketing", "product", "launch"],
    color: "warning",
  },
];

const Survey = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <div class="d-flex justify-content-end col-lg-12 mb-4">
          <Button color="warning">
            <i className="fas fa-poll-h"></i> Create survey
          </Button>
        </div>
        <Col lg="12">
          <Row className="row-grid">
            {surveys.map((survey) => (
              <Col lg="4">
                <SurveyItem {...survey} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Survey;
