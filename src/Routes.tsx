import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box } from "@aircall/tractor";

import { setLogin, useAuth } from "./apollo/auth";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

import Bottombar from "./components/Bottombar";
import CallPage from "./pages/Call";
import { useRefreshTokenMutation } from "./generated/graphql";

const Routes = () => {
  const { user, token } = useAuth();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    if (!token) {
      return;
    }

    const twoMinutes = 1000 * 60 * 2;
    const timer = setTimeout(() => {
      refreshToken({ fetchPolicy: "no-cache" }).then(({ data }) => {
        setLogin(data?.refreshToken!);
      });
    }, twoMinutes);

    return () => clearTimeout(timer);
  }, [token, refreshToken]);

  if (!user || !token) {
    return <LoginPage />;
  }

  return (
    <>
      <Box
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
