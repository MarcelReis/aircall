import React from "react";
import { useAuth } from "../apollo/auth";
import { Box, Button, Flex } from "@aircall/tractor";

const Topbar = () => {
  const { logout } = useAuth();

  return (
    <Box position="fixed" bg="#fff" width="100%" height="50px" boxShadow={1}>
      <Flex alignItems="center" height="100%" paddingX={3}>
        <Box marginLeft="auto">
          <Button onClick={logout} variant="destructive" size="small">
            Logout
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Topbar;
