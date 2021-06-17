import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Col, Button, Table, CardBody, Card, ButtonGroup } from "reactstrap";

import Loader from "../shared/Loader";

import { useAxios } from "../../http/axios-hook";
import Confirm from "../shared/Confirm";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => setUsers(data))
      .catch(() => {})
      .then(() => setLoading(false));
  };

  const deleteUser = (user) => {
    Confirm({
      message: `Are you sure you want to delete {0} {1}?`,
      args: [user.firstname, user.lastname],
    })
      .then(() => {
        axios
          .delete(`/users/${user.id}`)
          .then(() => fetchUsers())
          .catch(() => {});
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchUsers();
  }, [axios]);

  return (
    <>
      <div className="d-flex justify-content-end col-lg-12 mb-4">
        <Link to={`/user`}>
          <Button color="warning">
            <i className="fas fa-users"></i> Create user
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
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td className="text-capitalize">
                          {user.role.name.toLowerCase()}
                        </td>
                        <td>
                          <ButtonGroup size="sm">
                            <Button
                              color="info"
                              tag={Link}
                              to={`/user/${user.id}`}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              color="danger"
                              onClick={() => deleteUser(user)}
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

export default Users;
