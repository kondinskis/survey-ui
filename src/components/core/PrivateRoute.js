import React from "react";
import { Route, Redirect } from "react-router-dom";

import jwt_decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = localStorage.getItem("access_token");

        let invalid_token = false;

        let decoded_token = {};

        try {
          decoded_token = jwt_decode(token);
        } catch (err) {
          invalid_token = true;
        }

        if (invalid_token && rest.only_coordinator) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }

        const user = {
          ...decoded_token,
          coordinator: () => {
            return ["SYSTEM", "ADMIN"].includes(decoded_token.role || "NO_AUTH");
          }
        }

        return <Component {...props} user={user} />;
      }}
    />
  );
};

export default PrivateRoute;
