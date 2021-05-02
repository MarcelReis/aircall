import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import HomePage from "./pages/Home";
import { useAuth } from "./apollo/auth";
import LoginPage from "./pages/Login";

const Routes = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Redirect to="" />
    </Switch>
  );
};

export default Routes;
