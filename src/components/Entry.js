import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { routes } from "../routes";

import UserContext from "../context/User";
import Topbar from "./core/Topbar";
import Header from "./core/Header";
import { Container, Row } from "reactstrap";

const Entry = (props) => {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          component={prop.component}
          key={key}
          exact={prop.exact}
        />
      );
    });
  };

  return (
    <UserContext.Provider value={props.user}>
      <div className="main-content">
        {<Topbar {...props} routes={routes} />}
        <Header />

        <Switch>
          <section className="section section-lg pt-lg-0 mt--200">
            <Container>
              <Row className="justify-content-center">
                <Route path="/" exact>
                  <Redirect to={`/surveys`} />
                </Route>
                {getRoutes(routes)}
              </Row>
            </Container>
          </section>
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

export default Entry;
