import React, { useContext, useEffect, useState } from "react";

import { useAxios } from "../../http/axios-hook";
import { Container, Row, Col, Button } from "reactstrap";
import SurveyItem from "./SurveyItem";
import { Link } from "react-router-dom";
import Loader from "../shared/Loader";
import UserContext from "../../context/User";
import { useHistory } from "react-router-dom";
import Confirm from "../shared/Confirm";

const Survey = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const history = useHistory();
  const axios = useAxios();

  const fetchSurveys = () => {
    setLoading(true);
    axios
      .get("/surveys")
      .then(({ data }) => setSurveys(data))
      .catch(() => {})
      .then(() => setLoading(false));
  };

  const deleteSurvey = (survey) => {
    Confirm({
      message: `Are you sure you want to delete {0}?`,
      args: [survey.title],
    })
      .then(() => {
        axios
          .delete(`/surveys/${survey.id}`)
          .then(() => fetchSurveys())
          .catch(() => {});
      })
      .catch(() => {});
  };

  const publishSurvey = (id) => {
    axios
      .put(`/surveys/${id}/publish`)
      .then(() => fetchSurveys())
      .catch(() => {});
  };

  const takeSurvey = (id) => {
    axios
      .get(`/surveys/${id}/take`)
      .then(() => history.push(`/survey/${id}/take`))
      .catch(() => {});
  };

  useEffect(() => {
    fetchSurveys();
  }, [axios]);

  return (
    <Container>
      <Row className="justify-content-center">
        {user.coordinator() && (
          <div className="d-flex justify-content-end col-lg-12 mb-4">
            <Link to="/survey">
              <Button color="warning">
                <i className="fas fa-poll-h"></i> Create survey
              </Button>
            </Link>
          </div>
        )}
        <Col lg="12">
          <Row className="row-grid">
            <Loader active={loading} color="white" />
            {!loading &&
              surveys.map((survey) => (
                <Col lg="4" key={survey.id}>
                  <SurveyItem
                    {...survey}
                    onDelete={() => deleteSurvey(survey)}
                    onPublish={publishSurvey}
                    onTakeSurvey={takeSurvey}
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Survey;
