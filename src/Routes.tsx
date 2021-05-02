import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box } from "@aircall/tractor";

import { useAuth } from "./apollo/auth";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

import Topbar from "./components/Topbar";
import Bottombar from "./components/Bottombar";

const Routes = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <>
      <Topbar />
      <Box paddingTop="50px">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Redirect to="" />
        </Switch>
      </Box>
      <Bottombar />
    </>
  );
};

export default Routes;
