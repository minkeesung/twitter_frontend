import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state) => state.session.currentUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        !currentUser ? <Component {...rest} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthRoute;
