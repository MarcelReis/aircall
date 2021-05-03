import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box } from "@aircall/tractor";

import { setLogin, useAuth } from "./apollo/auth";

import HistoryPage from "./pages/History";
import LoginPage from "./pages/Login";

import BottomMenu from "./components/BottomMenu";
import CallPage from "./pages/Call";
import { useRefreshTokenMutation } from "./generated/graphql";

const Routes = () => {
  const { user, token } = useAuth();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    if (!token) {
      return;
    }

    const fiveMinutes = 1000 * 60 * 5;
    const timer = setTimeout(() => {
      refreshToken({ fetchPolicy: "no-cache" }).then(({ data }) => {
        setLogin(data?.refreshToken!);
      });
    }, fiveMinutes);

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
          <Route exact path="/history">
            <HistoryPage />
          </Route>
          <Route exact path="/history/:id">
            <CallPage />
          </Route>

          <Redirect to="/history" />
        </Switch>
      </Box>
      <BottomMenu />
    </>
  );
};

export default Routes;
