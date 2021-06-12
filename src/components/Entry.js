import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { routes } from "../routes";

import UserContext from "../context/User";
import Topbar from "./core/Topbar";
import Header from "./core/Header";
import { Container, Row } from "reactstrap";
import PrivateRoute from "./core/PrivateRoute";

const Entry = (props) => {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <PrivateRoute
          path={prop.path}
          component={prop.component}
          key={key}
          exact={prop.exact}
          only_coordinator={prop.only_coordinator}
        />
      );
    });
  };

  return (
    <UserContext.Provider value={props.user}>
      <div className="main-content">
        {<Topbar {...props} routes={routes} />}
        <Header />

        <section className="section section-lg pt-lg-0 mt--8">
          <Container>
            <Row className="justify-content-center">
              <Switch>
                <Route path="/" exact>
                  <Redirect to={`/surveys`} />
                </Route>
                {getRoutes(routes)}
              </Switch>
            </Row>
          </Container>
        </section>
      </div>
    </UserContext.Provider>
  );
};

export default Entry;
