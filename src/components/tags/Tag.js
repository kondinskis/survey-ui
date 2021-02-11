import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Row, Col, Button } from "reactstrap";
import { useAxios } from "../../http/axios-hook";
import TagItem from "./TagItem";

const Tag = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const fetchTags = () => {
    setLoading(true);
    axios
      .get("/tags")
      .then(({ data }) => setTags(data))
      .then(() => setLoading(false));
  };

  const deleteTag = (id) => {
    axios
      .delete(`/tags/${id}`)
      .then(() => fetchTags());
  }

  useEffect(() => {
    fetchTags();
  }, [axios]);

  return (
    <>
      <div className="d-flex justify-content-end col-lg-12 mb-4">
        <Link to={`/tag`}>
          <Button color="warning">
            <i className="fas fa-poll-h"></i> Create tag
          </Button>
        </Link>
      </div>
      <Col lg="12">
        <Row className="row-grid">
          {tags.map((tag) => (
            <Col lg="4">
              <TagItem {...tag} onDelete={deleteTag} key={tag.id} />
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
};

export default Tag;
