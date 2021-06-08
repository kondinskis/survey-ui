import React, { useEffect, useState } from "react";

import { Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";

import { useParams } from "react-router-dom";
import { useAxios } from "../../http/axios-hook";

const SurveyResults = () => {
  const [survey, setSurvey] = useState({});

  const axios = useAxios();

  const { id } = useParams();

  useEffect(() => {
    const fetchSurvey = (id) => {
      axios.get(`/surveys/results/${id}`).then(({ data }) => {
        setSurvey(data);
      });
    };

    id && fetchSurvey(id);
  }, [id, axios]);

  const percentage = (question, option) => {
    const percent = (option.total / question.total) * 100;
    if (isNaN(percent)) {
      return "N/A";
    }
    return `${percent}%`;
  };

  return (
    <Card className="shadow border-0 mb-4 col-12 col-md-12">
      <CardBody className="py-5">
        <div>
          <h4>{survey.title}</h4>
          <hr />
          {survey.questions &&
            survey.questions.map((question) => (
              <div className="mb-5" key={question.id}>
                <h5 className="font-weight-bold">
                  Question: {question.question}
                </h5>
                <ListGroup className="mb-4">
                  {question.options.map((option) => (
                    <ListGroupItem
                      key={option.id}
                      className="d-flex justify-content-between"
                      style={{
                        background: `linear-gradient(90deg, var(--gray) ${
                          (option.total / question.total) * 100
                        }%, #ffffff 0%)`,
                        padding: "0.7rem",
                      }}
                    >
                      {option.option}
                      <p className="m-0">{percentage(question, option)}</p>
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
