import React from "react";
import { Route, Redirect } from "react-router-dom";

import jwt_decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = localStorage.getItem("access_token");

        try {
          let decoded_token = jwt_decode(token);
          return <Component {...props} user={decoded_token} />;
        } catch (err) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
