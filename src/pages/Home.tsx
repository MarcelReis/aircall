import React from "react";
import { Button, Spacer, Typography } from "@aircall/tractor";
import { useAuth } from "../apollo/auth";

const HomePage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Spacer space="s" direction="vertical">
        <Typography variant="displayXL">AirCall</Typography>

        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </Spacer>
    </div>
  );
};

export default HomePage;
