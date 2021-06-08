import React, { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  Button,
  Badge,
} from "reactstrap";

import { useParams, useHistory } from "react-router-dom";
import { useAxios } from "../../http/axios-hook";

const TakeSurvey = () => {
  const [survey, setSurvey] = useState({});
  const [answers, setAnswers] = useState({});

  const history = useHistory();
  const axios = useAxios();

  const { id } = useParams();

  const fetchSurvey = (id) => {
    axios.get(`/surveys/${id}`).then(({ data }) => {
      console.log(data);
      setSurvey(data);
    });
  };

  useEffect(() => {
    id && fetchSurvey(id);
  }, [id, axios]);

  const handleSubmit = (answers) => {
    // setSubmitting(true);

    const obj = {
      answers: Object.keys(answers).map((question) => {
        return {
          question_id: Number(question),
          option_id: answers[question],
        };
      }),
    };

    console.log(obj);

    axios
      .post(`/surveys/take/${id}`, obj)
      .then(({ data }) => history.push("/surveys"))
      .catch((err) => console.error(err))
      .then(() => console.log("4ao"));
  };

  return (
    <Card className="shadow border-0 mb-4 col-11 col-md-8">
      <CardBody className="py-5">
        <CardTitle tag="h3">{survey.title}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2">
          {survey.description}
        </CardSubtitle>
        <div>
          {survey.tags &&
            survey.tags.map((tag) => (
              <Badge color="secondary" className="mr-1">
                {tag.title}
              </Badge>
            ))}
        </div>
        <hr />
        {survey.questions &&
          survey.questions.map((question, index) => (
            <>
              <CardSubtitle tag="h5" className="mb-2">
                {question.question}
              </CardSubtitle>
              <ListGroup className="mb-4">
                {question.options.map((option) => (
                  <ListGroupItem
                    tag="button"
                    action
                    active={answers[question.id] === option.id}
                    onClick={() => {
                      setAnswers({
                        ...answers,
                        [question.id]: option.id,
                      });
                    }}
                  >
                    {option.option}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </>
          ))}
        <Button onClick={() => handleSubmit(answers)}>Finish</Button>
      </CardBody>
    </Card>
  );
};

export default TakeSurvey;
