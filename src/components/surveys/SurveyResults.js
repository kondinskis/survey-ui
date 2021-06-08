import React, { useEffect, useState } from "react";

import { Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";

import { useParams, useHistory } from "react-router-dom";
import { useAxios } from "../../http/axios-hook";

const SurveyResults = () => {
  const [survey, setSurvey] = useState({});

  const history = useHistory();
  const axios = useAxios();

  const { id } = useParams();

  const fetchSurvey = (id) => {
    axios.get(`/surveys/results/${id}`).then(({ data }) => {
      setSurvey(data);
    });
  };

  useEffect(() => {
    id && fetchSurvey(id);
  }, [id, axios]);

  return (
    <Card className="shadow border-0 mb-4 col-12 col-md-12">
      <CardBody className="py-5">
        <div>
          <h4>{survey.title}</h4>
          <hr />
          {survey.questions &&
            survey.questions.map((question) => (
              <div className="mb-5">
                <h5 className="font-weight-bold">
                  Question: {question.question}
                </h5>
                <ListGroup className="mb-4">
                  {question.options.map((option) => (
                    <ListGroupItem
                      className="d-flex justify-content-between"
                      style={{
                        background: `linear-gradient(90deg, #d2d8f7 ${
                          (option.total / question.total) * 100
                        }%, #ffffff 0%)`,
                        padding: "0.7rem",
                      }}
                    >
                      {option.option}
                      <p className="m-0">
                        {(option.total / question.total) * 100}%
                      </p>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default SurveyResults;
