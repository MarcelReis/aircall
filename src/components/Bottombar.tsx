import { Box, Flex } from "@aircall/tractor";
import React from "react";

function Bottombar() {
  return (
    <Box
      position="fixed"
      bg="#fff"
      width="100%"
      height="72px"
      boxShadow={1}
      bottom={0}
      left={0}
    >
      <Flex alignItems="center" height="100%" paddingX={3} />
    </Box>
  );
}

export default Bottombar;
