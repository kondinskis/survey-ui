import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Row,
  Col,
  Button,
  Table,
  CardBody,
  Card,
  ButtonGroup,
} from "reactstrap";
import { useAxios } from "../../http/axios-hook";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => setUsers(data))
      .then(() => setLoading(false));
  };

  const deleteUser = (id) => {
    axios.delete(`/users/${id}`).then(() => fetchUsers());
  };

  useEffect(() => {
    fetchUsers();
  }, [axios]);

  return (
    <>
      <div className="d-flex justify-content-end col-lg-12 mb-4">
        <Link to={`/user`}>
          <Button color="warning">
            <i className="fas fa-poll-h"></i> Create user
          </Button>
        </Link>
      </div>
      <Col lg="12">
        <Card>
          <CardBody>
            <Table responsive borderless>
              <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.role.name}</td>
                    <td>
                      <ButtonGroup size="sm">
                      <Button color="info" tag={Link} to={`/user/${user.id}`}>
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button color="danger" onClick={() => deleteUser(user.id)}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Users;
