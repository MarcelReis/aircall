import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box } from "@aircall/tractor";

import { useAuth } from "./apollo/auth";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

import Bottombar from "./components/Bottombar";
import CallPage from "./pages/Call";

const Routes = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <>
      <Box
        marginTop="50px"
        marginBottom="75px"
        marginX="auto"
        maxWidth="600px"
        position="relative"
      >
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/call/:id">
            <CallPage />
          </Route>

          <Redirect to="" />
        </Switch>
      </Box>
      <Bottombar />
    </>
  );
};

export default Routes;
