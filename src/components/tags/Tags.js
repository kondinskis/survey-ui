import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Col, Button, Card, CardBody, Table, ButtonGroup } from "reactstrap";
import { useAxios } from "../../http/axios-hook";

import Loader from "../shared/Loader";

const Tags = () => {
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
    axios.delete(`/tags/${id}`).then(() => fetchTags());
  };

  useEffect(() => {
    fetchTags();
  }, [axios]);

  return (
    <>
      <div className="d-flex justify-content-end col-lg-12 mb-4">
        <Link to={`/tag`}>
          <Button color="warning">
            <i className="fas fa-tags"></i> Create tag
          </Button>
        </Link>
      </div>
      <Col lg="12">
        <Card>
          <CardBody>
            <Loader active={loading} />
            {!loading && (
              <Table responsive borderless>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tags.map((tag) => (
                    <tr key={tag.id}>
                      <td>{tag.title}</td>
                      <td>{tag.description}</td>
                      <td className="col-2">
                        <ButtonGroup size="sm">
                          <Button
                            color="info"
                            tag={Link}
                            to={`/tag/${tag.id}`}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => deleteTag(tag.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Tags;
