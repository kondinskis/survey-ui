import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { routes } from "../routes";

import UserContext from "../context/User";
import Topbar from "./core/Topbar";
import Header from "./core/Header";

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
    <UserContext.Provider value={{ username: "stefan" }}>
      <div className="main-content">
        {<Topbar {...props} routes={routes} />}
        <Header />

        <Switch>
          <section className="section section-lg pt-lg-0 mt--200">
            {getRoutes(routes)}
          </section>
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

export default Entry;
